"use client";

import { useState, useRef, useCallback } from "react";
import { compressToWebp, type CompressToWebpResult } from "@/lib/compressToWebp";
import { formatBytes } from "@/lib/formatBytes";
import { slugifyFilename } from "@/lib/slugify";

type ImageCompressorProps = {
  targetKB: number;
  acceptedFormats?: string[];
  pageIntent?: "general" | "webp" | "jpg-to-webp" | "png-to-webp";
};

function fileToAcceptedLabel(intent?: string): string {
  switch (intent) {
    case "jpg-to-webp":
      return "JPG or JPEG";
    case "png-to-webp":
      return "PNG";
    default:
      return "JPG, PNG, or WebP";
  }
}

function fileToAcceptAttr(intent?: string): string {
  switch (intent) {
    case "jpg-to-webp":
      return ".jpg,.jpeg";
    case "png-to-webp":
      return ".png";
    case "webp":
      return ".webp";
    default:
      return ".jpg,.jpeg,.png,.webp";
  }
}

export default function ImageCompressor({
  targetKB,
  acceptedFormats,
  pageIntent,
}: ImageCompressorProps) {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<CompressToWebpResult | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const accept = acceptedFormats?.join(",") ?? fileToAcceptAttr(pageIntent);
  const acceptedLabel = fileToAcceptedLabel(pageIntent);

  const cleanup = useCallback(() => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
  }, [objectUrl]);

  const handleFile = useCallback(
    async (f: File) => {
      cleanup();
      setFile(f);
      setError(null);
      setResult(null);
      setCompressing(true);

      try {
        const res = await compressToWebp({
          file: f,
          targetKB,
          maxKB: 100,
          preserveDimensionsFirst: true,
          minQuality: 0.1,
          maxQuality: 0.95,
        });

        const url = URL.createObjectURL(res.blob);
        setObjectUrl(url);
        setResult(res);

        if (!res.reachedTarget) {
          setError(
            `Could not compress below ${targetKB}KB. Final size: ${formatBytes(res.compressedSize)}.`
          );
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Compression failed. Try another image."
        );
      } finally {
        setCompressing(false);
      }
    },
    [targetKB, cleanup]
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

  const showDownload = result?.reachedTarget && objectUrl;
  const dimensionsChanged = result?.dimensionsChanged;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          dragOver
            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
            : "border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={onFileChange}
          className="hidden"
        />
        {file ? (
          <div>
            <p className="font-medium">{file.name}</p>
            <p className="text-sm text-zinc-500 mt-1">
              {formatBytes(file.size)} — Click to change
            </p>
          </div>
        ) : (
          <div>
            <p className="text-lg font-medium mb-1">
              Drop your image here
            </p>
            <p className="text-sm text-zinc-500">
              or click to browse — {acceptedLabel}
            </p>
          </div>
        )}
      </div>

      {compressing && (
        <div className="mt-6 text-center">
          <div className="inline-block w-6 h-6 border-2 border-zinc-300 border-t-blue-600 rounded-full animate-spin" />
          <p className="mt-2 text-sm text-zinc-500">Compressing...</p>
        </div>
      )}

      {error && !compressing && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
          {error}
        </div>
      )}

      {result && !compressing && (
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3">
              <span className="block text-zinc-500 text-xs">Original Size</span>
              <span className="font-semibold">{formatBytes(result.originalSize)}</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3">
              <span className="block text-zinc-500 text-xs">Compressed Size</span>
              <span className="font-semibold">{formatBytes(result.compressedSize)}</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3">
              <span className="block text-zinc-500 text-xs">Original Dimensions</span>
              <span className="font-semibold">
                {result.originalWidth} × {result.originalHeight}
              </span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3">
              <span className="block text-zinc-500 text-xs">Output Dimensions</span>
              <span className="font-semibold">
                {result.outputWidth} × {result.outputHeight}
              </span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3">
              <span className="block text-zinc-500 text-xs">Quality Used</span>
              <span className="font-semibold">{Math.round(result.qualityUsed * 100)}%</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3">
              <span className="block text-zinc-500 text-xs">Savings</span>
              <span className="font-semibold">{result.savingsPercent}%</span>
            </div>
          </div>

          {dimensionsChanged && (
            <p className="text-sm text-amber-600 dark:text-amber-400 text-center">
              We resized the image slightly to keep it under the target file size.
            </p>
          )}

          {!dimensionsChanged && result.reachedTarget && (
            <p className="text-sm text-green-600 dark:text-green-400 text-center">
              We preserve original dimensions when possible.
            </p>
          )}

          {showDownload && (
            <div className="text-center">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
              >
                Download WebP — {formatBytes(result.compressedSize)}
              </button>
            </div>
          )}

          <p className="text-xs text-zinc-400 text-center mt-2">
            Your image is processed in your browser and never uploaded.
          </p>
        </div>
      )}
    </div>
  );
}
