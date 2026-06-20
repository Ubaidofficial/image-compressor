export type PSEOPage = {
  slug: string;
  publishOn: string;
  pageType: "size" | "format-size" | "utility" | "bulk" | "webp";
  targetSizeKb?: number;
  inputFormat?: "image" | "jpg" | "jpeg" | "png" | "webp";
  outputFormat?: "webp" | "same-or-webp";
  primaryKeyword: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  supportedFormatsText: string;
  useCaseText: string;
  qualityTip: string;
  relatedSlugs: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

export const phase1PseoSlugs = [
  "compress-image-to-100kb",
  "compress-image-to-50kb",
  "compress-image-to-20kb",
  "compress-image-to-200kb",
  "compress-image-to-500kb",
  "compress-jpg-to-100kb",
  "compress-jpg-to-50kb",
  "compress-png-to-100kb",
  "compress-png-to-50kb",
  "compress-webp-to-100kb",
  "photo-compressor-to-100kb",
  "image-size-compressor-to-100kb",
  "online-image-compressor-to-100kb",
  "bulk-image-compressor",
  "convert-image-to-webp-under-100kb",
] as const;

const phase1Set = new Set<string>(phase1PseoSlugs);
const initialPublishedPseoSlugs = [
  "compress-image-to-100kb",
  "compress-image-to-50kb",
  "compress-jpg-to-100kb",
  "compress-png-to-100kb",
  "compress-webp-to-100kb",
] as const;

const initialPublishedSet = new Set<string>(initialPublishedPseoSlugs);

type PageDraft = Omit<PSEOPage, "publishOn" | "relatedSlugs"> & {
  relatedSlugs?: string[];
};

function formatTarget(kb: number): string {
  return kb === 1024 ? "1MB" : `${kb}KB`;
}

function targetPhrase(kb: number): string {
  return `${formatTarget(kb)} or less`;
}

function sizeUseCase(kb: number): string {
  if (kb <= 20) {
    return `${formatTarget(kb)} images are useful for strict upload forms, ID portals, small avatars, and profile photos where larger files are rejected.`;
  }
  if (kb <= 60) {
    return `${formatTarget(kb)} is a practical target for application forms, lightweight profile images, thumbnails, and email-friendly image attachments.`;
  }
  if (kb <= 100) {
    return `${formatTarget(kb)} is useful for website images, profile photos, product thumbnails, and forms that reject larger files.`;
  }
  if (kb <= 300) {
    return `${formatTarget(kb)} works well when you need a smaller image but want more visible detail than very tight limits like 20KB or 50KB.`;
  }
  return `${formatTarget(kb)} is a better target when you want a smaller file while keeping more visual detail than strict low-size limits.`;
}

function qualityTip(kb: number, format?: "jpg" | "jpeg" | "png" | "webp"): string {
  if (format === "png") {
    return "PNG files can be harder to compress because they often preserve sharp edges or transparency. If the file is still too large, try reducing width or converting to WebP.";
  }
  if (format === "webp") {
    return "WebP is already efficient, so heavy compression may require reducing dimensions or lowering quality.";
  }
  if (kb <= 20) {
    return "For very small targets, start with a smaller image width and use the Smallest File mode if the image has lots of detail.";
  }
  if (kb <= 50) {
    return "For tight limits, resize large camera photos before compressing so the output can stay clear without excessive quality loss.";
  }
  if (kb <= 100) {
    return "Use Balanced mode first. If the output is still too large, enable resize with a 1200px or 800px max width.";
  }
  return "Use Best Quality mode first for larger targets, then switch to Balanced only if the file still needs to be smaller.";
}

function genericFaqs(kb: number, noun = "image") {
  const target = formatTarget(kb);
  return [
    {
      question: `Can I compress an ${noun} to ${target} exactly?`,
      answer: `The tool aims for ${targetPhrase(kb)}. Some images may finish slightly below the target, and very detailed images may need stronger compression or resizing.`,
    },
    {
      question: `Can I compress images below ${target}?`,
      answer: `Yes. Choose a smaller target page or use stronger compression settings when you need a file below ${target}.`,
    },
    {
      question: "Are my images uploaded to a server?",
      answer: "No. Images are processed locally in your browser and are never uploaded to our servers.",
    },
    {
      question: "Will compression reduce image quality?",
      answer: "Compression can reduce visual quality, especially at very small targets. The tool balances file size, quality, and dimensions to keep the result usable.",
    },
    {
      question: `What happens if my image cannot reach ${target}?`,
      answer: "You will see a helpful message with options such as reducing width, using a stronger compression mode, or choosing a higher target size.",
    },
  ];
}

function formatFaqs(kb: number, format: "jpg" | "jpeg" | "png" | "webp") {
  const target = formatTarget(kb);
  const label = format === "jpeg" ? "JPEG" : format.toUpperCase();
  if (format === "png") {
    return [
      {
        question: `Can I compress a PNG to ${target}?`,
        answer: `Yes. Upload a PNG and the browser-based compressor will try to reduce it to ${targetPhrase(kb)} with WebP output.`,
      },
      {
        question: "Why are PNG files harder to compress?",
        answer: "PNG files often preserve sharp edges, screenshots, logos, or transparency, so they may need resizing or WebP conversion to become much smaller.",
      },
      {
        question: "Can I keep PNG transparency?",
        answer: "The tool outputs WebP files. WebP supports transparency in modern browsers, but always review the preview before using the download.",
      },
      {
        question: "Should I convert PNG to WebP for a smaller file?",
        answer: "Usually yes. WebP often creates smaller files than PNG while keeping good visual quality for web use.",
      },
      {
        question: "Can I compress PNG without uploading it?",
        answer: "Yes. The PNG is processed in your browser and is never uploaded to our servers.",
      },
    ];
  }
  if (format === "webp") {
    return [
      {
        question: `Can I compress a WebP file to ${target}?`,
        answer: `Yes. Upload a WebP image and the tool will try to reduce it to ${targetPhrase(kb)} in your browser.`,
      },
      {
        question: "Is WebP already compressed?",
        answer: "Yes. WebP is already efficient, so very small targets may require lowering quality or reducing dimensions.",
      },
      {
        question: "Why is my WebP still too large?",
        answer: "Large dimensions, fine detail, or high quality settings can keep WebP files large. Try a smaller max width or Smallest File mode.",
      },
      {
        question: "Can I reduce WebP size without uploading?",
        answer: "Yes. All WebP compression runs locally in your browser.",
      },
      {
        question: "Can I bulk compress WebP images?",
        answer: "Yes. Use the bulk image compressor to process multiple JPG, PNG, or WebP files together.",
      },
    ];
  }
  return [
    {
      question: `Can I compress a ${label} to ${target} online?`,
      answer: `Yes. Upload a ${label} image and the tool will try to compress it to ${targetPhrase(kb)} with optimized WebP output.`,
    },
    {
      question: "Is JPG or WebP better for small file sizes?",
      answer: "WebP is usually smaller than JPG at similar visual quality, which is why downloads are saved as WebP.",
    },
    {
      question: `Will the ${label} lose quality after compression?`,
      answer: "Some quality loss is possible, especially at smaller targets. Use a higher target or Best Quality mode if detail matters more than file size.",
    },
    {
      question: "Can I compress JPEG files too?",
      answer: "Yes. JPG and JPEG files are both accepted for JPG-focused pages.",
    },
    {
      question: `Can I compress multiple ${label} files?`,
      answer: "Yes. Use the bulk image compressor when you need to process multiple images and download them together.",
    },
  ];
}

function sizePage(kb: number, slug: string, variant = "to"): PageDraft {
  const target = formatTarget(kb);
  const keyword =
    variant === "under"
      ? `compress image under ${target.toLowerCase()}`
      : variant === "below"
      ? `compress image below ${target.toLowerCase()}`
      : `compress image to ${target.toLowerCase()}`;
  const h1 =
    variant === "under"
      ? `Compress Image Under ${target} Online`
      : variant === "below"
      ? `Compress Image Below ${target} Online`
      : `Compress Image to ${target} Online`;
  return {
    slug,
    pageType: "size",
    targetSizeKb: kb,
    inputFormat: "image",
    outputFormat: "webp",
    primaryKeyword: keyword,
    title: `${h1} Free`,
    metaDescription: `Compress images to ${targetPhrase(kb)} online. Reduce JPG, PNG, and WebP file size in your browser with no uploads and no signup.`,
    h1,
    intro: `Compress JPG, PNG, and WebP images to ${targetPhrase(kb)} directly in your browser. No uploads, no signup, and no server storage.`,
    supportedFormatsText: "Upload JPG, JPEG, PNG, or WebP images. Downloads are optimized WebP files.",
    useCaseText: sizeUseCase(kb),
    qualityTip: qualityTip(kb),
    faqs: genericFaqs(kb),
  };
}

function formatPage(
  kb: number,
  format: "jpg" | "jpeg" | "png" | "webp",
  slug: string,
  titlePrefix?: string
): PageDraft {
  const target = formatTarget(kb);
  const label = format === "jpeg" ? "JPEG" : format.toUpperCase();
  const readable = titlePrefix ?? `Compress ${label} to ${target}`;
  const lowerFormat = format === "jpeg" ? "jpeg" : format;
  return {
    slug,
    pageType: format === "webp" ? "webp" : "format-size",
    targetSizeKb: kb,
    inputFormat: format,
    outputFormat: "webp",
    primaryKeyword: readable.toLowerCase(),
    title: `${readable} Online Free`,
    metaDescription: `Compress ${label} to ${target} online for free. Reduce ${label} file size in your browser with no uploads, no signup, and instant download.`,
    h1: `${readable} Online`,
    intro: `Upload a ${label} image and compress it to ${targetPhrase(kb)} in your browser. The tool keeps your image private and saves the result as an optimized WebP file.`,
    supportedFormatsText:
      format === "jpg" || format === "jpeg"
        ? "Upload JPG or JPEG images. Downloads are optimized WebP files."
        : `Upload ${label} images. Downloads are optimized WebP files.`,
    useCaseText:
      format === "png"
        ? "PNG compression is useful for screenshots, graphics, transparent images, and upload forms with strict file limits."
        : format === "webp"
        ? "WebP compression helps when an already optimized image still needs to meet a specific upload or page-speed size limit."
        : `${label} compression is useful for photos, profile images, application portals, product thumbnails, and other ${lowerFormat} uploads with file limits.`,
    qualityTip: qualityTip(kb, format),
    faqs: formatFaqs(kb, format),
  };
}

const pages: PageDraft[] = [
  ...[10, 20, 30, 40, 50, 60, 80, 100, 150, 200, 300, 500].map((kb) =>
    sizePage(kb, `compress-image-to-${kb}kb`)
  ),
  sizePage(1024, "compress-image-to-1mb"),
  sizePage(100, "compress-image-under-100kb", "under"),
  sizePage(100, "compress-image-below-100kb", "below"),
  ...[20, 50, 100, 200, 500].map((kb) => formatPage(kb, "jpg", `compress-jpg-to-${kb}kb`)),
  ...[20, 50, 100, 200, 500].map((kb) => formatPage(kb, "jpeg", `compress-jpeg-to-${kb}kb`)),
  ...[20, 50, 100, 200, 500].map((kb) => formatPage(kb, "png", `compress-png-to-${kb}kb`)),
  formatPage(100, "png", "png-compressor-to-100kb", "PNG Compressor to 100KB"),
  formatPage(50, "png", "png-compressor-to-50kb", "PNG Compressor to 50KB"),
  formatPage(100, "png", "compress-png-under-100kb", "Compress PNG Under 100KB"),
  ...[20, 50, 100, 200, 500].map((kb) => formatPage(kb, "webp", `compress-webp-to-${kb}kb`)),
  formatPage(100, "webp", "webp-compressor-to-100kb", "WebP Compressor to 100KB"),
  formatPage(100, "webp", "compress-webp-under-100kb", "Compress WebP Under 100KB"),
  {
    ...sizePage(100, "photo-compressor-to-100kb"),
    pageType: "utility",
    primaryKeyword: "photo compressor to 100kb",
    title: "Photo Compressor to 100KB Online Free",
    h1: "Photo Compressor to 100KB Online",
    intro: "Compress photos to 100KB or less for forms, profiles, and lightweight sharing. Everything runs in your browser with no uploads.",
    useCaseText: "Photo compression is useful for profile pictures, ID photos, application portals, and sites that reject large camera files.",
  },
  {
    ...sizePage(50, "photo-compressor-to-50kb"),
    pageType: "utility",
    primaryKeyword: "photo compressor to 50kb",
    title: "Photo Compressor to 50KB Online Free",
    h1: "Photo Compressor to 50KB Online",
    intro: "Compress photos to 50KB or less when a form or profile uploader has a strict file-size limit. No upload or account is required.",
    useCaseText: "A 50KB photo target is useful for strict ID portals, compact avatars, and sites that need very lightweight images.",
  },
  {
    ...sizePage(100, "image-size-compressor-to-100kb"),
    pageType: "utility",
    primaryKeyword: "image size compressor to 100kb",
    title: "Image Size Compressor to 100KB Online",
    h1: "Image Size Compressor to 100KB Online",
    intro: "Reduce image file size to 100KB or less from your browser. Compress JPG, PNG, and WebP files without uploading them.",
    useCaseText: "Use this page when the exact need is smaller file size rather than changing image format or editing the picture.",
  },
  {
    ...sizePage(100, "online-image-compressor-to-100kb"),
    pageType: "utility",
    primaryKeyword: "online image compressor to 100kb",
    title: "Online Image Compressor to 100KB",
    h1: "Online Image Compressor to 100KB",
    intro: "Compress images to 100KB or less online while keeping the processing local in your browser. No signup, upload, or server storage.",
    useCaseText: "This online compressor is useful when you need a quick browser tool instead of installing image editing software.",
  },
  {
    ...sizePage(100, "free-image-compressor-to-100kb"),
    pageType: "utility",
    primaryKeyword: "free image compressor to 100kb",
    title: "Free Image Compressor to 100KB",
    h1: "Free Image Compressor to 100KB",
    intro: "Compress images to 100KB or less for free. Your files stay on your device because the compression runs in your browser.",
    useCaseText: "Use this free compressor for one-off upload limits, website thumbnails, forms, and profile images.",
  },
  {
    ...sizePage(100, "compress-image-without-uploading"),
    pageType: "utility",
    primaryKeyword: "compress image without uploading",
    title: "Compress Image Without Uploading",
    h1: "Compress Image Without Uploading",
    intro: "Compress images without uploading them. Reduce file size locally in your browser with no server storage or signup.",
    metaDescription: "Compress images without uploading them. Reduce image file size locally in your browser with private, client-side compression.",
    useCaseText: "This page is best when privacy matters and you do not want image files sent to a remote compression service.",
  },
  {
    ...sizePage(100, "compress-image-without-losing-quality"),
    pageType: "utility",
    primaryKeyword: "compress image without losing quality",
    title: "Compress Image Without Losing Quality",
    h1: "Compress Image Without Losing Quality",
    intro: "Compress images while preserving as much visible quality as possible. Start with balanced settings, then adjust size or quality if needed.",
    metaDescription: "Compress images while keeping quality as high as possible. Reduce image file size in your browser with no uploads and no signup.",
    useCaseText: "Use this page when visual clarity matters and you want to reduce file size without unnecessary quality loss.",
    qualityTip: "Use Best Quality mode first. If the file is still too large, reduce dimensions gradually instead of jumping to the strongest compression.",
  },
  {
    slug: "bulk-image-compressor",
    pageType: "bulk",
    targetSizeKb: 100,
    inputFormat: "image",
    outputFormat: "webp",
    primaryKeyword: "bulk image compressor",
    title: "Bulk Image Compressor Online",
    metaDescription: "Compress multiple JPG, PNG, and WebP images in your browser. Bulk reduce image file size with no uploads, no signup, and ZIP download.",
    h1: "Bulk Image Compressor Online",
    intro: "Compress multiple images in one browser-based batch. Your images are processed locally and can be downloaded together as WebP files.",
    supportedFormatsText: "Upload multiple JPG, JPEG, PNG, or WebP images. Successful downloads are optimized WebP files.",
    useCaseText: "Bulk compression is useful for product images, galleries, blog graphics, and batches of profile or listing photos.",
    qualityTip: "For batches with mixed image sizes, use Balanced mode first and enable resize for very large photos.",
    faqs: [
      {
        question: "Can I bulk compress images without uploading them?",
        answer: "Yes. Each image is processed locally in your browser and is never uploaded to our servers.",
      },
      {
        question: "How many images can I compress at once?",
        answer: "The bulk tool supports up to 20 images in one batch.",
      },
      {
        question: "Can I download everything as a ZIP?",
        answer: "Yes. Successful compressed files can be downloaded together as a ZIP file.",
      },
      {
        question: "Which formats are supported for bulk compression?",
        answer: "You can upload JPG, JPEG, PNG, and WebP images. Downloads are optimized WebP files.",
      },
    ],
  },
  {
    slug: "bulk-image-to-webp",
    pageType: "bulk",
    targetSizeKb: 100,
    inputFormat: "image",
    outputFormat: "webp",
    primaryKeyword: "bulk image to webp",
    title: "Bulk Image to WebP Converter",
    metaDescription: "Convert multiple JPG, PNG, and WebP images to WebP in your browser. Bulk conversion with no uploads, no signup, ZIP download, and CSV report.",
    h1: "Bulk Image to WebP Converter",
    intro: "Convert batches of images to optimized WebP files in your browser. No uploads, no server storage, and no signup.",
    supportedFormatsText: "Upload multiple JPG, JPEG, PNG, or WebP images. Downloads are WebP files.",
    useCaseText: "Bulk WebP conversion is useful for preparing website images, product catalogs, image libraries, and blog assets.",
    qualityTip: "If a batch contains large photos, enable resize before compression to improve success rates and keep quality consistent.",
    faqs: [
      {
        question: "Can I convert multiple images to WebP at once?",
        answer: "Yes. Upload up to 20 images and convert successful files to WebP in one batch.",
      },
      {
        question: "Are bulk images uploaded?",
        answer: "No. Bulk processing runs in your browser, so image files stay on your device.",
      },
      {
        question: "Can I choose 50KB or 100KB output targets?",
        answer: "Yes. The bulk tool includes target-size controls for common WebP output limits.",
      },
      {
        question: "What happens if one image cannot compress enough?",
        answer: "That image is marked as failed, while successful files remain available for ZIP download.",
      },
    ],
  },
  {
    ...formatPage(100, "jpg", "convert-image-to-webp-under-100kb", "Convert Image to WebP Under 100KB"),
    pageType: "utility",
    inputFormat: "image",
    primaryKeyword: "convert image to webp under 100kb",
    title: "Convert Image to WebP Under 100KB",
    h1: "Convert Image to WebP Under 100KB",
    intro: "Convert JPG, PNG, or WebP images into optimized WebP files under 100KB when the image can be compressed that far.",
    supportedFormatsText: "Upload JPG, JPEG, PNG, or WebP images. Downloads are optimized WebP files.",
    useCaseText: "Use this converter when you need both WebP output and a 100KB-or-less file-size target for website or upload workflows.",
    faqs: [
      {
        question: "Can I convert an image to WebP under 100KB?",
        answer: "Yes. Upload a JPG, PNG, or WebP image and the tool will try to convert it to WebP at 100KB or less.",
      },
      {
        question: "Are images uploaded during WebP conversion?",
        answer: "No. The conversion and compression run locally in your browser.",
      },
      {
        question: "Which input formats are supported?",
        answer: "You can upload JPG, JPEG, PNG, and WebP images. Downloads are optimized WebP files.",
      },
      {
        question: "What if the output cannot reach 100KB?",
        answer: "Try a smaller width, stronger compression mode, or a higher target size if the image has too much detail for 100KB.",
      },
    ],
  },
];

function addDays(date: Date, days: number): string {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next.toISOString().slice(0, 10);
}

const scheduleStartDate = new Date("2026-06-06T00:00:00.000Z");

const phase1ScheduledSlugs = phase1PseoSlugs.filter(
  (slug) => !initialPublishedSet.has(slug)
);

const phase2Slugs = pages
  .map((page) => page.slug)
  .filter(
    (slug) =>
      !initialPublishedSet.has(slug) &&
      !phase1PseoSlugs.includes(slug as (typeof phase1PseoSlugs)[number])
  );

const PHASE2_PUBLISH_DATE = "2026-06-20";

export const pseoRolloutSchedule = [
  ...initialPublishedPseoSlugs.map((slug) => ({
    slug,
    publishOn: "2026-06-04",
  })),
  ...phase1ScheduledSlugs.map((slug, index) => ({
    slug,
    publishOn: addDays(scheduleStartDate, Math.floor(index / 3) * 2),
  })),
  ...phase2Slugs.map((slug) => ({
    slug,
    publishOn: PHASE2_PUBLISH_DATE,
  })),
];

const publishDateBySlug = new Map(
  pseoRolloutSchedule.map((item) => [item.slug, item.publishOn])
);

function nearbySizeSlugs(page: PageDraft): string[] {
  const sizes = [10, 20, 30, 40, 50, 60, 80, 100, 150, 200, 300, 500, 1024];
  if (!page.targetSizeKb) {
    return ["compress-image-to-50kb", "compress-image-to-100kb", "compress-image-to-200kb", "compress-image-to-500kb"];
  }
  return sizes
    .filter((kb) => kb !== page.targetSizeKb)
    .sort((a, b) => Math.abs(a - page.targetSizeKb!) - Math.abs(b - page.targetSizeKb!))
    .slice(0, 4)
    .map((kb) => `compress-image-to-${kb === 1024 ? "1mb" : `${kb}kb`}`);
}

function sameSizeSlugs(page: PageDraft): string[] {
  if (!page.targetSizeKb) return [];
  const target = page.targetSizeKb === 1024 ? "1mb" : `${page.targetSizeKb}kb`;
  const candidates = [
    `compress-jpg-to-${target}`,
    `compress-png-to-${target}`,
    `compress-webp-to-${target}`,
    `photo-compressor-to-${target}`,
  ];
  return candidates.filter((slug) => pages.some((p) => p.slug === slug) && slug !== page.slug);
}

export const pseoPages: PSEOPage[] = pages.map((page) => ({
  ...page,
  publishOn: publishDateBySlug.get(page.slug) ?? "2026-06-04",
  relatedSlugs: page.relatedSlugs ?? [
    ...sameSizeSlugs(page),
    ...nearbySizeSlugs(page),
    "image-compressor",
  ].filter((slug, index, arr) => arr.indexOf(slug) === index),
}));

export const pseoPageBySlug = new Map(pseoPages.map((page) => [page.slug, page]));

export function getPseoPage(slug: string): PSEOPage | undefined {
  return pseoPageBySlug.get(slug);
}

export function isPhase1PseoSlug(slug: string): boolean {
  return phase1Set.has(slug);
}

export function pseoPath(slug: string): string {
  return `/${slug}`;
}

function dateString(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function isPseoPagePublished(
  page: PSEOPage,
  asOf: Date = new Date()
): boolean {
  return page.publishOn <= dateString(asOf);
}

export function getPublishedPseoPages(asOf: Date = new Date()): PSEOPage[] {
  return pseoPages.filter((page) => isPseoPagePublished(page, asOf));
}
