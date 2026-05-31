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
      className="inline-block px-5 py-2.5 rounded-full border border-zinc-200 dark:border-zinc-700 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-600 motion-safe:transition-colors"
    >
      {pathLabels[path] ?? path}
    </Link>
  );
}

export default function RelatedTools({ excludePath }: RelatedToolsProps) {
  const popular = popularToolPaths.filter((p) => p !== excludePath);
  const more = moreToolPaths.filter((p) => p !== excludePath);

  return (
    <section className="mt-20 border-t border-zinc-100 dark:border-zinc-800 pt-16">
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-5 text-center text-zinc-700 dark:text-zinc-300">
            Popular Tools
          </h3>
          <div className="flex flex-wrap gap-2.5 justify-center max-w-2xl mx-auto">
            {popular.map((path) => (
              <ToolLink key={path} path={path} />
            ))}
          </div>
        </div>

        {more.length > 0 && (
          <div>
            <h3 className="text-base font-medium text-zinc-400 dark:text-zinc-500 mb-4 text-center">
              More Tools
            </h3>
            <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
              {more.map((path) => (
                <ToolLink key={path} path={path} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
