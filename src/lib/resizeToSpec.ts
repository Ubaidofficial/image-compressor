/**
 * Produce a JPEG that meets an exact upload specification: pixel dimensions,
 * a minimum and maximum file size, and the JPEG format. Used by the one-click
 * exam/form presets, where a file outside the range is rejected by the portal.
 *
 * Runs entirely in the browser (canvas). Nothing is uploaded.
 */

export type DimensionRange = { min: number; max: number };

export type UploadSpec = {
  /** Width in pixels; min === max for a fixed width. */
  widthPx: DimensionRange;
  /** Height in pixels; min === max for a fixed height. */
  heightPx: DimensionRange;
  minKB: number;
  maxKB: number;
  /**
   * Print resolution to record in the JPEG header, for specs given in cm at
   * a stated DPI. Changes no pixels.
   */
  dpi?: number;
};

export type FitMode = "crop" | "fit";

export type ResizeToSpecResult = {
  blob: Blob;
  width: number;
  height: number;
  bytes: number;
  quality: number;
  /** True when a JPEG comment block was added to reach the minimum size. */
  padded: boolean;
  checks: SpecChecks;
};

export type SpecChecks = {
  format: boolean;
  dimensions: boolean;
  minSize: boolean;
  maxSize: boolean;
};

/**
 * Portals write "KB" without saying whether they mean 1,000 or 1,024 bytes.
 * The output is kept inside the range under both readings: at most
 * maxKB x 1000 bytes and at least minKB x 1024 bytes.
 */
export function byteLimits(spec: Pick<UploadSpec, "minKB" | "maxKB">) {
  return {
    minBytes: Math.ceil(spec.minKB * 1024),
    maxBytes: Math.floor(spec.maxKB * 1000),
  };
}

export function checkSpec(
  spec: UploadSpec,
  result: { width: number; height: number; bytes: number; type: string }
): SpecChecks {
  const { minBytes, maxBytes } = byteLimits(spec);
  return {
    format: result.type === "image/jpeg",
    dimensions:
      result.width >= spec.widthPx.min &&
      result.width <= spec.widthPx.max &&
      result.height >= spec.heightPx.min &&
      result.height <= spec.heightPx.max,
    minSize: result.bytes >= minBytes,
    maxSize: result.bytes <= maxBytes,
  };
}

export function allChecksPass(checks: SpecChecks): boolean {
  return checks.format && checks.dimensions && checks.minSize && checks.maxSize;
}

function clamp(value: number, range: DimensionRange): number {
  return Math.min(range.max, Math.max(range.min, value));
}

/**
 * Pick output dimensions. A fixed spec returns its size. A range keeps the
 * source aspect ratio where the range allows it, and uses the largest size
 * that does not upscale the source.
 */
export function chooseOutputSize(
  spec: UploadSpec,
  sourceWidth: number,
  sourceHeight: number
): { width: number; height: number } {
  const w = spec.widthPx;
  const h = spec.heightPx;
  if (w.min === w.max && h.min === h.max) {
    return { width: w.min, height: h.min };
  }
  const aspect = sourceWidth / sourceHeight;
  // Largest scale that fits the maximums, never above the source size unless
  // the source is below the minimums.
  let width = Math.min(w.max, sourceWidth, Math.floor(h.max * aspect));
  width = clamp(width, w);
  let height = clamp(Math.round(width / aspect), h);
  width = clamp(Math.round(height * aspect), w);
  height = clamp(height, h);
  return { width, height };
}

async function decode(file: Blob): Promise<ImageBitmap> {
  return createImageBitmap(file);
}

/**
 * Crop away the blank paper around a signature so the ink fills the output.
 * Portals reject "miniature" signatures, which is what a small signature in
 * the middle of a phone photo of a page becomes after resizing.
 * Returns the source unchanged when no ink is found.
 */
