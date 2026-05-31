export type PageConfig = {
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  targetKB?: number;
  toolType:
    | "single-compressor"
    | "webp-compressor"
    | "jpg-to-webp"
    | "png-to-webp"
    | "bulk-webp"
    | "static";
  index: boolean;
  canonicalPath?: string;
};

export const pageConfigs: PageConfig[] = [
  {
    slug: "home",
    path: "/",
    title: "WebP Image Compressor — Compress to 100KB or Less",
    description:
      "Convert JPG, PNG, and WebP images into SEO-friendly WebP files under 100KB directly in your browser.",
    h1: "Compress Images to 100KB or Less",
    toolType: "single-compressor",
    index: true,
  },
  {
    slug: "image-compressor",
    path: "/image-compressor",
    title: "Image Compressor — Compress Images Online",
    description:
      "Compress JPG, PNG, and WebP images to smaller sizes online. Private browser-based compression with no uploads.",
    h1: "Image Compressor",
    toolType: "single-compressor",
    index: true,
  },
  {
    slug: "webp-image-compressor",
    path: "/webp-image-compressor",
    title: "WebP Image Compressor — Compress WebP Online",
    description:
      "Compress WebP images online to smaller sizes. Private browser-based compression with no uploads.",
    h1: "WebP Image Compressor",
    toolType: "webp-compressor",
    index: true,
  },
  {
    slug: "compress-image-to-50kb",
    path: "/compress-image-to-50kb",
    title: "Compress Image to 50KB Online",
    description:
      "Compress JPG, PNG, and WebP images to 50KB or less. Get an SEO-friendly WebP image processed privately in your browser.",
    h1: "Compress Image to 50KB",
    targetKB: 50,
    toolType: "single-compressor",
    index: true,
  },
  {
    slug: "compress-image-to-100kb",
    path: "/compress-image-to-100kb",
    title: "Compress Image to 100KB Online",
    description:
      "Compress images to 100KB or less and download an SEO-friendly WebP file. Fast, private, and browser-based.",
    h1: "Compress Image to 100KB",
    targetKB: 100,
    toolType: "single-compressor",
    index: true,
  },
  {
    slug: "webp-compress-image-to-100kb",
    path: "/webp-compress-image-to-100kb",
    title: "Compress WebP Image to 100KB Online",
    description:
      "Compress WebP images to 100KB or less while keeping them SEO-friendly and browser-ready.",
    h1: "Compress WebP Image to 100KB",
    targetKB: 100,
    toolType: "webp-compressor",
    index: true,
  },
  {
    slug: "compress-image-to-20kb",
    path: "/compress-image-to-20kb",
    title: "Compress Image to 20KB Online",
    description:
      "Compress JPG, PNG, and WebP images to 20KB or less.",
    h1: "Compress Image to 20KB",
    targetKB: 20,
    toolType: "single-compressor",
    index: false,
  },
  {
    slug: "compress-image-to-30kb",
    path: "/compress-image-to-30kb",
    title: "Compress Image to 30KB Online",
    description:
      "Compress JPG, PNG, and WebP images to 30KB or less.",
    h1: "Compress Image to 30KB",
    targetKB: 30,
    toolType: "single-compressor",
    index: false,
  },
  {
    slug: "compress-image-to-75kb",
    path: "/compress-image-to-75kb",
    title: "Compress Image to 75KB Online",
    description:
      "Compress JPG, PNG, and WebP images to 75KB or less.",
    h1: "Compress Image to 75KB",
    targetKB: 75,
    toolType: "single-compressor",
    index: false,
  },
  {
    slug: "webp-compress-image-to-50kb",
    path: "/webp-compress-image-to-50kb",
    title: "Compress WebP Image to 50KB Online",
    description:
      "Compress WebP images to 50KB or less.",
    h1: "Compress WebP Image to 50KB",
    targetKB: 50,
    toolType: "webp-compressor",
    index: false,
  },
  {
    slug: "jpg-to-webp-100kb",
    path: "/jpg-to-webp-100kb",
    title: "Convert JPG to WebP Under 100KB",
    description:
      "Convert JPG images to SEO-friendly WebP files under 100KB.",
    h1: "JPG to WebP Under 100KB",
    targetKB: 100,
    toolType: "jpg-to-webp",
    index: false,
  },
  {
    slug: "png-to-webp-100kb",
    path: "/png-to-webp-100kb",
    title: "Convert PNG to WebP Under 100KB",
    description:
      "Convert PNG images to SEO-friendly WebP files under 100KB.",
    h1: "PNG to WebP Under 100KB",
    targetKB: 100,
    toolType: "png-to-webp",
    index: false,
  },
  {
    slug: "jpg-to-webp",
    path: "/jpg-to-webp",
    title: "JPG to WebP Converter",
    description:
      "Convert JPG images to SEO-friendly WebP files under 100KB. Free browser-based conversion with no uploads.",
    h1: "Convert JPG to WebP",
    targetKB: 100,
    toolType: "jpg-to-webp",
    index: true,
  },
  {
    slug: "png-to-webp",
    path: "/png-to-webp",
    title: "PNG to WebP Converter",
    description:
      "Convert PNG images to SEO-friendly WebP files under 100KB. Private browser-based image conversion.",
    h1: "Convert PNG to WebP",
    targetKB: 100,
    toolType: "png-to-webp",
    index: true,
  },
  {
    slug: "image-to-webp",
    path: "/image-to-webp",
    title: "Image to WebP Converter",
    description:
      "Convert JPG, PNG, and WebP images into SEO-friendly WebP files under 100KB directly in your browser.",
    h1: "Convert Image to WebP",
    targetKB: 100,
    toolType: "single-compressor",
    index: true,
  },
  {
    slug: "bulk-image-to-webp",
    path: "/bulk-image-to-webp",
    title: "Bulk Image to WebP Converter",
    description:
      "Convert multiple JPG, PNG, and WebP images to SEO-friendly WebP files under 100KB. Bulk browser-based conversion with no uploads.",
    h1: "Bulk Image to WebP Converter",
    toolType: "bulk-webp",
    index: true,
  },
  {
    slug: "privacy",
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "Your images are processed locally in your browser. We do not upload, store, view, or track your images.",
    h1: "Privacy Policy",
    toolType: "static",
    index: true,
  },
  {
    slug: "terms",
    path: "/terms",
    title: "Terms of Use",
    description:
      "Terms of use for the free browser-based WebP image compressor.",
    h1: "Terms of Use",
    toolType: "static",
    index: true,
  },
  {
    slug: "contact",
    path: "/contact",
    title: "Contact",
    description:
      "Contact the WebP Image Compressor team for questions, feedback, or support.",
    h1: "Contact",
    toolType: "static",
    index: true,
  },
];

export function getIndexableConfigs(): PageConfig[] {
  return pageConfigs.filter((c) => c.index);
}
