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

const pagePath = "/png-compressor";
const pageTitle = "PNG Compressor";
const pageDescription =
  "Browse PNG compressor pages for common file-size targets. Compress PNG images locally in your browser with no uploads.";

export const revalidate = 86400;

const faqs = [
  {
    question: "Can I compress a PNG without losing transparency?",
    answer:
      "The tool outputs WebP files, which support transparency. Review the preview after compression to confirm the transparent areas look correct before downloading.",
  },
  {
    question: "Why are PNG files larger than JPG?",
    answer:
      "PNG uses lossless compression, which preserves every pixel exactly. This keeps quality high but results in larger files, especially for screenshots and images with many colors.",
  },
  {
    question: "Is WebP better than PNG for web use?",
    answer:
      "Usually yes. WebP produces smaller files than PNG while keeping good visual quality and supporting transparency. It is widely supported in modern browsers.",
  },
  {
    question: "Can I compress a PNG screenshot?",
    answer:
      "Yes. Upload any PNG including screenshots, UI exports, or design assets. The tool compresses it and outputs a smaller WebP file.",
  },
  {
    question: "Are PNG files uploaded to a server?",
    answer:
      "No. Compression runs entirely in your browser. PNG files are never uploaded, stored, or accessible by anyone else.",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: true,
});

export default function PngCompressorHub() {
  const childPages = getPublishedPseoPages().filter(
    (page) => page.inputFormat === "png"
  );
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "PNG Compressor", path: pagePath },
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
            name: "PNG Compressor",
            description: pageDescription,
            featureList: [
              "PNG image compression",
              "Transparency-aware WebP output",
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
            <span className="inline-flex items-center rounded-full bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 px-3 py-1 text-sm font-semibold text-teal-700 dark:text-teal-300">
              PNG
            </span>
            <span className="inline-flex items-center rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
              WebP output
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">
            PNG Compressor
          </h1>
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl mb-5">
            Compress PNG screenshots, graphics, and transparent images to
            common file-size targets in your browser. Choose a specific target
            page below or use the tool here to compress any PNG to 100KB or
            less.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Your images are processed in your browser and never uploaded to our
            servers.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-8 shadow-sm dark:shadow-none">
          <ImageCompressor targetKB={100} inputFormat="png" />
        </div>
      </section>

      <ContentSection heading="Why PNG Files Are Often Larger">
        <p>
          PNG uses lossless compression, which preserves every pixel exactly.
          This is ideal for screenshots, logos, UI exports, and images with
          transparency — but it results in larger file sizes than formats like
          JPG or WebP, especially for images with many colors or fine detail.
        </p>
        <p>
          Converting PNG to WebP usually produces a significantly smaller file
          while keeping good visual quality and preserving transparency. The
          output is ready to use in modern browsers, where WebP support is
          universal.
        </p>
      </ContentSection>

      <PageCallout variant="tip" heading="PNG with transparency">
        <p>
          WebP fully supports transparency. After compression, check the
          preview to confirm transparent areas look correct before downloading.
          If edges look rough, try Best Quality mode or avoid enabling the
          resize option.
        </p>
      </PageCallout>

      <FeatureGrid
        heading="What This PNG Compressor Does"
        items={[
          {
            title: "Accepts PNG images",
            desc: "Upload screenshots, logos, transparent graphics, or any PNG file.",
            icon: "P",
          },
          {
            title: "Transparency-aware output",
            desc: "WebP output preserves transparency, so icons and layered graphics stay correct.",
            icon: "◻",
          },
          {
            title: "Target size control",
            desc: "Choose targets like 20KB, 50KB, 100KB, or 200KB. Each page preloads the matching limit.",
            icon: "⊙",
          },
          {
            title: "No uploads",
            desc: "Compression runs entirely in your browser. PNG files are never sent to a server.",
            icon: "🔒",
          },
        ]}
      />

      <ProcessSteps
        heading="How to Compress a PNG"
        steps={[
          "Upload your PNG image",
          "Select a target size or use the default 100KB",
          "The tool converts to WebP and compresses in your browser",
          "Download the optimized WebP file when the target is met",
        ]}
      />

      <section className="mt-20 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          PNG Compressor Pages
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

      <FAQ items={faqs} heading="PNG Compression FAQ" />
    </div>
  );
}
