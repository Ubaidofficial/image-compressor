import type { Metadata } from "next";
import SeoCompressorPage from "@/components/SeoCompressorPage";

export const metadata: Metadata = {
  title: "Convert PNG to WebP Under 100KB",
  description:
    "Convert PNG images to SEO-friendly WebP files under 100KB. Compress images privately in your browser.",
};

export default function PngToWebp100Kb() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="png to webp 100kb"
      title="Convert PNG to WebP Under 100KB"
      h1="PNG to WebP Under 100KB"
      intro="Upload your PNG image and convert it to a WebP file under 100KB. All compression happens privately in your browser."
      intent="png-to-webp"
    />
  );
}
