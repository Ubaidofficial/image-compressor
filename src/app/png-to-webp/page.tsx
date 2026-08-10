import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";
import type { FaqItem } from "@/components/FAQ";
import {
  ContentSection,
  FeatureGrid,
  PageCallout,
  UseCaseGrid,
  KeywordInfoBlock,
  OnThisPage,
} from "@/components/content/ContentHelpers";
import Link from "next/link";

const pagePath = "/png-to-webp";
const pageTitle = "PNG to WebP Converter - Free & Private";
const pageDescription =
  "Convert PNG to WebP free in your browser. Keeps transparency, cuts file size up to 26%, and never uploads your images. No signup required.";

const pngFaqs: FaqItem[] = [
  {
    question: "Does converting PNG to WebP keep transparency?",
    answer:
      "Yes. WebP supports a full 8-bit alpha channel, exactly like PNG-24. Transparent backgrounds, soft shadows, and anti-aliased edges all survive the conversion. Preview the result before downloading if the image has fine semi-transparent detail.",
  },
  {
    question: "How much smaller is WebP than PNG?",
    answer:
      "Google measures lossless WebP at around 26% smaller than equivalent PNG files. Lossy WebP goes much further — screenshots and flat graphics often drop by 60 to 80% with no visible difference at normal viewing size.",
  },
  {
    question: "Is PNG to WebP conversion lossless?",
    answer:
      "It depends on the mode. This tool uses lossy WebP by default because it reaches small target sizes reliably. For logos, line art, and text-heavy screenshots where every pixel matters, use Best Quality mode to stay closest to the original.",
  },
  {
    question: "Do all browsers support WebP?",
    answer:
      "Yes, in practice. Chrome, Firefox, Edge, Safari, Opera, mobile Safari, and Chrome for Android have all supported WebP for years. It covers roughly 97% of global browser traffic, so WebP is safe for production websites.",
  },
  {
    question: "Are my PNG files uploaded to a server?",
    answer:
      "No. The conversion runs entirely in your browser using the Canvas API and the built-in WebP encoder. Your PNG never leaves your device, and nothing is stored after you close the tab.",
  },
  {
    question: "Can I convert several PNG files at once?",
    answer:
      "Yes. The bulk image to WebP converter handles up to 20 files in one batch and returns them as a ZIP with a CSV report showing the size saved on each file.",
  },
  {
    question: "Should I convert a PNG logo or favicon to WebP?",
    answer:
      "Convert logos used inside pages — they benefit from the smaller size. Keep favicons as PNG or ICO, because some browsers and operating systems still expect those formats for icon files.",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: true,
});

