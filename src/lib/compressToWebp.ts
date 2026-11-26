import { clampTargetKB, MAX_OUTPUT_KB } from "./constants";

export type CompressionMode = "best-quality" | "balanced" | "smallest-file";

/** Encoded output. JPG is what most application/exam portals accept. */
export type OutputFormat = "webp" | "jpeg";

export const OUTPUT_FORMAT_CONFIG: Record<OutputFormat, { label: string; mime: string; ext: string }> = {
  jpeg: { label: "JPG", mime: "image/jpeg", ext: "jpg" },
  webp: { label: "WebP", mime: "image/webp", ext: "webp" },
};

export const COMPRESSION_MODE_CONFIG = {
  "best-quality": {
    label: "Best Quality",
    description:
      "Prioritizes image quality: never below 30% quality or 80% of the original size, so very small targets may not fit.",
  },
  balanced: {
    label: "Balanced",
    description:
      "Recommended. Keeps full size if it fits, otherwise shrinks the dimensions step by step until it does.",
  },
  "smallest-file": {
    label: "Smallest File",
    description:
      "Uses stronger compression and resizes earlier if needed.",
  },
} as const;

export type CompressToWebpOptions = {
  file: File;
  targetKB: number;
  maxKB?: number;
  preserveDimensionsFirst?: boolean;
  minQuality?: number;
  maxQuality?: number;
  maxIterations?: number;
  compressionMode?: CompressionMode;
  resizeBeforeCompress?: boolean;
  maxWidth?: number;
  /** Defaults to WebP, the original behaviour. */
  outputFormat?: OutputFormat;
};

export type CompressToWebpResult = {
  blob: Blob;
  file: File;
  originalSize: number;
  compressedSize: number;
  originalWidth: number;
  originalHeight: number;
  outputWidth: number;
  outputHeight: number;
  qualityUsed: number;
  targetKB: number;
  reachedTarget: boolean;
  dimensionsChanged: boolean;
  savingsPercent: number;
  outputFormat: OutputFormat;
  /**
   * Why the target was missed, when it was. `quality-floor`: the mode's
   * lowest quality at its smallest allowed size is still too big (Best
   * Quality and Smallest File stop here by design). `min-dimensions`:
   * Balanced shrank down to MIN_LONG_SIDE_PX and still could not fit.
   * Null when the target was reached.
   */
  limit: CompressionLimit | null;
  /** Long side, in px, of the smallest size this mode was allowed to try. */
  smallestLongSideTried: number;
  /** Lowest quality this mode will encode at (0–1). */
  qualityFloor: number;
};

export type CompressionLimit = "quality-floor" | "min-dimensions";

/**
 * Balanced keeps shrinking until the long side reaches this many pixels.
 * Smaller than this and photos and documents stop being legible; exam
 * photo specs (e.g. SSC, UPSC) are larger than this anyway.
 */
export const MIN_LONG_SIDE_PX = 240;

/** Factor between Balanced's extra steps once it is below half size. */
const BALANCED_EXTRA_STEP = 0.85;

const SCALE_STEPS_BALANCED = [
  0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5,
];

const SCALE_STEPS_BEST = [0.98, 0.95, 0.92, 0.9, 0.88, 0.85, 0.8];

const SCALE_STEPS_SMALLEST = [
  0.85, 0.75, 0.65, 0.55, 0.45, 0.4, 0.35, 0.3, 0.25,
];

function getModeDefaults(mode: CompressionMode) {
  switch (mode) {
    case "best-quality":
      return {
        minQuality: 0.3,
        maxQuality: 0.97,
        scaleSteps: SCALE_STEPS_BEST,
        preserveDimensionsFirst: true,
      };
    case "smallest-file":
      return {
        minQuality: 0.05,
        maxQuality: 0.85,
        scaleSteps: SCALE_STEPS_SMALLEST,
        preserveDimensionsFirst: false,
      };
    default:
      return {
        minQuality: 0.1,
        maxQuality: 0.95,
        scaleSteps: SCALE_STEPS_BALANCED,
        preserveDimensionsFirst: true,
      };
  }
}

/**
 * Balanced's fixed steps stop at half size. Below that, keep going in
 * BALANCED_EXTRA_STEP increments, ending exactly at MIN_LONG_SIDE_PX.
 * Images already small enough are not shrunk past the fixed steps.
 */
