export type FaqItem = {
  question: string;
  answer: string;
};

const defaultFaqs: FaqItem[] = [
  {
    question: "Can I compress an image to exactly 100KB?",
    answer:
      "The tool compresses images to 100KB or less. The final file may be slightly below 100KB to make sure it never exceeds the limit.",
  },
  {
    question: "Will my image stay in WebP format?",
    answer:
      "Yes. All downloaded images are saved as WebP because WebP is usually smaller and better for SEO performance than older formats like JPG or PNG.",
  },
  {
    question: "Are my images uploaded?",
    answer:
      "No. The compression happens in your browser. Your image is not uploaded to a server.",
  },
  {
    question: "Will image dimensions change?",
    answer:
      "The tool first tries to keep the original dimensions. If the image cannot fit under the target size, it may slightly reduce dimensions to guarantee the WebP file stays under the target KB.",
  },
  {
    question: "Why WebP?",
    answer:
      "WebP usually gives smaller file sizes than JPG and PNG while keeping good visual quality, which makes it useful for faster pages and SEO-friendly images.",
  },
];

type FAQProps = {
  items?: FaqItem[];
};

export default function FAQ({ items }: FAQProps) {
  const faqs = items ?? defaultFaqs;

  return (
    <section className="mt-20 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-3 mt-10">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="border border-zinc-200 dark:border-zinc-700 rounded-xl p-5 group bg-white dark:bg-zinc-900"
          >
            <summary className="font-semibold text-base cursor-pointer list-none flex items-center justify-between">
              {faq.question}
              <span className="text-zinc-300 dark:text-zinc-600 group-open:rotate-180 transition-transform ml-3 shrink-0 text-lg">
                ▼
              </span>
            </summary>
            <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
