import type { FaqItem } from "@/components/FAQ";
import {
  imageInfo,
  kbText,
  modeRunFor,
  runFor,
  type ImageKey,
  type Run,
} from "@/components/SizeEvidence";

/**
 * Written content for the indexable size pages (issue #3 follow-up).
 *
 * Each page here gets its own intro, evidence observations, FAQ and extra
 * sections; nothing in this file is shared between pages. Observations that
 * quote numbers read them from src/data/sizeEvidence.json, so re-running
 * scripts/measure-size-evidence.mjs keeps the figures current. The wording
 * around them was written against the 2026-11-26 run: if a re-run flips a
 * pass/fail outcome, re-read the observations for that page.
 *
 * Pages not listed here (the consolidated, noindexed variants) keep the
 * generic template.
 */

export type EvidenceKind =
  | { kind: "formats"; kb: number }
  | { kind: "modes"; kb: number }
  | { kind: "ladder"; keys: ImageKey[] }
  | { kind: "batch"; targets: number[] };

export type SizePageContent = {
  intro: string[];
  evidenceHeading: string;
  evidence: EvidenceKind;
  observations: string[];
  /** Target used to look up official use cases; defaults to the page target. */
  useCaseKb?: number;
  useCaseHeading?: string;
  /** Omit to hide the use-case section (e.g. no official form at this size). */
  useCaseNote?: string;
  sections?: Array<{ heading: string; paragraphs: string[] }>;
  faqHeading?: string;
  faqs: FaqItem[];
};

/* Small helpers for quoting measured numbers in prose. */
const j = (kb: number, key: ImageKey) => runFor(kb, key, "jpeg");
const w = (kb: number, key: ImageKey) => runFor(kb, key, "webp");
const px = (r: Run) => `${r.outputWidth} × ${r.outputHeight} px`;
const longSide = (r: Run) => Math.max(r.outputWidth, r.outputHeight);
const pct = (r: Run, key: ImageKey) => {
  const img = imageInfo(key);
  return Math.round((longSide(r) / Math.max(img.width, img.height)) * 100);
};
const q = (r: Run) => r.quality.toFixed(2);

const fits = (kb: number, f: "jpeg" | "webp") =>
  (["portrait", "document", "signature", "screenshot", "landscape"] as ImageKey[]).filter(
    (k) => runFor(kb, k, f).reachedTarget
  ).length;