export function balancedScaleSteps(longSide: number): number[] {
  const steps = [...SCALE_STEPS_BALANCED];
  const minScale = MIN_LONG_SIDE_PX / longSide;
  let scale = steps[steps.length - 1];
  if (scale <= minScale) return steps;
  for (;;) {
    scale *= BALANCED_EXTRA_STEP;
    if (scale <= minScale) break;
    steps.push(scale);
  }
  steps.push(minScale);
  return steps;
}

/**
 * Plain-language reason a result missed its target, naming the mode's limit
 * and the next thing to try. Null when the target was reached.
 */
export function describeMiss(
  result: CompressToWebpResult,
  mode: CompressionMode
): string | null {
  if (result.reachedTarget) return null;
  const got = Math.ceil(result.compressedSize / 1024);
  const size = `${result.outputWidth} × ${result.outputHeight} px`;
  const floor = `${Math.round(result.qualityFloor * 100)}%`;
  switch (mode) {
    case "best-quality":
      return `Best Quality will not go below ${floor} quality or shrink the image below 80% of its size. At that limit (${size}) it is still ${got}KB, over ${result.targetKB}KB. Switch to Balanced or Smallest File, which reduce the dimensions further.`;
    case "smallest-file":
      return `Even at ${size} and ${floor} quality, Smallest File could only get this image to ${got}KB, over ${result.targetKB}KB. This image has too much fine detail for the target; try a higher target size.`;
    default:
      return `Balanced reduced this image to ${size}, about as small as it can go and still be usable, at ${floor} quality, and it is still ${got}KB, over ${result.targetKB}KB. Try Smallest File or a higher target size.`;
  }
}

function blobToFile(blob: Blob, filename: string, format: OutputFormat): File {
  return new File([blob], filename, { type: OUTPUT_FORMAT_CONFIG[format].mime });
}

async function canvasToBlob(
  canvas: HTMLCanvasElement,
  quality: number,
  format: OutputFormat
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("Canvas toBlob returned null"));
      },
      OUTPUT_FORMAT_CONFIG[format].mime,
      quality
    );
  });
}

