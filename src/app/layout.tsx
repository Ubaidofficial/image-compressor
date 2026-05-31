import type { Metadata } from "next";
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white dark:bg-black text-zinc-900 dark:text-zinc-100">
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto px-4 h-14 flex items-center">
            <a href="/" className="font-bold text-lg tracking-tight">
              WebP Compressor
            </a>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-xs text-zinc-400">
          All images are compressed in your browser and never uploaded.
        </footer>
      </body>
    </html>
  );
}
