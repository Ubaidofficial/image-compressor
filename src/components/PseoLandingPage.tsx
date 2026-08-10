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
  getIndexablePseoPages,
  pseoPages,
  pseoPath,
  type PSEOPage,
} from "@/data/pseoPages";
import { getFormatProfile, getResolvedProfile } from "@/data/pseoContent";

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
  // Consolidated pages are noindex; linking to them from every sibling would
  // funnel internal link equity into dead ends.
  return getIndexablePseoPages()
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
  const indexableSlugs = new Set(getIndexablePseoPages().map((item) => item.slug));
  return page.relatedSlugs
    .filter((slug) => !pseoPages.some((item) => item.slug === slug) || indexableSlugs.has(slug))
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

function formatNoun(page: PSEOPage): string {
  if (page.inputFormat === "jpg") return "JPG";
  if (page.inputFormat === "jpeg") return "JPEG";
  if (page.inputFormat === "png") return "PNG";
  if (page.inputFormat === "webp") return "WebP";
  return "image";
}

/**
 * Section headings are derived per page rather than hardcoded. Fifty pages
 * sharing an identical set of H2s is the clearest possible duplicate-content
 * signal, so every heading below varies with the target size, the input
 * format, or both.
 */
type SectionHeadings = {
  howTo: string;
  reality: string;
  fits: string;
  audience: string;
  format: string;
  settings: string;
  pitfalls: string;
};

/**
 * Per-subject heading sets. Body copy already varies by subject, but leaving
 * the H2s identical across a size bucket keeps a strong duplicate signal in
 * the most heavily weighted text on the page.
 */
const VARIANT_HEADINGS: Partial<
  Record<string, (target: string) => Partial<SectionHeadings>>
> = {
  tool: (t) => ({
    howTo: `Using the Compressor to Reach ${t}`,
    fits: "What Different Source Files Produce",
    audience: "Who This Compressor Is For",
    pitfalls: "Where Compression Tools Go Wrong",
  }),
  resize: (t) => ({
    howTo: `How to Resize an Image to ${t}`,
    reality: `What ${t} Means for Dimensions and Quality`,
    fits: `Source Size Versus Result at ${t}`,
    audience: "Who Searches for Image Resizing",
    pitfalls: "Resizing Mistakes That Cost You Quality",
  }),
  reduce: (t) => ({
    howTo: `How to Reduce an Image to ${t}`,
    fits: `Starting Size Versus ${t} Result`,
    audience: "Why People Reduce Image Size",
    pitfalls: "What to Avoid When Reducing File Size",
  }),
  units: () => ({
    howTo: "How to Hit a Specific Size in KB",
    reality: "What a Kilobyte Budget Actually Means",
    fits: "Reading File Sizes Correctly",
    audience: "Who Runs Into KB Limits",
    settings: "Choosing Settings for a KB Target",
    pitfalls: "Where KB Measurements Mislead",
  }),
  photo: (t) => ({
    howTo: `How to Compress a Photo to ${t}`,
    reality: `What ${t} Buys for a Photograph`,
    fits: "How Different Photos Behave",
    audience: `Who Compresses Photos to ${t}`,
    pitfalls: "Where Photo Compression Shows First",
  }),
  privacy: () => ({
    howTo: "How to Compress Without Uploading",
    fits: "Files People Keep Off Third-Party Servers",
    audience: "Who Needs Local-Only Compression",
    pitfalls: "Privacy Gaps Worth Knowing About",
  }),
  quality: () => ({
    howTo: "How to Compress While Preserving Quality",
    fits: "How Different Sources Hold Up",
    audience: "Who Cannot Afford Visible Loss",
    pitfalls: "Quality Mistakes to Avoid",
  }),
  convert: (t) => ({
    howTo: `How to Convert and Compress to ${t}`,
    fits: "What Each Format Gains from WebP",
    audience: "Who Converts Images to WebP",
    pitfalls: "Conversion Pitfalls",
  }),
  bulk: () => ({
    howTo: "How to Compress Images in Bulk",
    reality: "What Batch Compression Actually Does",
    fits: "Typical Results Across a Batch",
    audience: "Who Uses Bulk Compression",
    settings: "Recommended Settings for Batches",
    pitfalls: "What Goes Wrong in Batch Jobs",
  }),
  bulkConvert: () => ({
    howTo: "How to Convert Images to WebP in Bulk",
    reality: "What Bulk WebP Conversion Changes",
    fits: "What Each Format Gains in a Batch",
    audience: "Who Converts Libraries to WebP",
    settings: "Recommended Settings for Batch Conversion",
    pitfalls: "What Goes Wrong in Batch Conversion",
  }),
};

