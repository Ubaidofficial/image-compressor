#!/usr/bin/env node
/**
 * Measure what the site's own compressor actually achieves at each size
 * target, and write the results to src/data/sizeEvidence.json for the size
 * pages to publish.
 *
 * - Runs the real src/lib/compressToWebp.ts (transpiled with the project's
 *   TypeScript) inside Chromium via Playwright, so the numbers come from the
 *   same code and the same browser encoders visitors use.
 * - The five test images are generated here, deterministically, from a
 *   seeded random number generator: no third-party images, nothing to
 *   license. They are synthetic stand-ins with the structure of each kind of
 *   image (a photo-like portrait, an A4 scan, a signature on paper, a UI
 *   screenshot, a landscape photo), not real photographs.
 * - Encoder output can differ slightly between Chromium versions, so the
 *   browser version is recorded with the results.
 *
 * Usage: node scripts/measure-size-evidence.mjs
 * Needs Playwright with Chromium (preinstalled in the cloud environment; locally
 * `npx playwright install chromium`).
 */

import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const ts = require("typescript");
const { chromium } = require("playwright");

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "src/data/sizeEvidence.json");

const TARGETS_KB = [10, 20, 50, 100, 200, 500, 1024];
const FORMATS = ["jpeg", "webp"];
/** Extra runs comparing compression modes, for the image-compressor-to-* pages. */
const MODE_TARGETS_KB = [20, 100, 200];
const MODES = ["best-quality", "balanced", "smallest-file"];

function transpile(file) {
  const source = readFileSync(join(ROOT, file), "utf8");
  return ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ES2020, target: ts.ScriptTarget.ES2020 },
  }).outputText.replace(/from "\.\/constants"/g, 'from "./constants.js"');
}

const modules = {
  "/compressToWebp.js": transpile("src/lib/compressToWebp.ts"),
  "/constants.js": transpile("src/lib/constants.ts"),
};