export default function PngToWebp() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="png to webp"
      title={pageTitle}
      h1="PNG to WebP Converter"
      intro="Convert PNG images to WebP in your browser. Transparency is preserved, files get dramatically smaller, and your images are never uploaded."
      intent="png-to-webp"
      pagePath={pagePath}
      description={pageDescription}
      appFeatureList={[
        "PNG to WebP conversion in the browser",
        "Alpha channel and transparency preserved",
        "Lossless and lossy WebP output",
        "No image uploads",
      ]}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Converters", path: "/image-to-webp" },
        { name: "PNG to WebP", path: pagePath },
      ]}
      faqItems={pngFaqs}
    >
      <OnThisPage
        links={[
          { label: "PNG vs WebP", href: "#png-vs-webp" },
          { label: "Transparency", href: "#transparency" },
          { label: "How it works", href: "#how-to" },
          { label: "Size savings", href: "#savings" },
          { label: "When to keep PNG", href: "#keep-png" },
        ]}
      />

      <ContentSection id="png-vs-webp" heading="PNG vs WebP: What Actually Changes">
        <p>
          PNG is a lossless format built in 1996 around a compression method
          called DEFLATE. It stores every pixel exactly, which makes it ideal
          for screenshots, logos, and graphics with hard edges — and makes the
          files large, because lossless compression can only do so much with a
          detailed image.
        </p>
        <p>
          WebP, developed by Google, offers both a lossless mode and a lossy
          mode in a single format. Its lossless mode uses smarter techniques
          than PNG: it predicts pixel values from neighbouring pixels, reuses
          repeated colour patterns through a palette cache, and applies more
          efficient entropy coding. The result looks identical but is
          meaningfully smaller.
        </p>
        <p>
          The lossy mode goes further by discarding visual information the eye
          is unlikely to notice — the same broad idea JPG uses, except WebP
          keeps the alpha channel while doing it, something JPG has never been
          able to do. That combination of transparency plus lossy compression
          is the main reason PNG to WebP conversion produces such large savings
          on web graphics.
        </p>
      </ContentSection>

      <KeywordInfoBlock
        heading="How WebP Compresses a PNG"
        items={[
          {
            title: "Predictive coding",
            desc: "WebP predicts each pixel's value from the pixels above and to the left, then stores only the difference. Flat areas and smooth gradients — common in interface screenshots — compress down to almost nothing.",
          },
          {
            title: "Colour palette cache",
            desc: "Images that reuse a limited set of colours, like charts, logos, and diagrams, get those colours indexed once and referenced cheaply thereafter instead of repeated in full.",
          },
          {
            title: "Alpha channel compression",
            desc: "PNG stores transparency as a raw extra channel. WebP compresses the alpha channel separately with its own filters, so transparent PNGs often see the biggest reduction of all.",
          },
          {
            title: "Adaptive block quantization",
            desc: "In lossy mode, WebP spends more bits on visually complex blocks and fewer on simple ones, rather than treating the whole image identically.",
          },
        ]}
      />

      <ContentSection id="transparency" heading="Transparency Survives the Conversion">
        <p>
          This is the question most people have before converting, so it is
          worth being precise: WebP supports a full 8-bit alpha channel, giving
          256 levels of transparency per pixel. That is the same depth PNG-24
          provides. A logo on a transparent background, a product cutout with a
          soft drop shadow, or an icon with anti-aliased curves will all convert
          without a visible halo or hard fringe.
        </p>
        <p>
          Where transparency can degrade is at very aggressive compression
          settings on images with fine semi-transparent detail — think smoke,
          glass, or feathered edges over a busy background. If your PNG falls
          into that category, use Best Quality mode and check the preview
          before downloading. For everything else, the default settings handle
          alpha cleanly.
        </p>
      </ContentSection>

      <FeatureGrid
        id="how-to"
        heading="What This Converter Does with Your PNG"
        items={[
          {
            title: "Accepts any PNG",
            desc: "PNG-8, PNG-24, and PNG-32 files all work, with or without an alpha channel. Interlaced PNGs are handled the same as standard ones.",
          },
          {
            title: "Converts to WebP",
            desc: "Conversion happens in your browser through the Canvas API and the browser's native WebP encoder — no server, no queue, no upload.",
          },
          {
            title: "Preserves transparency",
            desc: "The alpha channel is carried through to the WebP output, so transparent backgrounds stay transparent.",
          },
          {
            title: "Hits a size target",
            desc: "Quality is adjusted automatically to bring the output under your chosen target, with optional resizing for oversized source images.",
          },
        ]}
      />

      <ContentSection id="savings" heading="How Much Smaller Will the WebP Be?">
        <p>
          Google&apos;s own benchmarks put lossless WebP at roughly 26% smaller
          than PNG across a large test corpus. That figure is the conservative
          case — it assumes you want a pixel-perfect copy. In real use the
          savings are usually far larger, because most PNGs on the web do not
          need to be lossless at all.
        </p>
        <p>
          A 1920px application screenshot saved as PNG-24 commonly lands between
          400KB and 1.5MB. Converted to lossy WebP at a sensible quality level,
          the same screenshot typically comes out between 40KB and 120KB while
          remaining perfectly readable. Flat graphics — charts, diagrams,
          illustrations with large single-colour regions — compress hardest of
          all, often dropping more than 80%.
        </p>
        <p>
          Photographic PNGs behave differently. If a camera photo was exported
          as PNG, the file is enormous for no benefit, and converting it to
          WebP produces the most dramatic reduction this tool will show you —
          frequently a tenth of the original size.
        </p>
      </ContentSection>

      <UseCaseGrid
        heading="When to Convert PNG to WebP"
        items={[
          {
            title: "Website screenshots",
            desc: "Documentation and marketing screenshots are usually exported as PNG and are usually the heaviest assets on the page. WebP fixes that without touching legibility.",
            icon: "🖥",
          },
          {
            title: "Logos and brand assets",
            desc: "In-page logos keep their transparent background and lose most of their weight, which helps every page they appear on.",
            icon: "®",
          },
          {
            title: "Product cutouts",
            desc: "E-commerce photos on transparent backgrounds convert cleanly, keeping the cutout while shrinking the catalogue's total page weight.",
            icon: "🛍",
          },
          {
            title: "App and UI mockups",
            desc: "Portfolio and case-study pages full of interface mockups load far faster once the PNGs become WebP.",
            icon: "📐",
          },
          {
            title: "Charts and diagrams",
            desc: "Large flat colour regions are exactly what WebP's palette cache is designed for, so these files shrink the most.",
            icon: "📊",
          },
          {
            title: "Core Web Vitals work",
            desc: "If Lighthouse flags \"serve images in next-gen formats\", converting your PNGs is the single change that resolves it.",
            icon: "⚡",
          },
        ]}
      />

      <PageCallout id="keep-png" variant="tip" heading="When You Should Keep the PNG">
        <p>
          WebP is not the right answer everywhere. Keep PNG for favicons and app
          icons, where browsers and operating systems still expect PNG or ICO.
          Keep it for images headed to a print workflow or to software with no
          WebP support — some older design tools and a number of internal
          enterprise systems still do not read it. Keep it when a client
          contract or platform spec explicitly requires PNG delivery.
        </p>
        <p>
          It is also worth archiving the original PNG after you convert. Lossy
          conversion is one-directional: you cannot recover the original detail
          from the WebP later, so treat the PNG as your master copy and the
          WebP as the delivery format.
        </p>
      </PageCallout>

      <PageCallout variant="privacy" heading="Your PNG Files Never Leave Your Device">
        <p>
          Every step of the conversion happens locally in your browser. There is
          no upload, no temporary server-side copy, and no third party with
          access to the file. That matters for the kinds of images people
          usually have in PNG form: internal dashboards, unreleased product
          screenshots, signed documents, scans, and design work under NDA. Close
          the tab and the image data is gone.
        </p>
        <p className="text-xs text-zinc-500 mt-2">
          Need a specific output size instead? Use{" "}
          <Link
            href="/compress-png-to-100kb"
            className="text-blue-600 hover:underline font-medium"
          >
            compress PNG to 100KB
          </Link>{" "}
          for a strict target, the{" "}
          <Link
            href="/bulk-image-to-webp"
            className="text-blue-600 hover:underline font-medium"
          >
            bulk image to WebP converter
          </Link>{" "}
          for whole folders, or{" "}
          <Link
            href="/jpg-to-webp"
            className="text-blue-600 hover:underline font-medium"
          >
            JPG to WebP
          </Link>{" "}
          if your source files are photos rather than graphics.
        </p>
      </PageCallout>
    </SeoCompressorPage>
  );
}
