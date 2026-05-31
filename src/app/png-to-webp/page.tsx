import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/png-to-webp";
const pageTitle = "PNG to WebP Converter";
const pageDescription =
  "Convert PNG images to SEO-friendly WebP files under 100KB. Private browser-based PNG to WebP conversion with no uploads.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/jpg-to-webp",
  index: false,
});

export default function PngToWebp() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="png to webp"
      title={pageTitle}
      h1="Convert PNG to WebP"
      intro="Upload your PNG image and convert it to a WebP file under 100KB. All compression happens privately in your browser."
      intent="png-to-webp"
      pagePath={pagePath}
      description={pageDescription}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Converters", path: "/image-to-webp" },
        { name: "PNG to WebP", path: pagePath },
      ]}
    />
  );
}
