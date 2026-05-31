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

    // Build CSV report
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
      {/* Controls */}
      <div className="mb-4 space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <label className="flex items-center gap-2">
            <span className="text-zinc-500">Target:</span>
            <select
              value={targetKB}
              onChange={(e) => setTargetKB(Number(e.target.value))}
              className="border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-1.5 bg-white dark:bg-zinc-800 text-sm"
              disabled={processing}
            >
              {TARGETS.map((t) => (
                <option key={t} value={t}>
                  {t}KB
                </option>
              ))}
            </select>
          </label>

          <span className="text-xs text-zinc-400">
            Max {MAX_FILES} images, {MAX_OUTPUT_KB}KB max output
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <label className="flex items-center gap-2">
            <span className="text-zinc-500">Mode:</span>
            <select
              value={compressionMode}
              onChange={(e) =>
                setCompressionMode(e.target.value as CompressionMode)
              }
              className="border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-1.5 bg-white dark:bg-zinc-800 text-xs"
              disabled={processing}
            >
              {(
                Object.entries(COMPRESSION_MODE_CONFIG) as [
                  CompressionMode,
                  (typeof COMPRESSION_MODE_CONFIG)[CompressionMode]
                ][]
              ).map(([mode, config]) => (
                <option key={mode} value={mode}>
                  {config.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2">
            <span className="text-zinc-500">Filename:</span>
            <select
              value={filenameMode}
              onChange={(e) =>
                setFilenameMode(e.target.value as BulkFilenameMode)
              }
              className="border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-1.5 bg-white dark:bg-zinc-800 text-xs"
              disabled={processing}
            >
              <option value="seo-friendly">SEO friendly</option>
              <option value="keep-original">Keep original name</option>
              <option value="append-100kb">Add &quot;-{targetKB}kb&quot;</option>
            </select>
          </label>
        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        >
          {showAdvanced ? "▾" : "▸"} Advanced options
        </button>

        {showAdvanced && (
          <div className="p-3 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={resizeEnabled}
                onChange={(e) => setResizeEnabled(e.target.checked)}
                className="rounded"
              />
              <span className="text-zinc-700 dark:text-zinc-300">
                Resize before compressing
              </span>
            </label>

            {resizeEnabled && (
              <div>
                <p className="text-xs text-zinc-400 mb-2">Max width</p>
                <div className="flex flex-wrap gap-2">
                  {MAX_WIDTH_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setMaxWidth(opt.value);
                        setCustomWidth("");
                      }}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                        maxWidth === opt.value && !customWidth
                          ? "bg-blue-600 text-white"
                          : "border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                  <input
                    type="number"
                    placeholder="Custom"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    className="w-20 px-2 py-1 border border-zinc-300 dark:border-zinc-600 rounded-lg text-xs bg-white dark:bg-zinc-800"
                    min={100}
                    max={4000}
                  />
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  Resize is optional. It can help large images fit under 100KB
                  with better visual results.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

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
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragOver
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-zinc-300 dark:border-zinc-600 hover:border-zinc-400"
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
        <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
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
        <p className="text-lg font-medium mb-1">Drop images here</p>
        <p className="text-sm text-zinc-500">
          or click to browse — JPG, PNG, WebP
        </p>
      </div>

      <p className="text-xs text-zinc-400 text-center mt-3">
        Your images are processed locally in your browser and never uploaded.
      </p>

      {warning && !processing && results.length === 0 && (
        <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-700 dark:text-amber-300 text-sm text-center">
          {warning}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-500">
              {files.length} image{files.length > 1 ? "s" : ""}
            </span>
            <div className="flex gap-2">
              {!processing && files.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  Clear all
                </button>
              )}
              {!processing && results.length === 0 && (
                <button
                  onClick={startProcessing}
                  className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
                >
                  Compress All
                </button>
              )}
            </div>
          </div>

          {processing && (
            <div className="text-center py-4">
              <div className="inline-block w-6 h-6 border-2 border-zinc-300 border-t-blue-600 rounded-full animate-spin" />
              <p className="mt-2 text-sm text-zinc-500">
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
                className={`border rounded-lg p-3 flex items-center justify-between gap-3 ${
                  r.status === "success"
                    ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10"
                    : r.status === "failed"
                    ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10"
                    : "border-zinc-200 dark:border-zinc-700"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{r.filename}</p>
                  <p className="text-xs text-zinc-500">
                    {r.status === "pending" && "Waiting..."}
                    {r.status === "compressing" && "Compressing..."}
                    {r.status === "success" && r.result && (
                      <>
                        {formatBytes(r.result.originalSize)} →{" "}
                        {formatBytes(r.result.compressedSize)} —{" "}
                        {r.result.savingsPercent}% saved
                        {r.result.dimensionsChanged && " (resized)"}
                      </>
                    )}
                    {r.status === "failed" && (r.error || "Failed")}
                  </p>
                </div>
                {r.status === "success" && (
                  <button
                    onClick={() => downloadOne(r)}
                    className="shrink-0 text-xs px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Download
                  </button>
                )}
              </div>
            ))}
          </div>

          {allDone && successCount > 0 && (
            <div className="text-center pt-4 space-y-2">
              <button
                onClick={downloadAllAsZip}
                className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
              >
                Download All as ZIP ({successCount} file
                {successCount > 1 ? "s" : ""})
              </button>
              {failedCount > 0 && (
                <p className="text-xs text-zinc-400">
                  {failedCount} image{failedCount > 1 ? "s" : ""} failed — not
                  included in ZIP. CSV report includes all files.
                </p>
              )}
            </div>
          )}

          {allDone && successCount === 0 && results.length > 0 && (
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
              No images could be compressed under the target size. Try Smallest
              File mode, enable resize, or use smaller images.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
