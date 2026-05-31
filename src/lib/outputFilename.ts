export type BulkFilenameMode = "seo-friendly" | "keep-original" | "append-100kb";

function sanitizeBaseName(raw: string): string {
  const dotIndex = raw.lastIndexOf(".");
  const base = dotIndex > 0 ? raw.substring(0, dotIndex) : raw;
  return base.replace(/[^a-zA-Z0-9 _-]/g, "").replace(/\s+/g, " ").trim();
}

export function generateBulkFilename(
  originalFilename: string,
  targetKB: number,
  mode: BulkFilenameMode
): string {
  const base = sanitizeBaseName(originalFilename) || "image";

  switch (mode) {
    case "keep-original":
      return `${base}.webp`;
    case "append-100kb":
      return `${base}-${targetKB}kb.webp`;
    case "seo-friendly":
    default: {
      const slug = base
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
      const safe = slug || "image";
      return `${safe}-compressed-to-${targetKB}kb.webp`;
    }
  }
}

function getBaseName(filename: string): string {
  const dotIndex = filename.lastIndexOf(".");
  return dotIndex > 0 ? filename.substring(0, dotIndex) : filename;
}

export function deduplicateFilenames(filenames: string[]): string[] {
  const seen = new Map<string, number>();
  return filenames.map((name) => {
    const base = getBaseName(name);
    const ext = ".webp";
    const key = name;
    const count = seen.get(key) || 0;
    seen.set(key, count + 1);
    if (count === 0) return name;
    return `${base}-${count + 1}${ext}`;
  });
}

export function generateReportCsv(
  rows: {
    originalFilename: string;
    outputFilename: string;
    originalSizeKb: string;
    compressedSizeKb: string;
    originalDimensions: string;
    outputDimensions: string;
    status: "success" | "failed";
  }[]
): string {
  const header =
    "original_filename,output_filename,original_size_kb,compressed_size_kb,original_dimensions,output_dimensions,status";
  const lines = rows.map((r) =>
    [
      csvEscape(r.originalFilename),
      csvEscape(r.outputFilename),
      r.originalSizeKb,
      r.compressedSizeKb,
      r.originalDimensions,
      r.outputDimensions,
      r.status,
    ].join(",")
  );
  return [header, ...lines].join("\n");
}

function csvEscape(val: string): string {
  if (val.includes(",") || val.includes('"') || val.includes("\n")) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}
