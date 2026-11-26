import Link from "next/link";
import ImageCompressor from "./ImageCompressor";
import BulkImageCompressor from "./BulkImageCompressor";
import FAQ from "./FAQ";
import Breadcrumbs from "./Breadcrumbs";
import HowItWorks from "./HowItWorks";
import { JsonLd } from "./JsonLd";
import {
  BatchEvidenceTable,
  EvidenceMethodNote,
  FormatEvidenceTable,
  LadderEvidenceTable,
  ModeEvidenceTable,
  UseCaseTable,
  useCasesFor,
} from "./SizeEvidence";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createSoftwareApplicationSchema,
  createWebPageSchema,
} from "@/lib/schema";
import { pseoPath, type PSEOPage } from "@/data/pseoPages";
import type { SizePageContent } from "@/data/sizePageContent";

type LinkItem = { href: string; label: string; description?: string };

function formatTarget(kb?: number): string {
  if (!kb) return "100KB";
  return kb === 1024 ? "1MB" : `${kb}KB`;
}

/**
 * Layout for the indexable size pages. Every block of prose here comes from
 * that page's own entry in src/data/sizePageContent.ts or from measured data;
 * the only shared text is the HowItWorks box and the evidence method note,
 * both marked as shared boilerplate.
 */
export default function IndexableSizePage({
  page,
  content,
  related,
  hub,
}: {
  page: PSEOPage;
  content: SizePageContent;
  related: LinkItem[];
  hub: LinkItem;
}) {
  const path = pseoPath(page.slug);
  const target = formatTarget(page.targetSizeKb);
  const isBulk = page.pageType === "bulk";
  const useCaseKb = content.useCaseKb ?? page.targetSizeKb ?? 100;
  const hasUseCases = content.useCaseNote !== undefined && useCasesFor(useCaseKb).length > 0;
  const label = page.h1.replace(/ Online$/u, "");
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: hub.label.replace(" Hub", ""), path: hub.href },
    { name: label, path },
  ];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <JsonLd
        data={[
          createWebPageSchema({ path, title: page.h1, description: page.metaDescription }),
          createSoftwareApplicationSchema({
            path,
            name: label,
            description: page.metaDescription,
            applicationCategory: "MultimediaApplication",
            featureList: [
              "Client-side image compression",
              isBulk ? "WebP output" : "JPG or WebP output",
              "Target file size controls",
              "No image uploads",
            ],
          }),
          createBreadcrumbSchema(breadcrumbs),
          createFaqSchema(content.faqs),
        ]}
      />

      <Breadcrumbs items={breadcrumbs} />

      <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] gap-8 lg:gap-10 items-start">
        <div className="pt-4">
          <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-300 mb-5">
            Target: {target} or less
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight mb-5">{page.h1}</h1>
          <div className="space-y-3 text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
            {content.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-8 shadow-sm dark:shadow-none">
          {isBulk ? (
            <BulkImageCompressor initialTargetKB={page.targetSizeKb ?? 100} />
          ) : (
            <ImageCompressor targetKB={page.targetSizeKb ?? 100} inputFormat="image" defaultOutputFormat="jpeg" />
          )}
        </div>
      </section>

      <HowItWorks />

      <section className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{content.evidenceHeading}</h2>
        <div className="space-y-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
          {content.observations.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>
        {content.evidence.kind === "formats" && <FormatEvidenceTable kb={content.evidence.kb} />}
        {content.evidence.kind === "modes" && <ModeEvidenceTable kb={content.evidence.kb} />}
        {content.evidence.kind === "ladder" && <LadderEvidenceTable keys={content.evidence.keys} />}
        {content.evidence.kind === "batch" && <BatchEvidenceTable targets={content.evidence.targets} />}
        <EvidenceMethodNote />
      </section>

      {hasUseCases && (
        <section className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{content.useCaseHeading}</h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5">{content.useCaseNote}</p>
          <UseCaseTable kb={useCaseKb} />
        </section>
      )}

      {page.angle && (
        <section className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{page.angle.heading}</h2>
          <div className="space-y-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {page.angle.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {content.sections?.map((section) => (
        <section key={section.heading} className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{section.heading}</h2>
          <div className="space-y-4 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </section>
      ))}

      <FAQ items={content.faqs} heading={content.faqHeading} />

      <nav aria-label="Related tools" className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Related tools</h2>
        <ul className="flex flex-wrap gap-3">
          {[hub, ...related].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-block rounded-full border border-zinc-200 dark:border-zinc-700 px-4 py-2 text-sm hover:border-blue-300 dark:hover:border-blue-700"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
