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
      "Yes. The tool works in any modern mobile browser including Chrome, Safari, and Firefox. All processing happens on your device, so it works in offline-capable browsers too.",
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
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
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

      {/* Hero — wide layout */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 motion-safe:animate-fade-in-up">
        <div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5 leading-tight">
            Compress and Convert Images Under 100KB
          </h1>
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 mb-8 max-w-xl leading-relaxed">
            Use browser-based tools to compress JPG, PNG, and WebP images into
            lightweight WebP files under 100KB. Your images stay private
            because compression runs on your device — no uploads ever.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <Link
              href="/image-compressor"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 motion-safe:transition-colors text-base shadow-sm shadow-blue-200 dark:shadow-blue-900/30"
            >
              Compress Image
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <Link
              href="/bulk-image-to-webp"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-zinc-200 dark:border-zinc-700 font-semibold rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 motion-safe:transition-colors text-base"
            >
              Bulk Convert to WebP
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              "No uploads",
              "WebP output",
              "Under 100KB",
              "Bulk ZIP",
              "Client-side processing",
            ].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-green-50 dark:bg-emerald-950/40 border border-green-200 dark:border-emerald-800 text-green-700 dark:text-emerald-300 text-sm font-medium"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
        <div className="hidden lg:flex items-center justify-center">
          <HeroCompressionIllustration />
        </div>
      </section>

      {/* Tool — in a prominent card */}
      <section className="mb-20">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-sm dark:shadow-none">
          <h2 className="text-lg font-semibold text-zinc-500 dark:text-zinc-400 mb-6 text-center">
            Try it now — upload an image to compress
          </h2>
          <ImageCompressor targetKB={100} pageIntent="general" />
        </div>
      </section>

      {/* Popular Tools — prominent section */}
      <section className="mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">
          All Image Tools
        </h2>
        <p className="text-base text-zinc-500 dark:text-zinc-400 text-center mb-10 max-w-lg mx-auto">
          Every tool runs in your browser. No uploads, no accounts, no software to install.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {toolsList.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`group rounded-2xl border-2 p-6 motion-safe:transition-all motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg ${
                tool.primary
                  ? "border-blue-300 dark:border-blue-700 bg-blue-50/30 dark:bg-blue-950/20"
                  : "border-zinc-100 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-700 bg-white dark:bg-zinc-900"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-base group-hover:text-blue-700 dark:group-hover:text-blue-400 motion-safe:transition-colors">
                  {tool.title}
                </h3>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                  {tool.badge}
                </span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {tool.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why 100KB Converter */}
      <ContentCardGrid
        heading="Why 100KB Converter?"
        items={[
          {
            title: "Under-size downloads",
            desc: "Every downloadable file is verified to be 100KB or less. You will never get a file that exceeds the limit.",
            icon: "✓",
          },
          {
            title: "WebP-first output",
            desc: "All downloads are WebP format — smaller than JPG and PNG, better for website speed and bandwidth.",
            icon: "W",
          },
          {
            title: "Bulk image workflow",
            desc: "Process up to 20 images at once, download individual results or save everything as a ZIP.",
            icon: "B",
          },
          {
            title: "Browser-based privacy",
            desc: "Everything runs in your browser. Images are never uploaded, stored, or sent to any server.",
            icon: "🔒",
          },
          {
            title: "SEO-friendly filenames",
            desc: "Files download with clean, descriptive names ready for use on websites.",
            icon: "S",
          },
          {
            title: "Simple controls, advanced options",
            desc: "Start with a single click, or use compression modes and resize presets for more control.",
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
            desc: "Smaller images load faster and improve page speed for hero images and content photos.",
            icon: "🌐",
          },
          {
            title: "Product photos",
            desc: "E-commerce platforms need compressed product images for thumbnail galleries.",
            icon: "🛍",
          },
          {
            title: "Profile photos",
            desc: "Forums and social networks often limit profile picture uploads to around 100KB.",
            icon: "👤",
          },
          {
            title: "Blog images",
            desc: "Keep blog post images under 100KB to maintain fast page load times.",
            icon: "📝",
          },
          {
            title: "Email attachments",
            desc: "Compressing images under 100KB helps keep emails lightweight and deliverable.",
            icon: "📧",
          },
          {
            title: "Application uploads",
            desc: "Job portals and government forms frequently enforce 100KB upload limits.",
            icon: "📋",
          },
        ]}
      />

      {/* How it works */}
      <section className="mt-20 max-w-4xl mx-auto text-center motion-safe:animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">How It Works</h2>
        <p className="text-base text-zinc-500 dark:text-zinc-400 mb-10">
          Four simple steps — all in your browser
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {[
            { step: "1", label: "Upload your image" },
            { step: "2", label: "Convert to WebP in your browser" },
            { step: "3", label: "Compress under target size" },
            { step: "4", label: "Download your optimized file" },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div
                className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 flex items-center justify-center mx-auto mb-3 text-lg font-bold"
                aria-hidden="true"
              >
                {item.step}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy — prominent card */}
      <section className="mt-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8 border border-zinc-100 dark:border-zinc-800">
        <div className="shrink-0 w-36">
          <PrivacyBrowserIllustration />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Privacy-First Compression
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            Your images stay on your device. Compression runs entirely in your
            browser using the Canvas API and WebP encoder, so files are not
            uploaded, stored, viewed, or sent to a server. Once you close the
            page, all image data is gone.
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
      <section className="mt-20 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8 border border-blue-100 dark:border-blue-900/30 motion-safe:animate-fade-in">
        <div className="shrink-0 w-32">
          <BulkWebPIllustration />
        </div>
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            Need to Process Multiple Images?
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 max-w-2xl">
            The bulk image to WebP converter processes up to 20 images in one
            batch. Each image is compressed under your chosen target size, and
            you can download individual WebP files or save all successful
            conversions as a single ZIP with a CSV compression report.
          </p>
          <Link
            href="/bulk-image-to-webp"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white text-base font-semibold rounded-xl hover:bg-blue-700 motion-safe:transition-colors shadow-sm shadow-blue-200 dark:shadow-blue-900/30"
          >
            Open Bulk Converter
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
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

      {/* More Tools — secondary */}
      <section className="mt-16 text-center border-t border-zinc-100 dark:border-zinc-800 pt-16">
        <h2 className="text-lg font-semibold text-zinc-500 dark:text-zinc-400 mb-6">More Image Tools</h2>
        <div className="flex flex-wrap gap-2.5 justify-center">
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
              className="inline-block px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 motion-safe:transition-colors"
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
