import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import ImageCompressor from "@/components/ImageCompressor";
import Link from "next/link";
import FAQ from "@/components/FAQ";
import { JsonLd } from "@/components/JsonLd";
import {
  createWebPageSchema,
  createSoftwareApplicationSchema,
  createBreadcrumbSchema,
  createFaqSchema,
} from "@/lib/schema";
import type { FaqItem } from "@/components/FAQ";
import {
  ContentCardGrid,
  UseCaseGrid,
  ComparisonTable,
  ContentSection,
} from "@/components/content/ContentHelpers";
import HeroCompressionIllustration from "@/components/illustrations/HeroCompressionIllustration";
import BulkWebPIllustration from "@/components/illustrations/BulkWebPIllustration";
import PrivacyBrowserIllustration from "@/components/illustrations/PrivacyBrowserIllustration";

const pagePath = "/";
const pageTitle = "100KB Converter - Compress Images Under 100KB";
const pageDescription =
  "Compress and convert images under 100KB. Convert JPG, PNG, and WebP to SEO-friendly WebP files. Free browser-based compression with no uploads.";

const homeFaqs: FaqItem[] = [
  {
    question: "What is 100KB Converter?",
    answer:
      "100KB Converter is a suite of browser-based tools for compressing and converting images. You can upload JPG, PNG, and WebP images, compress them under 100KB, and download them as WebP files — all without uploading anything to a server.",
  },
  {
    question: "Are my images uploaded?",
    answer:
      "No. All compression and conversion runs inside your browser using the Canvas API. Your images stay on your device and are never uploaded, stored, or accessible by anyone else.",
  },
  {
    question: "Why are downloads saved as WebP?",
    answer:
      "WebP typically produces files 25–35% smaller than JPG and PNG at similar visual quality. This reduces bandwidth, helps pages load faster, and makes images more efficient for websites.",
  },
  {
    question: "Can every image be compressed under 100KB?",
    answer:
      "Most images can reach 100KB or less, but very large or highly detailed images may need dimension reduction. The tool tries to preserve original dimensions first, then reduces size if needed to meet the target.",
  },
  {
    question: "Can I process multiple images at once?",
    answer:
      "Yes. The bulk image to WebP converter handles up to 20 images in a single batch, compresses each one to your chosen target size, and lets you download everything as a ZIP file with a CSV compression report.",
  },
  {
    question: "Which image formats are supported?",
    answer:
      "You can upload JPG, JPEG, PNG, and WebP images. All downloads are WebP format. SVG, GIF, PDF, and other formats are not accepted.",
  },
  {
    question: "Does this work on mobile?",
    answer:
      "Yes. The tool works in any modern mobile browser including Chrome, Safari, and Firefox. All processing happens on your device, so it works offline-capable browsers too.",
  },
];

const toolsList = [
  {
    href: "/image-compressor",
    title: "Image Compressor Under 100KB",
    desc: "Compress JPG, PNG, and WebP images to 100KB or less with WebP output.",
    badge: "Compressor",
  },
  {
    href: "/bulk-image-to-webp",
    title: "Bulk Image to WebP",
    desc: "Convert up to 20 images at once and download them as a single ZIP file.",
    badge: "Bulk",
    primary: true,
  },
  {
    href: "/compress-image-to-100kb",
    title: "Compress Image to 100KB",
    desc: "Optimize images to fit under a strict 100KB size limit.",
    badge: "100KB",
  },
  {
    href: "/jpg-to-webp",
    title: "JPG to WebP",
    desc: "Convert JPG and JPEG images to compact WebP files under 100KB.",
    badge: "Converter",
  },
  {
    href: "/png-to-webp",
    title: "PNG to WebP",
    desc: "Convert PNG images to WebP format with compression under 100KB.",
    badge: "Converter",
  },
  {
    href: "/image-to-webp",
    title: "Image to WebP",
    desc: "Convert any JPG, PNG, or WebP image to an optimized WebP file.",
    badge: "Converter",
  },
  {
    href: "/webp-image-compressor",
    title: "WebP Compressor",
    desc: "Compress existing WebP images further while keeping the format.",
    badge: "WebP",
  },
  {
    href: "/compress-image-to-50kb",
    title: "Compress to 50KB",
    desc: "Reduce images to 50KB or less for tighter size requirements.",
    badge: "50KB",
  },
  {
    href: "/webp-compress-image-to-100kb",
    title: "WebP to 100KB",
    desc: "Compress WebP images to exactly 100KB or less.",
    badge: "WebP",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: true,
});

