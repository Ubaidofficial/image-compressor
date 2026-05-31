import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/webp-compress-image-to-100kb";
const pageTitle = "Compress WebP Image to 100KB Online";
const pageDescription =
  "Compress WebP images to 100KB or less while keeping them fast, lightweight, and SEO-friendly.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/compress-image-to-100kb",
  index: false,
});

export default function WebpCompressImageTo100Kb() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="compress webp image to 100kb"
      title={pageTitle}
      h1="Compress WebP Image to 100KB"
      intro="Upload your WebP image and compress it to 100KB or less. Keep the WebP format and optimize for SEO performance."
      intent="webp"
      pagePath={pagePath}
      description={pageDescription}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Compress WebP to 100KB", path: pagePath },
      ]}
    />
  );
}
