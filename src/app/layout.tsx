import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { createOrganizationSchema, createWebsiteSchema } from "@/lib/schema";
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "100KB Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body
        className="min-h-full flex flex-col bg-white dark:bg-black text-zinc-900 dark:text-zinc-100"
        suppressHydrationWarning
      >
        <JsonLd data={createOrganizationSchema()} />
        <JsonLd data={createWebsiteSchema()} />
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg tracking-tight shrink-0">
              100KB Converter
            </Link>
            <nav className="hidden sm:flex items-center gap-3 text-sm">
              <Link href="/image-compressor" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                Image Compressor
              </Link>
              <Link href="/bulk-image-to-webp" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                Bulk WebP
              </Link>
              <Link href="/jpg-to-webp" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                JPG to WebP
              </Link>
              <Link href="/compress-image-to-100kb" className="text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                Compress to 100KB
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6">
          <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
            <span>
              All images are compressed in your browser and never uploaded.
            </span>
            <nav className="flex gap-4 flex-wrap">
              <Link
                href="/"
                className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/image-compressor"
                className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                Image Compressor
              </Link>
              <Link
                href="/bulk-image-to-webp"
                className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                Bulk Converter
              </Link>
              <Link
                href="/jpg-to-webp"
                className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                JPG to WebP
              </Link>
              <Link
                href="/compress-image-to-100kb"
                className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                Compress to 100KB
              </Link>
              <Link
                href="/privacy"
                className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
