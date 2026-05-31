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
import {
  ContentSection,
  FeatureGrid,
  ProcessSteps,
  PageCallout,
  OnThisPage,
} from "@/components/content/ContentHelpers";
import Link from "next/link";
import BulkWorkflowIllustration from "@/components/illustrations/BulkWorkflowIllustration";

const pagePath = "/bulk-image-to-webp";
const pageTitle = "Bulk Image to WebP Converter";
const pageDescription =
  "Convert multiple JPG, PNG, and WebP images to SEO-friendly WebP files under 100KB each. Bulk browser-based conversion with no uploads.";

const bulkFaqs: FaqItem[] = [
  {
    question: "How many images can I convert at once?",
    answer:
      "You can upload up to 20 images and compress them all to WebP in one batch. Each image is processed to stay under your selected target size of 50KB or 100KB.",
  },
  {
    question: "Are my images uploaded?",
    answer:
      "No. All compression and conversion happens in your browser using the Canvas API. Your images are never uploaded to a server.",
  },
  {
    question: "Why are outputs saved as WebP?",
    answer:
      "WebP produces smaller file sizes than JPG and PNG while maintaining good visual quality. This makes your images faster to load and more efficient for websites.",
  },
  {
    question: "Can every image be compressed under 100KB?",
    answer:
      "Most images can be compressed under 100KB, but very large or highly detailed images may not fit. Failed images are excluded from the ZIP download and clearly marked in the CSV report.",
  },
  {
    question: "What happens if an image fails?",
    answer:
      "Failed images are clearly marked and excluded from the ZIP download. Only successfully compressed images are included. The compression-report.csv file inside the ZIP lists every file with success or failure status.",
  },
  {
    question: "Can I download all images together?",
    answer:
      "Yes. After compression completes, you can download all successful images as a single ZIP file. A CSV report is included inside the ZIP with details for every processed image.",
  },
  {
    question: "How does filename handling work for bulk downloads?",
    answer:
      "You can choose SEO-friendly filenames (e.g., my-photo-compressed-to-100kb.webp), keep original names, or append the target size. If filenames collide, numbers are added automatically to make them unique.",
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
              "CSV compression report",
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
        Upload multiple JPG, PNG, and WebP images and convert them to optimized
        WebP files under 100KB each. Everything runs directly in your browser
        so your images are never uploaded.
      </p>

      <BulkImageCompressor />

      <OnThisPage
        links={[
          { label: "How it works", href: "#how-it-works" },
          { label: "When to use", href: "#when-to-use" },
          { label: "ZIP and CSV", href: "#zip-and-csv" },
          { label: "Filenames", href: "#filenames" },
          { label: "Privacy", href: "#privacy" },
        ]}
      />

      <ProcessSteps
        heading="How Bulk WebP Conversion Works"
        steps={[
          "Drop multiple images or click to browse and select up to 20 files",
          "Choose a target size — 50KB or 100KB per image",
          "Click Compress All to process every image in your browser",
          "Review results and download individual files or all as a ZIP",
        ]}
      />

      <div className="mt-16 max-w-xl mx-auto">
        <BulkWorkflowIllustration />
      </div>

      <ContentSection id="when-to-use" heading="When to Use Bulk Conversion">
        <p>
          Bulk WebP conversion is useful when you have multiple images to
          compress — product catalogs, blog image libraries, website asset
          folders, or batches of screenshots. Instead of compressing one image
          at a time, the bulk tool processes up to 20 images in a single batch
          and lets you download all successful conversions as a ZIP file.
        </p>
        <p>
          The tool works well for preparing images before uploading them to a
          website, sending them in an email, or archiving them with smaller
          file sizes. Because everything runs in your browser, there is no
          server delay — processing speed depends on your device and the size
          of the images.
        </p>
      </ContentSection>

      <FeatureGrid
        id="bulk-features"
        heading="Bulk Workflow Features"
        items={[
          {
            title: "Up to 20 images",
            desc: "Process up to 20 JPG, PNG, or WebP images in a single batch with 3-at-a-time parallel compression.",
          },
          {
            title: "ZIP download",
            desc: "Save all successful WebP conversions as a single ZIP file, along with a compression-report.csv for every processed image.",
          },
          {
            title: "Filename controls",
            desc: "Choose SEO-friendly names, keep original names, or append -100kb. Duplicate names get automatic numeric suffixes.",
          },
          {
            title: "Per-file results",
            desc: "See compression savings, dimension changes, and success/failure status for every image in the batch.",
          },
        ]}
      />

      <ContentSection id="zip-and-csv" heading="ZIP Download and CSV Report">
        <p>
          After processing completes, the Download All as ZIP button creates a
          single ZIP file containing all successfully compressed WebP images
          and a file named compression-report.csv. The CSV report includes
          every processed image — both successful and failed — with columns for
          original filename, output filename, original size in KB, compressed
          size in KB, original dimensions, output dimensions, and success or
          failure status.
        </p>
        <p>
          Failed images are not included as WebP files in the ZIP, but they
          appear in the CSV report so you have a complete record. This is
          useful when you need to audit which images compressed successfully
          and which need different settings.
        </p>
      </ContentSection>

      <ContentSection id="filenames" heading="Filename Format Options">
        <p>
          The filename dropdown lets you choose how output files are named.
          <strong> SEO friendly</strong> converts the original filename into a
          clean, lowercase, hyphenated name with the target size appended
          (e.g., sunset-photo-compressed-to-100kb.webp).{" "}
          <strong>Keep original name</strong> preserves the original filename
          and replaces the extension with .webp.{" "}
          <strong>Add &quot;-100kb&quot;</strong> appends the target size to
          the original name. If any filenames collide, a number is
          automatically added to keep them unique (e.g., photo-2.webp).
        </p>
      </ContentSection>

      <PageCallout variant="privacy" heading="Privacy for Batch Processing">
        <p>
          All images in the batch stay on your device. Compression runs in your
          browser using the Canvas API and WebP encoder. No images are
          uploaded, stored, or accessible by anyone else. Processing happens in
          parallel on your device — the speed depends on your computer or phone
          and the size of the images. Large batches of high-resolution images
          may take longer because each image goes through quality adjustment
          and optional resizing.
        </p>
      </PageCallout>

      <ContentSection id="privacy" heading="Common Bulk Workflows">
        <p>
          A common workflow is to prepare a folder of product photos before
          uploading them to an e-commerce platform. Another is converting a
          blog&apos;s image library from JPG to WebP so all pages load faster.
          The CSV report helps track which images were compressed and by how
          much, making it easy to update content management systems or
          spreadsheets.
        </p>
        <p>
          For single-image compression, use the{" "}
          <Link
            href="/image-compressor"
            className="text-blue-600 hover:underline"
          >
            image compressor
          </Link>
          . For JPG-only conversion, try the{" "}
          <Link
            href="/jpg-to-webp"
            className="text-blue-600 hover:underline"
          >
            JPG to WebP converter
          </Link>
          . If you need images compressed to exactly 100KB, the{" "}
          <Link
            href="/compress-image-to-100kb"
            className="text-blue-600 hover:underline"
          >
            compress image to 100KB
          </Link>{" "}
          tool is available.
        </p>
      </ContentSection>

      <FAQ items={bulkFaqs} />
      <RelatedTools excludePath={pagePath} />
    </div>
  );
}
