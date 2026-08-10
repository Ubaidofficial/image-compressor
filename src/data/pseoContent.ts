/**
 * Per-page content for pSEO landing pages.
 *
 * The point of this file is de-duplication. Before it existed, all 50 landing
 * pages shared the same six H2s and the same boilerplate paragraphs, differing
 * only by a number — which is exactly the pattern search engines treat as thin,
 * templated content and decline to index.
 *
 * The content here differs because the underlying *facts* differ: a 20KB budget
 * and a 500KB budget genuinely buy different resolutions, suit different upload
 * forms, and fail in different ways. Each size tier and each input format
 * carries its own copy, so no two pages assemble the same body text.
 */

export type ContentItem = { title: string; desc: string };
export type FitRow = { source: string; result: string };

export type SizeProfile = {
  /** Two paragraphs on what this byte budget actually buys, in pixels and quality. */
  reality: string[];
  /** Concrete source -> expected result examples. */
  fits: FitRow[];
  /** Who actually needs this specific size, named and specific. */
  audience: ContentItem[];
  /** Recommended settings for this tier. */
  settings: string;
  /** What goes wrong at this tier and how to fix it. */
  pitfalls: ContentItem[];
};

export type FormatProfile = {
  /** Paragraphs about how this input format behaves under compression. */
  note: string[];
  /** Format-specific gotchas. */
  quirks: ContentItem[];
};

/* ------------------------------------------------------------------ */
/* Size tiers                                                          */
/* ------------------------------------------------------------------ */

