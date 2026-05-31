import type { Metadata } from "next";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/image-compressor";

export const metadata: Metadata = {
  title: "Image Compressor — Compress Images Online",
  description:
    "Compress JPG, PNG, and WebP images to smaller sizes online. Private browser-based compression with no uploads.",
  alternates: { canonical: pagePath },
  robots: { index: true, follow: true },
};

export default function ImageCompressorPage() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="image compressor"
      title="Image Compressor — Compress Images Online"
      h1="Image Compressor"
      intro="Upload your JPG, PNG, or WebP image and compress it to 100KB or less. All processing happens privately in your browser."
      intent="general"
      pagePath={pagePath}
    />
  );
}
