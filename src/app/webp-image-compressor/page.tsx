import type { Metadata } from "next";
import SeoCompressorPage from "@/components/SeoCompressorPage";

export const metadata: Metadata = {
  title: "WebP Image Compressor — Compress WebP Online",
  description:
    "Compress WebP images online to smaller sizes. Private browser-based compression with no uploads.",
};

export default function WebpImageCompressorPage() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="webp image compressor"
      title="WebP Image Compressor — Compress WebP Online"
      h1="WebP Image Compressor"
      intro="Upload your WebP image and compress it to 100KB or less. Keep the WebP format and optimize for SEO performance."
      intent="webp"
    />
  );
}