export const SIZE_PROFILES: Record<number, SizeProfile> = {
  10: {
    reality: [
      "10KB is close to the floor of what a recognisable photograph can occupy. At this budget you are working with roughly the same amount of data as a paragraph of formatted text, so something has to give — either the pixel dimensions drop substantially, or the compression becomes visible as softness and blocking around detailed areas.",
      "Images that survive 10KB well are the ones with little information to begin with: a signature on white, a simple monochrome logo, a flat icon, a small avatar. Photographs of faces or scenes can reach 10KB, but generally only after being reduced to around 300px on the long edge.",
    ],
    fits: [
      { source: "Scanned signature on white, 800×300", result: "Comfortably under 10KB with detail intact" },
      { source: "Flat logo or icon, 512×512", result: "Typically 4–8KB with clean edges" },
      { source: "Headshot photo, 1200×1600", result: "Needs resizing to roughly 300px tall to reach 10KB" },
      { source: "Detailed landscape photo", result: "Reaches 10KB only with heavy quality loss" },
    ],
    audience: [
      {
        title: "Signature uploads",
        desc: "Exam boards and government portals frequently cap signature images between 5KB and 20KB, separately from the photo field. A scanned signature is mostly white space and compresses to this range easily.",
      },
      {
        title: "Forum and comment avatars",
        desc: "Older forum software and lightweight community platforms often enforce very small avatar limits to keep thread pages fast.",
      },
      {
        title: "Email signature images",
        desc: "Logos embedded in email signatures are sent with every message you write, so keeping them tiny genuinely matters over thousands of emails.",
      },
    ],
    settings:
      "Start with the Smallest File mode and enable resize with a max width around 320px. At 10KB, reducing dimensions preserves far more perceived quality than pushing the quality slider down on a full-size image — a sharp small picture reads better than a blurry large one.",
    pitfalls: [
      {
        title: "Photos with busy backgrounds refuse to shrink",
        desc: "Detail costs bytes. If a portrait will not reach 10KB, the background is usually the reason. Crop tighter to the subject before compressing.",
      },
      {
        title: "Text becomes unreadable",
        desc: "If the image contains small text, lossy compression at this size will smear it. Reduce the dimensions less and accept a slightly larger file, or crop to just the text.",
      },
      {
        title: "The result looks blotchy",
        desc: "Blocking artifacts appear when quality drops too far. Resize down first and let the quality setting stay higher — the same 10KB spent on fewer pixels looks much cleaner.",
      },
    ],
  },

  20: {
    reality: [
      "20KB is the size most commonly requested by online application forms for passport-style photographs. It is tight but workable: a headshot at roughly 400×500 pixels usually lands in this range while remaining clear enough for a human reviewer to identify the subject.",
      "The distinction that matters at 20KB is between simple and complex images. A face against a plain background is simple, and compresses gracefully. The same face against a crowded street will need either a crop or a resize, because the background is competing for the same limited bytes.",
    ],
    fits: [
      { source: "Passport-style headshot, 600×800", result: "Around 18–25KB at balanced quality" },
      { source: "Plain-background portrait, 400×500", result: "Comfortably 12–20KB" },
      { source: "Product photo on white, 800×800", result: "Usually reaches 20KB with mild resizing" },
      { source: "Outdoor photo, 3000×2000", result: "Requires resizing to about 500px wide" },
    ],
    audience: [
      {
        title: "Government exam portals",
        desc: "Competitive exam and recruitment sites commonly specify a photo between 20KB and 50KB with fixed dimensions. 20KB is the strictest end of that range and the one that causes the most rejected uploads.",
      },
      {
        title: "Visa and immigration forms",
        desc: "Online visa applications frequently combine a small file cap with a required aspect ratio, so the photo must be cropped correctly before compression rather than after.",
      },
      {
        title: "Employee directory photos",
        desc: "Internal HR systems often set small per-photo limits because they store thousands of records and render them in list views.",
      },
    ],
    settings:
      "Use Balanced mode with resize enabled at roughly 500px on the long edge. If the form also specifies dimensions in pixels, crop to those dimensions first, then compress — compressing before cropping wastes bytes on parts of the image you are about to discard.",
    pitfalls: [
      {
        title: "The form rejects the file despite the size being right",
        desc: "Many portals check dimensions and aspect ratio as well as file size. Read the full specification before assuming the byte count is the problem.",
      },
      {
        title: "Skin tones look patchy",
        desc: "Smooth gradients such as skin are where aggressive compression shows first. Try Best Quality with a smaller resize rather than Smallest File at full size.",
      },
      {
        title: "Scanned documents blur",
        desc: "A scanned page is mostly small text and needs its pixels. If a document must reach 20KB, convert it to greyscale first, which cuts the data substantially before compression starts.",
      },
    ],
  },

  30: {
    reality: [
      "30KB gives you meaningfully more room than the 20KB tier without being generous. A portrait at around 600×600 pixels or a simple graphic at 1000px wide will typically fit, with enough quality headroom that the compression is not obvious on a phone screen.",
      "This is a useful target when a form specifies a range like 20KB to 50KB — aiming for the middle rather than the ceiling gives you a margin of safety if the portal measures size slightly differently than your file browser does.",
    ],
    fits: [
      { source: "Portrait photo, 600×600", result: "Around 25–32KB at balanced quality" },
      { source: "Simple infographic, 1000×1000", result: "Often under 30KB thanks to flat colour" },
      { source: "Product thumbnail, 800×800", result: "Comfortably in range" },
      { source: "Group photo, 2400×1600", result: "Needs resizing to roughly 700px wide" },
    ],
    audience: [
      {
        title: "Application forms with a range",
        desc: "When a portal accepts 20KB to 50KB, targeting 30KB leaves room on both sides and avoids borderline rejections.",
      },
      {
        title: "Mobile app profile images",
        desc: "Apps that sync profile pictures over cellular connections keep them small so first load is fast on a weak signal.",
      },
      {
        title: "Email newsletter thumbnails",
        desc: "Small inline images in newsletters keep the total message weight down, which improves deliverability with strict mail providers.",
      },
    ],
    settings:
      "Balanced mode with resize at around 700px wide is a reliable starting point. If the source is a modern phone photo, the resize step is doing most of the work — a 12-megapixel image has vastly more pixels than any 30KB file needs.",
    pitfalls: [
      {
        title: "Result comes out well under target",
        desc: "Landing at 12KB when you asked for 30KB means quality was given away for nothing. Increase the resize width and re-run to spend the full budget.",
      },
      {
        title: "Fine patterns turn to mush",
        desc: "Fabric textures, hair, and foliage are expensive to encode. A tighter crop is usually more effective than a lower quality setting.",
      },
      {
        title: "Transparency disappears",
        desc: "If the source was a PNG with a transparent background, check the preview — the output keeps alpha, but a flattened source will already have lost it before you started.",
      },
    ],
  },

  40: {
    reality: [
      "At 40KB the compression stops being the dominant constraint for most everyday images. A photograph at 800×600 usually fits comfortably, and graphics with flat colour can be considerably larger than that while staying in budget.",
      "This tier suits forms that want images small but have not set an aggressive limit, and it is a sensible default when you want a noticeably lighter file without having to think hard about quality trade-offs.",
    ],
    fits: [
      { source: "Photo, 800×600", result: "Typically 30–40KB at balanced quality" },
      { source: "Screenshot of a document, 1200×900", result: "Around 35–45KB, text stays legible" },
      { source: "Logo with transparency, 1000×400", result: "Well under 40KB" },
      { source: "High-detail photo, 4000×3000", result: "Resize to roughly 900px wide" },
    ],
    audience: [
      {
        title: "Web thumbnails and listing images",
        desc: "Category pages and search results render dozens of images at once, so a 40KB cap keeps the whole page responsive.",
      },
      {
        title: "Support ticket attachments",
        desc: "Help desks often limit attachment size so screenshots can be previewed inline without a slow download.",
      },
      {
        title: "Learning platform uploads",
        desc: "Course and assignment portals frequently cap image submissions in this range to control storage across large cohorts.",
      },
    ],
    settings:
      "Balanced mode with resize around 900px handles most sources. For screenshots containing text, prefer Best Quality with a slightly smaller resize — legibility degrades faster than photographic detail does.",
    pitfalls: [
      {
        title: "Screenshot text goes fuzzy",
        desc: "Text edges are high-frequency detail and the first casualty of lossy compression. Keep dimensions higher and quality higher; crop away empty chrome instead.",
      },
      {
        title: "Colours shift slightly",
        desc: "Aggressive settings can flatten subtle gradients. If colour accuracy matters, step up to Best Quality and accept a file nearer the top of the budget.",
      },
      {
        title: "Animated source loses motion",
        desc: "Animated inputs are flattened to a single still frame. If you need motion preserved, this is not the right tool for the job.",
      },
    ],
  },

  50: {
    reality: [
      "50KB is one of the two or three most requested image sizes on the web, largely because it is the upper bound of most government and examination photo specifications. It is a comfortable budget: a clear headshot, a legible document scan, or a decent product photo all fit without obvious degradation.",
      "In practical terms, 50KB supports a photograph at roughly 900×700 pixels at good quality, or considerably larger dimensions if the image is graphical rather than photographic. That is more than enough for any purpose where the image will be viewed at a moderate size on screen.",
    ],
    fits: [
      { source: "Headshot, 900×1200", result: "Around 40–50KB at good quality" },
      { source: "Document scan, greyscale, 1600×2200", result: "Often under 50KB, text stays sharp" },
      { source: "Product photo on white, 1200×1200", result: "Comfortably in range" },
      { source: "Phone photo, 4032×3024", result: "Resize to roughly 1000px wide" },
    ],
    audience: [
      {
        title: "Exam and recruitment portals",
        desc: "The 20KB–50KB photo specification is close to standard across competitive exam registration systems, making 50KB the target most applicants are actually aiming for.",
      },
      {
        title: "Job application attachments",
        desc: "Applicant tracking systems often cap individual images so a single application never becomes unwieldy to process or review.",
      },
      {
        title: "Membership and ID cards",
        desc: "Clubs, gyms, libraries, and institutional card systems store one photo per member and set limits accordingly.",
      },
    ],
    settings:
      "Balanced mode with resize at around 1000px wide gives a clean result on almost any source. If the image is a document rather than a photo, converting to greyscale before compression frees up a surprising amount of budget.",
    pitfalls: [
      {
        title: "The portal says the file is too large after upload",
        desc: "Some systems re-encode on receipt or measure in kibibytes rather than kilobytes. Aim for 45KB rather than exactly 50KB to leave a margin.",
      },
      {
        title: "Photo looks fine but is rejected",
        desc: "Check the required dimensions and aspect ratio separately — a correctly sized file with the wrong proportions still fails validation.",
      },
      {
        title: "Result is far below target",
        desc: "If you asked for 50KB and received 15KB, the resize step was too aggressive. Raise the max width to spend the available budget on quality.",
      },
    ],
  },

  60: {
    reality: [
      "60KB is a mild relaxation of the common 50KB limit and behaves much the same way, with a little extra headroom for detail. A photograph at around 1000×750 pixels fits comfortably, and the compression is essentially invisible at normal viewing distance.",
      "This size is a good choice when nothing is forcing you lower but you still want a file that loads quickly on a mobile connection and does not weigh down a page or an email.",
    ],
    fits: [
      { source: "Photo, 1000×750", result: "Around 50–60KB at good quality" },
      { source: "Blog inline image, 1200×675", result: "Typically in range at balanced settings" },
      { source: "Illustration with flat colour, 1600×1200", result: "Often well under 60KB" },
      { source: "DSLR photo, 6000×4000", result: "Resize to roughly 1100px wide" },
    ],
    audience: [
      {
        title: "Blog and article images",
        desc: "In-article images at this weight keep total page size reasonable even when a long post contains a dozen of them.",
      },
      {
        title: "Marketplace listings",
        desc: "Classified and marketplace platforms often allow several photos per listing, so per-image size directly multiplies.",
      },
      {
        title: "Internal wiki documentation",
        desc: "Documentation pages accumulate screenshots over time, and a per-image budget keeps historical pages from becoming slow.",
      },
    ],
    settings:
      "Balanced mode with resize around 1100px is a good default. Photographic subjects with smooth backgrounds — studio shots, portraits against plain walls — will often come in well under budget, giving you the option to raise dimensions instead.",
    pitfalls: [
      {
        title: "Sharpening artifacts appear",
        desc: "Over-sharpened source images produce halos that compression exaggerates. Use the original unsharpened export where possible.",
      },
      {
        title: "Wide panoramas stay too large",
        desc: "Very wide aspect ratios carry a lot of pixels even at modest heights. Consider cropping to a standard ratio.",
      },
      {
        title: "Repeated re-compression degrades the image",
        desc: "Each lossy pass loses information permanently. Always start from the highest-quality original you have, not from a file you already compressed.",
      },
    ],
  },

  80: {
    reality: [
      "80KB sits just below the widely used 100KB threshold and is a sensible target when you want to be safely inside that limit rather than sitting on top of it. A photograph at around 1200×800 pixels typically fits at good quality.",
      "For website use this is close to an ideal weight for in-content images: large enough to look sharp on a high-density display when shown at typical article width, small enough that a page with several of them still loads quickly.",
    ],
    fits: [
      { source: "Article image, 1200×800", result: "Around 65–80KB at good quality" },
      { source: "Interface screenshot, 1600×1000", result: "Usually in range, text remains crisp" },
      { source: "Portrait, 1200×1600", result: "Comfortably under 80KB" },
      { source: "Large landscape photo, 5000×3300", result: "Resize to roughly 1300px wide" },
    ],
    audience: [
      {
        title: "Content management systems",
        desc: "Many CMS installations impose per-image limits to stop editors from uploading unprocessed camera files directly into posts.",
      },
      {
        title: "Page speed remediation",
        desc: "When a performance audit flags image weight, bringing in-content images to this range typically resolves the finding without a visible quality drop.",
      },
      {
        title: "Portfolio and case study pages",
        desc: "Image-heavy layouts need a low per-image weight because the page shows many of them at once.",
      },
    ],
    settings:
      "Balanced mode with resize at approximately 1300px wide covers most needs. If the image will be displayed across the full width of a wide layout, keep the dimensions higher and let the quality setting absorb the difference.",
    pitfalls: [
      {
        title: "Image looks soft on a retina display",
        desc: "High-density screens render at two or three times the CSS pixel size. Export at roughly double your display width so it stays sharp.",
      },
      {
        title: "Gradients show banding",
        desc: "Skies and studio backdrops can develop visible steps. A slightly higher quality setting usually removes them.",
      },
      {
        title: "File larger than expected",
        desc: "Noise from high-ISO photography is expensive to encode because it is effectively random detail. Denoise before compressing if the source is a low-light shot.",
      },
    ],
  },

  100: {
    reality: [
      "100KB is the single most common image size limit on the internet. It appears in upload forms, content guidelines, performance budgets, and platform specifications more often than any other round number, which makes it the default target most people are looking for.",
      "The budget is generous enough for real quality. A photograph at 1200×800 to 1600×1000 pixels typically fits at a quality level where compression is not visible in normal use, and graphics or screenshots can go considerably larger because flat colour costs very little to encode.",
    ],
    fits: [
      { source: "Web hero image, 1600×900", result: "Around 80–100KB at good quality" },
      { source: "Photo, 1200×800", result: "Comfortably 55–85KB, room to spare" },
      { source: "Full-page screenshot, 1920×1200", result: "Usually in range as WebP" },
      { source: "Camera photo, 6000×4000", result: "Resize to roughly 1600px wide" },
    ],
    audience: [
      {
        title: "Website performance budgets",
        desc: "A 100KB ceiling per in-content image is a common engineering guideline because it keeps total page weight predictable as content grows.",
      },
      {
        title: "Upload forms of every kind",
        desc: "From job boards to school portals to insurance claims, 100KB is the limit that appears most often in file upload validation.",
      },
      {
        title: "Email and newsletter images",
        desc: "Mail clients and spam filters treat heavy messages unfavourably, and 100KB per image keeps a rich newsletter within sensible bounds.",
      },
    ],
    settings:
      "Balanced mode with resize at around 1600px wide is the general-purpose answer. For images that will be displayed small, drop the resize width and you will land far below 100KB with excellent quality — there is no benefit to using the whole budget if you do not need it.",
    pitfalls: [
      {
        title: "Source is already a compressed JPG",
        desc: "Re-compressing an image that has already been through lossy encoding compounds the damage. Use the original export whenever it is available.",
      },
      {
        title: "Screenshot text softens",
        desc: "Interface text needs its edges. Use Best Quality and reduce dimensions less aggressively — screenshots compress well because most of the frame is flat colour.",
      },
      {
        title: "Very large source will not converge",
        desc: "A 40-megapixel image has far more detail than 100KB can carry. Enable resize rather than expecting quality reduction alone to close the gap.",
      },
    ],
  },

  150: {
    reality: [
      "150KB gives room for genuinely large images at high quality. A photograph at around 1920×1080 typically fits with quality settings high enough that side-by-side comparison with the original shows little difference.",
      "This tier is a reasonable choice for full-width banners and hero images on a website, where the picture is displayed large and any softness would be obvious to a visitor.",
    ],
    fits: [
      { source: "Full-width banner, 1920×1080", result: "Around 120–150KB at high quality" },
      { source: "Detailed photograph, 1600×1200", result: "Comfortably in range" },
      { source: "Product gallery image, 2000×2000", result: "Usually fits with mild compression" },
      { source: "Panorama, 8000×2000", result: "Resize to roughly 2400px wide" },
    ],
    audience: [
      {
        title: "Hero and banner images",
        desc: "Images that span the full width of a page are viewed large, so they justify a bigger budget than in-content pictures do.",
      },
      {
        title: "E-commerce product photography",
        desc: "Shoppers zoom into product images, which means detail retention matters more than it does for decorative photography.",
      },
      {
        title: "Photography portfolios",
        desc: "Work presented as the primary content of the page needs enough quality that the compression never becomes the subject.",
      },
    ],
    settings:
      "Best Quality mode with resize at approximately 1920px wide suits this tier. At 150KB there is rarely a reason to use aggressive compression — spend the budget on quality and let dimensions do any remaining work.",
    pitfalls: [
      {
        title: "Budget spent on invisible pixels",
        desc: "If the image is displayed at 800px wide, exporting at 2400px wastes most of the file. Match dimensions to actual display size, doubled for high-density screens.",
      },
      {
        title: "Multiple large images slow the page",
        desc: "A single 150KB image is fine; ten of them on one page is not. Use smaller targets for anything below the fold.",
      },
      {
        title: "Colour profile changes appearance",
        desc: "Images exported in wide-gamut colour spaces can look different once converted. Work from sRGB sources for predictable web results.",
      },
    ],
  },

  200: {
    reality: [
      "200KB accommodates large, detailed images with minimal compromise. A 1920×1200 photograph generally fits at a quality level where compression artifacts are not detectable without pixel-level inspection.",
      "It is also a common cap on document and certificate uploads, where the requirement is a legible scan rather than a small file — 200KB comfortably holds a multi-hundred-DPI page scan while staying manageable to transmit.",
    ],
    fits: [
      { source: "Large photograph, 1920×1200", result: "Around 150–200KB at high quality" },
      { source: "Certificate or document scan", result: "Fits at high resolution, text fully legible" },
      { source: "Detailed illustration, 2400×1800", result: "Usually in range" },
      { source: "Medium-format photo, 8000×6000", result: "Resize to roughly 2200px wide" },
    ],
    audience: [
      {
        title: "Document and certificate uploads",
        desc: "Verification systems that need to read a scanned document set higher limits than photo fields, because legibility is the point.",
      },
      {
        title: "Print-adjacent web use",
        desc: "Images intended for both screen and light print use need more detail than a purely on-screen picture would.",
      },
      {
        title: "Above-the-fold hero imagery",
        desc: "The first image a visitor sees carries disproportionate weight in their impression of the site, which justifies the larger budget.",
      },
    ],
    settings:
      "Best Quality mode with resize at around 2000px wide. At this budget, compression is rarely the limiting factor — most sources will reach 200KB with quality settings high enough to be effectively transparent.",
    pitfalls: [
      {
        title: "Larger than necessary for the use case",
        desc: "Before defaulting to 200KB, check whether the image is displayed at a size that justifies it. Many are not.",
      },
      {
        title: "Scanned text still unclear",
        desc: "If a document scan is unreadable, the problem is scan resolution, not compression. Rescan at a higher DPI rather than raising the size target.",
      },
      {
        title: "Mobile users pay the cost",
        desc: "A 200KB image on a slow connection is a real delay. Consider serving smaller variants to narrow viewports.",
      },
    ],
  },

  300: {
    reality: [
      "300KB is a large budget by web standards and produces images that are effectively indistinguishable from their originals at normal viewing sizes. A 2400×1600 photograph fits with quality to spare.",
      "This tier makes sense when the image is the product — photography sites, high-detail technical diagrams, archival copies — rather than decoration around text.",
    ],
    fits: [
      { source: "High-detail photo, 2400×1600", result: "Around 220–300KB at high quality" },
      { source: "Technical diagram, 3000×2000", result: "Fits with fine lines intact" },
      { source: "Multi-page document scan", result: "Comfortable at readable resolution" },
      { source: "Full-resolution camera file", result: "Resize to roughly 2600px wide" },
    ],
    audience: [
      {
        title: "Photography and art sites",
        desc: "When visitors come specifically to look at the images, quality is the feature and a larger budget is justified.",
      },
      {
        title: "Technical documentation",
        desc: "Schematics, wiring diagrams, and architectural drawings contain fine lines that survive poorly under tight compression.",
      },
      {
        title: "Archival and reference copies",
        desc: "Images kept as a record rather than for display benefit from retaining as much detail as storage allows.",
      },
    ],
    settings:
      "Best Quality mode, resize only if the source exceeds roughly 2600px. At 300KB the compressor has enough headroom that quality reduction should be a last resort rather than a starting point.",
    pitfalls: [
      {
        title: "Page weight adds up quickly",
        desc: "Three images at this size exceed a megabyte. Reserve the tier for images that genuinely need it.",
      },
      {
        title: "Diminishing returns above this point",
        desc: "The visual difference between 300KB and 600KB is minimal for most photographs while the transfer cost doubles.",
      },
      {
        title: "Source quality becomes the ceiling",
        desc: "Compressing a low-resolution original to 300KB does not add detail. The output can only preserve what the input contained.",
      },
    ],
  },

  500: {
    reality: [
      "500KB is a generous target that preserves close to original quality for most photographs. A 3000×2000 image typically fits at settings where compression is imperceptible even under close inspection.",
      "At this size the relevant question stops being whether quality survives and becomes whether the file needs to be this large at all. It is the right choice for archival copies, print-adjacent work, and images that will be examined closely — and overkill for anything shown at thumbnail size.",
    ],
    fits: [
      { source: "Large photograph, 3000×2000", result: "Around 380–500KB at high quality" },
      { source: "High-resolution scan", result: "Fits at archival readability" },
      { source: "Detailed artwork, 4000×3000", result: "Usually in range at high quality" },
      { source: "Uncompressed camera RAW export", result: "Resize to roughly 3200px wide" },
    ],
    audience: [
      {
        title: "Print preparation",
        desc: "Images destined for physical output need substantially more detail than screen display requires, and 500KB retains most of it.",
      },
      {
        title: "Client and stakeholder delivery",
        desc: "Work handed to a client should arrive at a quality level that survives whatever they do with it next.",
      },
      {
        title: "Email attachment limits",
        desc: "Mail systems commonly cap total message size in the tens of megabytes, so 500KB per image lets you attach a meaningful set.",
      },
    ],
    settings:
      "Best Quality mode with resize disabled unless the source exceeds roughly 3200px. The goal at this tier is preservation, so avoid any setting that discards data you do not need to discard.",
    pitfalls: [
      {
        title: "Unnecessary for on-screen use",
        desc: "No web page displaying an image at 800px needs a 500KB file. Match the target to how the image will actually be seen.",
      },
      {
        title: "Slow on constrained connections",
        desc: "Half a megabyte is a noticeable wait on a weak mobile signal. Consider whether your audience is on fast connections.",
      },
      {
        title: "Still lossy",
        desc: "A large target reduces visible loss but does not eliminate it. Keep your original file if you may need to re-edit later.",
      },
    ],
  },

  1024: {
    reality: [
      "1MB is close to preservation territory. At this budget a full-resolution photograph retains essentially all its perceptible detail, and the compression exists mainly to strip the redundancy that uncompressed and lightly-compressed formats leave behind.",
      "The common reason to target 1MB is an upload limit rather than a quality goal — plenty of portals, forums, and content systems set exactly this cap, and a camera file straight from the device will often exceed it.",
    ],
    fits: [
      { source: "Full-resolution phone photo", result: "Typically well under 1MB after conversion" },
      { source: "DSLR JPEG, 6000×4000", result: "Around 600KB–1MB at high quality" },
      { source: "Large scanned artwork", result: "Fits at high readable resolution" },
      { source: "Multi-layer flattened export", result: "Usually in range without resizing" },
    ],
    audience: [
      {
        title: "Upload caps set at 1MB",
        desc: "Forums, ticketing systems, and content platforms frequently set exactly this limit, and a modern camera file often lands just above it.",
      },
      {
        title: "Photo sharing with family",
        desc: "Sharing holiday or event photos where recipients may want to crop or print benefits from keeping the detail intact.",
      },
      {
        title: "Design handoff",
        desc: "Assets passed between designers and developers should not be degraded in transit if they will be processed further.",
      },
    ],
    settings:
      "Best Quality mode with resize off. If a file still exceeds 1MB at maximum quality, the source is unusually large or noisy — enable resize with a generous max width such as 3500px rather than reducing quality.",
    pitfalls: [
      {
        title: "Far more than a web page needs",
        desc: "A 1MB image on a page is a performance problem regardless of how good it looks. This tier is for delivery and storage, not for site content.",
      },
      {
        title: "Conversion alone may suffice",
        desc: "Many files exceeding 1MB drop well below it purely from the format change, with no meaningful quality reduction at all.",
      },
      {
        title: "Check what the limit actually measures",
        desc: "Some systems cap total upload size across all files rather than per file. Confirm before optimising the wrong number.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Input formats                                                       */
/* ------------------------------------------------------------------ */

export const FORMAT_PROFILES: Record<string, FormatProfile> = {
  image: {
    note: [
      "This page accepts JPG, JPEG, PNG, and WebP inputs, which covers essentially every image you are likely to encounter outside of specialist workflows. Each behaves a little differently under compression, and the tool adapts to what you give it.",
      "Output is always WebP. That choice is deliberate: WebP reaches a given target size at higher visual quality than JPG or PNG can, which means the file you download looks better than the equivalent-sized file in an older format would.",
    ],
    quirks: [
      {
        title: "JPG sources are already lossy",
        desc: "A JPG has been compressed once already. Converting it to WebP is a second lossy pass, so always start from the highest-quality version you have.",
      },
      {
        title: "PNG sources compress dramatically",
        desc: "PNG is lossless and therefore large. Converting a PNG to WebP frequently produces the biggest reduction you will see, especially for screenshots and graphics.",
      },
      {
        title: "WebP sources have less to give",
        desc: "An existing WebP is already efficiently encoded, so reaching a much smaller target usually requires reducing dimensions rather than quality alone.",
      },
    ],
  },
  jpg: {
    note: [
      "JPG has been the default photographic format since the 1990s, and its compression, while effective for its era, is well behind what modern formats achieve. Converting a JPG to WebP at the same visual quality typically produces a file 25 to 35 percent smaller.",
      "Because JPG is itself a lossy format, the file you upload here has already discarded some information. That is not a problem in itself, but it does mean starting from the original export rather than a copy that has been saved and re-saved several times.",
    ],
    quirks: [
      {
        title: "Generational loss compounds",
        desc: "Every save of a JPG throws away a little more detail. If a file has been edited and re-saved repeatedly, artifacts are already baked in and compression will amplify them.",
      },
      {
        title: "Existing artifacts cost bytes",
        desc: "The blocky edges left by earlier heavy JPG compression are treated as real detail by the encoder, so a damaged source is actually harder to compress than a clean one.",
      },
      {
        title: "No transparency to preserve",
        desc: "JPG has never supported an alpha channel. If the image appears to have a transparent background, it is white or another solid colour.",
      },
    ],
  },
  jpeg: {
    note: [
      "JPEG and JPG are the same format — the difference is only in the filename extension, a leftover from older systems that limited extensions to three characters. Everything that applies to one applies to the other.",
      "Both are accepted here without distinction, and both convert to WebP with the same expected reduction of roughly 25 to 35 percent at comparable visual quality.",
    ],
    quirks: [
      {
        title: "The extension does not affect the file",
        desc: "Renaming a .jpeg to .jpg changes nothing about the data. Both are decoded identically.",
      },
      {
        title: "Progressive JPEGs work the same",
        desc: "Whether the source uses baseline or progressive encoding, the decoded pixels are what matter, and the WebP output is the same either way.",
      },
      {
        title: "Embedded metadata is not carried over",
        desc: "Camera EXIF data such as location and device model is dropped during conversion, which is usually desirable when publishing images publicly.",
      },
    ],
  },
  png: {
    note: [
      "PNG is a lossless format, which means it stores every pixel exactly as it was — excellent for fidelity, expensive in file size. A PNG screenshot can easily be ten times larger than a visually equivalent WebP.",
      "That gap is why PNG sources produce the most dramatic results on this tool. Flat colour regions, interface chrome, charts, and logos all compress extraordinarily well in WebP, and transparency is carried through intact.",
    ],
    quirks: [
      {
        title: "Transparency is preserved",
        desc: "WebP supports a full 8-bit alpha channel just as PNG-24 does, so transparent backgrounds and soft shadows survive the conversion.",
      },
      {
        title: "Photos saved as PNG are enormous",
        desc: "If someone exported a camera photo as PNG, the file is many times larger than it needs to be. These convert with the largest savings of all.",
      },
      {
        title: "Sharp edges need care at small targets",
        desc: "Text and line art are high-frequency detail. At very small targets, use Best Quality and reduce dimensions rather than pushing quality down.",
      },
    ],
  },
  webp: {
    note: [
      "WebP is already a modern, efficient format, so compressing an existing WebP is a different task from converting an older format. The easy savings have generally already been taken, and further reduction has to come from somewhere real.",
      "In practice that means dimensions. If a WebP file is too large, it is usually because it contains more pixels than the use case requires, and resizing will achieve far more than lowering the quality setting will.",
    ],
    quirks: [
      {
        title: "Re-encoding costs quality",
        desc: "Each lossy pass discards information permanently. If you have the pre-WebP original, compressing that instead gives a better result.",
      },
      {
        title: "Lossless WebP behaves differently",
        desc: "A WebP saved in lossless mode is much larger than a lossy one and will show a big reduction when re-encoded lossily.",
      },
      {
        title: "Dimensions are the main lever",
        desc: "When an already-efficient file needs to be much smaller, reducing width is more effective and less destructive than reducing quality.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Subject variants                                                    */
/*                                                                     */
/* Size alone is not enough to separate pages: "compress image to      */
/* 100kb", "photo compressor to 100kb", and "image compressor to       */
/* 100kb" are all image/100 and would otherwise render identically.    */
/* They are reached by different searches about different subjects,    */
/* so the worked examples, audience, and failure modes below are keyed */
/* on subject and merged over the size defaults.                       */
/* ------------------------------------------------------------------ */

export type ContentVariant =
  | "general"
  | "tool"
  | "resize"
  | "reduce"
  | "units"
  | "photo"
  | "privacy"
  | "quality"
  | "convert"
  | "bulk"
  | "bulkConvert";

type VariantProfile = {
  fits: (target: string) => FitRow[];
  audience: (target: string) => ContentItem[];
  pitfalls: (target: string) => ContentItem[];
};

export const VARIANT_PROFILES: Partial<Record<ContentVariant, VariantProfile>> = {
  tool: {
    fits: (t) => [
      { source: "Mixed folder of JPG and PNG files", result: `Each handled on its own terms, all landing at ${t} or below` },
      { source: "Screenshot from a design tool", result: "Flat colour compresses hard; often far below target" },
      { source: "Photo exported from Lightroom", result: `Usually needs a resize to reach ${t} cleanly` },
      { source: "Image already compressed once", result: "Smaller gains, and existing artifacts are preserved" },
    ],
    audience: () => [
      {
        title: "People comparing compression tools",
        desc: "If you have tried two or three compressors and been disappointed by the quality at a given size, the difference is usually in how the tool searches for its quality setting rather than in the underlying format.",
      },
      {
        title: "Anyone avoiding a signup wall",
        desc: "A large share of online compressors gate the download behind an account, a watermark, or a daily quota. Nothing here is gated, because there is no server keeping count.",
      },
      {
        title: "Users on restricted networks",
        desc: "Corporate and school networks often block file-upload sites outright. A client-side tool works regardless, since no upload is attempted.",
      },
    ],
    pitfalls: (t) => [
      {
        title: "Output lands far below the target",
        desc: `Receiving a 30KB file when you asked for ${t} means quality was discarded needlessly. Increase the resize width and run it again to use the full budget.`,
      },
      {
        title: "A second tool makes it worse",
        desc: "Running the output of one compressor through another compounds the loss. Go back to the original file rather than chaining tools.",
      },
      {
        title: "Comparing sizes across formats",
        desc: "A WebP at a given size holds more visible detail than a JPG at the same size. Comparing byte counts between formats understates how much better the WebP looks.",
      },
    ],
  },

  resize: {
    fits: (t) => [
      { source: "4032×3024 phone photo", result: `Resize to ~1200px wide, then compress to ${t}` },
      { source: "1920×1080 screenshot", result: `Usually reaches ${t} with no resize at all` },
      { source: "Square 2000×2000 product shot", result: "Resize to roughly 1000px for a comfortable margin" },
      { source: "Wide 5000×1200 banner", result: "Wide ratios carry many pixels; crop or resize substantially" },
    ],
    audience: () => [
      {
        title: "People told to \"resize\" by a form",
        desc: "Upload forms use the word loosely. If the instruction gives a number in KB or MB it means file size; if it gives two numbers with an × between them it means pixel dimensions.",
      },
      {
        title: "Anyone whose resize did not help",
        desc: "Reducing dimensions in an image editor and re-saving at maximum quality often barely changes the file size. The quality setting has to move too, which is what this tool handles.",
      },
      {
        title: "Bulk web publishing",
        desc: "Content teams preparing images for a CMS need both dimensions and weight under control, since one without the other still produces a slow page.",
      },
    ],
    pitfalls: (t) => [
      {
        title: "Resized but still too large",
        desc: `Dimensions alone rarely close the gap. A 500px image saved at maximum quality can still exceed ${t}; the compression setting has to come down as well.`,
      },
      {
        title: "Stretched or squashed result",
        desc: "Forcing a specific width and height without matching the original ratio distorts the picture. Crop to the required ratio first, then resize.",
      },
      {
        title: "Enlarging to hit a dimension",
        desc: "Scaling a small image up adds pixels without adding detail, producing a soft result and a larger file. Start from the largest original you have.",
      },
    ],
  },

  reduce: {
    fits: (t) => [
      { source: "8MB DSLR export", result: `Roughly 99% reduction to reach ${t}, mostly from dimensions` },
      { source: "2MB phone photo", result: `Comfortable at ${t} after a moderate resize` },
      { source: "600KB PNG screenshot", result: `Format change alone often gets close to ${t}` },
      { source: "150KB already-compressed JPG", result: "Modest further gains; artifacts limit how far it goes" },
    ],
    audience: () => [
      {
        title: "Email and messaging limits",
        desc: "Mail servers reject oversized attachments outright, and a rejected message often fails silently. Reducing images before attaching avoids the problem.",
      },
      {
        title: "Storage and backup cleanup",
        desc: "Reducing an image library in place can reclaim a substantial amount of space, particularly where photos were archived as PNG or at full sensor resolution.",
      },
      {
        title: "Slow or metered connections",
        desc: "Where bandwidth is charged by the megabyte or simply slow, the size of what you upload and share has a direct practical cost.",
      },
    ],
    pitfalls: () => [
      {
        title: "Reducing an already-reduced file",
        desc: "Each lossy pass is permanent. If you have reduced this image before, go back to the original rather than compounding the loss.",
      },
      {
        title: "Losing the only copy",
        desc: "Reduction cannot be undone. Keep the original somewhere before replacing it with a smaller version, particularly for photos you may want to print.",
      },
      {
        title: "Expecting reduction to fix blur",
        desc: "Compression only removes data. If the source is out of focus or low resolution, a smaller file will not improve it — and may make it look worse.",
      },
    ],
  },

  units: {
    fits: () => [
      { source: "Image reported as 1MB by your computer", result: "Equals roughly 1,024KB, or 1,000KB by a stricter measure" },
      { source: "Form asking for \"under 100 KB\"", result: "Target 85–90KB to stay safe under either definition" },
      { source: "Photo listed as 4.2MB", result: "About 4,300KB — needs roughly a 97% reduction to reach 100KB" },
      { source: "Icon at 8KB", result: "Already far below any common KB limit" },
    ],
    audience: () => [
      {
        title: "Anyone confused by KB, MB, and pixels",
        desc: "Upload forms mix all three units freely, sometimes in the same sentence. Kilobytes measure data, megapixels measure pixel count, and the two are only loosely related.",
      },
      {
        title: "Form fillers hitting mystery rejections",
        desc: "A file your system reports as exactly at the limit can be measured as slightly over by a server using a different definition of the kilobyte.",
      },
      {
        title: "Developers setting upload limits",
        desc: "Knowing what a given KB budget realistically holds helps set limits that are actually achievable for the people who have to meet them.",
      },
    ],
    pitfalls: () => [
      {
        title: "KB and KiB are not the same",
        desc: "A kilobyte is 1,000 bytes; a kibibyte is 1,024. Systems disagree about which they report, which is why a file can appear to be both under and over the same limit.",
      },
      {
        title: "Dimensions do not determine kilobytes",
        desc: "Two images at identical pixel dimensions can differ tenfold in size depending on detail and format. Never assume one from the other.",
      },
      {
        title: "Compressed archives mislead",
        desc: "Zipping an image barely shrinks it, because the image is already compressed. The archive size is not a meaningful reduction.",
      },
    ],
  },

  photo: {
    fits: (t) => [
      { source: "Portrait, plain background", result: `Compresses well; comfortable at ${t}` },
      { source: "Group photo outdoors", result: "Busy background competes for budget; crop tighter" },
      { source: "Low-light photo with visible grain", result: "Noise is expensive to encode; expect a larger file" },
      { source: "Studio product shot on white", result: `Flat background helps; usually well under ${t}` },
    ],
    audience: () => [
      {
        title: "Application and ID photographs",
        desc: "Forms requesting a photograph almost always combine a size limit with dimension and background requirements, and the photo has to satisfy all of them at once.",
      },
      {
        title: "Event and holiday photo sharing",
        desc: "Sharing a set of photos where each is several megabytes is slow for you and awkward for the recipient, particularly over messaging apps.",
      },
      {
        title: "Property and marketplace listings",
        desc: "Listing platforms allow several photographs per item, so the weight of each one multiplies across the whole listing.",
      },
    ],
    pitfalls: () => [
      {
        title: "Skin tones go patchy first",
        desc: "Smooth gradients such as faces show compression damage before textured areas do. Raise quality and reduce dimensions instead of pushing quality down.",
      },
      {
        title: "Sensor noise inflates the file",
        desc: "Grain from low-light shooting is effectively random detail, and random detail is the most expensive thing an encoder can store.",
      },
      {
        title: "Screenshots of photos lose twice",
        desc: "Screenshotting a photo re-encodes it at screen resolution. Use the original file rather than a screenshot of it.",
      },
    ],
  },

  privacy: {
    fits: () => [
      { source: "Scanned passport or ID", result: "Processed locally; never transmitted" },
      { source: "Medical scan or report image", result: "Stays on your device throughout" },
      { source: "Unreleased product photograph", result: "No server copy exists at any point" },
      { source: "Signed contract page", result: "Discarded from memory when the tab closes" },
    ],
    audience: () => [
      {
        title: "Handling identity documents",
        desc: "Passports, driving licences, and national ID cards are exactly the documents that should not be uploaded to an unknown compression service.",
      },
      {
        title: "Working under an NDA",
        desc: "Design work, product photography, and internal dashboards frequently carry contractual restrictions on where the files may be sent.",
      },
      {
        title: "Regulated environments",
        desc: "Healthcare, legal, and financial contexts often prohibit sending client material to third-party processors, regardless of the processor's own policy.",
      },
    ],
    pitfalls: () => [
      {
        title: "Assuming every tool works this way",
        desc: "Most online compressors do upload your file. Check the network tab before trusting any tool with something sensitive.",
      },
      {
        title: "Metadata you forgot about",
        desc: "Photos carry EXIF data including location and device. Conversion here drops it, but the original file on your disk still has it.",
      },
      {
        title: "The screenshot in your clipboard",
        desc: "Operating system clipboards and screenshot folders retain copies. Compressing privately does not clean up what is already elsewhere on the machine.",
      },
    ],
  },

  quality: {
    fits: () => [
      { source: "High-quality original export", result: "Best possible result; nothing lost before you start" },
      { source: "Photo already saved several times", result: "Existing artifacts limit how good the output can be" },
      { source: "Flat illustration or logo", result: "Near-indistinguishable from the original" },
      { source: "Fine-detail texture or foliage", result: "Where visible loss appears first; keep quality high" },
    ],
    audience: () => [
      {
        title: "Portfolio and client work",
        desc: "When the image is the deliverable rather than decoration, visible compression reflects directly on the work itself.",
      },
      {
        title: "Product photography",
        desc: "Customers zoom in. Detail that survives compression is the difference between a convincing product image and a doubtful one.",
      },
      {
        title: "Archival copies",
        desc: "Images kept as a record should retain as much detail as storage allows, since the original may not stay available.",
      },
    ],
    pitfalls: () => [
      {
        title: "Chasing truly lossless at a size target",
        desc: "Lossless compression cannot hit an arbitrary size — it produces whatever size the image requires. Aim for visually lossless instead.",
      },
      {
        title: "Quality reduced before dimensions",
        desc: "Lowering quality on an oversized image degrades every part of it. Cutting pixels nobody will see costs nothing visible.",
      },
      {
        title: "Judging on the wrong screen",
        desc: "Compression damage that is invisible on a phone can be obvious on a large monitor. Check at the size the image will actually be viewed.",
      },
    ],
  },

  bulk: {
    fits: (t) => [
      { source: "20 mixed photos from one shoot", result: `Consistent results; each brought to ${t} or below` },
      { source: "Folder mixing photos and logos", result: "Logos finish far below target, photos near it" },
      { source: "Screenshots exported from a design tool", result: "Compress hard; usually a fraction of the budget" },
      { source: "One oversized file in the batch", result: "Reported as failed rather than silently included" },
    ],
    audience: () => [
      {
        title: "Site migrations",
        desc: "Moving an existing image library to a new platform is the most common reason to process many files at once, and it needs predictable output across the whole set.",
      },
      {
        title: "Product catalogue uploads",
        desc: "Retail platforms often impose a per-image limit and a per-listing count, so every photo in a catalogue has to clear the same bar.",
      },
      {
        title: "Blog and archive cleanup",
        desc: "Sites that accumulated unoptimised uploads over years can recover a large amount of page weight in a single pass.",
      },
    ],
    pitfalls: () => [
      {
        title: "One setting cannot suit every file",
        desc: "A batch mixing large photos and small graphics will over-compress the graphics. Split obviously different material into separate runs.",
      },
      {
        title: "Failures go unnoticed",
        desc: "Check the per-file report rather than assuming a finished batch means every file succeeded.",
      },
      {
        title: "Originals overwritten",
        desc: "Keep the source folder intact until you have verified the whole batch. Bulk operations are the easiest place to lose an original at scale.",
      },
    ],
  },

  bulkConvert: {
    fits: () => [
      { source: "Folder of JPG product photos", result: "25–35% smaller each, as WebP" },
      { source: "Folder of PNG screenshots", result: "Often 70–90% smaller; the largest batch win" },
      { source: "Mixed JPG and PNG library", result: "Both converted; PNG files show the bigger drop" },
      { source: "Files already in WebP", result: "Re-encoded only if a smaller target is set" },
    ],
    audience: () => [
      {
        title: "Whole-library WebP migration",
        desc: "Converting an entire asset library in one pass is the usual path when a site adopts WebP, and it needs a record of what happened to each file.",
      },
      {
        title: "Build and deploy pipelines",
        desc: "Teams preparing a static site or theme release often convert assets in bulk as a pre-deploy step rather than one at a time.",
      },
      {
        title: "Agency asset handover",
        desc: "Delivering a client's image set in a modern format is a straightforward improvement that does not require touching their site's code.",
      },
    ],
    pitfalls: () => [
      {
        title: "No record of what changed",
        desc: "Without a per-file report, a failed or badly-compressed conversion in a large batch is easy to miss until it is live.",
      },
      {
        title: "Source files discarded too early",
        desc: "Regenerating at different dimensions later requires the originals. WebP output is a delivery format, not an archive.",
      },
      {
        title: "Legacy consumers break",
        desc: "If any downstream system reads the folder directly and does not support WebP, converting in place will break it.",
      },
    ],
  },

  convert: {
    fits: (t) => [
      { source: "JPG photo", result: `25–35% smaller as WebP before compression, then trimmed to ${t}` },
      { source: "PNG screenshot", result: "Often 70–90% smaller purely from the format change" },
      { source: "PNG with transparency", result: "Alpha channel preserved in the WebP output" },
      { source: "Existing WebP", result: "Already efficient; further gains come from dimensions" },
    ],
    audience: () => [
      {
        title: "Site speed remediation",
        desc: "Lighthouse and PageSpeed both flag non-WebP images explicitly, and conversion is what clears the audit.",
      },
      {
        title: "CMS and theme requirements",
        desc: "A growing number of themes and platforms expect WebP assets and will not optimise older formats on your behalf.",
      },
      {
        title: "Bandwidth-sensitive delivery",
        desc: "Where images are served at volume, a 30% format saving compounds into a meaningful reduction in transfer costs.",
      },
    ],
    pitfalls: () => [
      {
        title: "Converting an already-lossy source",
        desc: "A JPG has been compressed once. Converting it to WebP is a second lossy pass — start from the original export if you still have it.",
      },
      {
        title: "Expecting WebP to fix a bad source",
        desc: "The format change reduces size at equal quality. It cannot recover detail the source has already lost.",
      },
      {
        title: "Assuming every system reads WebP",
        desc: "Browsers do, but some older design software and internal enterprise tools still do not. Keep an original if it will be handed on.",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Lookup helpers                                                      */
/* ------------------------------------------------------------------ */

/** Nearest defined size tier, so any target KB resolves to real content. */
export function getSizeProfile(kb?: number): SizeProfile {
  const target = kb ?? 100;
  if (SIZE_PROFILES[target]) return SIZE_PROFILES[target];
  const tiers = Object.keys(SIZE_PROFILES).map(Number);
  const nearest = tiers.reduce((best, tier) =>
    Math.abs(tier - target) < Math.abs(best - target) ? tier : best
  );
  return SIZE_PROFILES[nearest];
}

export function getFormatProfile(format?: string): FormatProfile {
  return FORMAT_PROFILES[format ?? "image"] ?? FORMAT_PROFILES.image;
}

/**
 * Size profile with the subject variant merged over it. The `reality` and
 * `settings` blocks stay size-driven because they genuinely depend only on the
 * byte budget; the worked examples, audience, and failure modes come from the
 * variant, because those genuinely depend on what the page is about.
 */
export function getResolvedProfile(
  kb: number | undefined,
  variant: ContentVariant | undefined,
  target: string
): SizeProfile {
  const base = getSizeProfile(kb);
  const override = variant ? VARIANT_PROFILES[variant] : undefined;
  if (!override) return base;
  return {
    reality: base.reality,
    settings: base.settings,
    fits: override.fits(target),
    audience: override.audience(target),
    pitfalls: override.pitfalls(target),
  };
}
