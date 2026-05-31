import type { MetadataRoute } from "next";

const pages = [
  "",
  "/compress-image-to-20kb",
  "/compress-image-to-30kb",
  "/compress-image-to-50kb",
  "/compress-image-to-75kb",
  "/compress-image-to-100kb",
  "/webp-compress-image-to-50kb",
  "/webp-compress-image-to-100kb",
  "/jpg-to-webp-100kb",
  "/png-to-webp-100kb",
  "/image-compressor",
  "/webp-image-compressor",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://webp-image-compressor.railway.app";

  return pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page === "" ? 1 : 0.8,
  }));
}
