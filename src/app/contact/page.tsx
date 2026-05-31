import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import Breadcrumbs from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { createWebPageSchema, createBreadcrumbSchema } from "@/lib/schema";

const pagePath = "/contact";
const pageTitle = "Contact";
const pageDescription =
  "Contact the 100KB Converter team for questions, feedback, or support.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: false,
});

export default function ContactPage() {
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
            { name: "Contact", path: pagePath },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: pagePath },
        ]}
      />

      <h1 className="text-3xl font-bold mb-8">Contact</h1>

      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
        For questions, feedback, or support, contact us at:
      </p>

      <a
        href="mailto:hello@100kbconverter.com"
        className="text-lg font-medium text-blue-600 hover:underline"
      >
        hello@100kbconverter.com
      </a>

      <p className="text-sm text-zinc-400 mt-8">
        We aim to respond within 1–2 business days.
      </p>
    </div>
  );
}
