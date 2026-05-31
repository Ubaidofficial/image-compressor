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
import { APP_VERSION } from "@/lib/version";

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
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
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
        className="min-h-full flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100"
        suppressHydrationWarning
      >
        <JsonLd data={createOrganizationSchema()} />
        <JsonLd data={createWebsiteSchema()} />
        <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="100KB Converter home">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true" focusable="false" className="shrink-0">
                <rect width="32" height="32" rx="6" fill="#2563eb"/>
                <text x="16" y="22" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="system-ui, sans-serif" fontWeight="800">100</text>
              </svg>
              <span className="font-bold text-base tracking-tight">100KB Converter</span>
            </Link>
            <nav className="hidden sm:flex items-center gap-4 text-sm">
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
        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-semibold text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wider text-xs">Tools</h4>
              <nav className="flex flex-col gap-2">
                <Link href="/image-compressor" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Image Compressor</Link>
                <Link href="/bulk-image-to-webp" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Bulk Image to WebP</Link>
                <Link href="/jpg-to-webp" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">JPG to WebP</Link>
                <Link href="/compress-image-to-100kb" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Compress to 100KB</Link>
              </nav>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wider text-xs">More Converters</h4>
              <nav className="flex flex-col gap-2">
                <Link href="/png-to-webp" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">PNG to WebP</Link>
                <Link href="/image-to-webp" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Image to WebP</Link>
                <Link href="/webp-image-compressor" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">WebP Compressor</Link>
                <Link href="/compress-image-to-50kb" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Compress to 50KB</Link>
              </nav>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wider text-xs">Company</h4>
              <nav className="flex flex-col gap-2">
                <Link href="/privacy" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Privacy</Link>
                <Link href="/terms" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Terms</Link>
                <Link href="/contact" className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Contact</Link>
              </nav>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-500 dark:text-zinc-400 mb-3 uppercase tracking-wider text-xs">About</h4>
              <p className="text-zinc-500 leading-relaxed">
                Free browser-based image compression. No uploads. WebP output. All images stay on your device.
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <p className="text-sm text-zinc-400 text-center">
              All images are compressed in your browser and never uploaded.
              <span className="ml-2 opacity-60">v{APP_VERSION}</span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
