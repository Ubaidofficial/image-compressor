import Link from "next/link";

/**
 * The one piece of generic explanation shared by every size page: how the
 * compressor works, privacy, and how input formats behave. Kept short and
 * visually separate so each page's main body can be specific to that page.
 *
 * Marked data-boilerplate="shared" so scripts/check-pseo-uniqueness.mjs
 * excludes it from the repeated-sentence check. Keep it under ~60 words; the
 * full explanation lives on the homepage (#how-it-works).
 */
export default function HowItWorks() {
  return (
    <aside
      data-boilerplate="shared"
      aria-label="How the compressor works"
      className="mt-10 max-w-4xl mx-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-5 py-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
    >
      <span className="font-semibold text-zinc-800 dark:text-zinc-200">How it works: </span>
      pick JPG or WebP, choose an image, and the compressor lowers quality first, then
      dimensions only if it must, until the file fits the target. Everything runs in your
      browser; nothing is uploaded. JPGs are already lossy, PNGs shrink most, WebP has least
      to give.{" "}
      <Link href="/#how-it-works" className="underline hover:text-blue-600">
        Full explanation
      </Link>
    </aside>
  );
}
