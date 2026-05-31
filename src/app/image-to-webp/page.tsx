import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/image-to-webp";
const pageTitle = "Image to WebP Converter";
const pageDescription =
  "Convert JPG, PNG, and WebP images into SEO-friendly WebP files under 100KB directly in your browser.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/image-compressor",
  index: false,
});

export default function ImageToWebp() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="image to webp"
      title={pageTitle}
      h1="Convert Image to WebP"
      intro="Upload your JPG, PNG, or WebP image and convert it to an optimized WebP file under 100KB. All processing happens privately in your browser."
      intent="general"
      pagePath={pagePath}
      description={pageDescription}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Convert Image to WebP", path: pagePath },
      ]}
    />
  );
}
