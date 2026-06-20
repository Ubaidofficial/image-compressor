import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/createPageMetadata";
import SeoCompressorPage from "@/components/SeoCompressorPage";
import type { FaqItem } from "@/components/FAQ";
import {
  ContentSection,
  FeatureGrid,
  PageCallout,
  UseCaseGrid,
  OnThisPage,
} from "@/components/content/ContentHelpers";
import Link from "next/link";
import JpgToWebpIllustration from "@/components/illustrations/JpgToWebpIllustration";

const pagePath = "/jpg-to-webp";
const pageTitle = "JPG to WebP Converter Under 100KB";
const pageDescription =
  "Convert JPG and JPEG images to SEO-friendly WebP files under 100KB. Free browser-based JPG to WebP conversion with no uploads.";

const jpgFaqs: FaqItem[] = [
  {
    question: "Can I convert JPEG files too?",
    answer:
      "Yes. Both .jpg and .jpeg extensions are accepted. The tool treats them the same way and converts both to WebP under 100KB.",
  },
  {
    question: "Is WebP smaller than JPG?",
    answer:
      "Yes, usually. WebP compression typically produces files 25–35% smaller than equivalent-quality JPG images, helping pages use less bandwidth and load faster.",
  },
  {
    question: "Will the output be under 100KB?",
    answer:
      "The tool compresses the WebP output to 100KB or less. The final file may be slightly below 100KB so it never exceeds the limit.",
  },
  {
    question: "Are my JPG images uploaded?",
    answer:
      "No. The conversion happens in your browser using the Canvas API. Your images are never uploaded to a server.",
  },
  {
    question: "Can I convert multiple JPG images at once?",
    answer:
      "Yes. Use the bulk image to WebP converter to process up to 20 images in a single batch and download them as a ZIP file with a CSV compression report.",
  },
];

export const metadata: Metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: pagePath,
  index: true,
});

