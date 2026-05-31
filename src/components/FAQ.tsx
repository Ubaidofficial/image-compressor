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
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4 max-w-2xl mx-auto">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 group"
          >
            <summary className="font-medium cursor-pointer list-none flex items-center justify-between">
              {faq.question}
              <span className="text-zinc-400 group-open:rotate-180 transition-transform ml-2 shrink-0">
                ▼
              </span>
            </summary>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
