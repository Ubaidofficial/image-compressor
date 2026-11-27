import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import {
  getIndexablePseoPages,
  getPublishedPseoPages,
  isPhase1PseoSlug,
  pseoContentUpdated,
  pseoPath,
} from "@/data/pseoPages";

/**
 * <lastmod> is the date each page's visible content last changed, taken from
 * the git history of the files that render it. Never the build date: a
 * lastmod that moves on every deploy teaches Google to ignore it.
 * Update the date in the same commit that changes a page's content.
 */
type StaticEntry = { path: string; lastmod: string; priority: number };

const STATIC_PAGES: StaticEntry[] = [
  // Homepage retargeted to "reduce image size in KB" for exam/form uploads
  // (2026-11-26); compression-mode descriptions rewritten in #6 (2026-11-27).
  { path: "/", lastmod: "2026-11-27", priority: 1.0 },

  // Exam and form presets (issue #3, phase 1).
  { path: "/ssc-photo-signature-resize", lastmod: "2026-11-26", priority: 0.9 },
  { path: "/upsc-photo-signature-resize", lastmod: "2026-11-26", priority: 0.9 },
  { path: "/signature-resize", lastmod: "2026-11-26", priority: 0.9 },
  // Exam presets, batch 2 (added 2026-11-27).
  { path: "/ibps-photo-signature-resize", lastmod: "2026-11-27", priority: 0.9 },
  { path: "/neet-photo-signature-resize", lastmod: "2026-11-27", priority: 0.9 },

  // Hubs: page files last changed 2026-06-20; their child-page lists last
  // changed when the final expansion page published (see hubLastmod below).
  // /image-compressor: compression-mode descriptions rewritten in #6.
  { path: "/image-compressor", lastmod: "2026-11-27", priority: 0.9 },
  { path: "/jpg-compressor", lastmod: "2026-06-20", priority: 0.8 },
  { path: "/png-compressor", lastmod: "2026-06-20", priority: 0.8 },
  { path: "/webp-compressor", lastmod: "2026-06-20", priority: 0.8 },

  // Converters. "png to webp" is the highest-volume term the site ranks for.
  { path: "/png-to-webp", lastmod: "2026-08-10", priority: 0.9 },
  { path: "/jpg-to-webp", lastmod: "2026-06-20", priority: 0.8 },
  { path: "/image-to-webp", lastmod: "2026-08-10", priority: 0.8 },
];

const HUBS = new Set(["/image-compressor", "/jpg-compressor", "/png-compressor", "/webp-compressor"]);

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const pseoPages = getIndexablePseoPages();
  // Hubs list published pSEO pages, so a hub's content changes whenever one
  // of those pages goes live.
  const latestPublish = getPublishedPseoPages().reduce(
    (latest, page) => (page.publishOn > latest ? page.publishOn : latest),
    "0000-00-00"
  );
  const hubLastmod = (fileDate: string) => (latestPublish > fileDate ? latestPublish : fileDate);

  const staticEntries = STATIC_PAGES.map(({ path, lastmod, priority }) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: HUBS.has(path) ? hubLastmod(lastmod) : lastmod,
    changeFrequency: "monthly" as const,
    priority,
  }));

  const pseo = pseoPages.map((page) => ({
    url: new URL(pseoPath(page.slug), SITE_URL).toString(),
    lastModified: pseoContentUpdated(page),
    changeFrequency: "monthly" as const,
    priority: isPhase1PseoSlug(page.slug) ? 0.8 : 0.7,
  }));

  return [...staticEntries, ...pseo];
}
