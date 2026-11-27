"use client";

import { useEffect, useRef, useState } from "react";
import {
  allChecksPass,
  byteLimits,
  resizeToSpec,
  SpecUnreachableError,
  type FitMode,
  type ResizeToSpecResult,
} from "@/lib/resizeToSpec";
import { isLargeFile, isValidImageFile, MAX_UPLOAD_MB } from "@/lib/constants";
import { KIND_LABEL, type UploadPreset } from "@/data/uploadSpecs";

type PresetResizerProps = {
  presets: UploadPreset[];
  /** Accessible name for the tool region. */
  title: string;
};

function kb(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function CheckRow({ ok, label, detail }: { ok: boolean; label: string; detail: string }) {
  return (
    <li className="flex items-start gap-3 py-2">
      <span
        aria-hidden="true"
        className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
          ok
            ? "bg-green-100 text-green-700 dark:bg-emerald-900/50 dark:text-emerald-300"
            : "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
        }`}
      >
        {ok ? "✓" : "✗"}
      </span>
      <span className="text-sm">
        <span className="font-medium">{label}</span>{" "}
        <span className="text-zinc-500 dark:text-zinc-400">{detail}</span>
        <span className="sr-only">{ok ? " (meets requirement)" : " (does not meet requirement)"}</span>
      </span>
    </li>
  );
}

export default function PresetResizer({ presets, title }: PresetResizerProps) {
  const [presetId, setPresetId] = useState(presets[0]?.id);
  const preset = presets.find((p) => p.id === presetId) ?? presets[0];
  const [fit, setFit] = useState<FitMode>(preset.defaultFit);
  const [file, setFile] = useState<File | null>(null);
  const [output, setOutput] = useState<{ result: ResizeToSpecResult; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [trim, setTrim] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const runId = useRef(0);
  const currentUrl = useRef<string | null>(null);
  const result = output?.result ?? null;
  const previewUrl = output?.url ?? null;

  // Only a spec with required dimensions can force a shape change.
  const shapeConstrained = preset.dimensionsOfficial;

  // Release the last preview URL when the component unmounts.
  useEffect(() => () => {
    if (currentUrl.current) URL.revokeObjectURL(currentUrl.current);
  }, []);

  function showOutput(next: { result: ResizeToSpecResult; url: string } | null) {
    if (currentUrl.current) URL.revokeObjectURL(currentUrl.current);
    currentUrl.current = next?.url ?? null;
    setOutput(next);
  }

  async function run(input: File | null, target: UploadPreset, mode: FitMode, trimInk: boolean) {
    if (!input) return;
    const id = ++runId.current;
    setBusy(true);
    setError(null);
    try {
      const made = await resizeToSpec(input, target.spec, mode, {
        trimToInk: target.kind !== "photo" && trimInk,
      });
      if (id !== runId.current) return;
      showOutput({ result: made, url: URL.createObjectURL(made.blob) });
    } catch (err) {
      if (id !== runId.current) return;
      showOutput(null);
      setError(
        err instanceof SpecUnreachableError
          ? err.message
          : "This image could not be read. Try a JPG or PNG file."
      );
    } finally {
      if (id === runId.current) setBusy(false);
    }
  }

  function choosePreset(next: UploadPreset) {
    setPresetId(next.id);
    setFit(next.defaultFit);
    void run(file, next, next.defaultFit, trim);
  }

  function chooseFit(next: FitMode) {
    setFit(next);
    void run(file, preset, next, trim);
  }

  function chooseTrim(next: boolean) {
    setTrim(next);
    void run(file, preset, fit, next);
  }

  function onFile(list: FileList | null) {
    const picked = list?.[0];
    if (!picked) return;
    if (!isValidImageFile(picked)) {
      setError("Please choose a JPG, PNG or WebP image.");
      return;
    }
    if (isLargeFile(picked)) {
      setError(`Please choose an image under ${MAX_UPLOAD_MB} MB.`);
      return;
    }
    setFile(picked);
    void run(picked, preset, fit, trim);
  }

  const { minBytes, maxBytes } = byteLimits(preset.spec);

  return (
    <section aria-label={title} className="space-y-6">
      <fieldset>
        <legend className="text-sm font-semibold mb-3">1. Choose a preset</legend>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => {
            const active = p.id === preset.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={active}
                onClick={() => choosePreset(p)}
                className={`px-4 py-2.5 rounded-xl border-2 text-sm font-semibold motion-safe:transition-colors ${
                  active
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-700"
                }`}
              >
                {p.label}
                <span className={`block text-xs font-normal ${active ? "text-blue-100" : "text-zinc-500 dark:text-zinc-400"}`}>
                  JPG, {p.spec.minKB}-{p.spec.maxKB} KB
                  {fixedDims(p) ? `, ${p.spec.widthPx.min}×${p.spec.heightPx.min} px` : ""}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <p className="text-sm font-semibold mb-3">2. Choose your image</p>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            onFile(e.dataTransfer.files);
          }}
          className="w-full rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700 px-6 py-10 text-center hover:border-blue-400 dark:hover:border-blue-600 motion-safe:transition-colors"
        >
          <span className="block font-semibold">
            {file ? file.name : `Select a ${KIND_LABEL[preset.kind]} image`}
          </span>
          <span className="block text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            JPG, PNG or WebP. Processed on your device, never uploaded.
          </span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          className="sr-only"
          aria-label={`Select a ${KIND_LABEL[preset.kind]} image`}
          onChange={(e) => onFile(e.target.files)}
        />
      </div>

      {shapeConstrained && (
        <fieldset>
          <legend className="text-sm font-semibold mb-2">If the shape does not match</legend>
          <div className="flex flex-wrap gap-4 text-sm">
            <label className="inline-flex items-center gap-2">
              <input type="radio" name={`fit-${title}`} checked={fit === "fit"} onChange={() => chooseFit("fit")} />
              Fit whole image (adds white margins)
            </label>
            <label className="inline-flex items-center gap-2">
              <input type="radio" name={`fit-${title}`} checked={fit === "crop"} onChange={() => chooseFit("crop")} />
              Crop to fill (trims the edges)
            </label>
          </div>
        </fieldset>
      )}

      {preset.kind !== "photo" && (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={trim} onChange={(e) => chooseTrim(e.target.checked)} />
          Trim blank paper around the ink so it fills the image
        </label>
      )}

      <div aria-live="polite">
        {busy && <p className="text-sm text-zinc-500 dark:text-zinc-400">Resizing…</p>}
        {error && (
          <p role="alert" className="rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 px-4 py-3 text-sm text-red-700 dark:text-red-300">
            {error}
          </p>
        )}
        {result && previewUrl && !busy && (
          <div className="grid gap-6 sm:grid-cols-[auto_1fr] items-start rounded-2xl border border-zinc-200 dark:border-zinc-800 p-5">
            {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview */}
            <img
              src={previewUrl}
              alt={`Resized ${KIND_LABEL[preset.kind]} preview`}
              width={result.width}
              height={result.height}
              className="max-h-64 w-auto max-w-full border border-zinc-200 dark:border-zinc-700 bg-white"
            />
            <div>
              <p className="font-semibold mb-1">
                {allChecksPass(result.checks) ? "Ready to upload" : "Does not meet the requirement"}
              </p>
              <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                <CheckRow ok={result.checks.format} label="Format:" detail="JPG" />
                <CheckRow
                  ok={result.checks.dimensions}
                  label="Dimensions:"
                  detail={`${result.width} × ${result.height} px (required: ${preset.dimensionsText})`}
                />
                <CheckRow
                  ok={result.checks.minSize && result.checks.maxSize}
                  label="File size:"
                  detail={`${kb(result.bytes)} (required: ${preset.spec.minKB}-${preset.spec.maxKB} KB; kept between ${kb(minBytes)} and ${kb(maxBytes)} so it passes whether the portal counts 1 KB as 1,000 or 1,024 bytes)`}
                />
              </ul>
              {result.padded && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                  This image is very plain, so it was below {preset.spec.minKB} KB even at maximum
                  quality. A blank comment block was added inside the JPG to reach the minimum
                  size. The picture itself is unchanged.
                </p>
              )}
              {preset.manualChecks.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium">Check yourself before uploading:</p>
                  <ul className="list-disc pl-5 text-sm text-zinc-600 dark:text-zinc-300 space-y-1 mt-1">
                    {preset.manualChecks.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {allChecksPass(result.checks) && (
                <a
                  href={previewUrl}
                  download={preset.downloadName}
                  className="mt-4 inline-flex items-center px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 motion-safe:transition-colors"
                >
                  Download {preset.downloadName}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function fixedDims(p: UploadPreset): boolean {
  return p.spec.widthPx.min === p.spec.widthPx.max && p.spec.heightPx.min === p.spec.heightPx.max;
}
