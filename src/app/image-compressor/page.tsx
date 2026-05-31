import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/image-compressor";
const pageTitle = "Image Compressor Under 100KB";
const pageDescription =
  "Compress JPG, PNG, and WebP images under 100KB and download SEO-friendly WebP files. Free browser-based image compression with no uploads.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: true,
});

export default function ImageCompressorPage() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="image compressor"
      title={pageTitle}
      h1="Image Compressor Under 100KB"
      intro="Upload a JPG, PNG, or WebP image and compress it to 100KB or less. The tool converts your image to WebP, optimizes file size in your browser, and only enables downloads that meet the size limit."
      intent="general"
      pagePath={pagePath}
      description={pageDescription}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Image Compressor Under 100KB", path: pagePath },
      ]}
    />
  );
}
