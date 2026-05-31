import type { Metadata } from "next";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/compress-image-to-75kb";

export const metadata: Metadata = {
  title: "Compress Image to 75KB Online",
  description:
    "Compress JPG, PNG, and WebP images to 75KB or less. Get an SEO-friendly WebP image processed privately in your browser.",
  alternates: { canonical: pagePath },
  robots: { index: false, follow: false },
};

export default function CompressImageTo75Kb() {
  return (
    <SeoCompressorPage
      targetKB={75}
      keyword="compress image to 75kb"
      title="Compress Image to 75KB Online"
      h1="Compress Image to 75KB"
      intro="Upload your JPG, PNG, or WebP image and compress it to 75KB or less. The output is always a WebP file optimized for fast loading and SEO."
      intent="general"
      pagePath={pagePath}
    />
  );
}