/* Runs in the browser: deterministic synthetic test images. */
const GENERATOR = String.raw`
function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function grain(ctx, w, h, amount, rand) {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (rand() - 0.5) * amount;
    d[i] += n; d[i + 1] += n; d[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
}
function canvas(w, h) {
  const c = document.createElement("canvas"); c.width = w; c.height = h;
  return [c, c.getContext("2d")];
}
const makers = {
  portrait() {
    const rand = rng(11); const w = 2448, h = 3264; const [c, x] = canvas(w, h);
    const bg = x.createLinearGradient(0, 0, w, h); bg.addColorStop(0, "#6f8fa8"); bg.addColorStop(1, "#c9b79c");
    x.fillStyle = bg; x.fillRect(0, 0, w, h);
    x.filter = "blur(40px)";
    for (let i = 0; i < 40; i++) { x.fillStyle = "hsla(" + Math.floor(rand() * 360) + ",40%,70%,0.35)"; x.beginPath(); x.arc(rand() * w, rand() * h * 0.6, 60 + rand() * 180, 0, 7); x.fill(); }
    x.filter = "none";
    x.fillStyle = "#2f4a6d"; x.beginPath(); x.ellipse(w / 2, h * 1.02, w * 0.48, h * 0.32, 0, 0, 7); x.fill();
    x.fillStyle = "#c58f6c"; x.fillRect(w / 2 - 170, h * 0.56, 340, 260);
    const face = x.createRadialGradient(w / 2 - 120, h * 0.38, 60, w / 2, h * 0.42, 560);
    face.addColorStop(0, "#e8b896"); face.addColorStop(1, "#b07a58");
    x.fillStyle = face; x.beginPath(); x.ellipse(w / 2, h * 0.42, 430, 560, 0, 0, 7); x.fill();
    x.fillStyle = "#2a1c14"; x.beginPath(); x.ellipse(w / 2, h * 0.29, 470, 330, 0, Math.PI, 2 * Math.PI); x.fill();
    x.fillStyle = "#3b2a22"; for (const dx of [-170, 170]) { x.beginPath(); x.ellipse(w / 2 + dx, h * 0.41, 60, 30, 0, 0, 7); x.fill(); }
    x.strokeStyle = "#8a4a3a"; x.lineWidth = 14; x.beginPath(); x.arc(w / 2, h * 0.47, 130, 0.2 * Math.PI, 0.8 * Math.PI); x.stroke();
    grain(x, w, h, 14, rand);
    return { canvas: c, type: "image/jpeg", quality: 0.92, label: "Portrait photo", detail: "Head-and-shoulders, phone-camera size" };
  },
  document() {
    const rand = rng(23); const w = 2480, h = 3508; const [c, x] = canvas(w, h);
    const bg = x.createLinearGradient(0, 0, w, 0); bg.addColorStop(0, "#f4f2ec"); bg.addColorStop(1, "#e6e3da");
    x.fillStyle = bg; x.fillRect(0, 0, w, h);
    x.fillStyle = "#1d1d1f";
    x.fillRect(220, 260, 1100, 70);
    for (let y = 480; y < h - 300; y += 58) {
      if (rand() < 0.08) { y += 60; continue; }
      let xPos = 220; const end = w - 220 - (rand() < 0.15 ? rand() * 900 : 0);
      while (xPos < end) { const ww = 40 + rand() * 170; x.fillRect(xPos, y, Math.min(ww, end - xPos), 26); xPos += ww + 22; }
    }
    grain(x, w, h, 10, rand);
    return { canvas: c, type: "image/jpeg", quality: 0.9, label: "Document scan", detail: "A4 page at 300 DPI, printed text" };
  },
  signature() {
    const rand = rng(37); const w = 1800, h = 1000; const [c, x] = canvas(w, h);
    x.fillStyle = "#ddd8cc"; x.fillRect(0, 0, w, h);
    const shade = x.createRadialGradient(w * 0.4, h * 0.4, 100, w / 2, h / 2, 1100);
    shade.addColorStop(0, "rgba(255,255,255,0.25)"); shade.addColorStop(1, "rgba(0,0,0,0.12)");
    x.fillStyle = shade; x.fillRect(0, 0, w, h);
    x.strokeStyle = "#15204a"; x.lineCap = "round"; x.lineJoin = "round";
    let px = 380, py = 520; x.lineWidth = 9; x.beginPath(); x.moveTo(px, py);
    for (let i = 0; i < 26; i++) {
      const nx = px + 30 + rand() * 45, ny = 520 + (rand() - 0.5) * 260;
      x.bezierCurveTo(px + 10, py - 120 * rand(), nx - 10, ny + 120 * rand(), nx, ny); px = nx; py = ny;
    }
    x.stroke(); x.lineWidth = 6; x.beginPath(); x.moveTo(360, 640); x.quadraticCurveTo(900, 700, px + 40, 600); x.stroke();
    grain(x, w, h, 16, rand);
    return { canvas: c, type: "image/jpeg", quality: 0.92, label: "Signature on paper", detail: "Phone photo of a signature, off-white paper" };
  },
  screenshot() {
    const rand = rng(41); const w = 1920, h = 1080; const [c, x] = canvas(w, h);
    x.fillStyle = "#f7f8fa"; x.fillRect(0, 0, w, h);
    x.fillStyle = "#1f2937"; x.fillRect(0, 0, w, 64);
    x.fillStyle = "#ffffff"; x.fillRect(0, 64, 280, h - 64);
    const colors = ["#2563eb", "#16a34a", "#f59e0b", "#db2777"];
    for (let i = 0; i < 6; i++) {
      const cx = 320 + (i % 3) * 520, cy = 110 + Math.floor(i / 3) * 460;
      x.fillStyle = "#ffffff"; x.fillRect(cx, cy, 480, 420);
      x.fillStyle = colors[i % 4]; x.fillRect(cx + 24, cy + 24, 432, 180);
      x.fillStyle = "#374151";
      for (let l = 0; l < 6; l++) x.fillRect(cx + 24, cy + 230 + l * 28, 120 + rand() * 300, 12);
    }
    x.fillStyle = "#9ca3af"; for (let l = 0; l < 14; l++) x.fillRect(32, 100 + l * 44, 120 + rand() * 100, 14);
    return { canvas: c, type: "image/png", label: "Screenshot", detail: "1080p app screenshot, flat colours and text" };
  },
  landscape() {
    const rand = rng(53); const w = 3264, h = 2448; const [c, x] = canvas(w, h);
    const sky = x.createLinearGradient(0, 0, 0, h * 0.6); sky.addColorStop(0, "#3a6fb0"); sky.addColorStop(1, "#cfe2f3");
    x.fillStyle = sky; x.fillRect(0, 0, w, h);
    x.filter = "blur(30px)"; x.fillStyle = "rgba(255,255,255,0.7)";
    for (let i = 0; i < 30; i++) { x.beginPath(); x.ellipse(rand() * w, rand() * h * 0.35, 150 + rand() * 300, 50 + rand() * 80, 0, 0, 7); x.fill(); }
    x.filter = "none";
    const layers = [["#5d6f7e", 0.45], ["#3f5e46", 0.58], ["#2e4a2c", 0.72]];
    for (const [color, base] of layers) {
      x.fillStyle = color; x.beginPath(); x.moveTo(0, h);
      let y = h * base;
      for (let px = 0; px <= w; px += 16) { y += (rand() - 0.5) * 40; y = Math.max(h * (base - 0.12), Math.min(h * (base + 0.08), y)); x.lineTo(px, y); }
      x.lineTo(w, h); x.fill();
    }
    x.fillStyle = "#4f7a33";
    for (let i = 0; i < 9000; i++) { x.fillRect(rand() * w, h * 0.8 + rand() * h * 0.2, 3, 10 + rand() * 18); }
    grain(x, w, h, 12, rand);
    return { canvas: c, type: "image/jpeg", quality: 0.92, label: "Landscape photo", detail: "Outdoor scene, phone-camera size" };
  },
};
window.__makeImage = async (key) => {
  const made = makers[key]();
  const blob = await new Promise((r) => made.canvas.toBlob(r, made.type, made.quality));
  const file = new File([blob], key + (made.type === "image/png" ? ".png" : ".jpg"), { type: made.type });
  window.__files = window.__files || {};
  window.__files[key] = file;
  return { key, label: made.label, detail: made.detail, type: made.type, bytes: blob.size, width: made.canvas.width, height: made.canvas.height };
};
`;