async function trimToInk(source: ImageBitmap): Promise<ImageBitmap> {
  const scale = Math.min(1, 800 / Math.max(source.width, source.height));
  const w = Math.max(1, Math.round(source.width * scale));
  const h = Math.max(1, Math.round(source.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return source;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(source, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  // Ink is anything clearly darker than the paper. Using the image's own
  // brightest level copes with grey-looking paper in phone photos.
  let brightest = 0;
  for (let i = 0; i < data.length; i += 4) {
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    if (lum > brightest) brightest = lum;
  }
  const threshold = brightest * 0.6;
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      if (lum < threshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return source;
  const margin = Math.round(Math.max(maxX - minX, maxY - minY) * 0.05) + 2;
  const sx = Math.max(0, minX - margin) / scale;
  const sy = Math.max(0, minY - margin) / scale;
  const sw = Math.min(w, maxX + margin + 1) / scale - sx;
  const sh = Math.min(h, maxY + margin + 1) / scale - sy;
  return createImageBitmap(source, Math.round(sx), Math.round(sy), Math.max(1, Math.round(sw)), Math.max(1, Math.round(sh)));
}

function drawToCanvas(
  source: ImageBitmap,
  width: number,
  height: number,
  mode: FitMode
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not get a 2D canvas context");
  // JPEG has no transparency. Without a fill, transparent pixels (common in
  // scanned signatures saved as PNG) would turn black.
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  const sw = source.width;
  const sh = source.height;
  const targetAspect = width / height;
  const sourceAspect = sw / sh;

  if (mode === "crop") {
    // Centre crop to the target aspect ratio.
    let cw = sw;
    let ch = sh;
    if (sourceAspect > targetAspect) cw = sh * targetAspect;
    else ch = sw / targetAspect;
    ctx.drawImage(source, (sw - cw) / 2, (sh - ch) / 2, cw, ch, 0, 0, width, height);
  } else {
    // Fit the whole image inside, padding with white.
    const scale = Math.min(width / sw, height / sh);
    const dw = sw * scale;
    const dh = sh * scale;
    ctx.drawImage(source, 0, 0, sw, sh, (width - dw) / 2, (height - dh) / 2, dw, dh);
  }
  return canvas;
}

function encodeJpeg(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("JPEG encoding failed"))),
      "image/jpeg",
      quality
    );
  });
}

/** Offset just past the JFIF APP0 segment, or 2 (just past SOI) if absent. */
function afterJfifHeader(bytes: Uint8Array): number {
  if (bytes[2] === 0xff && bytes[3] === 0xe0) {
    return 4 + ((bytes[4] << 8) | bytes[5]);
  }
  return 2;
}

/**
 * Record a print resolution in the JFIF APP0 header (units = dots per inch).
 * Browsers write a JFIF header with no units; pixel data is untouched.
 */
export async function setJpegDpi(blob: Blob, dpi: number): Promise<Blob> {
  const bytes: Uint8Array<ArrayBuffer> = new Uint8Array(await blob.arrayBuffer());
  const isJfif =
    bytes[2] === 0xff && bytes[3] === 0xe0 &&
    String.fromCharCode(bytes[6], bytes[7], bytes[8], bytes[9]) === "JFIF" && bytes[10] === 0;
  if (!isJfif) return blob;
  bytes[13] = 1; // units: dots per inch
  bytes[14] = (dpi >> 8) & 0xff;
  bytes[15] = dpi & 0xff;
  bytes[16] = (dpi >> 8) & 0xff;
  bytes[17] = dpi & 0xff;
  return new Blob([bytes], { type: "image/jpeg" });
}

/**
 * Insert JPEG COM (comment) segments after the JFIF header. Comment segments
 * carry no pixel data, so the visible image is unchanged; they only make the
 * file larger. Used when a very plain image (a signature on white) stays
 * below a portal's minimum file size even at maximum quality.
 */
