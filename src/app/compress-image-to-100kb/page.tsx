import type { Metadata } from "next";
import SeoCompressorPage from "@/components/SeoCompressorPage";

export const metadata: Metadata = {
  title: "Compress Image to 100KB Online",
  description:
    "Compress images to 100KB or less and download an SEO-friendly WebP file. Fast, private, and browser-based.",
};

export default function CompressImageTo100Kb() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="compress image to 100kb"
      title="Compress Image to 100KB Online"
      h1="Compress Image to 100KB"
      intro="Upload your JPG, PNG, or WebP image and compress it to 100KB or less. The output is always a WebP file optimized for fast loading and SEO."
      intent="general"
    />
  );
}
