import type { FaqItem } from "@/components/FAQ";
import {
  imageInfo,
  kbText,
  modeRunFor,
  runFor,
  type ImageKey,
  type Run,
} from "@/components/SizeEvidence";

/**
 * Written content for the indexable size pages (issue #3 follow-up).
 *
 * Each page here gets its own intro, evidence observations, FAQ and extra
 * sections; nothing in this file is shared between pages. Observations that
 * quote numbers read them from src/data/sizeEvidence.json, so re-running
 * scripts/measure-size-evidence.mjs keeps the figures current. The wording
 * around them was written against the 2026-11-26 run: if a re-run flips a
 * pass/fail outcome, re-read the observations for that page.
 *
 * Pages not listed here (the consolidated, noindexed variants) keep the
 * generic template.
 */

export type EvidenceKind =
  | { kind: "formats"; kb: number }
  | { kind: "modes"; kb: number }
  | { kind: "ladder"; keys: ImageKey[] }
  | { kind: "batch"; targets: number[] };

export type SizePageContent = {
  intro: string[];
  evidenceHeading: string;
  evidence: EvidenceKind;
  observations: string[];
  /** Target used to look up official use cases; defaults to the page target. */
  useCaseKb?: number;
  useCaseHeading?: string;
  /** Omit to hide the use-case section (e.g. no official form at this size). */
  useCaseNote?: string;
  sections?: Array<{ heading: string; paragraphs: string[] }>;
  faqHeading?: string;
  faqs: FaqItem[];
};

/* Small helpers for quoting measured numbers in prose. */
const j = (kb: number, key: ImageKey) => runFor(kb, key, "jpeg");
const w = (kb: number, key: ImageKey) => runFor(kb, key, "webp");
const px = (r: Run) => `${r.outputWidth} × ${r.outputHeight} px`;
const longSide = (r: Run) => Math.max(r.outputWidth, r.outputHeight);
const pct = (r: Run, key: ImageKey) => {
  const img = imageInfo(key);
  return Math.round((longSide(r) / Math.max(img.width, img.height)) * 100);
};
const q = (r: Run) => r.quality.toFixed(2);

const CONTENT: Record<string, SizePageContent> = {};

export function getSizePageContent(slug: string): SizePageContent | undefined {
  return CONTENT[slug];
}

export { CONTENT as SIZE_PAGE_CONTENT, j, w, px, longSide, pct, q, modeRunFor, kbText };
