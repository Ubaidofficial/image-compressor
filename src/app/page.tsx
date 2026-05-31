import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import ImageCompressor from "@/components/ImageCompressor";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import {
  createWebPageSchema,
  createSoftwareApplicationSchema,
  createBreadcrumbSchema,
} from "@/lib/schema";

const pagePath = "/";
const pageTitle = "100KB Converter - Compress Images Under 100KB";
const pageDescription =
  "Compress and convert images under 100KB. Convert JPG, PNG, and WebP to SEO-friendly WebP files. Free browser-based compression with no uploads.";

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
        ]}
      />

      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Compress and Convert Images Under 100KB
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
          Convert JPG, PNG, and WebP images into SEO-friendly WebP files under
          100KB — directly in your browser, no uploads.
        </p>
      </div>

      <ImageCompressor targetKB={100} pageIntent="general" />

      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Popular Tools</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/bulk-image-to-webp"
            className="px-5 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
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
        </div>
      </div>
    </div>
  );
}
