import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import BulkImageCompressor from "@/components/BulkImageCompressor";
import FAQ from "@/components/FAQ";
import RelatedTools from "@/components/RelatedTools";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
  createWebPageSchema,
  createSoftwareApplicationSchema,
  createBreadcrumbSchema,
  createFaqSchema,
} from "@/lib/schema";
import type { FaqItem } from "@/components/FAQ";

const pagePath = "/bulk-image-to-webp";
const pageTitle = "Bulk Image to WebP Converter";
const pageDescription =
  "Convert multiple JPG, PNG, and WebP images to SEO-friendly WebP files under 100KB each. Bulk browser-based conversion with no uploads.";

const bulkFaqs: FaqItem[] = [
  {
    question: "Can I convert multiple images at once?",
    answer:
      "Yes. You can upload up to 20 images and compress them all to WebP in one batch. Each image is processed to stay under your selected target size.",
  },
  {
    question: "Are my images uploaded?",
    answer:
      "No. All compression happens in your browser. Your images are never uploaded to a server.",
  },
  {
    question: "Why are outputs saved as WebP?",
    answer:
      "WebP produces smaller file sizes than JPG and PNG while keeping good visual quality. This makes your images faster to load and better for SEO.",
  },
  {
    question: "Can every image be compressed under 100KB?",
    answer:
      "Most images can be compressed under 100KB, but very large or complex images may not fit. If compression fails for an image, it is excluded from the ZIP download.",
  },
  {
    question: "What happens if an image fails?",
    answer:
      "Failed images are clearly marked and excluded from the ZIP download. Only successfully compressed images are included.",
  },
  {
    question: "Can I download all images together?",
    answer:
      "Yes. After compression completes, you can download all successful images as a single ZIP file.",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: true,
});

export default function BulkImageToWebp() {
  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-12">
      <JsonLd
        data={[
          createWebPageSchema({
            path: pagePath,
            title: pageTitle,
            description: pageDescription,
          }),
          createSoftwareApplicationSchema({
            path: pagePath,
            name: "Bulk Image to WebP Converter",
            description: pageDescription,
            featureList: [
              "Bulk image compression",
              "WebP image output",
              "Compress images under 100KB",
              "ZIP download",
              "No image uploads",
            ],
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Bulk Image to WebP", path: pagePath },
          ]),
          createFaqSchema(bulkFaqs),
        ]}
      />

      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Bulk Image to WebP", path: pagePath },
        ]}
      />

      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3">
        Bulk Image to WebP Converter
      </h1>
      <p className="text-center text-zinc-500 dark:text-zinc-400 mb-8 max-w-lg mx-auto">
        Upload multiple images and convert them to optimized WebP files under
        100KB each. Everything runs directly in your browser so your images are
        never uploaded.
      </p>

      <BulkImageCompressor />

      <section className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          How to Bulk Convert Images to WebP
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <li>Drop multiple images or click to browse and select up to 20 files.</li>
          <li>Choose a target size — 50KB or 100KB per image.</li>
          <li>Click Compress All to process every image in your browser.</li>
          <li>Review results and download individual files or all as a ZIP.</li>
        </ol>
      </section>

      <section className="mt-12 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Why bulk WebP conversion helps website workflows
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Converting your image library to WebP in bulk saves time and ensures
          consistency. WebP files are typically smaller than JPG and PNG, which
          means faster page loads and less bandwidth. The bulk tool processes up
          to 20 images and lets you download them as a single ZIP.
        </p>
      </section>

      <section className="mt-12 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Browser Privacy and Local Processing
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Every image stays on your device. Compression runs entirely in your
          browser using the Canvas API. No images are uploaded, stored, or
          accessible by anyone else. Once you close the page, all data is gone.
        </p>
      </section>

      <FAQ items={bulkFaqs} />
      <RelatedTools excludePath={pagePath} />
    </div>
  );
}
