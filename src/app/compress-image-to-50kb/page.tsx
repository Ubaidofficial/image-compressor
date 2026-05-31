import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/compress-image-to-50kb";
const pageTitle = "Compress Image to 50KB Online";
const pageDescription =
  "Compress JPG, PNG, and WebP images to 50KB or less and download an SEO-friendly WebP file. Private browser-based compression.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/image-compressor",
  index: false,
});

export default function CompressImageTo50Kb() {
  return (
    <SeoCompressorPage
      targetKB={50}
      keyword="compress image to 50kb"
      title={pageTitle}
      h1="Compress Image to 50KB"
      intro="Upload your JPG, PNG, or WebP image and compress it to 50KB or less. The output is always a WebP file optimized for fast loading and SEO."
      intent="general"
      pagePath={pagePath}
      description={pageDescription}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Compress Image to 50KB", path: pagePath },
      ]}
    />
  );
}
