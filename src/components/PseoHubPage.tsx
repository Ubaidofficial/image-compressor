import Link from "next/link";
import Breadcrumbs from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "@/lib/schema";
import {
  getPublishedPseoPages,
  pseoPath,
  type PSEOPage,
} from "@/data/pseoPages";

type PseoHubPageProps = {
  title: string;
  description: string;
  h1: string;
  intro: string;
  path: string;
  filter: (page: PSEOPage) => boolean;
};

function cleanLabel(page: PSEOPage): string {
  return page.h1.replace(/ Online$/u, "");
}

export default function PseoHubPage({
  title,
  description,
  h1,
  intro,
  path,
  filter,
}: PseoHubPageProps) {
  const pages = getPublishedPseoPages().filter(filter);
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: h1, path },
  ];

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <JsonLd
        data={[
          createWebPageSchema({
            path,
            title,
            description,
          }),
          createBreadcrumbSchema(breadcrumbs),
        ]}
      />

      <Breadcrumbs items={breadcrumbs} />

      <section className="max-w-3xl mb-12">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-5">
          {h1}
        </h1>
        <p className="text-base sm:text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {intro}
        </p>
      </section>

      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">
          Compressor Pages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pages.map((page) => (
            <Link
              key={page.slug}
              href={pseoPath(page.slug)}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 hover:border-blue-300 dark:hover:border-blue-700 motion-safe:transition-colors"
            >
              <h3 className="font-semibold text-base mb-2">
                {cleanLabel(page)}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {page.metaDescription}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
