import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/compress-image-to-100kb";
const pageTitle = "Compress Image to 100KB Online";
const pageDescription =
  "Compress images to 100KB or less and download an SEO-friendly WebP file. Fast, private, browser-based image compression.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: true,
});

export default function CompressImageTo100Kb() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="compress image to 100kb"
      title={pageTitle}
      h1="Compress Image to 100KB"
      intro="Need an image under a 100KB upload limit? Upload your JPG, PNG, or WebP image and download an optimized WebP file that is 100KB or less. The final file may be slightly below 100KB so it never exceeds the limit."
      intent="general"
      pagePath={pagePath}
      description={pageDescription}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Compress Image to 100KB", path: pagePath },
      ]}
    />
  );
}