function headings(page: PSEOPage): SectionHeadings {
  const target = formatTarget(page.targetSizeKb);
  const noun = formatNoun(page);

  const base: SectionHeadings = {
    howTo: howToHeading(page),
    reality: `What a ${target} ${noun === "image" ? "Image" : noun} Budget Actually Buys`,
    fits: `Typical Results at ${target}`,
    audience: `Who Needs ${noun === "image" ? "Images" : `${noun} files`} at ${target}`,
    format:
      noun === "image"
        ? "How Each Input Format Behaves"
        : `Working with ${noun} Files`,
    settings: `Recommended Settings for ${target}`,
    pitfalls: `Common Problems at ${target} and How to Fix Them`,
  };

  const override = VARIANT_HEADINGS[page.contentVariant]?.(target) ?? {};
  return { ...base, ...override };
}

export default function PseoLandingPage({ page }: { page: PSEOPage }) {
  const path = pagePath(page);
  const target = formatTarget(page.targetSizeKb);
  const isBulk = page.pageType === "bulk";
  const sameSize = sameSizeLinks(page);
  const nearby = relatedLinks(page);
  const hub = hubByFormat[page.inputFormat ?? "image"] ?? hubByFormat.image;
  const size = getResolvedProfile(page.targetSizeKb, page.contentVariant, target);
  const format = getFormatProfile(page.inputFormat);
  const h = headings(page);

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
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{h.howTo}</h2>
        <ol className="list-decimal list-inside space-y-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <li>Choose or drop your {formatBadge(page).toLowerCase()} image file.</li>
          <li>Use the prefilled {target} target and adjust compression mode if needed.</li>
          <li>Review the compressed size, quality, and output dimensions in your browser.</li>
          <li>Download the WebP file when the result is within the selected target.</li>
        </ol>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{h.reality}</h2>
        <div className="space-y-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {size.reality.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          <p>{page.useCaseText}</p>
        </div>
      </section>

      {page.angle && (
        <section className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            {page.angle.heading}
          </h2>
          <div className="space-y-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {page.angle.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-5">{h.fits}</h2>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-base border-collapse">
            <thead>
              <tr className="bg-zinc-50 dark:bg-zinc-800/50">
                <th scope="col" className="text-left py-3.5 px-5 font-semibold text-zinc-700 dark:text-zinc-300">
                  Source image
                </th>
                <th scope="col" className="text-left py-3.5 px-5 font-semibold text-zinc-700 dark:text-zinc-300">
                  What to expect
                </th>
              </tr>
            </thead>
            <tbody>
              {size.fits.map((row) => (
                <tr
                  key={row.source}
                  className="border-t border-zinc-200 dark:border-zinc-800"
                >
                  <td className="py-3.5 px-5 text-zinc-700 dark:text-zinc-300">
                    {row.source}
                  </td>
                  <td className="py-3.5 px-5 text-zinc-500 dark:text-zinc-400">
                    {row.result}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">{h.audience}</h2>
        <div className="space-y-5">
          {size.audience.map((item) => (
            <div
              key={item.title}
              className="border-l-2 border-blue-300 dark:border-blue-700 pl-5 py-1"
            >
              <h3 className="font-semibold text-base text-zinc-800 dark:text-zinc-200 mb-1.5">
                {item.title}
              </h3>
              <p className="text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{h.format}</h2>
        <div className="space-y-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {format.note.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
          <p>{page.supportedFormatsText}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
          {format.quirks.map((quirk) => (
            <div
              key={quirk.title}
              className="bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800 rounded-xl p-5"
            >
              <h3 className="font-semibold text-base mb-2">{quirk.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {quirk.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{h.settings}</h2>
        <div className="space-y-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <p>{size.settings}</p>
          <p>{page.qualityTip}</p>
        </div>
      </section>

      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">{h.pitfalls}</h2>
        <div className="space-y-5">
          {size.pitfalls.map((item) => (
            <div
              key={item.title}
              className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5"
            >
              <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100 mb-1.5">
                {item.title}
              </h3>
              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
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
