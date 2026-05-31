import type { MetadataRoute } from "next";
import { getIndexableConfigs } from "@/lib/pageConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://webp-image-compressor.example.com";

  const configs = getIndexableConfigs();

  return configs.map((c) => ({
    url: `${baseUrl}${c.path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: c.path === "/" ? 1 : 0.8,
  }));
}
