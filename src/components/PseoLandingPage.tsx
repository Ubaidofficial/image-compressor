import Link from "next/link";
import ImageCompressor from "./ImageCompressor";
import BulkImageCompressor from "./BulkImageCompressor";
import FAQ from "./FAQ";
import Breadcrumbs from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createSoftwareApplicationSchema,
  createWebPageSchema,
} from "@/lib/schema";
import {
  getPublishedPseoPages,
  pseoPages,
  pseoPath,
  type PSEOPage,
} from "@/data/pseoPages";

type LinkItem = {
  href: string;
  label: string;
  description?: string;
};

const hubByFormat: Record<string, LinkItem> = {
  image: {
    href: "/image-compressor",
    label: "Image Compressor Hub",
    description: "Browse all image size compressor pages.",
  },
  jpg: {
    href: "/jpg-compressor",
    label: "JPG Compressor Hub",
    description: "Browse JPG and JPEG compression pages.",
  },
  jpeg: {
    href: "/jpg-compressor",
    label: "JPG Compressor Hub",
    description: "Browse JPG and JPEG compression pages.",
  },
  png: {
    href: "/png-compressor",
    label: "PNG Compressor Hub",
    description: "Browse PNG compression pages.",
  },
  webp: {
    href: "/webp-compressor",
    label: "WebP Compressor Hub",
    description: "Browse WebP compression pages.",
  },
};

function formatTarget(kb?: number): string {
  if (!kb) return "100KB";
  return kb === 1024 ? "1MB" : `${kb}KB`;
}

function pagePath(page: PSEOPage): string {
  return pseoPath(page.slug);
}

function cleanLabel(page: PSEOPage): string {
  return page.h1.replace(/ Online$/u, "");
}

function getPageLabel(slug: string): string {
  const page = pseoPages.find((item) => item.slug === slug);
  if (page) return cleanLabel(page);
  if (slug === "image-compressor") return "Image Compressor";
  if (slug === "jpg-compressor") return "JPG Compressor";
  if (slug === "png-compressor") return "PNG Compressor";
  if (slug === "webp-compressor") return "WebP Compressor";
  return slug
    .split("-")
    .map((word) => word.toUpperCase() === "KB" ? word : word[0]?.toUpperCase() + word.slice(1))
    .join(" ");
}

function getPageHref(slug: string): string {
  if (pseoPages.some((page) => page.slug === slug)) return pseoPath(slug);
  return `/${slug}`;
}

function sameSizeLinks(page: PSEOPage): LinkItem[] {
  if (!page.targetSizeKb) return [];
  return getPublishedPseoPages()
    .filter((item) => item.slug !== page.slug && item.targetSizeKb === page.targetSizeKb)
    .filter((item) => ["format-size", "webp", "utility"].includes(item.pageType))
    .slice(0, 4)
    .map((item) => ({
      href: pagePath(item),
      label: cleanLabel(item),
      description: item.supportedFormatsText,
    }));
}

function relatedLinks(page: PSEOPage): LinkItem[] {
  const publishedSlugs = new Set(getPublishedPseoPages().map((item) => item.slug));
  return page.relatedSlugs
    .filter((slug) => !pseoPages.some((item) => item.slug === slug) || publishedSlugs.has(slug))
    .slice(0, 6)
    .map((slug) => ({
      href: getPageHref(slug),
      label: getPageLabel(slug),
    }));
}

function howToHeading(page: PSEOPage): string {
  const target = formatTarget(page.targetSizeKb);
  if (page.pageType === "bulk") return "How to Compress Images in Bulk";
  if (page.inputFormat === "jpg" || page.inputFormat === "jpeg") {
    return `How to Compress a JPG to ${target}`;
  }
  if (page.inputFormat === "png") return `How to Compress a PNG to ${target}`;
  if (page.inputFormat === "webp") return `How to Compress a WebP to ${target}`;
  return `How to Compress an Image to ${target}`;
}

