import Link from "next/link";
import { relatedToolPaths } from "@/lib/seoPages";

type RelatedToolsProps = {
  excludePath?: string;
  title?: string;
};

export default function RelatedTools({
  excludePath,
  title = "Related Tools",
}: RelatedToolsProps) {
  const filtered = relatedToolPaths.filter((p) => p !== excludePath);

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
        {filtered.map((path) => (
          <Link
            key={path}
            href={path}
            className="inline-block px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {path
              .replace(/-/g, " ")
              .replace(/\//g, "")
              .replace(/\b\w/g, (c) => c.toUpperCase())}
          </Link>
        ))}
      </div>
    </section>
  );
}
