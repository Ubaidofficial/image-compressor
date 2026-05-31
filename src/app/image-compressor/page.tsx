import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";
import {
  ContentSection,
  FeatureGrid,
  PageCallout,
  ProcessSteps,
  UseCaseGrid,
  OnThisPage,
} from "@/components/content/ContentHelpers";
import Link from "next/link";

const pagePath = "/image-compressor";
const pageTitle = "Image Compressor Under 100KB";
const pageDescription =
  "Compress JPG, PNG, and WebP images under 100KB and download SEO-friendly WebP files. Free browser-based image compression with no uploads.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: true,
});

export default function ImageCompressorPage() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="image compressor"
      title={pageTitle}
      h1="Image Compressor Under 100KB"
      intro="Upload a JPG, PNG, or WebP image and compress it to 100KB or less. The tool converts your image to WebP and optimizes file size in your browser. Downloads are only enabled when the output file meets the target."
      intent="general"
      pagePath={pagePath}
      description={pageDescription}
      webpWhyH2="Why WebP helps reduce image file size"
      webpWhyText="WebP typically produces smaller file sizes than JPG and PNG while maintaining good visual quality. Smaller images use less bandwidth and help pages load faster. All downloads from this tool are WebP format."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Image Compressor", path: pagePath },
      ]}
    >
      <OnThisPage
        links={[
          { label: "Supported formats", href: "#supported-formats" },
          { label: "Compression modes", href: "#compression-modes" },
          { label: "Resize controls", href: "#resize-controls" },
          { label: "How it works", href: "#how-it-works" },
          { label: "Use cases", href: "#use-cases" },
          { label: "Privacy", href: "#privacy" },
        ]}
      />

      <ContentSection id="supported-formats" heading="Supported Image Formats">
        <p>
          You can upload JPG, JPEG, PNG, and WebP images. The tool processes
          all three formats and always outputs a WebP file. WebP was chosen
          because it produces smaller files than JPG and PNG at similar visual
          quality, which is useful when you need images that load quickly on
          websites.
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>JPG / JPEG</strong> — photos, product images, social media
            images
          </li>
          <li>
            <strong>PNG</strong> — screenshots, graphics with transparency,
            logos
          </li>
          <li>
            <strong>WebP</strong> — already optimized images that need further
            compression
          </li>
        </ul>
        <p>
          SVG, GIF, PDF, and other formats are not accepted. If you have a file
          in one of those formats, convert it to JPG or PNG first before using
          this tool.
        </p>
      </ContentSection>

      <FeatureGrid
        id="compression-modes"
        heading="Compression Modes Explained"
        items={[
          {
            title: "Best Quality",
            desc: "Prioritizes visual quality. The tool tries harder to keep original dimensions and uses higher quality settings. Best for images where clarity matters more than file size.",
          },
          {
            title: "Balanced",
            desc: "Recommended for most uses. Balances file size and visual quality with a sensible tradeoff that works well for website images, product photos, and general use.",
          },
          {
            title: "Smallest File",
            desc: "Uses stronger compression and reduces dimensions earlier. Best when you need the smallest possible WebP file, such as for email attachments or strict upload limits.",
          },
        ]}
      />

      <ContentSection id="resize-controls" heading="Optional Resize Controls">
        <p>
          You can optionally resize images before compression by setting a max
          width. This is useful when you have a large source image from a
          camera or design tool and want the output to fit a specific layout
          width. Choose from presets like 1920px, 1600px, 1200px, or 800px, or
          enter a custom width.
        </p>
        <p>
          If the source image is already smaller than the chosen max width, no
          resizing occurs. The tool preserves aspect ratio and never upscales
          images beyond their original size. Resize is helpful when a large
          photo cannot fit under 100KB with quality adjustment alone — reducing
          dimensions often produces better visual results than severe
          compression.
        </p>
      </ContentSection>

      <ProcessSteps
        heading="How the Image Compressor Works"
        steps={[
          "Upload your JPG, PNG, or WebP image",
          "The tool converts it to WebP in your browser",
          "Quality and dimensions are adjusted to reach the target size",
          "Download the optimized WebP file when the target is met",
        ]}
      />

      <PageCallout variant="tip" heading="What if compression fails?">
        <p>
          If an image cannot be compressed under the target size, try switching
          to Smallest File mode or enabling the resize option with a max width
          like 1200px. Very large, highly detailed images from professional
          cameras may not fit under 100KB without some dimension reduction. The
          download button only appears when the output file is verified to meet
          the size target.
        </p>
      </PageCallout>

      <UseCaseGrid
        heading="When to Use the Image Compressor"
        items={[
          {
            title: "Website page images",
            desc: "Keep JPG and PNG photos under 100KB so your pages load faster and use less bandwidth.",
            icon: "🌐",
          },
          {
            title: "Product thumbnails",
            desc: "Compress product photos into WebP files that look good in gallery grids and category pages.",
            icon: "🛍",
          },
          {
            title: "Blog post media",
            desc: "Make blog images smaller without losing the visual quality readers expect.",
            icon: "📝",
          },
          {
            title: "Social media photos",
            desc: "Compress profile and cover photos before uploading to platforms with image size limits.",
            icon: "📱",
          },
          {
            title: "Portfolio images",
            desc: "Showcase your work with fast-loading WebP images that still look crisp and professional.",
            icon: "🖼",
          },
          {
            title: "Headshot resizing",
            desc: "Resize and compress professional headshots to standard web dimensions under 100KB.",
            icon: "👤",
          },
        ]}
      />

      <ContentSection id="privacy" heading="Privacy and Client-Side Compression">
        <p>
          Everything runs locally in your browser using the Canvas API and WebP
          encoder. Your image is never uploaded, stored, or sent to any server.
          Once you close the browser tab, all image data is gone. This means
          you can safely compress personal photos, work documents, and
          sensitive images without worrying about privacy.
        </p>
        <p>
          For batch workflows with multiple images, try the{" "}
          <Link
            href="/bulk-image-to-webp"
            className="text-blue-600 hover:underline"
          >
            bulk image to WebP converter
          </Link>
          . To target a specific 100KB limit with detailed guidance, use the{" "}
          <Link
            href="/compress-image-to-100kb"
            className="text-blue-600 hover:underline"
          >
            compress image to 100KB
          </Link>{" "}
          tool. If you only need to convert JPG files, the{" "}
          <Link
            href="/jpg-to-webp"
            className="text-blue-600 hover:underline"
          >
            JPG to WebP converter
          </Link>{" "}
          is also available.
        </p>
      </ContentSection>
    </SeoCompressorPage>
  );
}
