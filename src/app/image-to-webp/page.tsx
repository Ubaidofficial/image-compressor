import type { Metadata } from "next";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/image-to-webp";

export const metadata: Metadata = {
  title: "Image to WebP Converter",
  description:
    "Convert JPG, PNG, and WebP images into SEO-friendly WebP files under 100KB directly in your browser.",
  alternates: { canonical: pagePath },
  robots: { index: true, follow: true },
};

export default function ImageToWebp() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="image to webp"
      title="Image to WebP Converter"
      h1="Convert Image to WebP"
      intro="Upload your JPG, PNG, or WebP image and convert it to an optimized WebP file under 100KB. All processing happens privately in your browser."
      intent="general"
      pagePath={pagePath}
    />
  );
}
