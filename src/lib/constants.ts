export const MAX_OUTPUT_KB = 100;
export const ALLOWED_TARGETS_KB = [20, 30, 50, 75, 100] as const;
export const MAX_UPLOAD_BYTES = 20 * 1024 * 1024; // 20MB
export const MAX_UPLOAD_MB = 20;

export const INDEXABLE_ROUTES = [
  "/",
  "/image-compressor",
  "/webp-image-compressor",
  "/compress-image-to-50kb",
  "/compress-image-to-100kb",
  "/webp-compress-image-to-100kb",
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
