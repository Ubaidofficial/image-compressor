import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import {
  getPublishedPseoPages,
  isPhase1PseoSlug,
  pseoPath,
} from "@/data/pseoPages";

const LASTMOD = "2026-06-20";
const HUB_PATHS = [
  "/image-compressor",
  "/jpg-compressor",
  "/png-compressor",
  "/webp-compressor",
] as const;

const STATIC_TOOL_PATHS = [
  { path: "/jpg-to-webp", lastmod: "2026-06-20", priority: 0.8 },
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

  const pseo = getPublishedPseoPages().map((page) => ({
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
