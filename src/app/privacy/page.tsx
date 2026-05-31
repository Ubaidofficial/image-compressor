import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Your images are processed locally in your browser. We do not upload, store, view, or track your images.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="flex-1 w-full max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">No Image Uploads</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          All image compression happens directly in your browser using the
          Canvas API and WebP encoding. Your images never leave your device.
          We do not upload, transmit, or receive any image data.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Local Browser Processing</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          The compression tool runs entirely client-side. When you drag and drop
          an image, it is read by your browser, processed on the canvas, and
          converted to WebP format locally. No server-side processing occurs.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">No Image Storage</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          We do not store, cache, save, or retain any images you compress. Once
          you close the page, all image data is gone. There is no database, no
          cloud storage, and no image history.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Analytics and Cookies</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          This site does not use third-party analytics, tracking cookies, or
          advertising networks. We may use basic server logs for operational
          purposes, but these do not include image data or personal information.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Contact</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          For questions about this privacy policy, visit our{" "}
          <Link href="/contact" className="text-blue-600 hover:underline">
            contact page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
