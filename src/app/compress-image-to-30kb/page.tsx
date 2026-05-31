import type { Metadata } from "next";
import SeoCompressorPage from "@/components/SeoCompressorPage";

export const metadata: Metadata = {
  title: "Compress Image to 30KB Online",
  description:
    "Compress JPG, PNG, and WebP images to 30KB or less. Get an SEO-friendly WebP image processed privately in your browser.",
};

export default function CompressImageTo30Kb() {
  return (
    <SeoCompressorPage
      targetKB={30}
      keyword="compress image to 30kb"
      title="Compress Image to 30KB Online"
      h1="Compress Image to 30KB"
      intro="Upload your JPG, PNG, or WebP image and compress it to 30KB or less. The output is always a WebP file optimized for fast loading and SEO."
      intent="general"
    />
  );
}
