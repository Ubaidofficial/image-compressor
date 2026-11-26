import Link from "next/link";
import evidence from "@/data/sizeEvidence.json";
import { SSC_SOURCES, SSC_VERIFIED_ON, UPSC_VERIFIED_ON, sscPresets, upscPresets } from "@/data/uploadSpecs";

/**
 * Measured results and official use cases for the indexable size pages.
 * Numbers come from src/data/sizeEvidence.json, produced by
 * scripts/measure-size-evidence.mjs running the site's own compressor.
 * Table cells are deliberately terse: the prose that interprets them is
 * written per page in src/data/sizePageContent.ts.
 */

export type Run = {
  outputWidth: number;
  outputHeight: number;
  outputBytes: number;
  quality: number;
  reachedTarget: boolean;
};
export type ImageKey = "portrait" | "document" | "signature" | "screenshot" | "landscape";
export type ImageInfo = {
  key: ImageKey;
  label: string;
  detail: string;
  type: string;
  bytes: number;
  width: number;
  height: number;
};
export type Mode = "best-quality" | "balanced" | "smallest-file";

type Evidence = {
  measuredOn: string;
  browser: string;
  images: ImageInfo[];
  byTarget: Record<string, Record<ImageKey, Record<"jpeg" | "webp", Run>>>;
  byMode: Record<string, Record<ImageKey, Record<Mode, Run>>>;
};

export const EVIDENCE = evidence as unknown as Evidence;

export function runFor(kb: number, key: ImageKey, format: "jpeg" | "webp"): Run {
  return EVIDENCE.byTarget[String(kb)][key][format];
}
export function modeRunFor(kb: number, key: ImageKey, mode: Mode): Run {
  return EVIDENCE.byMode[String(kb)][key][mode];
}
export function imageInfo(key: ImageKey): ImageInfo {
  return EVIDENCE.images.find((img) => img.key === key)!;
}

export function kbText(bytes: number): string {
  return `${(bytes / 1024).toFixed(1)} KB`;
}
function dims(w: number, h: number): string {
  return `${w}×${h}`;
}
function sizeLabel(kb: number): string {
  return kb === 1024 ? "1 MB" : `${kb} KB`;
}

const thClass = "text-left py-3 px-4 font-semibold text-zinc-700 dark:text-zinc-300 align-bottom";
const tdClass = "py-3 px-4 text-zinc-600 dark:text-zinc-400 align-top whitespace-nowrap";

function RunCell({ run }: { run: Run }) {
  return (
    <td className={tdClass}>
      <span className={run.reachedTarget ? "text-emerald-700 dark:text-emerald-400 font-medium" : "text-red-700 dark:text-red-400 font-medium"}>
        {run.reachedTarget ? "✓ " : "✗ "}
        {kbText(run.outputBytes)}
      </span>
      <span className="block text-xs">
        {dims(run.outputWidth, run.outputHeight)} px · q {run.quality.toFixed(2)}
      </span>
    </td>
  );
}