const IMAGE_KEYS = ["portrait", "document", "signature", "screenshot", "landscape"];

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.route("http://evidence.local/**", (route) => {
    const path = new URL(route.request().url()).pathname;
    if (modules[path]) return route.fulfill({ body: modules[path], contentType: "text/javascript" });
    return route.fulfill({
      body: `<!doctype html><script>${GENERATOR}</script><script type="module">import { compressToWebp } from "./compressToWebp.js"; window.__compress = compressToWebp; window.__ready = true;</script>`,
      contentType: "text/html",
    });
  });
  await page.goto("http://evidence.local/");
  await page.waitForFunction(() => window.__ready === true);

  const images = [];
  for (const key of IMAGE_KEYS) images.push(await page.evaluate((k) => window.__makeImage(k), key));

  async function run(key, targetKB, outputFormat, compressionMode) {
    return page.evaluate(
      async ({ key, targetKB, outputFormat, compressionMode }) => {
        const r = await window.__compress({ file: window.__files[key], targetKB, outputFormat, compressionMode });
        return {
          outputWidth: r.outputWidth,
          outputHeight: r.outputHeight,
          outputBytes: r.compressedSize,
          quality: r.qualityUsed,
          reachedTarget: r.reachedTarget,
        };
      },
      { key, targetKB, outputFormat, compressionMode }
    );
  }

  const byTarget = {};
  for (const targetKB of TARGETS_KB) {
    byTarget[targetKB] = {};
    for (const key of IMAGE_KEYS) {
      byTarget[targetKB][key] = {};
      for (const format of FORMATS) {
        byTarget[targetKB][key][format] = await run(key, targetKB, format, "balanced");
        process.stdout.write(".");
      }
    }
  }

  const byMode = {};
  for (const targetKB of MODE_TARGETS_KB) {
    byMode[targetKB] = {};
    for (const key of IMAGE_KEYS) {
      byMode[targetKB][key] = {};
      for (const mode of MODES) {
        byMode[targetKB][key][mode] = await run(key, targetKB, "jpeg", mode);
        process.stdout.write(".");
      }
    }
  }

  const result = {
    generatedBy: "scripts/measure-size-evidence.mjs",
    measuredOn: new Date().toISOString().slice(0, 10),
    browser: `Chromium ${browser.version()}`,
    settings: "compressToWebp() defaults: no pre-resize; Balanced mode unless stated",
    images,
    byTarget,
    byMode,
  };
  writeFileSync(OUT, JSON.stringify(result, null, 2) + "\n");
  await browser.close();
  console.log(`\nWrote ${OUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
