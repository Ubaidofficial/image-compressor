import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/webp-compress-image-to-50kb";
const pageTitle = "Compress WebP Image to 50KB Online";
const pageDescription =
  "Compress WebP images to 50KB or less while keeping them SEO-friendly and browser-ready.";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: pageTitle,
    description: pageDescription,
    path: "/webp-image-compressor",
    index: false,
  }),
  alternates: { canonical: new URL("/webp-compressor", process.env.NEXT_PUBLIC_SITE_URL || "https://100kbconverter.com").toString() },
};

export default function WebpCompressImageTo50Kb() {
  return (
    <SeoCompressorPage
      targetKB={50}
      keyword="compress webp image to 50kb"
      title={pageTitle}
      h1="Compress WebP Image to 50KB"
      intro="Upload your WebP image and compress it to 50KB or less. The output stays WebP and is optimized for fast loading and SEO."
      intent="webp"
      pagePath={pagePath}
      description={pageDescription}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Compress WebP to 50KB", path: pagePath },
      ]}
    />
  );
}
