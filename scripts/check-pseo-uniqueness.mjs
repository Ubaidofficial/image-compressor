#!/usr/bin/env node
/**
 * Fails if any two indexable pages render near-identical body copy.
 *
 * Landing page content is generated from (targetSizeKb, inputFormat), so it is
 * easy to add a page that silently duplicates an existing one — which is how
 * the site ended up with 50 pages sharing six identical H2s and no indexation.
 * This runs against the real build output, so it measures what search engines
 * would actually see rather than what the source intends.
 *
 * Usage: node scripts/check-pseo-uniqueness.mjs   (after `next build`)
 */

import { readFileSync, existsSync } from "node:fs";
import { globSync } from "node:fs";
import { basename } from "node:path";

const BUILD_DIR = ".next/server/app";
const SHINGLE = 6;
// Pages in the same family legitimately share boilerplate (nav, footer, tool
// UI, FAQ scaffolding). Above this, the body copy itself is duplicated.
const MAX_JACCARD = 0.65;

if (!existsSync(BUILD_DIR)) {
  console.error(`No build output at ${BUILD_DIR}. Run \`npm run build\` first.`);
  process.exit(1);
}

const files = globSync(`${BUILD_DIR}/*.html`);

function parse(file) {
  const html = readFileSync(file, "utf8");
  const robots = /<meta name="robots" content="(.*?)"/.exec(html)?.[1] ?? "";
  const noCode = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ");
  const stripped = noCode.replace(/<[^>]*>/g, " ");
  // For the sentence check, drop the site header/footer and the one shared
  // "how it works" box, which are the same on every page by design.
  const body = stripMarked(noCode)
    .replace(/<header[\s\S]*?<\/header>/g, " ")
    .replace(/<footer[\s\S]*?<\/footer>/g, " ")
    .replace(/<\/(p|li|h[1-6]|td|th|summary|div|dt|dd)>/g, ". ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&[a-z]+;|&#x?[0-9a-f]+;/gi, " ");
  return { robots, words: stripped.split(/\s+/).filter(Boolean), sentences: sentencesOf(body) };
}

/**
 * Remove every element carrying data-boilerplate="shared", including its
 * nested children: the shared "How it works" box and the compressor widget,
 * whose text is identical on every page by design.
 */
function stripMarked(html) {
  let out = html;
  for (;;) {
    const open = /<([a-z][a-z0-9]*)\b[^>]*\bdata-boilerplate="shared"[^>]*>/i.exec(out);
    if (!open) return out;
    const tag = open[1].toLowerCase();
    const tagRe = new RegExp(`<(/?)${tag}\\b[^>]*>`, "gi");
    tagRe.lastIndex = open.index + open[0].length;
    let depth = 1;
    let end = out.length;
    for (let m; (m = tagRe.exec(out)); ) {
      if (m[0].endsWith("/>")) continue;
      depth += m[1] ? -1 : 1;
      if (depth === 0) { end = m.index + m[0].length; break; }
    }
    out = out.slice(0, open.index) + " " + out.slice(end);
  }
}

/**
 * Sentences of 6+ words, lower-cased, with numbers and units masked so
 * "compress to 50KB" and "compress to 100KB" count as the same sentence.
 */
function sentencesOf(text) {
  const out = new Set();
  for (const raw of text.split(/(?<=[.!?])\s+|\s*\.\s+(?=\.)/)) {
    const masked = raw
      .toLowerCase()
      .replace(/\d[\d,.]*\s*(kb|mb|px|%|x|×)?/g, "#")
      .replace(/[^a-z#' ]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (masked.split(" ").filter((w) => w.length > 0).length >= 6) out.add(masked);
  }
  return [...out];
}

function shingles(words) {
  const set = new Set();
  for (let i = 0; i + SHINGLE <= words.length; i++) {
    set.add(words.slice(i, i + SHINGLE).join(" "));
  }
  return set;
}

const pages = [];
for (const file of files) {
  const slug = basename(file, ".html");
  if (slug.startsWith("_") || slug === "index") continue;
  const { robots, words } = parse(file);
  if (robots.includes("noindex")) continue;
  if (words.length < 200) continue;
  pages.push({ slug, words, shingles: shingles(words), sentences: parse(file).sentences });
}

const failures = [];
for (let i = 0; i < pages.length; i++) {
  for (let j = i + 1; j < pages.length; j++) {
    const a = pages[i];
    const b = pages[j];
    let shared = 0;
    for (const s of a.shingles) if (b.shingles.has(s)) shared++;
    const union = a.shingles.size + b.shingles.size - shared;
    const jaccard = union === 0 ? 0 : shared / union;
    if (jaccard > MAX_JACCARD) {
      failures.push({ a: a.slug, b: b.slug, jaccard });
    }
  }
}

const counts = pages.map((p) => p.words.length).sort((x, y) => x - y);
const median = counts[Math.floor(counts.length / 2)];

console.log(`Checked ${pages.length} indexable pages.`);
console.log(`Word count  min ${counts[0]}  median ${median}  max ${counts.at(-1)}`);

if (failures.length) {
  failures.sort((x, y) => y.jaccard - x.jaccard);
  console.error(`\n${failures.length} page pair(s) exceed ${MAX_JACCARD} similarity:`);
  for (const f of failures.slice(0, 20)) {
    console.error(`  ${f.jaccard.toFixed(3)}  ${f.a}  vs  ${f.b}`);
  }
  console.error(
    "\nGive each page a distinct `angle` in src/data/pseoAngles.ts, or consolidate\n" +
      "the weaker one via CONSOLIDATION in src/data/pseoPages.ts."
  );
  process.exit(1);
}

console.log(`No page pair exceeds ${MAX_JACCARD} similarity.`);

/* ------------------------------------------------------------------ */
/* Sentence-level repetition (issue #3 follow-up)                      */
/*                                                                     */
/* Whole-page similarity misses the real template signal: the same     */
/* sentences reused across many pages with only the number swapped.    */
/* Fail when more than MAX_SHARED_SHARE of a page's sentences also     */
/* appear on MIN_OTHER_PAGES or more other indexable pages.            */
/* ------------------------------------------------------------------ */

const MAX_SHARED_SHARE = 0.25;
const MIN_OTHER_PAGES = 3;

const pagesBySentence = new Map();
for (const page of pages) {
  for (const sentence of page.sentences) {
    pagesBySentence.set(sentence, (pagesBySentence.get(sentence) ?? 0) + 1);
  }
}

const shares = pages
  .map((page) => {
    const shared = page.sentences.filter(
      (sentence) => pagesBySentence.get(sentence) - 1 >= MIN_OTHER_PAGES
    );
    return {
      slug: page.slug,
      total: page.sentences.length,
      shared: shared.length,
      share: page.sentences.length ? shared.length / page.sentences.length : 0,
      examples: shared,
    };
  })
  .sort((a, b) => b.share - a.share);

console.log(
  `\nSentences shared with ${MIN_OTHER_PAGES}+ other indexable pages (limit ${MAX_SHARED_SHARE * 100}%):`
);
for (const row of shares) {
  console.log(
    `  ${(row.share * 100).toFixed(0).padStart(3)}%  ${String(row.shared).padStart(3)}/${String(row.total).padEnd(3)}  ${row.slug}`
  );
}

const repeated = shares.filter((row) => row.share > MAX_SHARED_SHARE);
if (repeated.length) {
  console.error(`\n${repeated.length} page(s) exceed ${MAX_SHARED_SHARE * 100}% shared sentences.`);
  const top = [...pagesBySentence.entries()]
    .filter(([, count]) => count - 1 >= MIN_OTHER_PAGES)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);
  console.error("Most repeated sentences (numbers masked):");
  for (const [sentence, count] of top) console.error(`  ${count} pages: ${sentence.slice(0, 140)}`);
  console.error(
    "\nWrite page-specific copy, or move genuinely shared text into the\n" +
      "shared HowItWorks box (rendered with data-boilerplate=\"shared\")."
  );
  process.exit(1);
}
console.log(`No page has more than ${MAX_SHARED_SHARE * 100}% shared sentences.`);
