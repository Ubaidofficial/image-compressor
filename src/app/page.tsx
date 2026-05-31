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

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: true,
});

export default function Home() {
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

      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Compress and Convert Images Under 100KB
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
          Use free browser-based tools to compress JPG, PNG, and WebP images
          into lightweight WebP files under 100KB. Your images stay private
          and are never uploaded.
        </p>
      </div>

      <ImageCompressor targetKB={100} pageIntent="general" />

      <section className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Why Use 100KB Converter?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              title: "Images Under 100KB",
              desc: "Every downloadable file is guaranteed to be 100KB or less.",
            },
            {
              title: "WebP Output",
              desc: "All downloads are WebP — smaller than JPG and PNG, better for SEO.",
            },
            {
              title: "Bulk Conversion",
              desc: "Convert up to 20 images at once and download them as a ZIP.",
            },
            {
              title: "No Uploads",
              desc: "Everything runs in your browser. Your images stay private.",
            },
            {
              title: "SEO-Friendly",
              desc: "Downloaded files get clean, descriptive filenames for search engines.",
            },
            {
              title: "Works in Your Browser",
              desc: "No software to install. Use Chrome, Edge, Firefox, or Safari.",
            },
          ].map((benefit) => (
            <div
              key={benefit.title}
              className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4"
            >
              <h3 className="font-semibold text-sm mb-1">{benefit.title}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {benefit.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">How It Works</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
          <li>Upload your image.</li>
          <li>The tool converts it to WebP in your browser.</li>
          <li>It compresses the image under the target size.</li>
          <li>Download the optimized image.</li>
        </ol>
      </section>

      <section className="mt-16 max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">
          Privacy-First Compression
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Your images are processed locally in your browser. They are not
          uploaded, stored, viewed, or sent to a server. Once you close the
          page, all image data is gone.
        </p>
      </section>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Popular Tools</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/image-compressor"
            className="px-5 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Image Compressor Under 100KB
          </Link>
          <Link
            href="/bulk-image-to-webp"
            className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-600 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Bulk Image to WebP
          </Link>
          <Link
            href="/compress-image-to-100kb"
            className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-600 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Compress Image to 100KB
          </Link>
          <Link
            href="/jpg-to-webp"
            className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-600 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            JPG to WebP
          </Link>
          <Link
            href="/png-to-webp"
            className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-600 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            PNG to WebP
          </Link>
          <Link
            href="/image-to-webp"
            className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-600 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Image to WebP
          </Link>
          <Link
            href="/webp-image-compressor"
            className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-600 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            WebP Compressor
          </Link>
          <Link
            href="/compress-image-to-50kb"
            className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-600 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Compress to 50KB
          </Link>
          <Link
            href="/webp-compress-image-to-100kb"
            className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-600 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            WebP to 100KB
          </Link>
        </div>
      </div>

      <FAQ items={homeFaqs} />
    </div>
  );
}
