import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/jpg-to-webp-100kb";
const pageTitle = "Convert JPG to WebP Under 100KB";
const pageDescription =
  "Convert JPG images to SEO-friendly WebP files under 100KB. Private browser-based compression with no uploads.";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: pageTitle,
    description: pageDescription,
    path: "/jpg-to-webp",
    index: false,
  }),
  alternates: { canonical: new URL("/jpg-to-webp", process.env.NEXT_PUBLIC_SITE_URL || "https://100kbconverter.com").toString() },
};

export default function JpgToWebp100Kb() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="jpg to webp 100kb"
      title={pageTitle}
      h1="JPG to WebP Under 100KB"
      intro="Upload your JPG or JPEG image and convert it to a WebP file under 100KB. All compression happens in your browser."
      intent="jpg-to-webp"
      pagePath={pagePath}
      description={pageDescription}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "JPG to WebP 100KB", path: pagePath },
      ]}
    />
  );
}
