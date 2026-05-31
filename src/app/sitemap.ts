import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getActiveIndexableRoutes } from "@/lib/seoLaunch";

const routePriorities: Record<string, number> = {
  "/": 1.0,
  "/bulk-image-to-webp": 0.9,
  "/image-compressor": 0.9,
  "/webp-image-compressor": 0.9,
  "/jpg-to-webp": 0.85,
  "/png-to-webp": 0.85,
  "/image-to-webp": 0.85,
  "/compress-image-to-100kb": 0.8,
  "/compress-image-to-50kb": 0.8,
  "/webp-compress-image-to-100kb": 0.8,
  "/privacy": 0.3,
  "/terms": 0.3,
  "/contact": 0.3,
};

const monthlyPaths = new Set(["/privacy", "/terms", "/contact"]);

function getPriority(path: string): number {
  return routePriorities[path] ?? 0.5;
}

function getChangeFrequency(path: string): "weekly" | "monthly" {
  return monthlyPaths.has(path) ? "monthly" : "weekly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = getActiveIndexableRoutes();

  return paths.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: new Date(),
    changeFrequency: getChangeFrequency(path),
    priority: getPriority(path),
  }));
}
