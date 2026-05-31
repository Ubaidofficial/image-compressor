export type CompressToWebpOptions = {
  file: File;
  targetKB: number;
  maxKB?: number;
  preserveDimensionsFirst?: boolean;
  minQuality?: number;
  maxQuality?: number;
  maxIterations?: number;
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

const SCALE_STEPS = [0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5];

function clampTargetKB(kb: number, maxKB: number): number {
  return Math.min(kb, maxKB);
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
    maxKB = 100,
    preserveDimensionsFirst = true,
    minQuality = 0.1,
    maxQuality = 0.95,
  } = options;

  const targetKB = clampTargetKB(rawTargetKB, maxKB);
  const targetBytes = targetKB * 1024;

  const originalSize = file.size;

  const img = await createImageBitmap(file);
  const originalWidth = img.width;
  const originalHeight = img.height;

  let bestBlob: Blob | null = null;
  let bestQuality = 0;
  let outputWidth = originalWidth;
  let outputHeight = originalHeight;
  let dimensionsChanged = false;

  // Try original dimensions first
  if (preserveDimensionsFirst) {
    const result = await binarySearchQuality(
      img,
      originalWidth,
      originalHeight,
      targetBytes,
      minQuality,
      maxQuality
    );
    if (result) {
      bestBlob = result.blob;
      bestQuality = result.quality;
      outputWidth = originalWidth;
      outputHeight = originalHeight;
    }
  }

  // If original dimensions didn't produce a result, try scaling down
  if (!bestBlob) {
    for (const scale of SCALE_STEPS) {
      const w = Math.round(originalWidth * scale);
      const h = Math.round(originalHeight * scale);

      const result = await binarySearchQuality(
        img,
        w,
        h,
        targetBytes,
        minQuality,
        maxQuality
      );

      if (result) {
        bestBlob = result.blob;
        bestQuality = result.quality;
        outputWidth = w;
        outputHeight = h;
        dimensionsChanged = true;
        break;
      }
    }
  }

  if (!bestBlob) {
    bestBlob = await encodeAtQuality(
      img,
      outputWidth,
      outputHeight,
      minQuality
    );
    bestQuality = minQuality;
  }

  const compressedSize = bestBlob.size;
  const reachedTarget = compressedSize <= targetBytes;
  const savingsPercent = Math.round(
    ((originalSize - compressedSize) / originalSize) * 100
  );

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
