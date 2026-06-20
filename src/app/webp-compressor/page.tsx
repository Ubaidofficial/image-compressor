import type { Metadata } from "next";
import Link from "next/link";
import { createPageMetadata } from "@/lib/createPageMetadata";
import ImageCompressor from "@/components/ImageCompressor";
import FAQ from "@/components/FAQ";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createSoftwareApplicationSchema,
  createWebPageSchema,
} from "@/lib/schema";
import { getPublishedPseoPages, pseoPath } from "@/data/pseoPages";
import {
  ContentSection,
  FeatureGrid,
  ProcessSteps,
  PageCallout,
} from "@/components/content/ContentHelpers";

const pagePath = "/webp-compressor";
const pageTitle = "WebP Compressor";
const pageDescription =
  "Browse WebP compressor pages for common file-size targets. Compress WebP images locally in your browser with no uploads.";

export const revalidate = 86400;

const faqs = [
  {
    question: "Can I compress a WebP file further?",
    answer:
      "Yes. Re-compressing a WebP image can reduce its file size, but some quality reduction is expected since WebP is already efficient. Use a higher target size if detail matters more than file size.",
  },
  {
    question: "Does the tool change the format from WebP?",
    answer:
      "No. WebP input produces WebP output. The format stays the same — only the file size changes.",
  },
  {
    question: "Why is my WebP file still too large?",
    answer:
      "Large dimensions, high quality settings, or detailed content can keep WebP files large. Try enabling the resize option with a max width of 1200px or 800px, or switch to Smallest File mode.",
  },
  {
    question: "Can I bulk compress WebP images?",
    answer:
      "Yes. Use the bulk image compressor to process up to 20 WebP images in one batch and download the results as a ZIP file.",
  },
  {
    question: "Are WebP images uploaded to a server?",
    answer:
      "No. All compression runs in your browser. WebP files are never uploaded, stored, or accessible by anyone else.",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: true,
});

export default function WebpCompressorHub() {
  const childPages = getPublishedPseoPages().filter(
    (page) => page.inputFormat === "webp"
  );
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "WebP Compressor", path: pagePath },
  ];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <JsonLd
        data={[
          createWebPageSchema({
            path: pagePath,
            title: pageTitle,
            description: pageDescription,
          }),
          createSoftwareApplicationSchema({
            path: pagePath,
            name: "WebP Compressor",
            description: pageDescription,
            featureList: [
              "WebP image re-compression",
              "WebP output format",
              "Target file size controls",
              "No image uploads",
            ],
          }),
          createBreadcrumbSchema(breadcrumbs),
          createFaqSchema(faqs),
        ]}
      />

      <Breadcrumbs items={breadcrumbs} />

      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] gap-8 lg:gap-10 items-start">
        <div className="pt-4">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 px-3 py-1 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              WebP
            </span>
            <span className="inline-flex items-center rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
              WebP output
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">
            WebP Compressor
          </h1>
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl mb-5">
            Re-compress existing WebP images to meet specific file-size targets
            in your browser. Choose a target page below or use the tool here to
            compress any WebP image to 100KB or less.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Your images are processed in your browser and never uploaded to our
            servers.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-8 shadow-sm dark:shadow-none">
          <ImageCompressor targetKB={100} inputFormat="webp" />
        </div>
      </section>

      <ContentSection heading="When You Need to Compress a WebP">
        <p>
          WebP is already an efficient format, but there are real situations
          where even a well-optimized WebP file exceeds an upload or page-speed
          limit. High-resolution WebP images exported from design tools, large
          product photos, or images that were converted from raw camera files
          can still be 300KB to 1MB or more.
        </p>
        <p>
          Re-compressing a WebP image in your browser lets you reduce it to a
          specific target size without changing the format. The output is a
          smaller WebP file — no format change, no server upload, and no
          software to install.
        </p>
      </ContentSection>

      <PageCallout variant="tip" heading="WebP re-compression tips">
        <p>
          Because WebP is already efficient, very small targets like 20KB may
          require enabling the resize option. Try reducing the max width to
          1200px or 800px when compression alone cannot reach the target. Use
          Smallest File mode for the tightest output.
        </p>
      </PageCallout>

      <FeatureGrid
        heading="What This WebP Compressor Does"
        items={[
          {
            title: "Accepts WebP images",
            desc: "Upload any WebP file, including high-res exports, design assets, or existing web images.",
            icon: "W",
          },
          {
            title: "Keeps WebP format",
            desc: "WebP in, WebP out. The format does not change — only the file size is reduced.",
            icon: "⟳",
          },
          {
            title: "Target size control",
            desc: "Choose targets like 20KB, 50KB, 100KB, or 200KB. Each page preloads the matching limit.",
            icon: "⊙",
          },
          {
            title: "No uploads",
            desc: "Compression runs entirely in your browser. WebP files are never sent to a server.",
            icon: "🔒",
          },
        ]}
      />

      <ProcessSteps
        heading="How to Compress a WebP"
        steps={[
          "Upload your WebP image",
          "Select a target size or use the default 100KB",
          "The tool re-compresses the WebP in your browser",
          "Download the smaller WebP file when the target is met",
        ]}
      />

      <section className="mt-20 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          WebP Compressor Pages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {childPages.map((page) => (
            <Link
              key={page.slug}
              href={pseoPath(page.slug)}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 hover:border-blue-300 dark:hover:border-blue-700 motion-safe:transition-colors"
            >
              <h3 className="font-semibold text-base mb-1">
                {page.h1.replace(/ Online$/u, "")}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {page.metaDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <FAQ items={faqs} heading="WebP Compression FAQ" />
    </div>
  );
}
