"use client";

import { useState, useRef, useCallback } from "react";
import {
  compressToWebp,
  type CompressToWebpResult,
  type CompressionMode,
  COMPRESSION_MODE_CONFIG,
} from "@/lib/compressToWebp";
import { formatBytes } from "@/lib/formatBytes";
import { isValidImageFile, isLargeFile, MAX_OUTPUT_KB } from "@/lib/constants";
import {
  generateBulkFilename,
  deduplicateFilenames,
  generateReportCsv,
  type BulkFilenameMode,
} from "@/lib/outputFilename";

type FileEntry = {
  id: number;
  file: File;
};

type FileResult = {
  id: number;
  filename: string;
  file: File;
  result?: CompressToWebpResult;
  status: "pending" | "compressing" | "success" | "failed";
  error?: string;
};

const TARGETS = [50, 100] as const;
const MAX_FILES = 20;
const MAX_WIDTH_OPTIONS = [
  { label: "1920px", value: 1920 },
  { label: "1600px", value: 1600 },
  { label: "1200px", value: 1200 },
  { label: "800px", value: 800 },
] as const;

async function loadJSZip(): Promise<typeof import("jszip")> {
  return (await import("jszip")).default;
}

export default function BulkImageCompressor() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [results, setResults] = useState<FileResult[]>([]);
  const [targetKB, setTargetKB] = useState<number>(100);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [warning, setWarning] = useState<string | null>(null);
  const [objectUrls, setObjectUrls] = useState<Map<number, string>>(new Map());
  const inputRef = useRef<HTMLInputElement>(null);

  const [compressionMode, setCompressionMode] =
    useState<CompressionMode>("balanced");
  const [filenameMode, setFilenameMode] =
    useState<BulkFilenameMode>("seo-friendly");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [resizeEnabled, setResizeEnabled] = useState(false);
  const [maxWidth, setMaxWidth] = useState<number>(1200);
  const [customWidth, setCustomWidth] = useState("");

  const cleanup = useCallback(() => {
    objectUrls.forEach((url) => URL.revokeObjectURL(url));
    setObjectUrls(new Map());
  }, [objectUrls]);

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      const arr = Array.from(newFiles);
      const valid = arr.filter((f) => isValidImageFile(f));
      if (valid.length < arr.length) {
        setWarning("Some files were skipped — unsupported format.");
      }

      const large = valid.some((f) => isLargeFile(f));
      if (large) {
        setWarning("Large images may take longer to compress in your browser.");
      }

      setFiles((prev) => {
        const combined = [...prev];
        for (const f of valid) {
          if (combined.length >= MAX_FILES) break;
          if (
            !combined.some(
              (e) => e.file.name === f.name && e.file.size === f.size
            )
          ) {
            combined.push({ id: Date.now() + Math.random(), file: f });
          }
        }
        if (arr.length > MAX_FILES || combined.length >= MAX_FILES) {
          setWarning(`Limited to ${MAX_FILES} images at once.`);
        }
        return combined.slice(0, MAX_FILES);
      });
    },
    []
  );

  const clearAll = () => {
    cleanup();
    setFiles([]);
    setResults([]);
    setWarning(null);
  };

  function resolveMaxWidth(): number | undefined {
    if (!resizeEnabled) return undefined;
    if (customWidth) {
      const n = parseInt(customWidth, 10);
      if (isNaN(n) || n < 100) return 1200;
      return Math.min(n, 4000);
    }
    return maxWidth;
  }

  const startProcessing = async () => {
    if (files.length === 0 || processing) return;
    setProcessing(true);
    setWarning(null);
    cleanup();

    const initialResults: FileResult[] = files.map((f) => ({
      id: f.id,
      filename: f.file.name,
      file: f.file,
      status: "pending",
    }));
    setResults(initialResults);

    const concurrency = 3;
    const queue = [...files];
    const updated = [...initialResults];

    const processNext = async (): Promise<void> => {
      const entry = queue.shift();
      if (!entry) return;

      const idx = updated.findIndex((r) => r.id === entry.id);
      if (idx === -1) return processNext();

      updated[idx] = { ...updated[idx], status: "compressing" };
      setResults([...updated]);

      try {
        const res = await compressToWebp({
          file: entry.file,
          targetKB,
          compressionMode,
          resizeBeforeCompress: resizeEnabled,
          maxWidth: resolveMaxWidth(),
        });

        const url = URL.createObjectURL(res.blob);
        setObjectUrls((prev) => new Map(prev).set(entry.id, url));

        if (!res.reachedTarget) {
          updated[idx] = {
            ...updated[idx],
            result: res,
            status: "failed",
            error: `Could not fit under ${targetKB}KB. Try Smallest File mode or enable resize.`,
          };
        } else {
          updated[idx] = {
            ...updated[idx],
            result: res,
            status: "success",
          };
        }
      } catch (err) {
        updated[idx] = {
          ...updated[idx],
          status: "failed",
          error: err instanceof Error ? err.message : "Compression failed",
        };
      }

      setResults([...updated]);
      return processNext();
    };

    const workers = Array.from({ length: concurrency }, () => processNext());
    await Promise.all(workers);
    setProcessing(false);
  };

  const downloadOne = (r: FileResult) => {
    if (!r.result) return;
    const url = objectUrls.get(r.id);
    if (!url) return;
    const filename = generateBulkFilename(r.filename, targetKB, filenameMode);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const downloadAllAsZip = async () => {
    const successful = results.filter(
      (r) => r.status === "success" && r.result && objectUrls.has(r.id)
    );
    if (successful.length === 0) return;

    const JSZip = await loadJSZip();
    const zip = new JSZip();

    const names = successful.map((r) =>
      generateBulkFilename(r.filename, targetKB, filenameMode)
    );
    const uniqueNames = deduplicateFilenames(names);

    for (let i = 0; i < successful.length; i++) {
      zip.file(uniqueNames[i], successful[i].result!.blob);
    }

    const csvRows = results.map((r) => ({
      originalFilename: r.filename,
      outputFilename: r.result
        ? generateBulkFilename(r.filename, targetKB, filenameMode)
        : "",
      originalSizeKb: r.result
        ? (r.result.originalSize / 1024).toFixed(1)
        : "",
      compressedSizeKb: r.result
        ? (r.result.compressedSize / 1024).toFixed(1)
        : "",
      originalDimensions: r.result
        ? `${r.result.originalWidth}x${r.result.originalHeight}`
        : "",
      outputDimensions: r.result
        ? `${r.result.outputWidth}x${r.result.outputHeight}`
        : "",
      status: r.status as "success" | "failed",
    }));
    zip.file("compression-report.csv", generateReportCsv(csvRows));

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(zipBlob);
    a.download = `100kbconverter-webp-images.zip`;
    a.click();
  };

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => setDragOver(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(e.target.files);
    e.target.value = "";
  };

  const successCount = results.filter((r) => r.status === "success").length;
  const failedCount = results.filter((r) => r.status === "failed").length;
  const allDone =
    results.length > 0 &&
    results.every(
      (r) => r.status !== "pending" && r.status !== "compressing"
    );

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Settings panel */}
      <div className="mb-5 p-5 bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-4">
        {/* Target size */}
        <div>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            Target size per image
          </p>
          <div className="flex gap-2">
            {TARGETS.map((t) => (
              <button
                key={t}
                onClick={() => setTargetKB(t)}
                disabled={processing}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  targetKB === t
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                }`}
              >
                {t}KB
              </button>
            ))}
            <span className="self-center text-sm text-zinc-400 ml-2">
              Max {MAX_FILES} images, {MAX_OUTPUT_KB}KB max output
            </span>
          </div>
        </div>

        {/* Compression mode */}
        <div>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            Compression mode
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {(
              Object.entries(COMPRESSION_MODE_CONFIG) as [
                CompressionMode,
                (typeof COMPRESSION_MODE_CONFIG)[CompressionMode]
              ][]
            ).map(([mode, config]) => (
              <button
                key={mode}
                onClick={() => setCompressionMode(mode)}
                disabled={processing}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  compressionMode === mode
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                }`}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filename format */}
        <div>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-2">
            Filename format
          </p>
          <div className="flex gap-1.5 flex-wrap">
            {(
              [
                { value: "seo-friendly" as BulkFilenameMode, label: "SEO friendly" },
                { value: "keep-original" as BulkFilenameMode, label: "Keep original" },
                { value: "append-100kb" as BulkFilenameMode, label: `Add "-${targetKB}kb"` },
              ]
            ).map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilenameMode(opt.value)}
                disabled={processing}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filenameMode === opt.value
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced */}
        <div>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors flex items-center gap-1"
          >
            {showAdvanced ? "▾" : "▸"} Advanced options
          </button>

          {showAdvanced && (
            <div className="mt-3 p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-4">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={resizeEnabled}
                  onChange={(e) => setResizeEnabled(e.target.checked)}
                  className="rounded w-4 h-4"
                />
                <span className="text-sm text-zinc-700 dark:text-zinc-300 font-medium">
                  Resize before compressing
                </span>
              </label>

              {resizeEnabled && (
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2.5 font-medium">
                    Max width
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {MAX_WIDTH_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setMaxWidth(opt.value);
                          setCustomWidth("");
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          maxWidth === opt.value && !customWidth
                            ? "bg-blue-600 text-white shadow-sm"
                            : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-600 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                    <input
                      type="number"
                      placeholder="Custom px"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(e.target.value)}
                      className="w-28 px-3 py-2 border border-zinc-200 dark:border-zinc-600 rounded-lg text-sm bg-white dark:bg-zinc-800 placeholder:text-zinc-400"
                      min={100}
                      max={4000}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Dropzone */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Upload images — JPG, PNG, or WebP"
        className={`border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center cursor-pointer transition-all ${
          dragOver
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 scale-[1.02]"
            : files.length > 0
            ? "border-blue-300 dark:border-blue-600 bg-blue-50/30 dark:bg-blue-950/10"
            : "border-zinc-200 dark:border-zinc-600 hover:border-zinc-300 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/30"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp"
          onChange={onFileChange}
          className="sr-only"
          aria-label="Choose image files — JPG, PNG, or WebP"
          multiple
        />
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>
        <p className="text-xl font-semibold mb-2">Drop images here</p>
        <p className="text-sm text-zinc-500">
          or click to browse — JPG, PNG, WebP
        </p>
      </div>

      <p className="text-sm text-zinc-400 text-center mt-4 flex items-center justify-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        Your images are processed locally in your browser and never uploaded.
      </p>

      {warning && !processing && results.length === 0 && (
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-700 dark:text-amber-300 text-sm text-center">
          {warning}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium text-zinc-600 dark:text-zinc-400">
              {files.length} image{files.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex gap-2">
              {!processing && files.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors font-medium"
                >
                  Clear all
                </button>
              )}
              {!processing && results.length === 0 && (
                <button
                  onClick={startProcessing}
                  className="px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 dark:shadow-blue-900/30"
                >
                  Compress All
                </button>
              )}
            </div>
          </div>

          {processing && (
            <div className="text-center py-8">
              <div className="inline-block w-8 h-8 border-3 border-zinc-200 dark:border-zinc-600 border-t-blue-600 rounded-full animate-spin" />
              <p className="mt-3 text-sm text-zinc-500 font-medium">
                Compressing{" "}
                {
                  results.filter(
                    (r) =>
                      r.status === "compressing" || r.status === "success"
                  ).length
                }{" "}
                of {results.length}...
              </p>
            </div>
          )}

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {results.map((r) => (
              <div
                key={r.id}
                className={`border rounded-xl p-4 flex items-center justify-between gap-3 ${
                  r.status === "success"
                    ? "border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/10"
                    : r.status === "failed"
                    ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/10"
                    : "border-zinc-200 dark:border-zinc-700"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{r.filename}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {r.status === "pending" && "Waiting..."}
                    {r.status === "compressing" && "Compressing..."}
                    {r.status === "success" && r.result && (
                      <>
                        {formatBytes(r.result.originalSize)} →{" "}
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {formatBytes(r.result.compressedSize)}
                        </span>{" "}
                        — {r.result.savingsPercent}% saved
                        {r.result.dimensionsChanged && " (resized)"}
                      </>
                    )}
                    {r.status === "failed" && (r.error || "Failed")}
                  </p>
                </div>
                {r.status === "success" && (
                  <button
                    onClick={() => downloadOne(r)}
                    className="shrink-0 text-sm px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Download
                  </button>
                )}
              </div>
            ))}
          </div>

          {allDone && successCount > 0 && (
            <div className="text-center pt-6 space-y-3">
              <button
                onClick={downloadAllAsZip}
                className="px-7 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 dark:shadow-blue-900/30 inline-flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download All as ZIP ({successCount} file
                {successCount > 1 ? "s" : ""})
              </button>
              {failedCount > 0 && (
                <p className="text-sm text-zinc-400">
                  {failedCount} image{failedCount > 1 ? "s" : ""} failed — not
                  included in ZIP. CSV report includes all files.
                </p>
              )}
            </div>
          )}

          {allDone && successCount === 0 && results.length > 0 && (
            <div className="text-center p-5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm">
              No images could be compressed under the target size. Try Smallest
              File mode, enable resize, or use smaller images.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
