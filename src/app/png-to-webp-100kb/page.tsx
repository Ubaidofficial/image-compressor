import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/png-to-webp-100kb";
const pageTitle = "Convert PNG to WebP Under 100KB";
const pageDescription =
  "Convert PNG images to SEO-friendly WebP files under 100KB. Compress images privately in your browser.";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: pageTitle,
    description: pageDescription,
    path: "/png-to-webp",
    index: false,
  }),
  alternates: { canonical: new URL("/png-to-webp", process.env.NEXT_PUBLIC_SITE_URL || "https://100kbconverter.com").toString() },
};

export default function PngToWebp100Kb() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="png to webp 100kb"
      title={pageTitle}
      h1="PNG to WebP Under 100KB"
      intro="Upload your PNG image and convert it to a WebP file under 100KB. All compression happens privately in your browser."
      intent="png-to-webp"
      pagePath={pagePath}
      description={pageDescription}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "PNG to WebP 100KB", path: pagePath },
      ]}
    />
  );
}
