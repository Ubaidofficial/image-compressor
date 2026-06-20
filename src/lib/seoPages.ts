export type SeoPageConfig = {
  path: string;
  targetKB: number;
  keyword: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  intent?: "general" | "webp" | "jpg-to-webp" | "png-to-webp";
};

export const seoPages: SeoPageConfig[] = [
  {
    path: "/compress-image-to-20kb",
    targetKB: 20,
    keyword: "compress image to 20kb",
    title: "Compress Image to 20KB Online",
    description:
      "Compress JPG, PNG, and WebP images to 20KB or less. Get an SEO-friendly WebP image processed privately in your browser.",
    h1: "Compress Image to 20KB",
    intro:
      "Upload your JPG, PNG, or WebP image and compress it to 20KB or less. The output is always a WebP file optimized for fast loading and SEO.",
    intent: "general",
  },
  {
    path: "/compress-image-to-30kb",
    targetKB: 30,
    keyword: "compress image to 30kb",
    title: "Compress Image to 30KB Online",
    description:
      "Compress JPG, PNG, and WebP images to 30KB or less. Get an SEO-friendly WebP image processed privately in your browser.",
    h1: "Compress Image to 30KB",
    intro:
      "Upload your JPG, PNG, or WebP image and compress it to 30KB or less. The output is always a WebP file optimized for fast loading and SEO.",
    intent: "general",
  },
  {
    path: "/compress-image-to-50kb",
    targetKB: 50,
    keyword: "compress image to 50kb",
    title: "Compress Image to 50KB Online",
    description:
      "Compress JPG, PNG, and WebP images to 50KB or less. Get an SEO-friendly WebP image processed privately in your browser.",
    h1: "Compress Image to 50KB",
    intro:
      "Upload your JPG, PNG, or WebP image and compress it to 50KB or less. The output is always a WebP file optimized for fast loading and SEO.",
    intent: "general",
  },
  {
    path: "/compress-image-to-75kb",
    targetKB: 75,
    keyword: "compress image to 75kb",
    title: "Compress Image to 75KB Online",
    description:
      "Compress JPG, PNG, and WebP images to 75KB or less. Get an SEO-friendly WebP image processed privately in your browser.",
    h1: "Compress Image to 75KB",
    intro:
      "Upload your JPG, PNG, or WebP image and compress it to 75KB or less. The output is always a WebP file optimized for fast loading and SEO.",
    intent: "general",
  },
  {
    path: "/compress-image-to-100kb",
    targetKB: 100,
    keyword: "compress image to 100kb",
    title: "Compress Image to 100KB Online",
    description:
      "Compress images to 100KB or less and download an SEO-friendly WebP file. Fast, private, and browser-based.",
    h1: "Compress Image to 100KB",
    intro:
      "Upload your JPG, PNG, or WebP image and compress it to 100KB or less. The output is always a WebP file optimized for fast loading and SEO.",
    intent: "general",
  },
  {
    path: "/webp-compress-image-to-50kb",
    targetKB: 50,
    keyword: "compress webp image to 50kb",
    title: "Compress WebP Image to 50KB Online",
    description:
      "Compress WebP images to 50KB or less while keeping them SEO-friendly and browser-ready.",
    h1: "Compress WebP Image to 50KB",
    intro:
      "Upload your WebP image and compress it to 50KB or less. The output stays WebP and is optimized for fast loading and SEO.",
    intent: "webp",
  },
  {
    path: "/webp-compress-image-to-100kb",
    targetKB: 100,
    keyword: "compress webp image to 100kb",
    title: "Compress WebP Image to 100KB Online",
    description:
      "Compress WebP images to 100KB or less while keeping them SEO-friendly and browser-ready.",
    h1: "Compress WebP Image to 100KB",
    intro:
      "Upload your WebP image and compress it to 100KB or less. Keep the WebP format and optimize for SEO performance.",
    intent: "webp",
  },
  {
    path: "/jpg-to-webp-100kb",
    targetKB: 100,
    keyword: "jpg to webp 100kb",
    title: "Convert JPG to WebP Under 100KB",
    description:
      "Convert JPG images to SEO-friendly WebP files under 100KB. Private browser-based compression with no uploads.",
    h1: "JPG to WebP Under 100KB",
    intro:
      "Upload your JPG or JPEG image and convert it to a WebP file under 100KB. All compression happens in your browser.",
    intent: "jpg-to-webp",
  },
  {
    path: "/png-to-webp-100kb",
    targetKB: 100,
    keyword: "png to webp 100kb",
    title: "Convert PNG to WebP Under 100KB",
    description:
      "Convert PNG images to SEO-friendly WebP files under 100KB. Compress images privately in your browser.",
    h1: "PNG to WebP Under 100KB",
    intro:
      "Upload your PNG image and convert it to a WebP file under 100KB. All compression happens privately in your browser.",
    intent: "png-to-webp",
  },
];

export const popularToolPaths = [
  "/image-compressor",
  "/compress-image-to-100kb",
  "/compress-jpg-to-100kb",
];

export const moreToolPaths = [
  "/png-to-webp",
  "/image-to-webp",
  "/webp-compressor",
  "/compress-image-to-50kb",
  "/compress-webp-to-100kb",
];

export const relatedToolPaths = [
  ...popularToolPaths,
  ...moreToolPaths,
];