const CONTENT: Record<string, SizePageContent> = {
  /* ------------------------------------------------------------ 10 KB */
  "compress-image-to-10kb": {
    intro: [
      "Ten kilobytes is the smallest target on this site and one of the strictest limits you will meet on an upload form. SSC's 2026 notices, for example, put the signature between 10 and 20 KB.",
      "The compressor below starts on JPG because that is the format forms accept. At this size the mode you pick matters more than anything else, so check the measurements before you start.",
    ],
    evidenceHeading: "What Actually Fits in 10KB",
    evidence: { kind: "formats", kb: 10 },
    observations: [
      `In the default Balanced mode, only the signature reached 10KB as a JPG: ${kbText(j(10, "signature").outputBytes)} at ${px(j(10, "signature"))}. The portrait, the A4 scan and the landscape all stopped above the limit, because Balanced never shrinks a picture below half its original width.`,
      `WebP got ${fits(10, "webp")} of the 5 test images under 10KB against ${fits(10, "jpeg")} for JPG. The portrait made it at ${px(w(10, "portrait"))}, and the screenshot stayed at full 1080p.`,
      "For a camera photo at this size, switch to Smallest File mode, which keeps scaling down to a quarter of the original width, or set a small width under Advanced options before compressing.",
    ],
    useCaseHeading: "Forms That Ask for About 10KB",
    useCaseNote: "A file at or just under 10KB satisfies only the very bottom of the range below, so aim slightly higher than 10KB if the form also sets a minimum.",
    faqHeading: "10KB Questions",
    faqs: [
      {
        question: "Why does my photo stay above 10KB?",
        answer: `Balanced mode stops shrinking at half the original width. Our test portrait (${imageInfo("portrait").width} × ${imageInfo("portrait").height} px) still came out at ${kbText(j(10, "portrait").outputBytes)} as a JPG at the lowest quality. Choose Smallest File, or set a smaller width in Advanced options, and try again.`,
      },
      {
        question: "Is a 10KB signature still readable?",
        answer: `The test signature fitted at ${px(j(10, "signature"))} with encoder quality ${q(j(10, "signature"))}. That is enough pixels, but low quality blurs thin strokes, so zoom into the preview before you upload. A signature cropped close to the ink keeps more detail than one sitting in a large blank page.`,
      },
      {
        question: "Which exam forms want a 10KB file?",
        answer: "Among the notices we have verified, SSC's 2026 examinations ask for a signature of 10 to 20 KB. The SSC preset produces exactly that, including the 6.0 × 2.0 cm size.",
      },
      {
        question: "JPG or WebP for a 10KB limit?",
        answer: "WebP squeezes more picture into 10KB, but use it only if the form accepts .webp files. Most government and job portals list JPG or JPEG only.",
      },
    ],
  },

  /* ------------------------------------------------------------ 20 KB */
  "image-compressor-to-20kb": {
    intro: [
      "A compressor tuned for the 20KB ceiling. Leave the output on JPG for application forms, drop in a photo or signature, and it searches for the highest quality that still lands under 20KB.",
      "Twenty kilobytes sits on a boundary: it is the top of SSC's signature range and the bottom of UPSC's photo and signature ranges, which changes how you should aim (see the questions below).",
    ],
    evidenceHeading: "Five Test Images Squeezed to 20KB",
    evidence: { kind: "formats", kb: 20 },
    observations: [
      `The portrait fitted as a JPG only after shrinking to ${px(j(20, "portrait"))}, ${pct(j(20, "portrait"), "portrait")}% of its original height, while WebP kept ${pct(w(20, "portrait"), "portrait")}% at ${px(w(20, "portrait"))}.`,
      `The screenshot shows the gap most clearly: JPG had to drop it to ${px(j(20, "screenshot"))}, but WebP kept the full 1920 × 1080 picture at just ${kbText(w(20, "screenshot").outputBytes)}.`,
      "The A4 scan and the landscape missed 20KB in both formats in Balanced mode. Detailed, full-size images need Smallest File mode or a manual resize here.",
    ],
    useCaseHeading: "Where a 20KB Limit Comes From",
    useCaseNote: "Every row below accepts a 20KB file, but for UPSC 20 KB is the minimum, not the maximum, so a file that lands at 19.9 KB is too small there.",
    faqHeading: "20KB Questions",
    faqs: [
      {
        question: "My scanned document will not go below 20KB. Why?",
        answer: `A full A4 page at 300 DPI is a lot of detail. Our test scan stayed at ${kbText(j(20, "document").outputBytes)} in Balanced mode and ${kbText(modeRunFor(20, "document", "smallest-file").outputBytes)} even in Smallest File. Crop to the part of the page you need, or set a much smaller width in Advanced options.`,
      },
      {
        question: "Will a file compressed to 20KB pass UPSC's upload check?",
        answer: "Probably not. UPSC's portal asks for photos and signatures of at least 20 KB, and this page aims for at most 20KB, so the result usually lands just under. Use the UPSC preset instead, which keeps files inside the official range.",
      },
      {
        question: "Why is the JPG smaller in pixels than the WebP?",
        answer: "At the same byte budget WebP stores more picture, so the compressor can keep more of the original width before it reaches 20KB. The JPG has to give up pixels sooner to stay under the limit.",
      },
      {
        question: "Which mode works best for a 20KB photo?",
        answer: `On our tests Balanced and Smallest File both got the portrait under 20KB at ${px(modeRunFor(20, "portrait", "balanced"))}; Best Quality missed (${kbText(modeRunFor(20, "portrait", "best-quality").outputBytes)}) because it refuses to drop quality below 0.30.`,
      },
    ],
  },

  /* ------------------------------------------------------------ 50 KB */
  "compress-image-to-50kb": {
    intro: [
      "Fifty kilobytes is enough for a clear head-and-shoulders photo, which is why it shows up so often on job and exam application forms.",
      "Choose a picture and the compressor aims for 50KB or less, saving JPG by default so the file is accepted almost anywhere. Switch to WebP only for websites.",
    ],
    evidenceHeading: "50KB in Practice: Measured Results",
    evidence: { kind: "formats", kb: 50 },
    observations: [
      `At 50KB the portrait keeps almost its full size as a JPG (${px(j(50, "portrait"))}), so a typical phone photo does not need resizing first.`,
      `The A4 scan is the exception: as a JPG it stayed at ${kbText(j(50, "document").outputBytes)}, nearly three times the limit, while WebP fitted the whole page at ${kbText(w(50, "document").outputBytes)}.`,
      `The screenshot came out at ${kbText(j(50, "screenshot").outputBytes)} as a JPG, larger than the ${kbText(imageInfo("screenshot").bytes)} PNG we started from. Screenshots, logos and other flat graphics are better left as PNG or saved as WebP.`,
    ],
    useCaseHeading: "Official Limits That Accept a 50KB File",
    useCaseNote: "A 50KB JPG sits comfortably inside both UPSC ranges below, with room to spare on either side.",
    faqHeading: "50KB Questions",
    faqs: [
      {
        question: "Is 50KB a good size for an exam application photo?",
        answer: "For UPSC it fits: the portal accepts photos from 20 to 200 KB. Other exams set their own limits and often pixel dimensions too, so check the notice, or use a preset page where one exists.",
      },
      {
        question: "Why did my screenshot get bigger as a JPG?",
        answer: "JPG is built for photographs. Flat colours and sharp text compress far better in PNG or WebP, so converting a screenshot to JPG can add bytes instead of removing them, as our test shows.",
      },
      {
        question: "Why does my scanned page fit as WebP but not as JPG?",
        answer: "In Balanced mode the compressor will only shrink a scan to half its width, and an A4 page at that size is still too detailed for 50KB of JPG. WebP encodes text-on-paper much more efficiently. If the form needs JPG, try Smallest File mode or crop the page.",
      },
      {
        question: "How close to 50KB will the file be?",
        answer: `Our photo results landed between ${kbText(j(50, "landscape").outputBytes)} and ${kbText(j(50, "portrait").outputBytes)}: the compressor searches for the highest quality that stays under the limit rather than stopping early.`,
      },
    ],
  },

  /* ------------------------------------------------------------ 100 KB */
  "compress-image-to-100kb": {
    intro: [
      "Compress any JPG, PNG or WebP image to 100KB or less, saved as JPG for upload forms or WebP for websites.",
      "At 100KB a phone photo usually keeps its full resolution. The measurements below show where that stops being true and what to do about it.",
    ],
    evidenceHeading: "Measured: Five Images at 100KB",
    evidence: { kind: "formats", kb: 100 },
    observations: [
      `All five test images fitted in both formats. The portrait kept its full ${px(j(100, "portrait"))} as a JPG, at encoder quality ${q(j(100, "portrait"))}.`,
      `The A4 scan had to shrink to ${px(j(100, "document"))} to fit as a JPG; WebP kept the whole ${imageInfo("document").width} × ${imageInfo("document").height} page.`,
      `The landscape fitted at full size, but only at JPG quality ${q(j(100, "landscape"))}, low enough to show blocky skies. Smallest File mode gave a better trade on that image: ${px(modeRunFor(100, "landscape", "smallest-file"))} at quality ${q(modeRunFor(100, "landscape", "smallest-file"))}.`,
    ],
    useCaseHeading: "Forms That Take a 100KB Image",
    useCaseNote: "100KB is exactly the ceiling of UPSC's signature range, so for a signature leave a few kilobytes of margin or use the UPSC preset.",
    faqHeading: "100KB Questions",
    faqs: [
      {
        question: "Will my photo keep its full resolution at 100KB?",
        answer: "A typical phone photo should. Our 8-megapixel test portrait did, as both JPG and WebP. Very detailed pictures (landscapes with foliage, scanned pages) may lose pixels or quality first.",
      },
      {
        question: "My 100KB file was rejected as too large. How?",
        answer: "Some portals count 1 KB as 1,000 bytes rather than 1,024, so 100 KB to them is 100,000 bytes, and a file shown here as 99.5 KB is about 101,900 bytes. Aim for 95KB, or use a preset page, which allows for both readings.",
      },
      {
        question: "Why does my landscape photo look blotchy at 100KB?",
        answer: "Balanced mode keeps all the pixels and lowers quality instead. For busy outdoor scenes, Smallest File mode or a smaller width under Advanced options usually looks cleaner at the same file size.",
      },
      {
        question: "Is 100KB accepted for UPSC uploads?",
        answer: "For the photo yes (20 to 200 KB). For the signature, 100 KB is the maximum, so stay slightly below it. UPSC also wants specific file names and a three-signature image; the UPSC page covers those.",
      },
    ],
  },

  "image-compressor-to-100kb": {
    intro: [
      "This 100KB compressor gives you three modes: Best Quality, Balanced and Smallest File. Picking the right one for your image matters more than any other setting.",
      "We ran each mode on the same five test images at 100KB so you can see what each one gives up: resolution, quality, or the target itself.",
    ],
    evidenceHeading: "Three Modes Compared at 100KB",
    evidence: { kind: "modes", kb: 100 },
    observations: [
      `Best Quality missed 100KB on the A4 scan (${kbText(modeRunFor(100, "document", "best-quality").outputBytes)}) and the landscape (${kbText(modeRunFor(100, "landscape", "best-quality").outputBytes)}). It will not go below quality 0.30 or shrink below 80% of the width, so dense images run out of room.`,
      `Balanced and Best Quality produced the same file for the portrait and the signature; the modes only differ once an image is hard to fit.`,
      `Smallest File always cut some pixels, then spent the saved bytes on quality: the landscape came out at ${px(modeRunFor(100, "landscape", "smallest-file"))} and quality ${q(modeRunFor(100, "landscape", "smallest-file"))}, against full size at ${q(modeRunFor(100, "landscape", "balanced"))} in Balanced.`,
    ],
    useCaseKb: 100,
    useCaseHeading: "Uploads That Use a 100KB Ceiling",
    useCaseNote: "If you are preparing a UPSC upload, the preset page handles the file name and minimum size that a general compressor cannot.",
    faqHeading: "Questions About the 100KB Compressor",
    faqs: [
      {
        question: "Which mode should I choose for 100KB?",
        answer: "Start with Balanced. If the result misses the target or looks blocky, try Smallest File. Use Best Quality only for simple images (portraits, signatures, graphics) that fit easily.",
      },
      {
        question: "Why did Best Quality fail when Balanced worked?",
        answer: "Best Quality sets a quality floor of 0.30 and only reduces dimensions a little. On a detailed photo or a full-page scan, that floor is still too many bytes for 100KB, so it reports a miss rather than degrade the image.",
      },
      {
        question: "Does Smallest File make a smaller file?",
        answer: "Not really: all three modes aim just under 100KB. Smallest File reaches it by reducing dimensions earlier, which often looks better than Balanced's very low quality on busy images.",
      },
      {
        question: "Can I see which settings were used?",
        answer: "Yes. After compressing, the result panel shows the output dimensions and the quality the compressor settled on, the same figures as in the table above.",
      },
    ],
  },

  /* ------------------------------------------------------------ 200 KB */
  "compress-image-to-200kb": {
    intro: [
      "Bring a photo or scan down to 200KB or less, as JPG or WebP, right in your browser.",
      "200KB is a relaxed budget: none of our test images needed resizing. The question at this size is quality, and how much of it each format keeps.",
    ],
    evidenceHeading: "200KB Results, Measured",
    evidence: { kind: "formats", kb: 200 },
    observations: [
      `Every test image fitted at its original dimensions in both formats, so you can skip the resize options here.`,
      `Quality is where the formats differ: the A4 scan fitted as a JPG at quality ${q(j(200, "document"))} and as a WebP at ${q(w(200, "document"))}, so the WebP keeps text noticeably crisper.`,
      `The screenshot never grew past ${kbText(j(200, "screenshot").outputBytes)} as a JPG, because the compressor stops at its top quality setting rather than padding the file to the target.`,
    ],
    useCaseHeading: "Official Uploads Capped at 200KB",
    useCaseNote: "200KB is the upper limit for UPSC's photo, so leave a little margin below it rather than landing right on the line.",
    faqHeading: "200KB Questions",
    faqs: [
      {
        question: "Is 200KB the UPSC photo limit?",
        answer: "Yes: UPSC's portal asks for the photo as a JPG between 20 and 200 KB, and the Photo ID upload uses the same range. Its signature limit is lower, 20 to 100 KB.",
      },
      {
        question: "Do I need to resize before compressing to 200KB?",
        answer: "Rarely. All five of our test images, including an 8-megapixel photo and a 300 DPI A4 scan, fitted without losing a pixel. Resize only if a form also sets pixel dimensions.",
      },
      {
        question: "Why did my WebP come out well under 200KB?",
        answer: `The quality search stops at the best setting it finds under the limit. On our portrait that meant ${kbText(w(200, "portrait").outputBytes)} as WebP; there is no benefit to filling the remaining space.`,
      },
      {
        question: "Should I use JPG or WebP at 200KB?",
        answer: "JPG for any upload form unless it says WebP is accepted. WebP for your own website, where the higher quality at the same size is a free win.",
      },
    ],
  },

  "image-compressor-to-200kb": {
    intro: [
      "A 200KB image compressor with the three compression modes laid side by side, measured on the same five images.",
      "With this much room every mode reaches the target; what changes is whether you keep pixels or quality. The results below show the difference.",
    ],
    evidenceHeading: "Best Quality vs Balanced vs Smallest File at 200KB",
    evidence: { kind: "modes", kb: 200 },
    observations: [
      `All three modes got all five images under 200KB, unlike at 100KB, where Best Quality missed twice.`,
      `Best Quality chose to shrink the A4 scan to ${px(modeRunFor(200, "document", "best-quality"))} to keep quality at ${q(modeRunFor(200, "document", "best-quality"))}, while Balanced kept the full page at ${q(modeRunFor(200, "document", "balanced"))}. That is the real difference between the two.`,
      `Smallest File trimmed every photo to about 85% of its width even though it did not need to, and left the signature at ${kbText(modeRunFor(200, "signature", "smallest-file").outputBytes)}, far below the limit.`,
    ],
    useCaseKb: 200,
    useCaseHeading: "Where a 200KB Ceiling Applies",
    useCaseNote: "The preset linked below also names the file 'photo.jpg', which UPSC's portal requires.",
    faqHeading: "Questions About the 200KB Compressor",
    faqs: [
      {
        question: "Which mode is best for a 200KB photo?",
        answer: "Balanced or Best Quality; on our portrait and signature they produced identical files. Avoid Smallest File unless you also want fewer pixels.",
      },
      {
        question: "Why would Best Quality shrink my image?",
        answer: "It prefers losing a little resolution to dropping quality below about 0.33. On text-heavy scans, that usually looks better than a full-size page with soft lettering.",
      },
      {
        question: "Why is Smallest File's result much smaller than 200KB?",
        answer: "It reduces dimensions before trying higher quality, so on simple images like a signature it reaches a good-looking result well before using the whole budget.",
      },
      {
        question: "Is a 200KB budget wasteful for a signature?",
        answer: "Usually. Signatures are mostly blank paper; UPSC caps them at 100 KB and SSC at 20 KB. Use the signature or exam preset pages for those.",
      },
    ],
  },

  /* ------------------------------------------------------------ 500 KB */
  "compress-image-to-500kb": {
    intro: [
      "Reduce a large photo or scan to 500KB or less, as JPG or WebP, without uploading it anywhere.",
      "Half a megabyte is generous for a single image, so the main risk here is not losing quality but making a file bigger than it was. The measurements show when that happens.",
    ],
    evidenceHeading: "What 500KB Leaves Room For",
    evidence: { kind: "formats", kb: 500 },
    observations: [
      `Every image kept its full size, with JPG quality between ${q(j(500, "landscape"))} and ${q(j(500, "screenshot"))}. At that level compression artefacts are hard to see.`,
      `The signature photo started at ${kbText(imageInfo("signature").bytes)} and came out at ${kbText(j(500, "signature").outputBytes)} as a JPG, larger than the original. If your file is already under 500KB, you do not need to compress it.`,
      `Our test PNG screenshot (${kbText(imageInfo("screenshot").bytes)}) was already far below the limit; WebP shrank it to ${kbText(w(500, "screenshot").outputBytes)} anyway, while JPG made it bigger.`,
    ],
    faqHeading: "500KB Questions",
    faqs: [
      {
        question: "My image is already under 500KB. Should I still compress it?",
        answer: "No. Re-encoding a file that already fits can make it larger and always costs a little quality, as our signature test shows. Upload the original.",
      },
      {
        question: "How much quality does a phone photo lose at 500KB?",
        answer: `Very little. Our 8-megapixel test portrait kept every pixel at JPG quality ${q(j(500, "portrait"))}, a setting where differences are hard to spot without zooming in.`,
      },
      {
        question: "Why did my screenshot not change size?",
        answer: "The compressor stops at its highest quality setting instead of inflating a file to fill the target. A small PNG screenshot is already below that point.",
      },
      {
        question: "Is 500KB a sensible size for website images?",
        answer: "For a large hero image it can be, but most pictures on a page can be far smaller. Saving as WebP at 200KB or 100KB is usually enough at normal display sizes.",
      },
    ],
  },

  /* ------------------------------------------------------------ 1 MB */
  "compress-image-to-1mb": {
    intro: [
      "Get a photo under 1MB for email, chat apps or upload fields that cap files at a megabyte.",
      "Most phone photos are a few megabytes, so 1MB means trimming, not crushing. Here is how much our test images actually changed.",
    ],
    evidenceHeading: "Getting Under 1MB: Measured",
    evidence: { kind: "formats", kb: 1024 },
    observations: [
      `The ${kbText(imageInfo("portrait").bytes)} test portrait came down to ${kbText(j(1024, "portrait").outputBytes)} as a JPG at quality ${q(j(1024, "portrait"))}, about half its size with no change in dimensions.`,
      `Neither format had to resize anything: every result is at the original resolution.`,
      `Two images got bigger: the signature photo (${kbText(imageInfo("signature").bytes)} in, ${kbText(j(1024, "signature").outputBytes)} out as JPG) and the PNG screenshot as JPG. Below 1MB already? Leave the file alone.`,
    ],
    faqHeading: "1MB Questions",
    faqs: [
      {
        question: "Will compressing to 1MB reduce the resolution?",
        answer: "Not for the images we tested, including an 8-megapixel photo and a 3264 × 2448 landscape. The compressor lowers quality slightly and keeps every pixel.",
      },
      {
        question: "Is 1MB the same as 1,000KB?",
        answer: "This tool treats 1MB as 1,024KB. If a form says 1 MB and means 1,000,000 bytes, a result very close to the limit could be slightly over; most results finish well below it.",
      },
      {
        question: "My photo is several megabytes. Can it reach 1MB?",
        answer: `Usually without resizing. Our ${kbText(imageInfo("landscape").bytes)} landscape reached ${kbText(j(1024, "landscape").outputBytes)} at full size and quality ${q(j(1024, "landscape"))}. A much larger or very noisy original may need the resize option as well.`,
      },
      {
        question: "Why did the downloaded file get larger?",
        answer: "If the original was already small or heavily compressed, re-encoding at high quality can add bytes. Keep the original when it already meets the limit.",
      },
    ],
  },

  /* ------------------------------------------------------- KB ladder */
  "reduce-image-size-in-kb": {
    intro: [
      "When a form gives its limit in KB, the useful question is how small your particular image can go before it falls apart. Pick your target, choose JPG or WebP, and the compressor gets as close to the number as it can.",
      "The table below follows two very different images through every KB target, so you can see where each one stops fitting.",
    ],
    evidenceHeading: "One Photo and One Scan at Every KB Target",
    evidence: { kind: "ladder", keys: ["portrait", "document"] },
    observations: [
      `The portrait first fitted at 20KB, shrunk to ${px(j(20, "portrait"))}. It reached its full ${imageInfo("portrait").width} × ${imageInfo("portrait").height} at 100KB and stayed there.`,
      `The A4 scan did not fit as a JPG until 100KB, and even then only at ${px(j(100, "document"))}. In this test the scan needed five times the budget of the photo.`,
      `Above 200KB the extra kilobytes only buy quality: from quality ${q(j(200, "portrait"))} at 200KB to ${q(j(1024, "portrait"))} at 1MB for the portrait.`,
    ],
    useCaseKb: 20,
    useCaseHeading: "Official KB Ranges We Have Verified",
    useCaseNote: "The ranges below come from SSC and UPSC instructions; the rows shown are the ones a 20KB file falls inside. The preset pages list every range in full.",
    sections: [
      {
        heading: "Choosing the Right KB Value",
        paragraphs: [
          "If the form gives a range such as 20 to 50 KB, aim for the middle rather than the edge: a 35KB file survives both ways of counting kilobytes and still has detail to spare.",
          "Pick the page for your size and the target is set for you: 10KB, 20KB, 50KB, 100KB, 200KB, 500KB or 1MB. Each one shows its own measurements.",
        ],
      },
    ],
    faqHeading: "KB Size Questions",
    faqs: [
      {
        question: "How do I know what KB value to use?",
        answer: "Use the limit printed on the form or notice. If it states a range, aim for the middle; if it gives only a maximum, stay a few kilobytes under it.",
      },
      {
        question: "What is the difference between KB and KiB?",
        answer: "Strictly, 1 KB is 1,000 bytes and 1 KiB is 1,024 bytes, but most software and many portals use KB for both. This tool counts 1 KB as 1,024 bytes; the exam presets keep files inside the range under either reading.",
      },
      {
        question: "Why does my image look worse at the same KB than someone else's?",
        answer: "Detail decides it. In our tests a portrait fitted 20KB while an A4 scan needed 100KB. Busy, sharp, noisy images need more bytes for the same visual quality.",
      },
      {
        question: "Can the tool make my image bigger to reach a minimum KB?",
        answer: "The general compressor does not. The exam presets can: when a file is below the minimum, they add a blank comment block inside the JPG until it reaches it.",
      },
    ],
  },

  /* ------------------------------------------------------------- bulk */
  "bulk-image-compressor": {
    intro: [
      "Compress up to 20 images in one go and download them together as a ZIP, without sending any of them to a server.",
      "Batches are where one awkward file spoils the run, so we measured how a mixed set of five images behaves at three common targets.",
    ],
    evidenceHeading: "A Mixed Batch at 50, 100 and 200KB",
    evidence: { kind: "batch", targets: [50, 100, 200] },
    observations: [
      `As WebP, all five images fitted at every one of the three targets, including the A4 scan at 50KB, which fails as a JPG at that size.`,
      `The batch went from ${kbText(["portrait", "document", "signature", "screenshot", "landscape"].reduce((s, k) => s + imageInfo(k as ImageKey).bytes, 0))} to ${kbText((["portrait", "document", "signature", "screenshot", "landscape"] as ImageKey[]).reduce((s, k) => s + w(50, k).outputBytes, 0))} at the 50KB target.`,
      "The bulk tool saves WebP. If your files are going into an upload form that accepts only JPG, compress them one at a time with JPG selected instead.",
    ],
    faqHeading: "Bulk Compression Questions",
    faqs: [
      {
        question: "How many images can I compress at once?",
        answer: "Up to 20 per batch. Each is compressed in your browser, then you can download them one by one or all together as a ZIP with a CSV report.",
      },
      {
        question: "What happens if one image cannot reach the target?",
        answer: "It is marked as failed and the others are still available to download. Re-run that image on its own with a higher target or a smaller width.",
      },
      {
        question: "Can the bulk tool output JPG?",
        answer: "Not yet: batch output is WebP. For JPG, use the single-image compressor, which has a JPG option.",
      },
      {
        question: "Do mixed photos and screenshots work in one batch?",
        answer: "Yes. In our test batch the screenshot came out tiny and the photos used most of their budget; each file is compressed independently against the same target.",
      },
    ],
  },
};

export function getSizePageContent(slug: string): SizePageContent | undefined {
  return CONTENT[slug];
}

export { CONTENT as SIZE_PAGE_CONTENT, j, w, px, longSide, pct, q, modeRunFor, kbText };
