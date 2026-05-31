import type { Metadata } from "next";
import SeoCompressorPage from "@/components/SeoCompressorPage";

const pagePath = "/png-to-webp";

export const metadata: Metadata = {
  title: "PNG to WebP Converter",
  description:
    "Convert PNG images to SEO-friendly WebP files under 100KB. Private browser-based image conversion.",
  alternates: { canonical: pagePath },
  robots: { index: true, follow: true },
};

export default function PngToWebp() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="png to webp"
      title="PNG to WebP Converter"
      h1="Convert PNG to WebP"
      intro="Upload your PNG image and convert it to a WebP file under 100KB. All compression happens privately in your browser."
      intent="png-to-webp"
      pagePath={pagePath}
    />
  );
}
