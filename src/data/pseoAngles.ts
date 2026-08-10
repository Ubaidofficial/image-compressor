/**
 * Per-slug bespoke sections.
 *
 * Body content on a landing page is otherwise derived from (targetSizeKb,
 * inputFormat), which means any two pages sharing those values would render
 * identical prose. Several pages legitimately do share them — "compress image
 * to 100kb", "resize image to 100kb", and "image compressor to 100kb" are all
 * image/100 — but they are reached by different searches with different
 * underlying questions.
 *
 * Each entry below answers the question specific to that phrasing. The
 * uniqueness check in scripts/check-pseo-uniqueness.mjs fails the build if a
 * page shares a size/format bucket with another and has no entry here.
 */

export type PageAngle = {
  heading: string;
  paragraphs: string[];
};

export const PAGE_ANGLES: Record<string, PageAngle> = {
  /* ---------------- image / 100KB bucket ---------------- */

  "compress-image-to-100kb": {
    heading: "Why 100KB Became the Default Limit",
    paragraphs: [
      "The 100KB figure did not come from any standards body. It spread because it sits at a convenient intersection: large enough to hold a clear photograph at typical web dimensions, small enough that a page carrying several of them still loads quickly on a modest connection. Once a few widely-copied upload forms and style guides settled on it, it propagated everywhere.",
      "That history matters when you are compressing to it. The limit is a convention rather than a technical threshold, which means there is usually nothing magic about landing at exactly 99KB. If your form accepts 100KB, aiming for 85KB gives you a safety margin against systems that measure in kibibytes, and the visual difference between the two is nil.",
    ],
  },

  "image-compressor-to-100kb": {
    heading: "What to Look For in a 100KB Image Compressor",
    paragraphs: [
      "Most tools that promise compression to a specific size work by guessing a quality level, encoding once, and hoping the result lands close enough. That is why you often end up with a 40KB file when you asked for 100KB — the tool over-corrected and gave away quality you were entitled to keep. A compressor worth using searches for the quality setting that lands just under your target, rather than picking one and accepting whatever comes out.",
      "The second thing to check is where the compression happens. Tools that upload your file to a server introduce a wait, a queue, a privacy question, and a retention policy you have to read. This compressor runs the entire operation in your browser, which removes all four concerns and works offline once the page has loaded.",
    ],
  },

  "resize-image-to-100kb": {
    heading: "“Resize” Usually Means File Size, Not Dimensions",
    paragraphs: [
      "When someone searches for a way to resize an image to 100KB, they almost always mean the file size in kilobytes rather than the width and height in pixels. The word gets used both ways, which causes real confusion — plenty of people reach for a dimension-resizing tool, shrink a photo to 500 pixels wide, and find the file is still far too large because the quality setting never changed.",
      "The two are related but distinct. Dimensions control how many pixels exist; compression controls how many bytes each of those pixels costs. This tool adjusts both, leading with compression and reducing dimensions only when the target cannot be reached otherwise. That order matters: it keeps your image as large as it can be while still fitting the limit.",
    ],
  },

  "reduce-image-size-to-100kb": {
    heading: "Reducing File Size Without Recompressing Twice",
    paragraphs: [
      "The most common mistake when reducing an image to 100KB is doing it in stages across different tools — resize in one, compress in another, convert in a third. Each lossy step permanently discards information, and the losses compound. By the third pass, artifacts that were invisible after the first have become obvious.",
      "Work from the highest-quality original you have and reduce to your target in a single operation. If you already have a compressed copy and the original is gone, expect a worse result than the file size alone would suggest, because the encoder now has to spend bytes preserving the previous tool's artifacts as though they were real detail.",
    ],
  },

  "reduce-image-size-in-kb": {
    heading: "Understanding Image Size in KB",
    paragraphs: [
      "A kilobyte is a measure of data, not of picture quality or dimensions, and the relationship between them is not fixed. Two images with identical pixel dimensions can differ tenfold in kilobytes depending on how much detail they contain and which format they are stored in. A photograph of a busy market is expensive to encode; a photograph of a clear sky at the same resolution is cheap.",
      "This is why file size targets behave unpredictably if you think only in terms of dimensions. Three levers actually control the number: the pixel dimensions, the compression quality, and the format. Changing format alone — from PNG or JPG to WebP — often achieves a large reduction before either of the other two levers is touched, which is why every download from this tool is WebP.",
      "There is also a units wrinkle worth knowing. Operating systems and upload forms do not always agree on whether a kilobyte means 1,000 bytes or 1,024. A file your computer reports as 100KB can be measured as 102KB by a stricter server, which is why leaving a small margin below any hard limit is worth the negligible quality cost.",
    ],
  },

  "photo-compressor-to-100kb": {
    heading: "Why Camera Photos Are Harder Than Other Images",
    paragraphs: [
      "A photo from a modern phone or camera arrives at somewhere between 12 and 50 megapixels, with sensor noise, fine texture, and natural gradients throughout the frame. All three of those are expensive to encode. A synthetic graphic of the same dimensions might compress to a tenth of the size, because flat colour costs almost nothing to store.",
      "The practical consequence is that photographs almost always need a dimension reduction to reach 100KB, not just a quality reduction. That is not a loss in most cases — a 48-megapixel photo contains vastly more detail than any screen displaying it at 1200 pixels wide can show. Reducing dimensions to match the actual display size lets the remaining budget go entirely into quality.",
    ],
  },

  "compress-image-without-uploading": {
    heading: "How Compression Works With No Server Involved",
    paragraphs: [
      "Every browser ships with an image decoder and a WebP encoder already built in — the same machinery it uses to display and cache images on any page you visit. This tool simply calls that machinery directly. Your file is read into memory, drawn onto an off-screen canvas, and re-encoded, all inside the browser tab.",
      "Nothing is transmitted because nothing needs to be. There is no upload endpoint, no temporary storage bucket, no processing queue, and no retention policy, because there is no server component at all. You can verify this yourself: open your browser's network inspector, compress an image, and observe that no request is made. Disconnect from the internet after the page loads and it still works.",
      "That architecture matters for the files people most often need to compress — identity documents, medical images, unreleased product shots, signed contracts, and client work under NDA. With a server-based tool, you are trusting a privacy policy. Here there is nothing to trust, because the file never leaves the machine.",
    ],
  },

  "compress-image-without-losing-quality": {
    heading: "What “Without Losing Quality” Can and Cannot Mean",
    paragraphs: [
      "Strictly speaking, lossless compression is the only kind that loses nothing, and it cannot hit an arbitrary size target — a lossless encoder gives you whatever size the image's actual information content requires. What people usually mean by this phrase is different and entirely achievable: reduce the file substantially without any change that is visible at normal viewing size.",
      "That is a realistic goal because images contain a great deal of information the eye cannot resolve. Fine variations in areas of similar colour, detail below the resolution of the display, and subtle differences in shadow regions can all be discarded without a perceptible difference. Modern encoders are specifically tuned to spend bytes where the eye is sensitive and save them where it is not.",
      "The practical approach is to start with Best Quality mode and only step down if the target is missed. Reduce dimensions to match how the image will actually be displayed before touching the quality slider — throwing away pixels nobody will see costs no visible quality at all, while lowering quality on an oversized image degrades every part of it.",
    ],
  },

  "convert-image-to-webp-under-100kb": {
    heading: "Combining a Format Change With a Size Target",
    paragraphs: [
      "This page does two things at once, and the order they happen in matters. The format change comes first: converting a JPG or PNG to WebP typically removes 25 to 35 percent of the file size on its own, at identical visual quality, before any compression decision is made. Only then does the tool work on hitting the 100KB target.",
      "That sequencing is why converting to WebP often gets you under 100KB with almost no quality cost, where compressing the original JPG to the same target would have required a visible reduction. You are spending the format's efficiency gain on your size budget instead of spending quality.",
    ],
  },

  "bulk-image-compressor": {
    heading: "What Changes When You Compress in Bulk",
    paragraphs: [
      "Single-image compression lets you inspect the result and adjust. A batch does not, so the settings need to be chosen for the worst case in the set rather than the average. A folder mixing 20-megapixel photographs with small logos will behave inconsistently under one fixed quality level — the photos will be too large and the logos will be needlessly degraded.",
      "The reliable approach is to enable resize with a sensible maximum width so that oversized sources are brought into a comparable range before compression is applied. Files that still fail to reach the target are reported individually rather than silently included, so you can handle those few by hand instead of discovering the problem after publishing.",
    ],
  },

  "bulk-image-to-webp": {
    heading: "Converting a Whole Image Library to WebP",
    paragraphs: [
      "Batch conversion is usually part of a migration rather than a one-off task: an existing site, catalogue, or asset library needs to move from JPG and PNG to WebP. That context changes what matters. You need to know what happened to every file, not just that the batch finished, which is why the tool produces a CSV report of the original and final size of each image.",
      "Keep your source files after converting. WebP output is a delivery format, and if you later need different dimensions, a different quality level, or a format some legacy system demands, you want to regenerate from the originals rather than from an already-compressed copy.",
    ],
  },

  /* ---------------- image / 50KB bucket ---------------- */

  "compress-image-to-50kb": {
    heading: "The 50KB Specification and Where It Comes From",
    paragraphs: [
      "The 20KB-to-50KB photo range appears so consistently across examination boards, recruitment portals, and government application systems that it has effectively become a standard, even though no single authority defined it. It dates from a period when server storage and bandwidth for millions of applicant records were genuinely constrained, and it has persisted because the specifications were copied forward.",
      "For applicants, this makes 50KB the number that actually matters — it is the ceiling of the accepted range, so a file just under it carries the most quality the form will permit. Aim for around 45KB rather than 49KB, since some portals validate against a stricter definition of the kilobyte than your file browser uses.",
    ],
  },

  "image-compressor-to-50kb": {
    heading: "Getting a Usable Image at 50KB",
    paragraphs: [
      "50KB is tight enough that how you spend the budget determines whether the result looks acceptable or obviously degraded. The single most effective decision is to crop before compressing. A passport-style photo cropped to the head and shoulders puts every available byte into the face; the same photo with a metre of background around the subject spends most of its budget on wall texture.",
      "After cropping, resize to roughly the dimensions the image will actually be viewed at, then let the compressor find the quality level that fits. Working in that order — crop, resize, compress — consistently produces a better 50KB file than compressing hard on an uncropped original.",
    ],
  },

  "resize-image-to-50kb": {
    heading: "Dimensions Versus Kilobytes at 50KB",
    paragraphs: [
      "At 50KB the trade-off between pixel dimensions and compression quality becomes something you can see. The same budget can buy a 1200-pixel-wide image at low quality or a 700-pixel-wide image at high quality, and for almost every purpose the second looks better. Softness and blocking are more objectionable to the eye than a smaller picture.",
      "If a form specifies both dimensions and a 50KB cap, the dimensions are fixed and only quality can move — in that case crop tightly and remove any background clutter, since that is the only remaining lever. If only the file size is specified, reduce dimensions first and you will find the quality problem largely solves itself.",
    ],
  },

  "reduce-image-size-to-50kb": {
    heading: "Getting From Megabytes to 50KB",
    paragraphs: [
      "A photo straight from a phone is commonly between 3MB and 8MB. Reaching 50KB means removing roughly 99 percent of the file, which sounds drastic but mostly is not: the overwhelming majority of those bytes describe detail at a resolution no form or screen will ever display.",
      "Most of that reduction comes from dimensions rather than quality. Going from 4032 pixels wide to 800 removes about 96 percent of the pixels before compression has done anything at all. The remaining gap is closed by the format change to WebP and a moderate quality setting, which is why the result usually still looks clear.",
    ],
  },

  "photo-compressor-to-50kb": {
    heading: "Photographs at the 50KB Limit",
    paragraphs: [
      "Photographs are the hardest content to fit into 50KB because everything about them is expensive to encode: sensor noise, skin texture, hair, fabric, and natural gradients all represent genuine detail that the compressor cannot discard cheaply. A screenshot or a logo at the same dimensions would fit with room to spare.",
      "The most reliable technique is to reduce the information before compressing rather than asking the encoder to do all the work. Crop to the subject, resize to the dimensions actually needed, and if the photo was taken in low light, be aware that its noise is effectively random detail — the single most expensive thing an encoder can be asked to store.",
    ],
  },

  /* ---------------- image / 20KB bucket ---------------- */

  "compress-image-to-20kb": {
    heading: "Working at the 20KB Floor",
    paragraphs: [
      "20KB is the strictest limit in common use, and it is strict enough that the usual advice stops applying. At larger targets you can treat compression as an adjustment; at 20KB it is a constraint that shapes every other decision, starting with what is in the frame at all.",
      "The images that succeed here have low information content by nature — a face on a plain background, a signature on white, a simple logo. Anything with texture, pattern, or a detailed background will need to lose it, either through a tighter crop or a substantial reduction in dimensions. Trying to preserve a complex scene at 20KB produces a file that is technically compliant and visually useless.",
    ],
  },

  "image-compressor-to-20kb": {
    heading: "Hitting 20KB Without Destroying the Image",
    paragraphs: [
      "The instinct at very small targets is to drag the quality slider to its minimum, and it is the wrong move. Minimum quality on a full-size image produces heavy blocking across the entire frame. The same 20KB spent on an image a third of the dimensions, at a much higher quality setting, looks dramatically better — sharp and small beats large and mangled.",
      "Convert to greyscale if colour is not required. Removing the colour channels frees a substantial share of the budget, and for signatures, scanned documents, and line art it costs nothing that matters. Many forms that specify 20KB are asking for exactly this kind of content.",
    ],
  },

  "resize-image-to-20kb": {
    heading: "Why Dimensions Do Most of the Work at 20KB",
    paragraphs: [
      "At 20KB there is not enough budget for the compressor to solve the problem alone. If you hand it a 12-megapixel photograph, it has roughly 1.7 bytes per thousand pixels to work with — far below what any encoder needs to produce a recognisable image. Dimensions have to come down first, and substantially.",
      "As a rough guide, a photograph will generally need to be around 400 pixels on its long edge to sit comfortably at 20KB with quality intact. Simple graphics with flat colour can be several times larger than that. Start by resizing to those ranges and let the compressor make the final adjustment, rather than asking it to close a gap of two orders of magnitude by quality alone.",
    ],
  },

  "photo-compressor-to-20kb": {
    heading: "Passport and ID Photos at 20KB",
    paragraphs: [
      "Most people arriving at a 20KB photo requirement are filling in an application form that also specifies dimensions, an aspect ratio, and often a background colour. The file size is only one of several conditions, and it is the one that should be handled last — crop to the required proportions first, because compressing before cropping spends bytes on pixels you are about to delete.",
      "A correctly cropped passport-style photo is unusually well suited to 20KB. The background is plain, the subject fills the frame, and there is little fine detail beyond the face. If yours will not fit, the background is the most likely culprit, and re-shooting against a plain wall will do more than any compression setting.",
    ],
  },

  /* ---------------- image / 200KB bucket ---------------- */

  "compress-image-to-200kb": {
    heading: "When 200KB Is the Right Target",
    paragraphs: [
      "200KB occupies a useful middle ground. It is roughly double the common web limit, which makes it too heavy for routine in-article images but comfortable for anything a visitor will actually look at closely — a hero image, a product photograph they may zoom into, or a document scan that has to stay legible.",
      "It is also the point where compression stops being the binding constraint for most content. A 1920-pixel-wide photograph generally fits at a quality level where artifacts are not detectable without pixel-level inspection, so the question becomes whether the image needs to be this large rather than whether it can survive being this small.",
    ],
  },

  "image-compressor-to-200kb": {
    heading: "Using a Larger Budget Well",
    paragraphs: [
      "A common error at 200KB is treating the target as something to fill. If your image reaches acceptable quality at 90KB, there is no benefit in pushing it up to 190KB — you are doubling the transfer cost for a difference nobody will see. Targets are ceilings, not quotas.",
      "The place where the extra budget genuinely earns its keep is high-density displays. A phone or laptop screen renders at two or three times the CSS pixel dimensions, so an image displayed at 800 pixels wide should be exported at around 1600 to look sharp. That doubling of dimensions is what a 200KB budget is really for.",
    ],
  },

  "resize-image-to-200kb": {
    heading: "Large Dimensions at a Moderate File Size",
    paragraphs: [
      "200KB is enough to keep genuinely large dimensions intact, which changes the usual approach. At tighter targets the advice is to reduce pixel dimensions aggressively; here you can generally keep a 1920-pixel-wide image at full width and still land in budget with quality to spare.",
      "That makes this a good target for images that will be displayed across the full width of a page or examined closely. Reserve dimension reduction for sources well beyond 2400 pixels, where the extra pixels exceed what any common display can show.",
    ],
  },

  "photo-compressor-to-200kb": {
    heading: "Photographs With Room to Breathe",
    paragraphs: [
      "At 200KB, photographs finally get enough budget to keep the things that make them look like photographs — the smooth tonal transitions in skies and skin, the fine texture in fabric and foliage, and the shadow detail that aggressive compression flattens into blocks first.",
      "This makes it a sensible target for portfolio work, product photography that customers will zoom into, and event photos shared with people who may want to crop or print them. For photographs that are decorative rather than the point of the page, a smaller target serves the reader better.",
    ],
  },

  /* ---------------- image / 500KB bucket ---------------- */

  "compress-image-to-500kb": {
    heading: "Compression as Preservation, Not Reduction",
    paragraphs: [
      "At 500KB the purpose of compressing changes. You are no longer squeezing an image to fit somewhere restrictive; you are removing the redundancy that uncompressed and lightly-compressed formats carry, while keeping essentially everything a viewer could perceive.",
      "This is the tier to use when the file is being archived, handed to a client, or prepared for something other than a web page. For website content it is almost always excessive — half a megabyte per image is a real delay on a weak mobile connection, and few on-screen uses can justify it.",
    ],
  },

  "image-compressor-to-500kb": {
    heading: "When a 500KB Ceiling Is Set for You",
    paragraphs: [
      "Most people targeting 500KB are doing so because a system told them to, not because they chose the number. Upload forms for insurance claims, property listings, and document submissions frequently land on this figure as a compromise between storage cost and keeping submissions legible.",
      "When the limit is imposed rather than chosen, the goal is to stay comfortably beneath it rather than approach it. Use Best Quality mode and only resize if the source is genuinely enormous — at this budget most files will fit without any dimension reduction at all.",
    ],
  },

  "resize-image-to-500kb": {
    heading: "Keeping Full Resolution Under 500KB",
    paragraphs: [
      "500KB is generous enough that dimension reduction is rarely necessary. A 3000-pixel-wide photograph typically fits at a quality level where compression is imperceptible, meaning you can keep close to full resolution and still meet the limit.",
      "If a file will not fit even at high quality, the cause is usually noise rather than size — high-ISO photographs contain a large amount of effectively random detail that no encoder can compress efficiently. Reducing noise in the source will do more than any resize.",
    ],
  },

  /* ---------------- format-specific ---------------- */

  "compress-jpg-online": {
    heading: "Compressing JPG Files in the Browser",
    paragraphs: [
      "Online JPG compression usually means uploading your file to someone else's server, waiting for it to process, and downloading the result. That model exists because compression was historically too slow to run client-side, but browsers have shipped fast image encoders for over a decade now and the constraint no longer applies.",
      "This tool compresses your JPG entirely on your own machine. There is no upload step, no queue, and no wait proportional to your connection speed — a large file compresses just as quickly on a slow connection as on a fast one, because it never travels anywhere. The output is WebP, which reaches any given size at higher quality than re-compressing the JPG as a JPG would.",
    ],
  },
};

export function getPageAngle(slug: string): PageAngle | undefined {
  return PAGE_ANGLES[slug];
}
