import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createWebPageSchema, createBreadcrumbSchema } from "@/lib/schema";

const pagePath = "/terms";
const pageTitle = "Terms of Use";
const pageDescription =
  "Terms of use for the free browser-based WebP image compressor. No uploads. Use responsibly.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: false,
});

export default function TermsPage() {
  return (
    <div className="flex-1 w-full max-w-2xl mx-auto px-4 py-12">
      <JsonLd
        data={[
          createWebPageSchema({
            path: pagePath,
            title: pageTitle,
            description: pageDescription,
          }),
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Terms", path: pagePath },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Terms", path: pagePath },
        ]}
      />

      <h1 className="text-3xl font-bold mb-8">Terms of Use</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Free Tool</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          This WebP image compressor is a free tool provided as-is. You may use
          it to compress and convert images for personal or commercial purposes
          without charge.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">No Guarantees</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          While the tool strives to compress images to the target file size, we
          do not guarantee that every image can be compressed below a specific
          threshold. Results depend on the input image content, resolution, and
          format.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">User Responsibility</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          You are responsible for the images you compress. Do not use this tool
          with images you do not have permission to process. We are not liable
          for how you use the compressed output.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Browser-Based Processing</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          All compression runs in your browser. We do not receive, store, or
          access your images. This tool is a client-side web application with no
          server-side image handling.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Limitation of Liability</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          This tool is provided without warranties of any kind. We are not
          liable for any damages or losses arising from its use. If an image
          fails to compress, try a different image or a different browser.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Contact</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          For questions about these terms, visit our{" "}
          <Link href="/contact" className="text-blue-600 hover:underline">
            contact page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
