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
} from "@/components/content/ContentHelpers";

const pagePath = "/jpg-compressor";
const pageTitle = "JPG Compressor";
const pageDescription =
  "Browse JPG and JPEG compressor pages for common file-size targets. Compress JPG images locally in your browser with no uploads.";

export const revalidate = 86400;

const faqs = [
  {
    question: "Can I compress a JPG without losing quality?",
    answer:
      "Some quality reduction is expected, especially at smaller targets. Use Best Quality mode and avoid enabling resize to keep visual clarity. WebP output often looks better than JPG at the same file size.",
  },
  {
    question: "Do downloads stay in JPG format?",
    answer:
      "Downloads are saved as WebP, not JPG. WebP is typically 25–35% smaller than JPG at similar visual quality, which is why it is the output format.",
  },
  {
    question: "Can I compress JPEG files too?",
    answer:
      "Yes. JPG and JPEG refer to the same format. Both file extensions are accepted.",
  },
  {
    question: "Are JPG images uploaded to a server?",
    answer:
      "No. All compression runs in your browser using the Canvas API. Your files never leave your device.",
  },
  {
    question: "Can I compress multiple JPG images at once?",
    answer:
      "Yes. Use the bulk image compressor to process up to 20 JPG images in one batch and download everything as a ZIP file.",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: true,
});

export default function JpgCompressorHub() {
  const childPages = getPublishedPseoPages().filter(
    (page) => page.inputFormat === "jpg" || page.inputFormat === "jpeg"
  );
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "JPG Compressor", path: pagePath },
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
            name: "JPG Compressor",
            description: pageDescription,
            featureList: [
              "JPG and JPEG image compression",
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
            <span className="inline-flex items-center rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 px-3 py-1 text-sm font-semibold text-orange-700 dark:text-orange-300">
              JPG, JPEG
            </span>
            <span className="inline-flex items-center rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
              WebP output
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">
            JPG Compressor
          </h1>
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl mb-5">
            Compress JPG and JPEG images to common file-size targets directly
            in your browser. Choose a specific target page below or use the
            tool here to compress any JPG to 100KB or less.
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Your images are processed in your browser and never uploaded to our
            servers.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-8 shadow-sm dark:shadow-none">
          <ImageCompressor targetKB={100} inputFormat="jpg" />
        </div>
      </section>

      <ContentSection heading="Why Compress JPG Images?">
        <p>
          JPG is the most common format for photos and complex images. Even at
          moderate quality settings, camera photos and high-resolution graphics
          can reach several megabytes. Compressing JPG files reduces loading
          time for websites, lowers bandwidth usage, and helps images meet
          strict upload limits on forms, portals, and email systems.
        </p>
        <p>
          This tool converts JPG output to WebP, which typically produces files
          25–35% smaller than JPG at similar visual quality. You can often
          reach a smaller final file size than traditional JPG-to-JPG
          compression while keeping the image looking sharp.
        </p>
      </ContentSection>

      <FeatureGrid
        heading="What This JPG Compressor Does"
        items={[
          {
            title: "Accepts JPG and JPEG",
            desc: "Upload any JPG or JPEG file. Both extensions refer to the same format and both work.",
            icon: "J",
          },
          {
            title: "Outputs WebP",
            desc: "Downloads are saved as WebP, which is smaller than JPG at comparable visual quality.",
            icon: "W",
          },
          {
            title: "Target size control",
            desc: "Choose targets like 20KB, 50KB, 100KB, or 200KB. Each page preloads the matching limit.",
            icon: "⊙",
          },
          {
            title: "No uploads",
            desc: "Compression runs entirely in your browser. JPG files are never sent to a server.",
            icon: "🔒",
          },
        ]}
      />

      <ProcessSteps
        heading="How to Compress a JPG"
        steps={[
          "Upload your JPG or JPEG image",
          "Select a target size or use the default 100KB",
          "The tool compresses and converts to WebP in your browser",
          "Download the optimized WebP file when the target is met",
        ]}
      />

      <section className="mt-20 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          JPG Compressor Pages
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

      <FAQ items={faqs} heading="JPG Compression FAQ" />
    </div>
  );
}
