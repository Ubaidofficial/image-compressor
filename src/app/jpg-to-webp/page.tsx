import type { Metadata } from "next";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/jpg-to-webp";

export const metadata: Metadata = {
  title: "JPG to WebP Converter",
  description:
    "Convert JPG images to SEO-friendly WebP files under 100KB. Free browser-based conversion with no uploads.",
  alternates: { canonical: pagePath },
  robots: { index: true, follow: true },
};

export default function JpgToWebp() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="jpg to webp"
      title="JPG to WebP Converter"
      h1="Convert JPG to WebP"
      intro="Upload your JPG or JPEG image and convert it to a WebP file under 100KB. All compression happens in your browser."
      intent="jpg-to-webp"
      pagePath={pagePath}
    />
  );
}
