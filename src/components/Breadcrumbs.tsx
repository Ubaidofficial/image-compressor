import Link from "next/link";

type BreadcrumbItem = {
  name: string;
  path: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-zinc-500">
        {items.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1.5">
            {i > 0 && (
              <span className="text-zinc-300 dark:text-zinc-600" aria-hidden="true">
                /
              </span>
            )}
            {i === items.length - 1 ? (
              <span className="text-zinc-900 dark:text-zinc-100 font-medium">
                {item.name}
              </span>
            ) : (
              <Link href={item.path} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
