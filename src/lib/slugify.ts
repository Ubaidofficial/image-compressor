export function slugifyFilename(filename: string, targetKB: number): string {
  const dotIndex = filename.lastIndexOf(".");
  const nameWithoutExt = dotIndex > 0 ? filename.substring(0, dotIndex) : filename;

  const slug = nameWithoutExt
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  const safeSlug = slug || "image";
  return `${safeSlug}-compressed-to-${targetKB}kb.webp`;
}
