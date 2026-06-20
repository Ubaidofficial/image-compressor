"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  compressToWebp,
  type CompressToWebpResult,
  type CompressionMode,
  COMPRESSION_MODE_CONFIG,
} from "@/lib/compressToWebp";
import { formatBytes } from "@/lib/formatBytes";
import { slugifyFilename } from "@/lib/slugify";
import { isValidImageFile, isLargeFile } from "@/lib/constants";

type ImageCompressorProps = {
  targetKB: number;
  acceptedFormats?: string[];
  pageIntent?: "general" | "webp" | "jpg-to-webp" | "png-to-webp" | "jpg" | "jpeg" | "png";
  inputFormat?: "image" | "jpg" | "jpeg" | "png" | "webp";
};

function resolveInputFormat(
  inputFormat?: ImageCompressorProps["inputFormat"],
  intent?: string
): NonNullable<ImageCompressorProps["inputFormat"]> {
  if (inputFormat) return inputFormat;
  switch (intent) {
    case "jpg-to-webp":
    case "jpg":
    case "jpeg":
      return "jpg";
    case "png-to-webp":
    case "png":
      return "png";
    case "webp":
      return "webp";
    default:
      return "image";
  }
}

function fileToAcceptedLabel(format: NonNullable<ImageCompressorProps["inputFormat"]>): string {
  switch (format) {
    case "jpg":
    case "jpeg":
      return "JPG or JPEG";
    case "png":
      return "PNG";
    case "webp":
      return "WebP";
    default:
      return "JPG, PNG, or WebP";
  }
}

function fileToAcceptAttr(format: NonNullable<ImageCompressorProps["inputFormat"]>): string {
  switch (format) {
    case "jpg":
    case "jpeg":
      return ".jpg,.jpeg";
    case "png":
      return ".png";
    case "webp":
      return ".webp";
    default:
      return ".jpg,.jpeg,.png,.webp";
  }
}

function isAcceptedForPage(
  file: File,
  format: NonNullable<ImageCompressorProps["inputFormat"]>
): boolean {
  const name = file.name.toLowerCase();
  if (format === "image") return true;
  if (format === "jpg" || format === "jpeg") {
    return file.type === "image/jpeg" || name.endsWith(".jpg") || name.endsWith(".jpeg");
  }
  if (format === "png") {
    return file.type === "image/png" || name.endsWith(".png");
  }
  if (format === "webp") {
    return file.type === "image/webp" || name.endsWith(".webp");
  }
  return true;
}

async function supportsWebPExport(): Promise<boolean> {
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(Boolean(blob && blob.type === "image/webp"));
    }, "image/webp", 0.8);
  });
}

const MAX_WIDTH_OPTIONS = [
  { label: "1920px", value: 1920 },
  { label: "1600px", value: 1600 },
  { label: "1200px", value: 1200 },
  { label: "800px", value: 800 },
] as const;

function buildFailureMessage(): string {
  return `This image may not compress cleanly to the selected size without heavy quality loss. Try a smaller width, a stronger compression mode, or a higher target size.`;
}

