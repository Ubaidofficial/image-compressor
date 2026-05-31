import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";
import {
  ContentSection,
  FeatureGrid,
  PageCallout,
  ComparisonTable,
  UseCaseGrid,
  OnThisPage,
} from "@/components/content/ContentHelpers";
import Link from "next/link";

const pagePath = "/compress-image-to-100kb";
const pageTitle = "Compress Image to 100KB Online";
const pageDescription =
  "Compress images to 100KB or less and download an SEO-friendly WebP file. Fast, private, browser-based image compression.";

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: true,
});

export default function CompressImageTo100Kb() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="compress image to 100kb"
      title={pageTitle}
      h1="Compress Image to 100KB"
      intro="Need an image under a 100KB upload limit? Upload your JPG, PNG, or WebP image and download an optimized WebP file that is 100KB or less. The download button appears only when the output file meets the size target."
      intent="general"
      pagePath={pagePath}
      description={pageDescription}
      webpWhyH2="Why the final file may be below 100KB"
      webpWhyText="To keep downloads strictly under 100KB, the tool may compress the image slightly below the target. This ensures the file never exceeds the limit, which is important for upload forms and strict size requirements. All downloads are WebP format."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Compress Image to 100KB", path: pagePath },
      ]}
    >
      <OnThisPage
        links={[
          { label: "Why 100KB?", href: "#why-100kb" },
          { label: "How it works", href: "#how-it-works" },
          { label: "Formats", href: "#formats" },
          { label: "What if it fails?", href: "#failure" },
          { label: "Privacy", href: "#privacy" },
        ]}
      />

      <ContentSection id="why-100kb" heading="Why Users Need Images Under 100KB">
        <p>
          Many online services set upload limits around 100KB for profile
          photos, application forms, forum avatars, and document attachments.
          If your image exceeds the limit, the upload is rejected. This tool
          compresses images to 100KB or less so they pass those checks the
          first time.
        </p>
        <p>
          Common scenarios include: job application portals that ask for a
          passport-size photo under 100KB, government form photo uploads,
          online course platform profile images, community forum avatar
          requirements, email attachment limits, and e-commerce product catalog
          thumbnails. In each case, the system expects a file under the limit,
          and this tool helps you meet that requirement without installing
          software.
        </p>
      </ContentSection>

      <FeatureGrid
        heading="How the Tool Reaches the 100KB Target"
        items={[
          {
            title: "Quality adjustment",
            desc: "The tool tries different compression quality levels to find the best visual result that stays under 100KB.",
          },
          {
            title: "Dimension reduction",
            desc: "If quality adjustment alone cannot reach 100KB, the tool may reduce image dimensions while preserving aspect ratio.",
          },
          {
            title: "WebP format",
            desc: "All downloads are WebP, which compresses more efficiently than JPG or PNG at the same visual quality level.",
          },
          {
            title: "Download validation",
            desc: "The download button is only shown when the compressed file is verified to be 100KB or less in your browser.",
          },
        ]}
      />

      <ContentSection id="formats" heading="What Image Formats Can You Upload?">
        <p>
          You can upload JPG, JPEG, PNG, and WebP images. The tool reads the
          image in your browser, compresses it, and outputs a WebP file. SVG,
          GIF, PDF, and other formats are not accepted. If you have a file in a
          different format, convert it to JPG or PNG first using any image
          editor before using this tool.
        </p>
        <p>
          WebP output was chosen because it produces the smallest files among
          browser-supported formats while maintaining good visual quality.
          Every download is guaranteed to be a valid WebP image, ready to use
          on websites, in emails, or as an upload to any platform that accepts
          images.
        </p>
      </ContentSection>

      <PageCallout variant="tip" heading="What if compression cannot reach 100KB?">
        <p>
          If your image cannot fit under 100KB with the current settings, try
          switching to Smallest File mode or enabling the resize option with a
          max width like 1200px or 800px. Very large camera photos with lots of
          fine detail and color variation may need dimension reduction to reach
          100KB. The download button only appears when the output is verified
          under the limit.
        </p>
        <p className="text-xs text-zinc-500 mt-2">
          The tool does not guarantee every image will compress successfully
          under 100KB. Highly complex images (e.g., detailed aerial photos,
          high-noise images, images with thousands of distinct colors) may not
          fit without significant dimension reduction.
        </p>
      </PageCallout>

      <UseCaseGrid
        heading="Common Reasons for 100KB Image Limits"
        items={[
          {
            title: "Online forms",
            desc: "Job applications, visa forms, and government portals often set photo upload limits to 100KB.",
            icon: "📋",
          },
          {
            title: "Profile uploads",
            desc: "Forums, social platforms, and community sites limit profile picture sizes to keep pages fast.",
            icon: "👤",
          },
          {
            title: "Application portals",
            desc: "University and scholarship application systems require ID photos under specific file sizes.",
            icon: "🎓",
          },
          {
            title: "Website images",
            desc: "Developers target 100KB for hero images to keep page load times low across all devices.",
            icon: "🌐",
          },
          {
            title: "Email attachments",
            desc: "Many email providers limit attachment sizes. Keeping images under 100KB helps messages deliver cleanly.",
            icon: "📧",
          },
          {
            title: "Product thumbnails",
            desc: "E-commerce platforms often ask for small thumbnail images that load quickly in product grids.",
            icon: "🛍",
          },
        ]}
      />

      <ComparisonTable
        heading="Which Tool Should You Use?"
        rows={[
          {
            task: "Compress one image to 100KB",
            tool: "Compress Image to 100KB",
            href: pagePath,
          },
          {
            task: "Compress one image, general use",
            tool: "Image Compressor",
            href: "/image-compressor",
          },
          {
            task: "Convert many images at once",
            tool: "Bulk Image to WebP",
            href: "/bulk-image-to-webp",
          },
          {
            task: "Convert JPG to WebP",
            tool: "JPG to WebP",
            href: "/jpg-to-webp",
          },
          {
            task: "Compress to 50KB",
            tool: "Compress to 50KB",
            href: "/compress-image-to-50kb",
          },
        ]}
      />

      <ContentSection id="privacy" heading="Privacy and Browser Processing">
        <p>
          Your image stays on your device throughout the entire process.
          Compression runs in your browser using the Canvas API and WebP
          encoder. The image is not uploaded, stored, or sent to any server.
          Once you close the browser tab, all image data is removed from
          memory. This makes the tool safe for personal photos, scanned
          documents, and any image you would not want shared with a
          third-party service.
        </p>
        <p>
          For converting many images at once with a 100KB per-file limit, try
          the{" "}
          <Link
            href="/bulk-image-to-webp"
            className="text-blue-600 hover:underline"
          >
            bulk image to WebP converter
          </Link>
          . For single-image compression without a strict 100KB focus, use the{" "}
          <Link
            href="/image-compressor"
            className="text-blue-600 hover:underline"
          >
            image compressor
          </Link>
          . If you need to convert JPG files specifically, the{" "}
          <Link
            href="/jpg-to-webp"
            className="text-blue-600 hover:underline"
          >
            JPG to WebP converter
          </Link>{" "}
          is designed for that workflow.
        </p>
      </ContentSection>
    </SeoCompressorPage>
  );
}
