import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/compress-image-to-30kb";
const pageTitle = "Compress Image to 30KB Online";
const pageDescription =
  "Compress JPG, PNG, and WebP images to 30KB or less. Get an SEO-friendly WebP image processed privately in your browser.";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: pageTitle,
    description: pageDescription,
    path: "/image-compressor",
    index: false,
  }),
  alternates: { canonical: new URL("/image-compressor", process.env.NEXT_PUBLIC_SITE_URL || "https://100kbconverter.com").toString() },
};

export default function CompressImageTo30Kb() {
  return (
    <SeoCompressorPage
      targetKB={30}
      keyword="compress image to 30kb"
      title={pageTitle}
      h1="Compress Image to 30KB"
      intro="Upload your JPG, PNG, or WebP image and compress it to 30KB or less. The output is always a WebP file optimized for fast loading and SEO."
      intent="general"
      pagePath={pagePath}
      description={pageDescription}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Compress Image to 30KB", path: pagePath },
      ]}
    />
  );
}
