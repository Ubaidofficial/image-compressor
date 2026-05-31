import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/image-compressor";
const pageTitle = "Image Compressor Online - WebP Under 100KB";
const pageDescription =
  "Compress images online and download SEO-friendly WebP files under 100KB. Private browser-based image compression for JPG, PNG, and WebP.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: true,
});

export default function ImageCompressorPage() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="image compressor"
      title={pageTitle}
      h1="Image Compressor"
      intro="Upload your JPG, PNG, or WebP image and compress it to 100KB or less. All processing happens privately in your browser."
      intent="general"
      pagePath={pagePath}
      description={pageDescription}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Image Compressor", path: pagePath },
      ]}
    />
  );
}
