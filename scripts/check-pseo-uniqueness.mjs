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
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]*>/g, " ");
  return { robots, words: stripped.split(/\s+/).filter(Boolean) };
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
  pages.push({ slug, words, shingles: shingles(words) });
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
