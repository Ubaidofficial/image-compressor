import Link from "next/link";
import { popularToolPaths, moreToolPaths } from "@/lib/seoPages";

type RelatedToolsProps = {
  excludePath?: string;
};

const pathLabels: Record<string, string> = {
  "/image-compressor": "Image Compressor",
  "/webp-image-compressor": "WebP Compressor",
  "/bulk-image-to-webp": "Bulk Image to WebP",
  "/jpg-to-webp": "JPG to WebP",
  "/png-to-webp": "PNG to WebP",
  "/image-to-webp": "Image to WebP",
  "/compress-image-to-50kb": "Compress to 50KB",
  "/compress-image-to-100kb": "Compress to 100KB",
  "/webp-compress-image-to-100kb": "WebP to 100KB",
};

function ToolLink({ path }: { path: string }) {
  return (
    <Link
      href={path}
      className="inline-block px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
    >
      {pathLabels[path] ?? path}
    </Link>
  );
}

export default function RelatedTools({ excludePath }: RelatedToolsProps) {
  const popular = popularToolPaths.filter((p) => p !== excludePath);
  const more = moreToolPaths.filter((p) => p !== excludePath);

  return (
    <section className="mt-16 space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-center">
          Popular Tools
        </h3>
        <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
          {popular.map((path) => (
            <ToolLink key={path} path={path} />
          ))}
        </div>
      </div>

      {more.length > 0 && (
        <div>
          <h3 className="text-base font-medium text-zinc-500 dark:text-zinc-400 mb-3 text-center">
            More Tools
          </h3>
          <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
            {more.map((path) => (
              <ToolLink key={path} path={path} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
