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
    <section id={id} className="mt-16 max-w-2xl mx-auto motion-safe:animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">{heading}</h2>
      <div className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-3">
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
    <section id={id} className="mt-16 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-5 flex gap-3"
          >
            {item.icon && (
              <div
                className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 text-sm font-bold"
                aria-hidden="true"
              >
                {item.icon}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
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
    <section id={id} className="mt-16 max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-8">{heading}</h2>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {steps.map((label, i) => (
          <div key={i} className="flex sm:flex-col items-center gap-3 sm:gap-0 sm:text-center">
            <div
              className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 text-sm font-bold"
              aria-hidden="true"
            >
              {i + 1}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 sm:mt-2">
              {label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function PageCallout({
  heading,
  children,
  variant = "info",
}: {
  heading?: string;
  children: ReactNode;
  variant?: "info" | "privacy" | "tip";
}) {
  const variants = {
    info: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800",
    privacy:
      "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
    tip: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800",
  };

  return (
    <section className="mt-12 max-w-2xl mx-auto">
      <div
        className={`${variants[variant]} border rounded-2xl p-6 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed space-y-2`}
      >
        {heading && (
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
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
    <section className="mt-16 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{heading}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-white dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-800 rounded-xl p-5 hover:border-zinc-200 dark:hover:border-zinc-700 hover:shadow-sm motion-safe:transition-all motion-safe:hover:-translate-y-0.5"
          >
            {item.icon && (
              <div
                className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center shrink-0 mb-3 text-sm font-bold"
                aria-hidden="true"
              >
                {item.icon}
              </div>
            )}
            <h3 className="font-semibold text-sm mb-1.5">{item.title}</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
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
    <section className="mt-16 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{heading}</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.title}
            className="border-l-2 border-blue-200 dark:border-blue-800 pl-4 py-1"
          >
            <h3 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 mb-1">
              {item.title}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
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
    <nav aria-label="On this page" className="mb-12 max-w-2xl mx-auto">
      <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
        On this page
      </p>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
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
    <section className="mt-16 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{heading}</h2>
      <div className={`grid ${cols[columns]} gap-4`}>
        {items.map((item) => {
          const content = (
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-5 flex gap-3 motion-safe:transition-all motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-sm">
              <div
                className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 text-sm font-bold"
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
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
    <section className="mt-16 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">{heading}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              <th className="text-left py-2 pr-4 font-semibold text-zinc-700 dark:text-zinc-300">
                Task
              </th>
              <th className="text-left py-2 font-semibold text-zinc-700 dark:text-zinc-300">
                Best Tool
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.href}
                className="border-b border-zinc-100 dark:border-zinc-800"
              >
                <td className="py-2 pr-4 text-zinc-600 dark:text-zinc-400">
                  {row.task}
                </td>
                <td className="py-2">
                  <a
                    href={row.href}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
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
