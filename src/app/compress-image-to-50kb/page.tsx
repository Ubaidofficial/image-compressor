import type { Metadata } from "next";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/compress-image-to-50kb";

export const metadata: Metadata = {
  title: "Compress Image to 50KB Online",
  description:
    "Compress JPG, PNG, and WebP images to 50KB or less. Get an SEO-friendly WebP image processed privately in your browser.",
  alternates: { canonical: pagePath },
  robots: { index: true, follow: true },
};

export default function CompressImageTo50Kb() {
  return (
    <SeoCompressorPage
      targetKB={50}
      keyword="compress image to 50kb"
      title="Compress Image to 50KB Online"
      h1="Compress Image to 50KB"
      intro="Upload your JPG, PNG, or WebP image and compress it to 50KB or less. The output is always a WebP file optimized for fast loading and SEO."
      intent="general"
      pagePath={pagePath}
    />
  );
}
