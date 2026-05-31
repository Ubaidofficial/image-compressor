import type { Metadata } from "next";
import SeoCompressorPage from "@/components/SeoCompressorPage";

export const metadata: Metadata = {
  title: "Compress WebP Image to 100KB Online",
  description:
    "Compress WebP images to 100KB or less while keeping them SEO-friendly and browser-ready.",
};

export default function WebpCompressImageTo100Kb() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="compress webp image to 100kb"
      title="Compress WebP Image to 100KB Online"
      h1="Compress WebP Image to 100KB"
      intro="Upload your WebP image and compress it to 100KB or less. Keep the WebP format and optimize for SEO performance."
      intent="webp"
    />
  );
}