export default function ImageCompressor({
  targetKB,
  acceptedFormats,
  pageIntent,
  inputFormat,
}: ImageCompressorProps) {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<CompressToWebpResult | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [webpSupported, setWebpSupported] = useState(true);
  const [copiedFilename, setCopiedFilename] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [compressionMode, setCompressionMode] =
    useState<CompressionMode>("balanced");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [resizeEnabled, setResizeEnabled] = useState(false);
  const [maxWidth, setMaxWidth] = useState<number>(1200);
  const [customWidth, setCustomWidth] = useState("");

  const resolvedInputFormat = resolveInputFormat(inputFormat, pageIntent);
  const accept = acceptedFormats?.join(",") ?? fileToAcceptAttr(resolvedInputFormat);
  const acceptedLabel = fileToAcceptedLabel(resolvedInputFormat);

  useEffect(() => {
    supportsWebPExport().then((ok) => setWebpSupported(ok));
  }, []);

  const cleanup = useCallback(() => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    if (originalUrl) {
      URL.revokeObjectURL(originalUrl);
      setOriginalUrl(null);
    }
  }, [objectUrl, originalUrl]);

  const reset = useCallback(() => {
    cleanup();
    setFile(null);
    setResult(null);
    setError(null);
    setWarning(null);
  }, [cleanup]);

  const resolveMaxWidth = useCallback((): number | undefined => {
    if (!resizeEnabled) return undefined;
    if (customWidth) {
      const n = parseInt(customWidth, 10);
      if (isNaN(n) || n < 100) return 1200;
      return Math.min(n, 4000);
    }
    return maxWidth;
  }, [resizeEnabled, customWidth, maxWidth]);

  const handleFile = useCallback(
    async (f: File) => {
      cleanup();
      setFile(f);
      setError(null);
      setResult(null);
      setWarning(null);
      setCopiedFilename(false);

      const origUrl = URL.createObjectURL(f);
      setOriginalUrl(origUrl);

      if (!isValidImageFile(f)) {
        setError(
          "Unsupported file type. Please upload a JPG, JPEG, PNG, or WebP image."
        );
        return;
      }

      if (!isAcceptedForPage(f, resolvedInputFormat)) {
        setError(`This page is for ${acceptedLabel} images. Please choose a ${acceptedLabel} file or use the general image compressor.`);
        return;
      }

      if (isLargeFile(f)) {
        setWarning(
          `Large images with very high resolution or complex detail may need resizing to fit under ${targetKB}KB.`
        );
      }

      setCompressing(true);

      try {
        const res = await compressToWebp({
          file: f,
          targetKB,
          compressionMode,
          resizeBeforeCompress: resizeEnabled,
          maxWidth: resolveMaxWidth(),
        });

        const url = URL.createObjectURL(res.blob);
        setObjectUrl(url);
        setResult(res);

        if (!res.reachedTarget) {
          setError(buildFailureMessage());
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Compression failed. Try another image."
        );
      } finally {
        setCompressing(false);
      }
    },
    [targetKB, cleanup, compressionMode, resizeEnabled, resolveMaxWidth, resolvedInputFormat, acceptedLabel]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const f = e.dataTransfer.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => setDragOver(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  };

  const handleDownload = () => {
    if (!result || !file) return;
    const filename = slugifyFilename(file.name, targetKB);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(result.blob);
    link.download = filename;
    link.click();
  };

  const handleCopyFilename = async () => {
    if (!result || !file) return;
    const filename = slugifyFilename(file.name, targetKB);
    try {
      await navigator.clipboard.writeText(filename);
      setCopiedFilename(true);
      setTimeout(() => setCopiedFilename(false), 2000);
    } catch {
      // clipboard API not available
    }
  };

  const showDownload = result?.reachedTarget && objectUrl;
  const dimensionsChanged = result?.dimensionsChanged;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!webpSupported && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm text-center">
          Your browser does not support WebP export from canvas. Please use a
          modern browser like Chrome, Edge, Firefox, or Safari.
        </div>
      )}

      {!result && webpSupported && (
        <>
          {/* Controls — settings panel */}
          <div className="mb-5 p-4 sm:p-5 bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 w-full sm:w-auto mb-1 sm:mb-0">
                Compression mode
              </span>
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

            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors flex items-center gap-1"
            >
              {showAdvanced ? "▾" : "▸"} Advanced options
            </button>

            {showAdvanced && (
              <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-xl space-y-4">
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
                    <p className="text-xs text-zinc-400 mt-2.5">
                      Helps large images fit under {targetKB}KB with better visual results.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Dropzone — bigger and more prominent */}
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
            aria-label={`Upload image — ${acceptedLabel}`}
            className={`border-2 border-dashed rounded-2xl p-10 sm:p-12 text-center cursor-pointer transition-all ${
              dragOver
                ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 scale-[1.02]"
                : file
                ? "border-blue-300 dark:border-blue-600 bg-blue-50/30 dark:bg-blue-950/10"
                : "border-zinc-200 dark:border-zinc-600 hover:border-zinc-300 dark:hover:border-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/30"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept={accept}
              onChange={onFileChange}
              className="sr-only"
              aria-label={`Choose image file — ${acceptedLabel}`}
            />
            {file ? (
              <div>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <p className="text-lg font-semibold">{file.name}</p>
                <p className="text-sm text-zinc-500 mt-1">
                  {formatBytes(file.size)} — Click to change
                </p>
              </div>
            ) : (
              <div>
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
                <p className="text-xl font-semibold mb-2">
                  Drop your image here
                </p>
                <p className="text-sm text-zinc-500">
                  or click to browse — {acceptedLabel}
                </p>
              </div>
            )}
          </div>

          <p className="text-sm text-zinc-400 text-center mt-4 flex items-center justify-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            Your image is processed locally in your browser and never uploaded.
          </p>

          {warning && !error && !compressing && (
            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-700 dark:text-amber-300 text-sm text-center">
              {warning}
            </div>
          )}
        </>
      )}

      {compressing && (
        <div className="mt-6 text-center py-8">
          <div className="inline-block w-8 h-8 border-3 border-zinc-200 dark:border-zinc-600 border-t-blue-600 rounded-full animate-spin" />
          <p className="mt-3 text-sm text-zinc-500 font-medium">Compressing...</p>
        </div>
      )}

      {error && !compressing && (
        <div className="mt-6 p-5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm whitespace-pre-line leading-relaxed">
          {error}
        </div>
      )}

      {result && !compressing && (
        <div className="mt-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {originalUrl && (
              <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden">
                <div className="text-sm text-zinc-500 px-4 py-2 border-b border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 font-medium">
                  Original — {formatBytes(result.originalSize)}
                </div>
                <div className="p-3 flex items-center justify-center bg-repeat bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAQSURBVCJY05f5TwMDAysrCwDSRAfd5XMSBgAAAABJRU5ErkJggg==')]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={originalUrl}
                    alt="Original"
                    className="max-h-56 object-contain"
                  />
                </div>
              </div>
            )}
            {objectUrl && (
              <div className="border border-zinc-200 dark:border-zinc-700 rounded-xl overflow-hidden">
                <div className="text-sm text-emerald-600 dark:text-emerald-400 px-4 py-2 border-b border-zinc-200 dark:border-zinc-700 bg-emerald-50 dark:bg-emerald-950/20 font-medium">
                  WebP — {formatBytes(result.compressedSize)}
                </div>
                <div className="p-3 flex items-center justify-center bg-repeat bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAQSURBVCJY05f5TwMDAysrCwDSRAfd5XMSBgAAAABJRU5ErkJggg==')]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={objectUrl}
                    alt="Compressed WebP"
                    className="max-h-56 object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-300">
              WebP output
            </span>
            {dimensionsChanged ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
                Resized to fit target
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                Dimensions preserved
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-300">
              {result.savingsPercent}% smaller
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Original Size", value: formatBytes(result.originalSize) },
              { label: "Compressed Size", value: formatBytes(result.compressedSize) },
              { label: "Original Dimensions", value: `${result.originalWidth} × ${result.originalHeight}` },
              { label: "Output Dimensions", value: `${result.outputWidth} × ${result.outputHeight}` },
              { label: "Quality Used", value: `${Math.round(result.qualityUsed * 100)}%` },
              { label: "Savings", value: `${result.savingsPercent}%` },
            ].map((stat) => (
              <div key={stat.label} className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-3.5">
                <span className="block text-zinc-500 dark:text-zinc-400 text-sm">
                  {stat.label}
                </span>
                <span className="font-semibold text-base mt-0.5 block">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>

          {dimensionsChanged && (
            <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
              The image was resized slightly to keep it under the target file size.
            </p>
          )}

          {!dimensionsChanged && result.reachedTarget && (
            <p className="text-sm text-emerald-600 dark:text-emerald-400 text-center">
              Original dimensions were preserved.
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {showDownload && (
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 dark:shadow-blue-900/30"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download WebP — {formatBytes(result.compressedSize)}
              </button>
            )}
            {showDownload && (
              <button
                onClick={handleCopyFilename}
                className="inline-flex items-center gap-1.5 px-5 py-3 text-sm border border-zinc-200 dark:border-zinc-600 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-medium"
              >
                {copiedFilename ? "Copied!" : "Copy filename"}
              </button>
            )}
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 px-5 py-3 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors font-medium"
            >
              Compress another image
            </button>
          </div>

          <p className="text-sm text-zinc-400 text-center pt-1">
            All downloads are optimized WebP images. Your image is processed in your browser and never uploaded.
          </p>
        </div>
      )}
    </div>
  );
}
