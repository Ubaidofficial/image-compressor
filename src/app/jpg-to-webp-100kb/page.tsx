import type { Metadata } from "next";
import SeoCompressorPage from "@/components/SeoCompressorPage";

export const metadata: Metadata = {
  title: "Convert JPG to WebP Under 100KB",
  description:
    "Convert JPG images to SEO-friendly WebP files under 100KB. Private browser-based compression with no uploads.",
};

export default function JpgToWebp100Kb() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="jpg to webp 100kb"
      title="Convert JPG to WebP Under 100KB"
      h1="JPG to WebP Under 100KB"
      intro="Upload your JPG or JPEG image and convert it to a WebP file under 100KB. All compression happens in your browser."
      intent="jpg-to-webp"
    />
  );
}
