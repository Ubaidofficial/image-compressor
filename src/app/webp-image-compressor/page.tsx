import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/webp-image-compressor";
const pageTitle = "Compress WebP Online - 100KB Converter";
const pageDescription =
  "Compress WebP images under 100KB while keeping them fast and SEO-friendly. Free browser-based WebP compression with no uploads.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/image-compressor",
  index: false,
});

export default function WebpImageCompressorPage() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="webp image compressor"
      title={pageTitle}
      h1="WebP Compressor"
      intro="Upload your WebP image and compress it to 100KB or less. Keep the WebP format and optimize for SEO performance."
      intent="webp"
      pagePath={pagePath}
      description={pageDescription}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "WebP Compressor", path: pagePath },
      ]}
    />
  );
}