function formatBadge(page: PSEOPage): string {
  if (page.inputFormat === "jpg" || page.inputFormat === "jpeg") return "JPG, JPEG";
  if (page.inputFormat === "png") return "PNG";
  if (page.inputFormat === "webp") return "WebP";
  return "JPG, PNG, WebP";
}

export default function PseoLandingPage({ page }: { page: PSEOPage }) {
  const path = pagePath(page);
  const target = formatTarget(page.targetSizeKb);
  const isBulk = page.pageType === "bulk";
  const sameSize = sameSizeLinks(page);
  const nearby = relatedLinks(page);
  const hub = hubByFormat[page.inputFormat ?? "image"] ?? hubByFormat.image;

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: hub.label.replace(" Hub", ""), path: hub.href },
    { name: cleanLabel(page), path },
  ];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <JsonLd
        data={[
          createWebPageSchema({
            path,
            title: page.h1,
            description: page.metaDescription,
          }),
          createSoftwareApplicationSchema({
            path,
            name: cleanLabel(page),
            description: page.metaDescription,
            applicationCategory: "MultimediaApplication",
            featureList: [
              "Client-side image compression",
              "WebP image output",
              "Target file size controls",
              "No image uploads",
            ],
          }),
          createBreadcrumbSchema(breadcrumbs),
          createFaqSchema(page.faqs),
        ]}
      />

      <Breadcrumbs items={breadcrumbs} />

      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] gap-8 lg:gap-10 items-start">
        <div className="pt-4">
          <div className="flex flex-wrap gap-2 mb-5">
            <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-300">
              Target: {target} or less
            </span>
            <span className="inline-flex items-center rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-3 py-1 text-sm font-semibold text-zinc-600 dark:text-zinc-300">
              {formatBadge(page)}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">
            {page.h1}
          </h1>
          <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl mb-5">
            {page.intro}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Your images are processed in your browser and never uploaded to our servers.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-8 shadow-sm dark:shadow-none">
          {isBulk ? (
            <BulkImageCompressor initialTargetKB={page.targetSizeKb ?? 100} />
          ) : (
            <ImageCompressor
              targetKB={page.targetSizeKb ?? 100}
              inputFormat={page.inputFormat ?? "image"}
            />
          )}
        </div>
      </section>

      <section className="mt-20 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{howToHeading(page)}</h2>
        <ol className="list-decimal list-inside space-y-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <li>Choose or drop your {formatBadge(page).toLowerCase()} image file.</li>
          <li>Use the prefilled {target} target and adjust compression mode if needed.</li>
          <li>Review the compressed size, quality, and output dimensions in your browser.</li>
          <li>Download the WebP file when the result is within the selected target.</li>
        </ol>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Why Use This Image Compressor?</h2>
        <div className="space-y-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>{page.useCaseText}</p>
          <p>
            The compressor runs locally in your browser, so your images do not need to be uploaded to a remote server. It is useful for forms, profile images, web pages, product photos, and other places where file size matters.
          </p>
        </div>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Supported Image Formats</h2>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {page.supportedFormatsText}
        </p>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Tips to Keep Quality While Reducing File Size</h2>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {page.qualityTip}
        </p>
      </section>

      <section className="mt-16 max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Other Image Size Compressors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <h3 className="font-semibold text-base mb-4">Same-size pages</h3>
            <div className="flex flex-col gap-3">
              {[...sameSize, hub].slice(0, 5).map((item) => (
                <Link key={item.href} href={item.href} className="group">
                  <span className="font-medium text-zinc-800 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {item.label}
                  </span>
                  {item.description && (
                    <span className="block text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                      {item.description}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
            <h3 className="font-semibold text-base mb-4">Nearby size pages</h3>
            <div className="flex flex-col gap-3">
              {nearby.map((item) => (
                <Link key={item.href} href={item.href} className="font-medium text-zinc-800 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQ items={page.faqs} heading="FAQs" />
    </div>
  );
}
