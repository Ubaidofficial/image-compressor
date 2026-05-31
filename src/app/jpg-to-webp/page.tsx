import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/jpg-to-webp";
const pageTitle = "JPG to WebP Converter";
const pageDescription =
  "Convert JPG images to SEO-friendly WebP files under 100KB. Free browser-based JPG to WebP conversion with no uploads.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: true,
});

export default function JpgToWebp() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="jpg to webp"
      title={pageTitle}
      h1="Convert JPG to WebP"
      intro="Upload your JPG or JPEG image and convert it to a WebP file under 100KB. All compression happens in your browser."
      intent="jpg-to-webp"
      pagePath={pagePath}
      description={pageDescription}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Converters", path: "/image-to-webp" },
        { name: "JPG to WebP", path: pagePath },
      ]}
    />
  );
}