export default function Home() {
  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-12">
      <JsonLd
        data={[
          createWebPageSchema({
            path: pagePath,
            title: pageTitle,
            description: pageDescription,
          }),
          createSoftwareApplicationSchema({
            path: pagePath,
            name: "100KB Converter",
            description: pageDescription,
            featureList: [
              "Client-side image compression",
              "WebP image output",
              "Compress images under 100KB",
              "Bulk image to WebP conversion",
              "JPG to WebP conversion",
              "PNG to WebP conversion",
              "No image uploads",
            ],
          }),
          createBreadcrumbSchema([{ name: "Home", path: "/" }]),
          createFaqSchema(homeFaqs),
        ]}
      />

      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16 motion-safe:animate-fade-in-up">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Compress and Convert Images Under 100KB
          </h1>
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 mb-6 max-w-lg">
            Use browser-based tools to compress JPG, PNG, and WebP images into
            lightweight WebP files under 100KB. Your images stay private
            because compression runs on your device — no uploads ever.
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <Link
              href="/image-compressor"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 motion-safe:transition-colors"
            >
              Compress Image
            </Link>
            <Link
              href="/bulk-image-to-webp"
              className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-600 font-medium rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 motion-safe:transition-colors"
            >
              Bulk Convert to WebP
            </Link>
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            {[
              "No uploads",
              "WebP output",
              "Under 100KB",
              "Bulk ZIP",
              "Client-side processing",
            ].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-xs font-medium"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
        <div className="hidden lg:block">
          <HeroCompressionIllustration />
        </div>
      </section>

      {/* Tool — above the fold */}
      <section className="mb-16">
        <ImageCompressor targetKB={100} pageIntent="general" />
      </section>

      {/* Why 100KB Converter */}
      <ContentCardGrid
        heading="Why 100KB Converter?"
        items={[
          {
            title: "Under-size downloads",
            desc: "Every downloadable file is verified to be 100KB or less in your browser. You will never get a file that exceeds the limit.",
            icon: "✓",
          },
          {
            title: "WebP-first output",
            desc: "All downloads are WebP format, which produces smaller files than JPG and PNG. Better for website speed and bandwidth.",
            icon: "W",
          },
          {
            title: "Bulk image workflow",
            desc: "Process up to 20 images at once, download individual results, or save everything as a ZIP file with a CSV compression report.",
            icon: "B",
          },
          {
            title: "Browser-based privacy",
            desc: "Everything runs in your browser. Images are never uploaded, stored, viewed, or sent to any server. Close the tab, and all data is gone.",
            icon: "🔒",
          },
          {
            title: "SEO-friendly filenames",
            desc: "Files download with clean, descriptive names like my-image-compressed-to-100kb.webp, ready for use on websites.",
            icon: "S",
          },
          {
            title: "Simple controls with advanced options",
            desc: "Start with a single click, or use compression modes, resize presets, and custom widths for more control over output quality and dimensions.",
            icon: "⚙",
          },
        ]}
        columns={3}
      />

      {/* Use Cases */}
      <UseCaseGrid
        heading="Common Uses for Images Under 100KB"
        items={[
          {
            title: "Website images",
            desc: "Smaller images load faster and improve page speed. Under 100KB is a good target for hero images and content photos on most websites.",
            icon: "🌐",
          },
          {
            title: "Product photos",
            desc: "E-commerce platforms often need compressed product images for thumbnail galleries and category pages. Smaller files help pages load faster for shoppers.",
            icon: "🛍",
          },
          {
            title: "Profile photos",
            desc: "Many online platforms, forums, and social networks limit profile picture uploads to around 100KB. Compress before uploading to avoid size rejections.",
            icon: "👤",
          },
          {
            title: "Blog images",
            desc: "Keeping blog post images under 100KB helps maintain fast page load times. Lighter pages may perform better in search results.",
            icon: "📝",
          },
          {
            title: "Email attachments",
            desc: "Email services often have attachment size limits. Compressing images under 100KB helps keep emails lightweight and deliverable.",
            icon: "📧",
          },
          {
            title: "Application uploads",
            desc: "Job portals, government forms, and online applications frequently enforce 100KB or similar upload limits for document photos and ID images.",
            icon: "📋",
          },
        ]}
      />

      {/* How it works */}
      <section className="mt-16 max-w-2xl mx-auto text-center motion-safe:animate-fade-in">
        <h2 className="text-2xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { step: "1", label: "Upload your image" },
            { step: "2", label: "Convert to WebP in your browser" },
            { step: "3", label: "Compress under target size" },
            { step: "4", label: "Download your optimized file" },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div
                className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center mx-auto mb-2 text-sm font-bold"
                aria-hidden="true"
              >
                {item.step}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy */}
      <section className="mt-16 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="shrink-0 w-32">
          <PrivacyBrowserIllustration />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">
            Privacy-First Compression
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Your images stay on your device. Compression runs entirely in your
            browser using the Canvas API and WebP encoder, so files are not
            uploaded, stored, viewed, or sent to a server. Once you close the
            page, all image data is gone. This makes the tool safe for personal
            photos, sensitive documents, and any image you would not want
            uploaded to a third-party service.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <ComparisonTable
        heading="Which Tool Should You Use?"
        rows={[
          {
            task: "Compress one image",
            tool: "Image Compressor",
            href: "/image-compressor",
          },
          {
            task: "Convert many images",
            tool: "Bulk Image to WebP",
            href: "/bulk-image-to-webp",
          },
          {
            task: "Strict 100KB limit",
            tool: "Compress Image to 100KB",
            href: "/compress-image-to-100kb",
          },
          {
            task: "Convert JPG to WebP",
            tool: "JPG to WebP",
            href: "/jpg-to-webp",
          },
          {
            task: "Convert PNG to WebP",
            tool: "PNG to WebP",
            href: "/png-to-webp",
          },
          {
            task: "Compress to 50KB",
            tool: "Compress to 50KB",
            href: "/compress-image-to-50kb",
          },
        ]}
      />

      {/* Bulk highlight */}
      <section className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 border border-blue-100 dark:border-blue-900/30 motion-safe:animate-fade-in">
        <div className="shrink-0 w-28">
          <BulkWebPIllustration />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2">
            Need to Process Multiple Images?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
            The bulk image to WebP converter processes up to 20 images in one
            batch. Each image is compressed under your chosen target size, and
            you can download individual WebP files or save all successful
            conversions as a single ZIP. A CSV compression report is included
            so you can track original sizes, compressed sizes, and dimensions
            for every file.
          </p>
          <Link
            href="/bulk-image-to-webp"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 motion-safe:transition-colors"
          >
            Open Bulk Converter
          </Link>
        </div>
      </section>

      {/* About compression modes */}
      <ContentSection heading="Compression Modes for Better Control">
        <p>
          The single-image tool offers three compression modes to suit
          different needs. <strong>Balanced</strong> (the default) provides a
          sensible trade-off between file size and visual quality for most
          images. <strong>Best Quality</strong> prioritizes visual clarity,
          keeping dimensions and higher quality settings when the target size
          allows. <strong>Smallest File</strong> uses stronger compression and
          reduces dimensions earlier, which is useful when you need the
          smallest possible WebP file.
        </p>
        <p>
          You can also enable the optional resize control to set a max width
          before compression — helpful when you have a large source image from
          a camera or design tool and want the output to fit a specific layout
          width. Presets include 1920px, 1600px, 1200px, and 800px, with a
          custom width option available too.
        </p>
      </ContentSection>

      {/* Popular Tools */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          All Image Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {toolsList.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`group rounded-xl border p-5 motion-safe:transition-all motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-md ${
                tool.primary
                  ? "border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/10"
                  : "border-zinc-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/5 dark:hover:bg-blue-950/10"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 motion-safe:transition-colors">
                  {tool.title}
                </h3>
                <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                  {tool.badge}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {tool.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* More Tools */}
      <section className="mt-16 text-center">
        <h2 className="text-xl font-bold mb-4">More Image Tools</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { href: "/png-to-webp", label: "PNG to WebP" },
            { href: "/image-to-webp", label: "Image to WebP" },
            { href: "/webp-image-compressor", label: "WebP Compressor" },
            { href: "/compress-image-to-50kb", label: "Compress to 50KB" },
            { href: "/webp-compress-image-to-100kb", label: "WebP to 100KB" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-block px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 motion-safe:transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <FAQ items={homeFaqs} />
    </div>
  );
}
