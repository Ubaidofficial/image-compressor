import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "WebP Image Compressor — Compress to 100KB or Less",
    template: "%s | WebP Image Compressor",
  },
  description:
    "Compress JPG, PNG, and WebP images to SEO-friendly WebP files under 100KB directly in your browser. No uploads, fast, free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-white dark:bg-black text-zinc-900 dark:text-zinc-100" suppressHydrationWarning>
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
            <Link href="/" className="font-bold text-lg tracking-tight">
              WebP Compressor
            </Link>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6">
          <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
            <span>All images are compressed in your browser and never uploaded.</span>
            <nav className="flex gap-4">
              <Link href="/privacy" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
