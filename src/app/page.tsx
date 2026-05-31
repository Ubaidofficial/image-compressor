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
      "100KB Converter is a free set of browser-based image compression tools. You can compress JPG, PNG, and WebP images, convert them to WebP format, and download files that are 100KB or less — without uploading anything.",
  },
  {
    question: "Are my images uploaded?",
    answer:
      "No. All compression and conversion happens in your browser using the Canvas API. Your images are never uploaded, stored, or viewed by anyone else.",
  },
  {
    question: "Why are downloads saved as WebP?",
    answer:
      "WebP produces smaller file sizes than JPG and PNG while maintaining good visual quality. That makes your images load faster and perform better for SEO.",
  },
  {
    question: "Can every image be compressed under 100KB?",
    answer:
      "Most images can be compressed under 100KB, but very large or complex images may not fit. The tool tries to preserve original dimensions first, and then reduces dimensions if needed to meet the size target.",
  },
  {
    question: "Can I convert multiple images at once?",
    answer:
      "Yes. Use the bulk image to WebP converter to upload up to 20 images, compress them in a batch, and download them together as a ZIP file.",
  },
  {
    question: "Which tools are available?",
    answer:
      "You can compress single images, convert JPG or PNG to WebP, compress images to specific sizes like 100KB or 50KB, and convert multiple images in bulk — all from the tools linked on this page.",
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
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Compress and Convert Images Under 100KB
          </h1>
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 mb-6 max-w-lg">
            Use free browser-based tools to compress JPG, PNG, and WebP images
            into lightweight WebP files under 100KB. Your images stay private
            and are never uploaded.
          </p>

          <div className="flex flex-wrap gap-3 mb-6">
            <Link
              href="/image-compressor"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Compress Image
            </Link>
            <Link
              href="/bulk-image-to-webp"
              className="inline-flex items-center gap-2 px-6 py-3 border border-zinc-300 dark:border-zinc-600 font-medium rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Bulk Convert to WebP
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {["No uploads", "WebP output", "Under 100KB", "Bulk ZIP"].map(
              (chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-xs font-medium"
                >
                  {chip}
                </span>
              )
            )}
          </div>
        </div>
        <div className="hidden lg:block">
          <HeroCompressionIllustration />
        </div>
      </section>

      {/* Tool */}
      <section className="mb-16">
        <ImageCompressor targetKB={100} pageIntent="general" />
      </section>

      {/* Benefits */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Why Use 100KB Converter?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Images Under 100KB",
              desc: "Every downloadable file is guaranteed to be 100KB or less — verified in your browser.",
              icon: "100",
            },
            {
              title: "WebP Output",
              desc: "All downloads are WebP format: smaller than JPG and PNG, better for website speed.",
              icon: "W",
            },
            {
              title: "Bulk Conversion",
              desc: "Convert up to 20 images at once. Download individual files or save everything as a ZIP.",
              icon: "B",
            },
            {
              title: "No Uploads",
              desc: "Everything runs in your browser. Your images stay on your device and are never sent to a server.",
              icon: "N",
            },
            {
              title: "SEO-Friendly Filenames",
              desc: "Files download with clean, descriptive names like my-image-compressed-to-100kb.webp.",
              icon: "S",
            },
            {
              title: "Works in Your Browser",
              desc: "No software to install. Works in Chrome, Edge, Firefox, and Safari.",
              icon: "W",
            },
          ].map((benefit) => (
            <div
              key={benefit.title}
              className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-5 flex gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 text-sm font-bold">
                {benefit.icon}
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{benefit.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {benefit.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-16 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-8">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { step: "1", label: "Upload your image" },
            { step: "2", label: "Convert to WebP in your browser" },
            { step: "3", label: "Compress under target size" },
            { step: "4", label: "Download your optimized file" },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center mx-auto mb-2 text-sm font-bold">
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
      <section className="mb-16 bg-zinc-50 dark:bg-zinc-800/30 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="shrink-0 w-32">
          <PrivacyBrowserIllustration />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Privacy-First Compression</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Your images stay on your device. Compression runs entirely in your
            browser, so files are not uploaded, stored, viewed, or sent to a
            server. Once you close the page, all image data is gone.
          </p>
        </div>
      </section>

      {/* Bulk highlight */}
      <section className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6 border border-blue-100 dark:border-blue-900/30">
        <div className="shrink-0 w-28">
          <BulkWebPIllustration />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-2">
            Need to Process Multiple Images?
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
            Use the Bulk Image to WebP Converter to convert up to 20 images at
            once. Download individual files or save all successful conversions
            in a single ZIP file.
          </p>
          <Link
            href="/bulk-image-to-webp"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Open Bulk Converter
          </Link>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Popular Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {toolsList.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`group rounded-xl border p-5 transition-colors hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 ${
                tool.primary
                  ? "border-blue-200 dark:border-blue-800 bg-blue-50/30 dark:bg-blue-950/10"
                  : "border-zinc-200 dark:border-zinc-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
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
      <section className="mb-16 text-center">
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
              className="inline-block px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
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
