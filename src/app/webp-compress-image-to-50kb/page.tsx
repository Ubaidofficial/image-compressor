import type { Metadata } from "next";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/webp-compress-image-to-50kb";

export const metadata: Metadata = {
  title: "Compress WebP Image to 50KB Online",
  description:
    "Compress WebP images to 50KB or less while keeping them SEO-friendly and browser-ready.",
  alternates: { canonical: pagePath },
  robots: { index: false, follow: false },
};

export default function WebpCompressImageTo50Kb() {
  return (
    <SeoCompressorPage
      targetKB={50}
      keyword="compress webp image to 50kb"
      title="Compress WebP Image to 50KB Online"
      h1="Compress WebP Image to 50KB"
      intro="Upload your WebP image and compress it to 50KB or less. The output stays WebP and is optimized for fast loading and SEO."
      intent="webp"
      pagePath={pagePath}
    />
  );
}
