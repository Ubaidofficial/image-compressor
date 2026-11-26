import type { ReactNode } from "react";
import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import FAQ, { type FaqItem } from "./FAQ";
import PresetResizer from "./PresetResizer";
import { JsonLd } from "./JsonLd";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createSoftwareApplicationSchema,
  createWebPageSchema,
} from "@/lib/schema";
import type { SpecSource, UploadPreset } from "@/data/uploadSpecs";

/**
 * Layout shell for exam/form preset pages. It renders only structure; every
 * page passes its own spec rows, rejection reasons, sections and FAQ, so the
 * pages do not share body copy the way the size template does.
 */

export type SpecRow = { label: string; values: string[] };

type ExamPresetPageProps = {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: ReactNode;
  breadcrumbName: string;
  presets: UploadPreset[];
  specHeading: string;
  specColumns: string[];
  specRows: SpecRow[];
  /** Official sources shown under the spec table; empty for generic pages. */
  sources: Array<{ source: SpecSource; verifiedOn: string }>;
  specNote?: ReactNode;
  rejectionHeading: string;
  rejections: Array<{ title: string; detail: string }>;
  children?: ReactNode;
  faqs: FaqItem[];
  related: Array<{ href: string; label: string }>;
};

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export default function ExamPresetPage(props: ExamPresetPageProps) {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: props.breadcrumbName, path: props.path },
  ];

  return (
    <div className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <JsonLd
        data={[
          createWebPageSchema({ path: props.path, title: props.title, description: props.description }),
          createSoftwareApplicationSchema({
            path: props.path,
            name: props.h1,
            description: props.description,
            featureList: props.presets.map((p) => `${p.label}: JPG, ${p.spec.minKB}-${p.spec.maxKB} KB`),
          }),
          createBreadcrumbSchema(breadcrumbs),
          createFaqSchema(props.faqs),
        ]}
      />
      <Breadcrumbs items={breadcrumbs} />

      <header className="max-w-3xl mb-8">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">{props.h1}</h1>
        <div className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-3">
          {props.intro}
        </div>
      </header>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-8 shadow-sm dark:shadow-none">
        <PresetResizer presets={props.presets} title={props.h1} />
      </div>

      <section className="mt-14">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{props.specHeading}</h2>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 dark:bg-zinc-900">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Requirement</th>
                {props.specColumns.map((col) => (
                  <th key={col} scope="col" className="px-4 py-3 font-semibold">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {props.specRows.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="px-4 py-3 font-medium align-top">{row.label}</th>
                  {row.values.map((value, i) => (
                    <td key={i} className="px-4 py-3 align-top text-zinc-700 dark:text-zinc-300">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {props.sources.map(({ source, verifiedOn }) => (
          <p key={source.url} className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            Source:{" "}
            <a href={source.url} rel="nofollow noopener" target="_blank" className="underline hover:text-blue-600">
              {source.title}
            </a>{" "}
            ({source.location}), verified {formatDate(verifiedOn)}.
          </p>
        ))}
        {props.specNote && (
          <div className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 space-y-2">{props.specNote}</div>
        )}
      </section>

      <section className="mt-14">
        <h2 className="text-2xl sm:text-3xl font-bold mb-5">{props.rejectionHeading}</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {props.rejections.map((item) => (
            <li key={item.title} className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4">
              <p className="font-semibold mb-1">{item.title}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{item.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      {props.children}

      <FAQ items={props.faqs} />

      <nav aria-label="Related tools" className="mt-16">
        <h2 className="text-xl font-bold mb-4">Related tools</h2>
        <ul className="flex flex-wrap gap-3">
          {props.related.map((link) => (
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
