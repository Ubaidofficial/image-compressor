import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";
import type { FaqItem } from "@/components/FAQ";

const pagePath = "/jpg-to-webp";
const pageTitle = "JPG to WebP Converter Under 100KB";
const pageDescription =
  "Convert JPG and JPEG images to SEO-friendly WebP files under 100KB. Free browser-based JPG to WebP conversion with no uploads.";

const jpgFaqs: FaqItem[] = [
  {
    question: "Can I convert JPEG files too?",
    answer:
      "Yes. Both .jpg and .jpeg extensions are accepted. The tool treats them the same way and converts both to WebP.",
  },
  {
    question: "Is WebP smaller than JPG?",
    answer:
      "Usually, yes. WebP compression typically produces files 25–35% smaller than equivalent-quality JPG images, which is why it is better for SEO and page speed.",
  },
  {
    question: "Will the output be under 100KB?",
    answer:
      "The tool compresses the WebP output to 100KB or less. The final file may be slightly below 100KB so it never exceeds the limit.",
  },
  {
    question: "Are my JPG images uploaded?",
    answer:
      "No. The conversion happens in your browser. Your images are never uploaded to a server.",
  },
  {
    question: "Can I convert multiple JPG images at once?",
    answer:
      "Yes. Use the bulk image to WebP converter to convert up to 20 images in a single batch and download them as a ZIP file.",
  },
];

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
      h1="JPG to WebP Converter"
      intro="Convert JPG or JPEG images to lightweight WebP files under 100KB. The conversion happens in your browser, and your images are never uploaded."
      intent="jpg-to-webp"
      pagePath={pagePath}
      description={pageDescription}
      howToTitle="How to Convert JPG to WebP"
      howToSteps={[
        "Drag and drop your JPG or JPEG image, or click to browse.",
        "The tool converts it to WebP and compresses it to 100KB or less.",
        "Review the original and converted sizes and dimensions.",
        "Download the WebP file.",
      ]}
      faqItems={jpgFaqs}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Converters", path: "/image-to-webp" },
        { name: "JPG to WebP", path: pagePath },
      ]}
    />
  );
}