async function encodeAtQuality(
  source: ImageBitmap | HTMLImageElement,
  width: number,
  height: number,
  quality: number,
  format: OutputFormat
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context");
  if (format === "jpeg") {
    // JPG has no transparency; without a fill, transparent PNG areas turn black.
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(source, 0, 0, width, height);
  return canvasToBlob(canvas, quality, format);
}

async function binarySearchQuality(
  source: ImageBitmap | HTMLImageElement,
  width: number,
  height: number,
  targetBytes: number,
  minQ: number,
  maxQ: number,
  format: OutputFormat
): Promise<{ blob: Blob; quality: number } | null> {
  let lo = minQ;
  let hi = maxQ;
  let best: { blob: Blob; quality: number } | null = null;

  for (let i = 0; i < 12; i++) {
    const mid = (lo + hi) / 2;
    const blob = await encodeAtQuality(source, width, height, mid, format);

    if (blob.size <= targetBytes) {
      if (!best || mid > best.quality) {
        best = { blob, quality: mid };
      }
      lo = mid;
    } else {
      hi = mid;
    }

    if (hi - lo < 0.01) break;
  }

  if (best) {
    best.quality = Math.round(best.quality * 100) / 100;
  }
  return best;
}

export async function compressToWebp(
  options: CompressToWebpOptions
): Promise<CompressToWebpResult> {
  const {
    file,
    targetKB: rawTargetKB,
    compressionMode = "balanced",
    resizeBeforeCompress = false,
    maxWidth,
    outputFormat = "webp",
  } = options;

  const modeDefaults = getModeDefaults(compressionMode);

  const targetKB = clampTargetKB(rawTargetKB);
  const targetBytes = targetKB * 1024;
  const maxBytes = MAX_OUTPUT_KB * 1024;

  const originalSize = file.size;

  const img = await createImageBitmap(file);
  const originalWidth = img.width;
  const originalHeight = img.height;

  // Apply pre-compression resize if enabled
  let effectiveWidth = originalWidth;
  let effectiveHeight = originalHeight;
  let preResizedDimensionsChanged = false;

  if (resizeBeforeCompress && maxWidth && originalWidth > maxWidth) {
    const ratio = maxWidth / originalWidth;
    effectiveWidth = maxWidth;
    effectiveHeight = Math.round(originalHeight * ratio);
    preResizedDimensionsChanged = effectiveWidth !== originalWidth || effectiveHeight !== originalHeight;
  }

  let bestBlob: Blob | null = null;
  let bestQuality = 0;
  let outputWidth = effectiveWidth;
  let outputHeight = effectiveHeight;
  /** Smallest encode seen, returned if nothing fits so the user sees how close it got. */
  let smallest: { blob: Blob; width: number; height: number } | null = null;

  /**
   * Highest quality under target at this size, or null. One probe at the
   * quality floor first: if even that is too big, skip the binary search.
   */
  const tryAt = async (w: number, h: number) => {
    const floor = await encodeAtQuality(img, w, h, modeDefaults.minQuality, outputFormat);
    if (!smallest || floor.size < smallest.blob.size) {
      smallest = { blob: floor, width: w, height: h };
    }
    if (floor.size > targetBytes) return null;
    const result = await binarySearchQuality(
      img,
      w,
      h,
      targetBytes,
      modeDefaults.minQuality,
      modeDefaults.maxQuality,
      outputFormat
    );
    // The search never probes exactly at the floor; fall back to the probe.
    return result ?? { blob: floor, quality: modeDefaults.minQuality };
  };

  // Try with effective dimensions first
  if (modeDefaults.preserveDimensionsFirst) {
    const result = await tryAt(effectiveWidth, effectiveHeight);
    if (result) {
      bestBlob = result.blob;
      bestQuality = result.quality;
    }
  }

  const scaleSteps =
    compressionMode === "balanced"
      ? balancedScaleSteps(Math.max(effectiveWidth, effectiveHeight))
      : modeDefaults.scaleSteps;

  // Scale down if initial dimensions didn't produce a result
  if (!bestBlob) {
    for (const scale of scaleSteps) {
      const w = Math.max(1, Math.round(effectiveWidth * scale));
      const h = Math.max(1, Math.round(effectiveHeight * scale));

      const result = await tryAt(w, h);

      if (result) {
        bestBlob = result.blob;
        bestQuality = result.quality;
        outputWidth = w;
        outputHeight = h;
        break;
      }
    }
  }

  // Nothing fit: return the smallest attempt at the mode's quality floor.
  let limit: CompressionLimit | null = null;
  if (!bestBlob) {
    const fallback = smallest as { blob: Blob; width: number; height: number } | null;
    if (fallback) {
      bestBlob = fallback.blob;
      outputWidth = fallback.width;
      outputHeight = fallback.height;
    } else {
      bestBlob = await encodeAtQuality(
        img,
        outputWidth,
        outputHeight,
        modeDefaults.minQuality,
        outputFormat
      );
    }
    bestQuality = modeDefaults.minQuality;
    limit = compressionMode === "balanced" ? "min-dimensions" : "quality-floor";
  }

  const smallestScale = scaleSteps.length ? scaleSteps[scaleSteps.length - 1] : 1;
  const smallestLongSideTried = Math.round(
    Math.max(effectiveWidth, effectiveHeight) * smallestScale
  );

  const compressedSize = bestBlob.size;
  const reachedTarget =
    compressedSize <= targetBytes && compressedSize <= maxBytes;
  const savingsPercent = Math.round(
    ((originalSize - compressedSize) / originalSize) * 100
  );
  const dimensionsChanged =
    preResizedDimensionsChanged ||
    outputWidth !== effectiveWidth ||
    outputHeight !== effectiveHeight;

  const resultFile = blobToFile(
    bestBlob,
    `compressed.${OUTPUT_FORMAT_CONFIG[outputFormat].ext}`,
    outputFormat
  );

  return {
    blob: bestBlob,
    file: resultFile,
    originalSize,
    compressedSize,
    originalWidth,
    originalHeight,
    outputWidth,
    outputHeight,
    qualityUsed: Math.round(bestQuality * 100) / 100,
    targetKB,
    reachedTarget,
    dimensionsChanged,
    savingsPercent,
    outputFormat,
    limit: reachedTarget ? null : limit ?? "quality-floor",
    smallestLongSideTried,
    qualityFloor: modeDefaults.minQuality,
  };
}