export default function JpgToWebp() {
  return (
    <SeoCompressorPage
      targetKB={100}
      keyword="jpg to webp"
      title={pageTitle}
      h1="JPG to WebP Converter"
      intro="Convert JPG or JPEG images to lightweight WebP files under 100KB. The conversion happens in your browser, and your images are never uploaded."
      intent="jpg-to-webp"
      pagePath={pagePath}
      description={pageDescription}
      howToTitle="How to Convert JPG to WebP"
      howToSteps={[
        "Drag and drop your JPG or JPEG image, or click to browse.",
        "The tool converts it to WebP and compresses it to 100KB or less using quality optimization.",
        "Review the original and converted file sizes, dimensions, and compression savings.",
        "Download the WebP file — it is ready for websites, emails, and uploads under 100KB.",
      ]}
      webpWhyH2="Why WebP can be smaller than JPG"
      webpWhyText="WebP uses more advanced compression techniques than JPG, often producing files 25–35% smaller while keeping similar visual quality. That means faster page loads and less bandwidth for your website. All downloads from this tool are WebP format."
      breadcrumbs={[
        { name: "Home", path: "/" },
        { name: "Converters", path: "/image-to-webp" },
        { name: "JPG to WebP", path: pagePath },
      ]}
      faqItems={jpgFaqs}
    >
      <OnThisPage
        links={[
          { label: "JPG vs WebP", href: "#jpg-vs-webp" },
          { label: "Why smaller?", href: "#why-smaller" },
          { label: "Under 100KB", href: "#under-100kb" },
          { label: "Use cases", href: "#use-cases" },
          { label: "Privacy", href: "#privacy" },
        ]}
      />

      <div className="mt-12 max-w-md mx-auto">
        <JpgToWebpIllustration />
      </div>

      <ContentSection id="jpg-vs-webp" heading="JPG vs WebP — What Is the Difference?">
        <p>
          JPG (or JPEG) has been the standard image format for photos on the
          web for decades. It compresses images by discarding some detail in
          areas the human eye is less sensitive to. This works well, but the
          compression algorithm dates back to 1992.
        </p>
        <p>
          WebP is a newer format developed by Google that uses more modern
          compression techniques. It can produce image files that are 25–35%
          smaller than equivalent-quality JPG files while looking nearly
          identical. WebP also supports both lossy and lossless compression,
          transparency (like PNG), and animation (like GIF), all in one format.
        </p>
        <p>
          For website images, WebP is a practical choice because smaller files
          mean faster page loads and lower bandwidth usage for visitors. Most
          modern browsers — Chrome, Firefox, Edge, Safari, and Opera — support
          WebP, making it safe to use across the web.
        </p>
      </ContentSection>

      <ContentSection id="why-smaller" heading="Why WebP Files Are Smaller Than JPG">
        <p>
          WebP achieves smaller file sizes through several technical
          improvements over JPG. Its block prediction and adaptive block
          quantization analyze image data more efficiently. It also uses a
          better entropy coding method and supports additional filtering
          techniques that preserve edge sharpness while reducing file size.
        </p>
        <p>
          In practice, this means a WebP image at quality level 80 often looks
          similar to a JPG at quality 90 while being noticeably smaller. The
          compression savings are most visible in photos with smooth gradients,
          natural scenes, and web graphics — which covers most images used on
          websites.
        </p>
      </ContentSection>

      <FeatureGrid
        heading="What This Tool Does with Your JPG"
        items={[
          {
            title: "Accepts JPG and JPEG",
            desc: "Both .jpg and .jpeg extensions are accepted. PNG and WebP files are rejected on this page — use those on the general image compressor.",
          },
          {
            title: "Converts to WebP",
            desc: "Your JPG is converted to WebP format in your browser using the Canvas API. No server processing is involved.",
          },
          {
            title: "Compresses under 100KB",
            desc: "The tool applies quality adjustment and optional resizing to bring the WebP output under 100KB before enabling the download.",
          },
          {
            title: "Preserves aspect ratio",
            desc: "If resizing is needed to reach the target, the tool maintains the original width-to-height proportions. No stretching or distortion.",
          },
        ]}
      />

      <ContentSection id="under-100kb" heading="Converting JPG to WebP Under 100KB">
        <p>
          This tool targets 100KB as the output limit. When you upload a JPG,
          the tool converts it to WebP and adjusts compression quality to find
          the best visual result under 100KB. If the JPG is very large —
          perhaps from a digital camera at 4000px or wider — the tool may
          reduce dimensions to reach the target size.
        </p>
        <p>
          You can use the optional resize control to set a max width like
          1200px or 800px before compression, which often produces better
          results for web use. The download button is only shown when the
          output WebP file is verified to be 100KB or less. If the conversion
          cannot reach the target, the tool shows actionable tips to help you
          adjust settings.
        </p>
      </ContentSection>

      <UseCaseGrid
        heading="When JPG to WebP Conversion Is Useful"
        items={[
          {
            title: "Website migration",
            desc: "Convert an existing JPG image library to WebP so pages load faster without changing the visual design.",
            icon: "🌐",
          },
          {
            title: "Blog optimization",
            desc: "Convert blog post hero images and in-content photos from JPG to WebP for better page speed.",
            icon: "📝",
          },
          {
            title: "Product photos",
            desc: "Convert JPG product images to WebP before uploading to an e-commerce platform that supports the format.",
            icon: "🛍",
          },
          {
            title: "Email newsletters",
            desc: "Convert JPG newsletter images to smaller WebP files so emails are lighter and more deliverable.",
            icon: "📧",
          },
          {
            title: "Portfolio sites",
            desc: "Convert JPG portfolio images to WebP so galleries load smoothly without long wait times.",
            icon: "🖼",
          },
          {
            title: "Social media prep",
            desc: "Convert JPG photos to WebP under 100KB before uploading to platforms with file size limits.",
            icon: "📱",
          },
        ]}
      />

      <PageCallout variant="privacy" heading="Browser-Based Privacy for JPG Conversion">
        <p>
          Your JPG images stay on your device. The conversion to WebP and
          compression to 100KB happens entirely in your browser using the
          Canvas API and built-in WebP encoder. Files are not uploaded, stored,
          or accessible by any server or third party. Once you close the
          browser tab, all image data is removed. This means you can convert
          personal photos, sensitive documents, and work images without
          worrying about where they end up.
        </p>
      </PageCallout>

      <PageCallout
        variant="tip"
        heading="What to do if a JPG cannot fit under 100KB"
      >
        <p>
          If your JPG is too large or detailed to fit under 100KB as a WebP
          file, try switching the compression mode to Smallest File. Enable the
          resize option and set a max width of 1200px or 800px. If the image
          still cannot reach 100KB, consider whether a lower resolution version
          would still serve your purpose — many web uses do not need images
          wider than 1200px.
        </p>
        <p className="text-xs text-zinc-500 mt-2">
          For JPG files with a strict 100KB size target, use the{" "}
          <Link
            href="/compress-jpg-to-100kb"
            className="text-blue-600 hover:underline font-medium"
          >
            compress JPG to 100KB
          </Link>
          page. For
          general single-image compression of any format, use the{" "}
          <Link
            href="/image-compressor"
            className="text-blue-600 hover:underline font-medium"
          >
            image compressor
          </Link>
          . If you need a strict 100KB target with detailed guidance, the{" "}
          <Link
            href="/compress-image-to-100kb"
            className="text-blue-600 hover:underline font-medium"
          >
            compress image to 100KB
          </Link>{" "}
          tool is available.
        </p>
      </PageCallout>
    </SeoCompressorPage>
  );
}
