import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/compress-image-to-75kb";
const pageTitle = "Compress Image to 75KB Online";
const pageDescription =
  "Compress JPG, PNG, and WebP images to 75KB or less. Get an SEO-friendly WebP image processed privately in your browser.";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: pageTitle,
    description: pageDescription,
    path: "/image-compressor",
    index: false,
  }),
  alternates: { canonical: new URL("/image-compressor", process.env.NEXT_PUBLIC_SITE_URL || "https://100kbconverter.com").toString() },
};

export default function CompressImageTo75Kb() {
  return (
    <SeoCompressorPage
      targetKB={75}
      keyword="compress image to 75kb"
      title={pageTitle}
      h1="Compress Image to 75KB"
      intro="Upload your JPG, PNG, or WebP image and compress it to 75KB or less. The output is always a WebP file optimized for fast loading and SEO."
      intent="general"
      pagePath={pagePath}
      description={pageDescription}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Compress Image to 75KB", path: pagePath },
      ]}
    />
  );
}
