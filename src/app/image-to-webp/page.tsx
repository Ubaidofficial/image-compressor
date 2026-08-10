import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";
import type { FaqItem } from "@/components/FAQ";
import {
  ContentSection,
  ContentCardGrid,
  PageCallout,
  KeywordInfoBlock,
  ProcessSteps,
  OnThisPage,
} from "@/components/content/ContentHelpers";

const pagePath = "/image-to-webp";
const pageTitle = "Image to WebP Converter - Free";
const pageDescription =
  "Convert JPG, JPEG, PNG, or WebP images to optimized WebP in your browser. Free, no uploads, no signup, and no file size limits on input.";

const converterFaqs: FaqItem[] = [
  {
    question: "Which image formats can I convert to WebP?",
    answer:
      "JPG, JPEG, PNG, and existing WebP files are all accepted. JPG and PNG are the two most common sources; re-encoding an existing WebP is useful when you need it to hit a smaller size target.",
  },
  {
    question: "Why convert images to WebP at all?",
    answer:
      "WebP files are typically 25 to 35% smaller than JPG and around 26% smaller than PNG at comparable quality. Smaller images mean faster page loads, better Core Web Vitals scores, and less bandwidth for both you and your visitors.",
  },
  {
    question: "Does WebP support transparency and animation?",
    answer:
      "WebP supports both. It handles an 8-bit alpha channel like PNG and animated sequences like GIF. This converter produces still images; transparency from a source PNG is preserved.",
  },
  {
    question: "Is WebP supported by all browsers?",
    answer:
      "Effectively yes. Chrome, Firefox, Safari, Edge, Opera, and the mobile versions of each have supported WebP for years, covering roughly 97% of global browser traffic.",
  },
  {
    question: "Are my images uploaded during conversion?",
    answer:
      "No. Conversion runs in your browser using the Canvas API and the browser's native WebP encoder. Your files are never transmitted to a server and nothing persists after you close the tab.",
  },
  {
    question: "Can I convert an image to WebP without losing quality?",
    answer:
      "Use Best Quality mode to keep visual fidelity as close to the original as possible. Some loss is inherent to lossy WebP, but at high quality settings the difference is not visible at normal viewing size.",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: true,
});

export default function ImageToWebp() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="image to webp"
      title={pageTitle}
      h1="Image to WebP Converter"
      intro="Convert JPG, JPEG, PNG, or WebP images into optimized WebP files. Everything runs in your browser — no uploads, no signup, no waiting in a queue."
      intent="general"
      pagePath={pagePath}
      description={pageDescription}
      appFeatureList={[
        "Convert JPG, PNG, and WebP to WebP",
        "Client-side conversion with no uploads",
        "Transparency preserved from PNG sources",
        "Optional output size targets",
      ]}
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Converters", path: pagePath },
      ]}
      faqItems={converterFaqs}
    >
      <OnThisPage
        links={[
          { label: "Pick a converter", href: "#converters" },
          { label: "Why WebP", href: "#why-webp" },
          { label: "How it works", href: "#how-it-works" },
          { label: "Format guide", href: "#format-guide" },
        ]}
      />

      <ContentCardGrid
        heading="Pick the Converter That Matches Your Source File"
        columns={3}
        items={[
          {
            title: "JPG to WebP",
            desc: "For photos and camera images. Typically 25 to 35% smaller than the source JPG at the same visual quality.",
            icon: "J",
            href: "/jpg-to-webp",
          },
          {
            title: "PNG to WebP",
            desc: "For screenshots, logos, and graphics. Keeps transparency and usually produces the largest savings of any source format.",
            icon: "P",
            href: "/png-to-webp",
          },
          {
            title: "Bulk image to WebP",
            desc: "Convert up to 20 files in one batch and download them together as a ZIP with a per-file size report.",
            icon: "B",
            href: "/bulk-image-to-webp",
          },
          {
            title: "WebP under 100KB",
            desc: "When the output has to clear a specific 100KB upload limit rather than just be smaller.",
            icon: "100",
            href: "/convert-image-to-webp-under-100kb",
          },
          {
            title: "WebP compressor",
            desc: "Already have WebP files that are too large? Re-encode them to a smaller size without changing format.",
            icon: "W",
            href: "/webp-compressor",
          },
          {
            title: "General image compressor",
            desc: "If your goal is a smaller file rather than a format change, start with the main compressor instead.",
            icon: "◧",
            href: "/image-compressor",
          },
        ]}
      />

      <ContentSection id="why-webp" heading="Why Convert Images to WebP">
        <p>
          WebP is a modern image format Google released in 2010 to replace the
          patchwork of JPG for photos, PNG for graphics, and GIF for animation.
          It handles all three cases in one format, and it does each of them
          more efficiently than the format it replaces.
        </p>
        <p>
          The practical effect is page weight. Images are the largest component
          of most web pages by a wide margin, so converting an image library
          from JPG and PNG to WebP is usually the single highest-leverage speed
          improvement available — no code changes, no redesign, no
          infrastructure work. Lighthouse and PageSpeed Insights both flag
          non-WebP images directly under &ldquo;serve images in next-gen
          formats&rdquo;, and conversion is what clears that audit.
        </p>
        <p>
          Format support stopped being a real objection years ago. Safari added
          WebP in 2020, which was the last major holdout. Today a WebP image
          renders correctly for roughly 97% of browser traffic worldwide.
        </p>
      </ContentSection>

      <ProcessSteps
        id="how-it-works"
        heading="How the Conversion Works"
        steps={[
          "Drop in a JPG, JPEG, PNG, or WebP file, or click to browse for one.",
          "Your browser decodes it to a canvas and re-encodes it as WebP — nothing is sent anywhere.",
          "Compare the original and converted sizes, dimensions, and the percentage saved.",
          "Download the WebP file, ready for your site, CMS, or upload form.",
        ]}
      />

      <KeywordInfoBlock
        heading="Format Guide: What Converts Well"
        items={[
          {
            title: "JPG and JPEG photos",
            desc: "Convert reliably with 25 to 35% savings. Because JPG is already lossy, avoid repeatedly re-encoding the same image through multiple tools — go from your highest-quality original straight to WebP.",
          },
          {
            title: "PNG screenshots and graphics",
            desc: "The biggest wins live here. Flat colour regions and interface chrome compress extremely well, and transparency carries through untouched.",
          },
          {
            title: "PNG photos",
            desc: "A camera photo saved as PNG is enormous with no quality benefit. Converting these often cuts the file to a tenth of its original size.",
          },
          {
            title: "Existing WebP files",
            desc: "Re-encoding a WebP is worthwhile only when you need to hit a smaller target size, since each pass through lossy compression costs some quality.",
          },
        ]}
      />

      <PageCallout id="format-guide" variant="privacy" heading="Nothing Is Uploaded">
        <p>
          This converter has no backend. The file you select is read by your
          browser, drawn to an in-memory canvas, and encoded to WebP by the
          browser itself. No copy is transmitted, cached, logged, or retained,
          which means there is no server for anyone to breach and no retention
          policy to read. It works offline once the page has loaded, and closing
          the tab discards everything.
        </p>
      </PageCallout>
    </SeoCompressorPage>
  );
}
