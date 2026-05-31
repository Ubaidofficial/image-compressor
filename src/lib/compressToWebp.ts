import { clampTargetKB, MAX_OUTPUT_KB } from "./constants";

export type CompressionMode = "best-quality" | "balanced" | "smallest-file";

export const COMPRESSION_MODE_CONFIG = {
  "best-quality": {
    label: "Best Quality",
    description:
      "Prioritizes image quality and preserves dimensions when possible.",
  },
  balanced: {
    label: "Balanced",
    description:
      "Recommended. Balances visual quality and file size.",
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
};

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

function blobToFile(blob: Blob, filename: string): File {
  return new File([blob], filename, { type: "image/webp" });
}

async function canvasToWebpBlob(
  canvas: HTMLCanvasElement,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("Canvas toBlob returned null"));
      },
      "image/webp",
      quality
    );
  });
}

async function encodeAtQuality(
  source: ImageBitmap | HTMLImageElement,
  width: number,
  height: number,
  quality: number
): Promise<Blob> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get 2d context");
  ctx.drawImage(source, 0, 0, width, height);
  return canvasToWebpBlob(canvas, quality);
}

async function binarySearchQuality(
  source: ImageBitmap | HTMLImageElement,
  width: number,
  height: number,
  targetBytes: number,
  minQ: number,
  maxQ: number
): Promise<{ blob: Blob; quality: number } | null> {
  let lo = minQ;
  let hi = maxQ;
  let best: { blob: Blob; quality: number } | null = null;

  for (let i = 0; i < 12; i++) {
    const mid = (lo + hi) / 2;
    const blob = await encodeAtQuality(source, width, height, mid);

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

  // Try with effective dimensions first
  if (modeDefaults.preserveDimensionsFirst) {
    const result = await binarySearchQuality(
      img,
      effectiveWidth,
      effectiveHeight,
      targetBytes,
      modeDefaults.minQuality,
      modeDefaults.maxQuality
    );
    if (result) {
      bestBlob = result.blob;
      bestQuality = result.quality;
    }
  }

  // Scale down if initial dimensions didn't produce a result
  if (!bestBlob) {
    for (const scale of modeDefaults.scaleSteps) {
      const w = Math.round(effectiveWidth * scale);
      const h = Math.round(effectiveHeight * scale);

      const result = await binarySearchQuality(
        img,
        w,
        h,
        targetBytes,
        modeDefaults.minQuality,
        modeDefaults.maxQuality
      );

      if (result) {
        bestBlob = result.blob;
        bestQuality = result.quality;
        outputWidth = w;
        outputHeight = h;
        break;
      }
    }
  }

  // Fallback: lowest quality at current dimensions
  if (!bestBlob) {
    bestBlob = await encodeAtQuality(
      img,
      outputWidth,
      outputHeight,
      modeDefaults.minQuality
    );
    bestQuality = modeDefaults.minQuality;
  }

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

  const resultFile = blobToFile(bestBlob, "compressed.webp");

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
  };
}
