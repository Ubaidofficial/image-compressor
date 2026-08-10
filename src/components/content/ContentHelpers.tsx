import type { ReactNode } from "react";
import Link from "next/link";

export function ContentSection({
  id,
  heading,
  children,
}: {
  id?: string;
  heading: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-20 max-w-4xl mx-auto motion-safe:animate-fade-in">
      <h2 className="text-2xl sm:text-3xl font-bold mb-5">{heading}</h2>
      <div className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
}

export function FeatureGrid({
  id,
  heading,
  items,
}: {
  id?: string;
  heading: string;
  items: { title: string; desc: string; icon?: string }[];
}) {
  return (
    <section id={id} className="mt-20 max-w-5xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-zinc-50 dark:bg-zinc-800/30 rounded-xl p-6 flex gap-4 border border-zinc-100 dark:border-zinc-800"
          >
            {item.icon && (
              <div
                className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0 text-base font-bold"
                aria-hidden="true"
              >
                {item.icon}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-base mb-1.5">{item.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProcessSteps({
  id,
  heading,
  steps,
}: {
  id?: string;
  heading: string;
  steps: string[];
}) {
  return (
    <section id={id} className="mt-20 max-w-4xl mx-auto text-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-3">{heading}</h2>
      <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
        {steps.map((label, i) => (
          <div key={i} className="flex sm:flex-col items-center gap-4 sm:gap-0 sm:text-center">
            <div
              className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0 text-lg font-bold"
              aria-hidden="true"
            >
              {i + 1}
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 sm:mt-3 font-medium">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PageCallout({
  id,
  heading,
  children,
  variant = "info",
}: {
  id?: string;
  heading?: string;
  children: ReactNode;
  variant?: "info" | "privacy" | "tip";
}) {
  const variants = {
    info: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
    privacy:
      "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800",
    tip: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800",
  };

  return (
    <section id={id} className="mt-16 max-w-4xl mx-auto">
      <div
        className={`${variants[variant]} border rounded-2xl p-6 sm:p-8 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-3`}
      >
        {heading && (
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-lg">
            {heading}
          </h3>
        )}
        {children}
      </div>
    </section>
  );
}

export function UseCaseGrid({
  heading,
  items,
}: {
  heading: string;
  items: { title: string; desc: string; icon?: string }[];
}) {
  return (
    <section className="mt-20 max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl p-6 hover:border-zinc-200 dark:hover:border-zinc-700 hover:shadow-sm motion-safe:transition-all motion-safe:hover:-translate-y-0.5"
          >
            {item.icon && (
              <div
                className="w-11 h-11 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center shrink-0 mb-4 text-lg font-bold"
                aria-hidden="true"
              >
                {item.icon}
              </div>
            )}
            <h3 className="font-semibold text-base mb-2">{item.title}</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function KeywordInfoBlock({
  heading,
  items,
}: {
  heading: string;
  items: { title: string; desc: string }[];
}) {
  return (
    <section className="mt-20 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8">{heading}</h2>
      <div className="space-y-5">
        {items.map((item) => (
          <div
            key={item.title}
            className="border-l-2 border-blue-300 dark:border-blue-700 pl-5 py-1"
          >
            <h3 className="font-semibold text-base text-zinc-800 dark:text-zinc-200 mb-1.5">
              {item.title}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function OnThisPage({
  links,
}: {
  links: { label: string; href: string }[];
}) {
  return (
    <nav aria-label="On this page" className="mb-12 max-w-4xl mx-auto">
      <p className="text-sm font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
        On this page
      </p>
      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function ContentCardGrid({
  heading,
  items,
  columns = 3,
}: {
  heading: string;
  items: { title: string; desc: string; icon: string; href?: string }[];
  columns?: 2 | 3;
}) {
  const cols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <section className="mt-20 max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">{heading}</h2>
      <div className={`grid ${cols[columns]} gap-5 mt-8`}>
        {items.map((item) => {
          const content = (
            <div className="bg-zinc-50 dark:bg-zinc-800/30 rounded-xl p-6 flex gap-4 border border-zinc-100 dark:border-zinc-800 motion-safe:transition-all motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-sm">
              <div
                className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0 text-base font-bold"
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-base mb-1.5">{item.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
          return item.href ? (
            <Link key={item.title} href={item.href}>
              {content}
            </Link>
          ) : (
            <div key={item.title}>{content}</div>
          );
        })}
      </div>
    </section>
  );
}

export function ComparisonTable({
  heading,
  rows,
}: {
  heading: string;
  rows: { task: string; tool: string; href: string }[];
}) {
  return (
    <section className="mt-20 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">{heading}</h2>
      <div className="overflow-x-auto rounded-xl border border-zinc-100 dark:border-zinc-800">
        <table className="w-full text-base border-collapse">
          <thead>
            <tr className="bg-zinc-50 dark:bg-zinc-800/50">
              <th className="text-left py-4 px-6 font-semibold text-zinc-700 dark:text-zinc-300">
                Task
              </th>
              <th className="text-left py-4 px-6 font-semibold text-zinc-700 dark:text-zinc-300">
                Best Tool
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.href}
                className="border-t border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors"
              >
                <td className="py-4 px-6 text-zinc-600 dark:text-zinc-400">
                  {row.task}
                </td>
                <td className="py-4 px-6">
                  <a
                    href={row.href}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {row.tool}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
