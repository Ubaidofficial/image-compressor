import ImageCompressor from "./ImageCompressor";
import FAQ from "./FAQ";
import RelatedTools from "./RelatedTools";

type SeoCompressorPageProps = {
  targetKB: number;
  keyword: string;
  title: string;
  h1: string;
  intro: string;
  intent?: "general" | "webp" | "jpg-to-webp" | "png-to-webp";
  pagePath: string;
};

export default function SeoCompressorPage({
  targetKB,
  h1,
  intro,
  intent,
  pagePath,
}: SeoCompressorPageProps) {
  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3">{h1}</h1>
      <p className="text-center text-zinc-500 dark:text-zinc-400 mb-8 max-w-lg mx-auto">
        {intro}
      </p>

      <ImageCompressor targetKB={targetKB} pageIntent={intent} />

      <section className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          How to Compress an Image to {targetKB}KB
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          <li>Drag and drop your image or click to browse.</li>
          <li>
            The tool compresses it to WebP at {targetKB}KB or less using
            quality optimization and smart resizing if needed.
          </li>
          <li>Review the original and compressed sizes and dimensions.</li>
          <li>Download the WebP file — it&apos;s guaranteed under {targetKB}KB.</li>
        </ol>
      </section>

      <section className="mt-12 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Why WebP Is Best for Small SEO-Friendly Images
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          WebP typically produces smaller file sizes than JPG and PNG while
          maintaining good visual quality. Smaller images load faster, improve
          Core Web Vitals, and help with SEO rankings. All downloads from this
          tool are WebP format, so your images are ready for the web.
        </p>
      </section>

      <FAQ />
      <RelatedTools excludePath={pagePath} />
    </div>
  );
}
