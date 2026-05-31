import ImageCompressor from "./ImageCompressor";
import FAQ from "./FAQ";
import RelatedTools from "./RelatedTools";
import Breadcrumbs from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";
import {
  createWebPageSchema,
  createSoftwareApplicationSchema,
  createBreadcrumbSchema,
  createFaqSchema,
} from "@/lib/schema";
import type { FaqItem } from "./FAQ";

type SeoCompressorPageProps = {
  targetKB: number;
  keyword: string;
  title: string;
  h1: string;
  intro: string;
  intent?: "general" | "webp" | "jpg-to-webp" | "png-to-webp";
  pagePath: string;
  description: string;
  appFeatureList?: string[];
  faqItems?: FaqItem[];
  breadcrumbs: { name: string; path: string }[];
  howToTitle?: string;
  howToSteps?: string[];
  webpWhyH2?: string;
  webpWhyText?: string;
};

const defaultFaqs: FaqItem[] = [
  {
    question: "Can I compress an image to exactly 100KB?",
    answer:
      "The tool compresses images to 100KB or less. The final file may be slightly below 100KB so it never exceeds the limit.",
  },
  {
    question: "Will my image stay in WebP format?",
    answer:
      "Yes. All downloaded images are saved as WebP because WebP produces smaller files than JPG and PNG while keeping good visual quality.",
  },
  {
    question: "Are my images uploaded?",
    answer:
      "No. The compression happens in your browser. Your image is not uploaded to a server.",
  },
  {
    question: "Will image dimensions change?",
    answer:
      "The tool first tries to keep the original dimensions. If the image cannot fit under the target size, it may reduce dimensions slightly so the WebP file stays under the target KB.",
  },
  {
    question: "Why WebP?",
    answer:
      "WebP produces smaller file sizes than JPG and PNG while keeping good visual quality. Smaller files help pages load faster and reduce bandwidth.",
  },
];

export default function SeoCompressorPage({
  targetKB,
  h1,
  intro,
  intent,
  pagePath,
  description,
  appFeatureList,
  faqItems,
  breadcrumbs,
  howToTitle,
  howToSteps,
  webpWhyH2,
  webpWhyText,
}: SeoCompressorPageProps) {
  const faqs = faqItems ?? defaultFaqs;

  const renderHowToTitle = howToTitle ?? `How to Compress an Image to ${targetKB}KB`;
  const renderHowToSteps = howToSteps ?? [
    `Drag and drop your image or click to browse.`,
    `The tool compresses it to WebP at ${targetKB}KB or less using quality optimization and smart resizing if needed.`,
    `Review the original and compressed sizes and dimensions.`,
    `Download the WebP file — it's guaranteed under ${targetKB}KB.`,
  ];
  const renderWebpWhyH2 = webpWhyH2 ?? "Why WebP Is Best for Small SEO-Friendly Images";
  const renderWebpWhyText = webpWhyText ??
    "WebP typically produces smaller file sizes than JPG and PNG while maintaining good visual quality. Smaller images load faster, improve Core Web Vitals, and help with SEO rankings. All downloads from this tool are WebP format, so your images are ready for the web.";

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-12">
      <JsonLd
        data={[
          createWebPageSchema({
            path: pagePath,
            title: h1,
            description,
          }),
          createSoftwareApplicationSchema({
            path: pagePath,
            name: h1,
            description,
            applicationCategory: "MultimediaApplication",
            featureList: appFeatureList || [
              "Client-side image compression",
              "WebP image output",
              "Compress images under 100KB",
              "No image uploads",
            ],
          }),
          createBreadcrumbSchema(breadcrumbs),
          createFaqSchema(faqs),
        ]}
      />

      <Breadcrumbs items={breadcrumbs} />

      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-3">{h1}</h1>
      <p className="text-center text-zinc-500 dark:text-zinc-400 mb-8 max-w-lg mx-auto">
        {intro}
      </p>

      <ImageCompressor targetKB={targetKB} pageIntent={intent} />

      <section className="mt-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          {renderHowToTitle}
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {renderHowToSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section className="mt-12 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          {renderWebpWhyH2}
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {renderWebpWhyText}
        </p>
      </section>

      <FAQ items={faqs} />
      <RelatedTools excludePath={pagePath} />
    </div>
  );
}
