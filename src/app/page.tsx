import type { Metadata } from "next";
import ImageCompressor from "@/components/ImageCompressor";
import Link from "next/link";

export const metadata: Metadata = {
  title: "WebP Image Compressor — Compress to 100KB or Less",
  description:
    "Convert JPG, PNG, and WebP images into SEO-friendly WebP files under 100KB directly in your browser. Private, fast, and free.",
};

export default function Home() {
  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Compress Images to 100KB or Less
        </h1>
        <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto">
          Convert JPG, PNG, and WebP images into SEO-friendly WebP files under
          100KB directly in your browser.
        </p>
      </div>

      <ImageCompressor targetKB={100} pageIntent="general" />

      <div className="mt-12 text-center">
        <h2 className="text-xl font-semibold mb-4">Popular Tools</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/compress-image-to-50kb"
            className="px-5 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Compress Image to 50KB
          </Link>
          <Link
            href="/compress-image-to-100kb"
            className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-600 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Compress Image to 100KB
          </Link>
          <Link
            href="/webp-compress-image-to-100kb"
            className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-600 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            WebP Compress to 100KB
          </Link>
          <Link
            href="/jpg-to-webp-100kb"
            className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-600 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            JPG to WebP 100KB
          </Link>
          <Link
            href="/png-to-webp-100kb"
            className="px-5 py-3 rounded-full border border-zinc-300 dark:border-zinc-600 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            PNG to WebP 100KB
          </Link>
        </div>
      </div>
    </div>
  );
}