export async function padJpeg(blob: Blob, targetBytes: number): Promise<Blob> {
  const bytes: Uint8Array<ArrayBuffer> = new Uint8Array(await blob.arrayBuffer());
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) throw new Error("Not a JPEG");
  let missing = targetBytes - bytes.length;
  if (missing <= 0) return blob;
  const segments: Uint8Array<ArrayBuffer>[] = [];
  const MAX_PAYLOAD = 65533; // segment length field is 16 bits and includes itself
  while (missing > 0) {
    // Each segment costs 4 bytes of header (marker + length) on top of its payload.
    const payload = Math.max(1, Math.min(MAX_PAYLOAD, missing - 4));
    const segment = new Uint8Array(payload + 4);
    segment[0] = 0xff;
    segment[1] = 0xfe;
    const length = payload + 2;
    segment[2] = (length >> 8) & 0xff;
    segment[3] = length & 0xff;
    segment.fill(0x20, 4); // ASCII spaces
    segments.push(segment);
    missing -= segment.length;
  }
  const at = afterJfifHeader(bytes);
  return new Blob([bytes.slice(0, at), ...segments, bytes.slice(at)], { type: "image/jpeg" });
}

/**
 * Encode `canvas` as the highest-quality JPEG at or under maxBytes.
 * Returns null when even the lowest quality is too large.
 */
async function bestQualityUnder(
  canvas: HTMLCanvasElement,
  maxBytes: number
): Promise<{ blob: Blob; quality: number } | null> {
  const top = await encodeJpeg(canvas, 0.95);
  if (top.size <= maxBytes) return { blob: top, quality: 0.95 };

  let lo = 0.05;
  let hi = 0.95;
  let best: { blob: Blob; quality: number } | null = null;
  for (let i = 0; i < 10 && hi - lo > 0.01; i++) {
    const mid = (lo + hi) / 2;
    const blob = await encodeJpeg(canvas, mid);
    if (blob.size <= maxBytes) {
      best = { blob, quality: mid };
      lo = mid;
    } else {
      hi = mid;
    }
  }
  if (!best) {
    const floor = await encodeJpeg(canvas, 0.05);
    if (floor.size <= maxBytes) best = { blob: floor, quality: 0.05 };
  }
  return best;
}

export class SpecUnreachableError extends Error {}

export async function resizeToSpec(
  file: Blob,
  spec: UploadSpec,
  mode: FitMode,
  options: { trimToInk?: boolean } = {}
): Promise<ResizeToSpecResult> {
  const { minBytes, maxBytes } = byteLimits(spec);
  if (minBytes > maxBytes) throw new Error("Invalid spec: minimum above maximum");

  const decoded = await decode(file);
  const source = options.trimToInk ? await trimToInk(decoded) : decoded;
  try {
    let { width, height } = chooseOutputSize(spec, source.width, source.height);

    let encoded: { blob: Blob; quality: number } | null = null;
    // If the file is too large even at minimum quality, step the dimensions
    // down — only possible when the spec allows a range.
    for (let attempt = 0; attempt < 12; attempt++) {
      const canvas = drawToCanvas(source, width, height, mode);
      encoded = await bestQualityUnder(canvas, maxBytes);
      if (encoded) break;
      const nextWidth = Math.max(spec.widthPx.min, Math.floor(width * 0.85));
      const nextHeight = Math.max(spec.heightPx.min, Math.floor(height * 0.85));
      if (nextWidth === width && nextHeight === height) break;
      width = nextWidth;
      height = nextHeight;
    }
    if (!encoded) {
      throw new SpecUnreachableError(
        `This image cannot be brought under ${spec.maxKB} KB at the required dimensions. Try a plainer background or a less detailed scan.`
      );
    }

    let blob = encoded.blob;
    if (spec.dpi) blob = await setJpegDpi(blob, spec.dpi);
    let padded = false;
    if (blob.size < minBytes) {
      // Aim a little above the minimum, but never past the maximum.
      const target = Math.min(maxBytes, minBytes + 512);
      blob = await padJpeg(blob, target);
      padded = true;
    }

    // Verify the file itself rather than trusting the numbers used to make it.
    const check = await decode(blob);
    const actual = { width: check.width, height: check.height };
    check.close();
    const checks = checkSpec(spec, { ...actual, bytes: blob.size, type: blob.type });
    return { blob, ...actual, bytes: blob.size, quality: encoded.quality, padded, checks };
  } finally {
    source.close();
    if (source !== decoded) decoded.close();
  }
}