function TableShell({ caption, head, children }: { caption: string; head: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm border-collapse">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-zinc-50 dark:bg-zinc-900">
          <tr>
            {head.map((h) => (
              <th key={h} scope="col" className={thClass}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">{children}</tbody>
      </table>
    </div>
  );
}

function ImageHeader({ img }: { img: ImageInfo }) {
  return (
    <th scope="row" className="py-3 px-4 text-left align-top font-medium text-zinc-800 dark:text-zinc-200">
      {img.label}
      <span className="block text-xs font-normal text-zinc-500">
        {dims(img.width, img.height)} · {kbText(img.bytes)} {img.type === "image/png" ? "PNG" : "JPG"}
      </span>
    </th>
  );
}

/** JPG vs WebP for every test image at one target. */
export function FormatEvidenceTable({ kb }: { kb: number }) {
  return (
    <TableShell caption={`Measured results at ${sizeLabel(kb)}, JPG and WebP output`} head={["Test image", `JPG at ${sizeLabel(kb)}`, `WebP at ${sizeLabel(kb)}`]}>
      {EVIDENCE.images.map((img) => (
        <tr key={img.key}>
          <ImageHeader img={img} />
          <RunCell run={runFor(kb, img.key, "jpeg")} />
          <RunCell run={runFor(kb, img.key, "webp")} />
        </tr>
      ))}
    </TableShell>
  );
}

/** The three compression modes, JPG output, at one target. */
export function ModeEvidenceTable({ kb }: { kb: number }) {
  const modes: Array<[Mode, string]> = [
    ["best-quality", "Best Quality"],
    ["balanced", "Balanced"],
    ["smallest-file", "Smallest File"],
  ];
  return (
    <TableShell caption={`Compression modes compared at ${sizeLabel(kb)}, JPG output`} head={["Test image", ...modes.map(([, l]) => l)]}>
      {EVIDENCE.images.map((img) => (
        <tr key={img.key}>
          <ImageHeader img={img} />
          {modes.map(([mode]) => (
            <RunCell key={mode} run={modeRunFor(kb, img.key, mode)} />
          ))}
        </tr>
      ))}
    </TableShell>
  );
}

/** One image across every target, JPG output: how size budgets scale. */
export function LadderEvidenceTable({ keys }: { keys: ImageKey[] }) {
  const targets = Object.keys(EVIDENCE.byTarget).map(Number).sort((a, b) => a - b);
  return (
    <TableShell caption="JPG results for each KB target" head={["Target", ...keys.map((k) => imageInfo(k).label)]}>
      {targets.map((kb) => (
        <tr key={kb}>
          <th scope="row" className="py-3 px-4 text-left font-medium">{sizeLabel(kb)}</th>
          {keys.map((k) => (
            <RunCell key={k} run={runFor(kb, k, "jpeg")} />
          ))}
        </tr>
      ))}
    </TableShell>
  );
}

/** The whole test set as one batch at a few targets (bulk page, WebP output). */
export function BatchEvidenceTable({ targets }: { targets: number[] }) {
  const originalTotal = EVIDENCE.images.reduce((sum, img) => sum + img.bytes, 0);
  return (
    <TableShell caption="The five test images as one batch, WebP output" head={["Batch target", "Files that fit", "Batch size after", "Largest output"]}>
      {targets.map((kb) => {
        const runs = EVIDENCE.images.map((img) => runFor(kb, img.key, "webp"));
        const fit = runs.filter((r) => r.reachedTarget).length;
        const total = runs.reduce((s, r) => s + r.outputBytes, 0);
        const largest = Math.max(...runs.map((r) => r.outputBytes));
        return (
          <tr key={kb}>
            <th scope="row" className="py-3 px-4 text-left font-medium">{sizeLabel(kb)} each</th>
            <td className={tdClass}>{fit} of {runs.length}</td>
            <td className={tdClass}>{kbText(total)} <span className="text-xs">(from {kbText(originalTotal)})</span></td>
            <td className={tdClass}>{kbText(largest)}</td>
          </tr>
        );
      })}
    </TableShell>
  );
}

/** Shared method note: the same on every page by design, so it is marked shared. */
export function EvidenceMethodNote() {
  return (
    <p data-boilerplate="shared" className="mt-3 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
      Measured {EVIDENCE.measuredOn} in {EVIDENCE.browser}{" "}with this site&apos;s compressor
      (Balanced mode unless shown otherwise, no pre-resize). The five test images are synthetic,
      generated by a script so no third-party photos are used; the script and raw results are
      in the repository (scripts/measure-size-evidence.mjs, src/data/sizeEvidence.json).
      ✓ = at or under the target; q = encoder quality used.
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Official use cases (from src/data/uploadSpecs.ts only)              */
/* ------------------------------------------------------------------ */

type UseCase = {
  form: string;
  file: string;
  range: string;
  href: string;
  source: { url: string; label: string };
  checked: string;
};

const USE_CASES: Array<UseCase & { minKB: number; maxKB: number }> = [
  ...sscPresets.map((p) => ({
    form: "SSC exams (2026 notices)",
    file: "Signature",
    range: `${p.spec.minKB}–${p.spec.maxKB} KB JPG, ${p.spec.widthPx.min}×${p.spec.heightPx.min} px`,
    href: "/ssc-photo-signature-resize",
    source: { url: SSC_SOURCES[0].url, label: "SSC notice PDF" },
    checked: SSC_VERIFIED_ON,
    minKB: p.spec.minKB,
    maxKB: p.spec.maxKB,
  })),
  ...upscPresets.map((p) => ({
    form: "UPSC online application",
    file: p.kind === "photo" ? "Photo" : "Signature (three)",
    range: `${p.spec.minKB}–${p.spec.maxKB} KB JPG${p.dimensionsOfficial ? ", 350–500 px" : ""}`,
    href: "/upsc-photo-signature-resize",
    source: { url: p.source!.url, label: "UPSC portal PDF" },
    checked: UPSC_VERIFIED_ON,
    minKB: p.spec.minKB,
    maxKB: p.spec.maxKB,
  })),
];

/** Official upload limits a file compressed to `kb` falls inside. */
export function officialUseCasesFor(kb: number): UseCase[] {
  return USE_CASES.filter((u) => kb >= u.minKB && kb <= u.maxKB);
}

export function UseCaseTable({ kb }: { kb: number }) {
  const rows = officialUseCasesFor(kb);
  if (!rows.length) return null;
  return (
    <TableShell caption={`Official upload limits that a ${sizeLabel(kb)} file fits`} head={["Form", "File", "Official limit", "Source", "Preset"]}>
      {rows.map((u) => (
        <tr key={u.form + u.file}>
          <td className={tdClass}>{u.form}</td>
          <td className={tdClass}>{u.file}</td>
          <td className={tdClass}>{u.range}</td>
          <td className={tdClass}>
            <a href={u.source.url} rel="nofollow noopener" target="_blank" className="underline">{u.source.label}</a>
            <span className="block text-xs">checked {u.checked}</span>
          </td>
          <td className={tdClass}>
            <Link href={u.href} className="underline">Open preset</Link>
          </td>
        </tr>
      ))}
    </TableShell>
  );
}
