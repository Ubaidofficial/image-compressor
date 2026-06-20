export const MAX_OUTPUT_KB = 1024;
export const ALLOWED_TARGETS_KB = [
  10,
  20,
  30,
  40,
  50,
  60,
  75,
  80,
  100,
  150,
  200,
  300,
  500,
  1024,
] as const;
export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024; // 20MB
export const MAX_UPLOAD_MB = 20;

// SEO rollout plan:
// day-1: submit only the strongest 5 pages for a brand-new domain
// batch-2: after a few days, add PNG/Image/WebP/50KB pages
// full: after initial crawl/indexing, add remaining trust and focused PSEO pages
// To expand indexing, change SEO_LAUNCH_STAGE from "day-1" to "batch-2" or "full".
export type SeoLaunchStage = "day-1" | "batch-2" | "full";
export const SEO_LAUNCH_STAGE: SeoLaunchStage = "day-1";

export const DAY_1_INDEXABLE_ROUTES = [
  "/",
  "/image-compressor",
  "/bulk-image-to-webp",
  "/compress-image-to-100kb",
  "/jpg-to-webp",
] as const;

export const NEXT_BATCH_INDEXABLE_ROUTES = [
  "/png-to-webp",
  "/image-to-webp",
  "/webp-image-compressor",
  "/compress-image-to-50kb",
] as const;

export const FINAL_BATCH_INDEXABLE_ROUTES = [
  "/webp-compress-image-to-100kb",
  "/privacy",
  "/terms",
  "/contact",
] as const;
export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];
export const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp"];

export function clampTargetKB(value: number): number {
  return Math.min(value, MAX_OUTPUT_KB);
}

export function isValidImageFile(file: File): boolean {
  return (
    ALLOWED_MIME_TYPES.includes(file.type) ||
    ALLOWED_EXTENSIONS.some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    )
  );
}

export function isLargeFile(file: File): boolean {
  return file.size > MAX_UPLOAD_BYTES;
}
