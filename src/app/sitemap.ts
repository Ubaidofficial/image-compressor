import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import {
  getIndexablePseoPages,
  isPhase1PseoSlug,
  pseoPath,
} from "@/data/pseoPages";

const LASTMOD = "2026-08-10";
const HUB_PATHS = [
  "/image-compressor",
  "/jpg-compressor",
  "/png-compressor",
  "/webp-compressor",
] as const;

const STATIC_TOOL_PATHS = [
  { path: "/jpg-to-webp", lastmod: "2026-06-20", priority: 0.8 },
  // Converter pages promoted out of noindex on 2026-08-10. "png to webp" alone is
  // ~223k global searches at KD 25 — the highest-volume term the site can target.
  { path: "/png-to-webp", lastmod: "2026-08-10", priority: 0.9 },
  { path: "/image-to-webp", lastmod: "2026-08-10", priority: 0.8 },
  { path: "/contact", lastmod: "2026-08-10", priority: 0.3 },
] as const;

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const homepage = {
    url: new URL("/", SITE_URL).toString(),
    lastModified: LASTMOD,
    changeFrequency: "weekly" as const,
    priority: 1.0,
  };

  const hubs = HUB_PATHS.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: LASTMOD,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const pseo = getIndexablePseoPages().map((page) => ({
    url: new URL(pseoPath(page.slug), SITE_URL).toString(),
    lastModified: page.publishOn,
    changeFrequency: "weekly" as const,
    priority: isPhase1PseoSlug(page.slug) ? 0.8 : 0.7,
  }));

  const staticTools = STATIC_TOOL_PATHS.map(({ path, lastmod, priority }) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: lastmod,
    changeFrequency: "weekly" as const,
    priority,
  }));

  return [homepage, ...hubs, ...staticTools, ...pseo];
}
