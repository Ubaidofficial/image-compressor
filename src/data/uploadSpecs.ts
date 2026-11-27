import type { FitMode, UploadSpec } from "@/lib/resizeToSpec";

/**
 * Official photo / signature upload specifications for exam and form presets.
 *
 * Rules for this file (issue #3):
 * - Every exam spec comes from the official notice or the official portal,
 *   quoted, with the source URL and the date it was checked.
 * - If a number is not in an official source, it is not here. A field the
 *   source leaves unspecified is marked as such, never filled with a guess.
 * - Specs change per notification: re-check `verifiedOn` before each exam
 *   cycle and update the quote, the numbers and the date together.
 */

export type SpecSource = {
  title: string;
  url: string;
  /** Where in the document the quoted text appears. */
  location: string;
  /** Exact wording from the official document. */
  quotes: string[];
};

export const KIND_LABEL: Record<UploadPreset["kind"], string> = {
  photo: "photo",
  signature: "signature",
  thumb: "thumb impression",
  declaration: "declaration",
};

export type UploadPreset = {
  id: string;
  label: string;
  /** Anything other than "photo" is ink on paper and gets the trim-to-ink option. */
  kind: "photo" | "signature" | "thumb" | "declaration";
  spec: UploadSpec;
  /** False when the official source states no pixel dimensions. */
  dimensionsOfficial: boolean;
  /** Human-readable dimension requirement exactly as the source states it. */
  dimensionsText: string;
  defaultFit: FitMode;
  /** File name to download as (some portals require an exact name). */
  downloadName: string;
  /** Requirements the tool cannot enforce and the candidate must check. */
  manualChecks: string[];
  /** Absent for generic (non-exam) presets. */
  source?: SpecSource;
  verifiedOn?: string;
};

/** Dimensions are unconstrained by the source; keep the image's own shape. */
function unspecified(maxLongSide: number) {
  return { min: 1, max: maxLongSide };
}

/* ------------------------------------------------------------------ */
/* UPSC                                                                */
/* ------------------------------------------------------------------ */

const UPSC_PHOTO_SIGNATURE_INSTRUCTIONS: Omit<SpecSource, "location" | "quotes"> = {
  title: "UPSC Online Application Portal: Instructions for Uploading Photo and Signature",
  url: "https://upsconline.nic.in/candidate/resources/bzh30/login/upsc-candidates-portal/dist/assets/instruction-photo-signature-upload-upsc-CCLCIgId.pdf",
};

export const UPSC_VERIFIED_ON = "2026-11-26";

export const upscPresets: UploadPreset[] = [
  {
    id: "upsc-photo",
    label: "UPSC photo",
    kind: "photo",
    spec: {
      // UPSC states no pixel size for the photo. The tool keeps your crop's
      // shape and limits the long side so 200 KB is reachable at good quality.
      widthPx: unspecified(1200),
      heightPx: unspecified(1200),
      minKB: 20,
      maxKB: 200,
    },
    dimensionsOfficial: false,
    dimensionsText: "Not specified by UPSC",
    defaultFit: "fit",
    downloadName: "photo.jpg",
    manualChecks: [
      "Face covers at least 75% (3/4th) of the photo; crop before uploading here",
      "Plain white background, no shadows",
      "Recent colour photo, frontal view, both ears visible, eyes open",
      "No dark or coloured glasses, not in uniform, photo not signed",
    ],
    source: {
      ...UPSC_PHOTO_SIGNATURE_INSTRUCTIONS,
      location: "Section 1, pages 2 and 4",
      quotes: [
        "Upload a photo named photo in jpg format with a file size between 20KB and 200KB.",
        "Make sure your face covers 75% i.e. 3/4th area of the photo.",
        "Photo background shall be plain white.",
      ],
    },
    verifiedOn: UPSC_VERIFIED_ON,
  },
  {
    id: "upsc-signature",
    label: "UPSC signature",
    kind: "signature",
    spec: {
      // The source says "350 - 500 pixels" without naming the axis. Keeping
      // both width and height inside 350-500 satisfies every reading.
      widthPx: { min: 350, max: 500 },
      heightPx: { min: 350, max: 500 },
      minKB: 20,
      maxKB: 100,
    },
    dimensionsOfficial: true,
    dimensionsText: "350 - 500 pixels (output keeps both width and height in this range)",
    defaultFit: "fit",
    downloadName: "signature.jpg",
    manualChecks: [
      "Three signatures, one below the other, in a single image",
      "Black ink on plain white unlined paper, with space between signatures",
      "Clear and upright: not blurred, rotated or upside down",
    ],
    source: {
      ...UPSC_PHOTO_SIGNATURE_INSTRUCTIONS,
      location: "Section 3, page 5",
      quotes: [
        "Candidate should sign their own signature three times vertically (one below the other) on a plain white paper using a black ink.",
        "Save the signature file in jpg format with the file name signature.",
        "File size: 20 KB – 100 KB",
        "Image dimensions: 350 - 500 pixels",
      ],
    },
    verifiedOn: UPSC_VERIFIED_ON,
  },
];

/* ------------------------------------------------------------------ */
/* SSC                                                                 */
/*                                                                     */
/* SSC captures the photograph live in the application module (webcam  */
/* or the mySSC app); its notices give no photo file format, KB range  */
/* or dimensions. There is therefore no SSC photo preset: there is no  */
/* official number to resize to. Only the signature is an upload.      */
/*                                                                     */
/* Signature dimensions: every 2026 notice's main body says "about     */
/* 6.0 cm (width) x 2.0 cm (height)"; the GD Constable 2026 notice     */
/* adds "at a resolution of 300 DPI", which is 709 x 236 px. Some      */
/* annexures (CHSL 2026, CGL 2026) say 4.0 cm x 2.0 cm instead; the    */
/* page discloses that conflict.                                       */
/* ------------------------------------------------------------------ */

export const SSC_VERIFIED_ON = "2026-11-26";

const SSC_SIGNATURE_DPI = 300;
const cmToPx = (cm: number) => Math.round((cm / 2.54) * SSC_SIGNATURE_DPI);

export const SSC_SOURCES: SpecSource[] = [
  {
    title: "SSC Notice: Constable (GD) in CAPFs, SSF and Rifleman (GD) in Assam Rifles Examination, 2026 (01.12.2025)",
    url: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_CTGD_2026.pdf",
    location: "page 48, item 21",
    quotes: [
      "Allowed image size: 10KB to 20KB in JPEG/JPG Format.",
      "Image Dimension: About 6.0 cm (width) X 2.0 cm (height) at a resolution of 300 DPI.",
      "Online Application Forms with Blurred/Miniature signatures will be rejected.",
      "Signature should be horizontally aligned.",
    ],
  },
  {
    title: "SSC Notice: Combined Higher Secondary (10+2) Level Examination, 2026 (07-09-2026)",
    url: "https://ssc.gov.in/api/attachment/uploads/masterData/NoticeBoards/Notice_of_adv_chsl_2026.pdf",
    location: "page 11, para 9.4 and page 12, para 9.6",
    quotes: [
      "For applying, the candidate is not required to have a pre-existing photograph of himself/ herself. The application module has been designed to capture a photograph of the candidate filling up the application form.",
      "Candidates are required to upload the scanned signature in JPEG/JPG format (10 to 20 KB). Image dimension of the signature should be about 6.0 cm (width) x 2.0 cm (height).",
    ],
  },
];

export const sscPresets: UploadPreset[] = [
  {
    id: "ssc-signature",
    label: "SSC signature",
    kind: "signature",
    spec: {
      widthPx: { min: cmToPx(6.0), max: cmToPx(6.0) },
      heightPx: { min: cmToPx(2.0), max: cmToPx(2.0) },
      minKB: 10,
      maxKB: 20,
      dpi: SSC_SIGNATURE_DPI,
    },
    dimensionsOfficial: true,
    dimensionsText: `about 6.0 × 2.0 cm at 300 DPI = ${cmToPx(6.0)} × ${cmToPx(2.0)} px`,
    defaultFit: "fit",
    downloadName: "ssc-signature.jpg",
    manualChecks: [
      "Signature fills most of the image (SSC rejects 'miniature' signatures)",
      "Horizontal, sharp and readable, not blurred",
    ],
    source: SSC_SOURCES[0],
    verifiedOn: SSC_VERIFIED_ON,
  },
];

/* ------------------------------------------------------------------ */
/* IBPS (CRP PO/MT-XVI and CRP CSA-XVI, both 2026)                     */
/*                                                                     */
/* The two notifications give identical upload specs. Pixel sizes are  */
/* labelled "(preferred)" by IBPS; only the KB ranges are firm. The    */
/* presets output exactly the preferred size. IBPS also captures a     */
/* live photo in the form, which has no file spec.                     */
/* ------------------------------------------------------------------ */

export const IBPS_VERIFIED_ON = "2026-11-27";

export const IBPS_SOURCES: SpecSource[] = [
  {
    title: "IBPS Notification CRP PO/MT-XVI (01.07.2026), Annexure III",
    url: "https://www.ibps.in/wp-content/uploads/Detailed-Notification_CRP-PO-XVI_Final_V1_30.06.2026.pdf",
    location: "Annexure III, printed pages 36-40",
    quotes: [
      "Dimensions 200 x 230 pixels (preferred).",
      "Size of file should be between 20kb–50 kb.",
      "Dimensions 140 x 60 pixels (preferred).",
      "Size of file should be between 10kb – 20kb.",
      "Dimensions: 240 x 240 pixels in 200 DPI (Preferred for required quality) i.e. 3 cm * 3 cm (Width * Height).",
      "File Size: 20 KB – 50 KB.",
      "Dimensions: 800 x 400 pixels in 200 DPI (Preferred for required quality) i.e. 10 cm * 5 cm (Width * Height)",
      "File Size: 50 KB – 100 KB",
      "The image file should be JPG or JPEG format.",
    ],
  },
  {
    title: "IBPS Notification CRP CSA-XVI (Clerks, 01.08.2026), Annexure IV",
    url: "https://www.ibps.in/wp-content/uploads/Notification_CRP_CSA_XVI-Final.pdf",
    location: "Annexure IV, printed pages 52-56",
    quotes: ["Same photo, signature, thumb impression and declaration specifications as CRP PO/MT-XVI."],
  },
];

const fixed = (n: number) => ({ min: n, max: n });

export const ibpsPresets: UploadPreset[] = [
  {
    id: "ibps-photo",
    label: "IBPS photo",
    kind: "photo",
    spec: { widthPx: fixed(200), heightPx: fixed(230), minKB: 20, maxKB: 50 },
    dimensionsOfficial: true,
    dimensionsText: "200 × 230 px (IBPS preferred size)",
    defaultFit: "crop",
    downloadName: "ibps-photo.jpg",
    manualChecks: [
      "Recent colour photo against a light, preferably white, background",
      "Looking straight at the camera; no cap, hat or dark glasses",
      "No harsh shadows; no reflections on glasses",
    ],
    source: IBPS_SOURCES[0],
    verifiedOn: IBPS_VERIFIED_ON,
  },
  {
    id: "ibps-signature",
    label: "IBPS signature",
    kind: "signature",
    spec: { widthPx: fixed(140), heightPx: fixed(60), minKB: 10, maxKB: 20 },
    dimensionsOfficial: true,
    dimensionsText: "140 × 60 px (IBPS preferred size)",
    defaultFit: "fit",
    downloadName: "ibps-signature.jpg",
    manualChecks: ["Black ink on white paper", "Not in CAPITAL LETTERS", "Clearly visible, not smudged"],
    source: IBPS_SOURCES[0],
    verifiedOn: IBPS_VERIFIED_ON,
  },
  {
    id: "ibps-thumb",
    label: "IBPS left thumb",
    kind: "thumb",
    spec: { widthPx: fixed(240), heightPx: fixed(240), minKB: 20, maxKB: 50, dpi: 200 },
    dimensionsOfficial: true,
    dimensionsText: "240 × 240 px at 200 DPI = 3 × 3 cm (IBPS preferred)",
    defaultFit: "fit",
    downloadName: "ibps-left-thumb.jpg",
    manualChecks: ["Left thumb, black or blue ink, on white paper", "Clear ridges, not smudged"],
    source: IBPS_SOURCES[0],
    verifiedOn: IBPS_VERIFIED_ON,
  },
  {
    id: "ibps-declaration",
    label: "IBPS declaration",
    kind: "declaration",
    spec: { widthPx: fixed(800), heightPx: fixed(400), minKB: 50, maxKB: 100, dpi: 200 },
    dimensionsOfficial: true,
    dimensionsText: "800 × 400 px at 200 DPI = 10 × 5 cm (IBPS preferred)",
    defaultFit: "fit",
    downloadName: "ibps-declaration.jpg",
    manualChecks: [
      "In your own handwriting, in English, black ink on white paper",
      "Not in CAPITAL LETTERS",
      "Exactly the declaration text from the notification, with your name",
    ],
    source: IBPS_SOURCES[0],
    verifiedOn: IBPS_VERIFIED_ON,
  },
];

/** The handwritten declaration text, quoted from the IBPS notification. */
export const IBPS_DECLARATION_TEXT =
  "I, __________ (Name of the candidate), hereby declare that all the information submitted by me in the application form is correct, true and valid. I will present the supporting documents as and when required.";

/* ------------------------------------------------------------------ */
/* NEET (UG), NTA Information Bulletin 2026                            */
/*                                                                     */
/* The newest official bulletin on 2026-11-27 (no 2027 bulletin yet).  */
/* It gives format and KB ranges only: no pixel size, DPI or aspect.   */
/* It states two ranges for finger and thumb impressions (10-200 KB    */
/* on page 21, 50-300 KB on page 22); the preset uses 50-200 KB, the   */
/* only range inside both.                                             */
/* ------------------------------------------------------------------ */

export const NEET_VERIFIED_ON = "2026-11-27";

export const NEET_SOURCE: SpecSource = {
  title: "NTA Information Bulletin NEET (UG)-2026",
  url: "https://cdnbbsr.s3waas.gov.in/s37bc1ec1d9c3426357e69acd5bf320061/uploads/2026/02/202602231394640855.pdf",
  location: "pages 16-17 (PDF pages 21-22)",
  quotes: [
    "The recent passport size photograph should be either in colour or black & white with 80% face (without mask) visible including ears against white background. 80% area of the image should be candidate's face. Photograph should be in JPG/JPEG format (clearly legible) between 10 kb to 200 kb.",
    "Signature file should be in JPG/JPEG format between 10 kb to 100 kb",
    "Left and Right Hands Fingers and Thumb impressions in JPG/JPEG format between 10 kb to 200 kb",
    "File size must be between 50 kb to 300 kb.",
  ],
};

export const neetPresets: UploadPreset[] = [
  {
    id: "neet-photo",
    label: "NEET photo",
    kind: "photo",
    spec: { widthPx: unspecified(1200), heightPx: unspecified(1200), minKB: 10, maxKB: 200 },
    dimensionsOfficial: false,
    dimensionsText: "Not specified by NTA",
    defaultFit: "fit",
    downloadName: "neet-photo.jpg",
    manualChecks: [
      "Taken after 1 January 2026 (2026 bulletin); expect a similar rule for 2027",
      "Face fills 80% of the photo, ears visible, no mask, white background",
      "Not a Polaroid or computer-generated photo; spectacles only if worn regularly",
    ],
    source: NEET_SOURCE,
    verifiedOn: NEET_VERIFIED_ON,
  },
  {
    id: "neet-signature",
    label: "NEET signature",
    kind: "signature",
    spec: { widthPx: unspecified(800), heightPx: unspecified(800), minKB: 10, maxKB: 100 },
    dimensionsOfficial: false,
    dimensionsText: "Not specified by NTA",
    defaultFit: "fit",
    downloadName: "neet-signature.jpg",
    manualChecks: ["Clearly legible; your own signature"],
    source: NEET_SOURCE,
    verifiedOn: NEET_VERIFIED_ON,
  },
  {
    id: "neet-impressions",
    label: "NEET finger & thumb impressions",
    kind: "thumb",
    spec: { widthPx: unspecified(1600), heightPx: unspecified(1600), minKB: 50, maxKB: 200 },
    dimensionsOfficial: false,
    dimensionsText: "Not specified by NTA",
    defaultFit: "fit",
    downloadName: "neet-finger-thumb-impressions.jpg",
    manualChecks: ["Left and right hand fingers and thumbs, all clearly visible", "Not smudged; unclear impressions are rejected"],
    source: NEET_SOURCE,
    verifiedOn: NEET_VERIFIED_ON,
  },
];

/* ------------------------------------------------------------------ */
/* Generic signature sizes (not tied to any exam)                      */
/* ------------------------------------------------------------------ */

/**
 * Common KB ranges for signature upload fields. These are not an official
 * specification of any portal; the page says so and tells the user to check
 * their own notice for pixel dimensions.
 */
export const genericSignaturePresets: UploadPreset[] = [
  {
    id: "signature-10-20kb",
    label: "Signature 10-20 KB",
    kind: "signature",
    spec: { widthPx: unspecified(600), heightPx: unspecified(600), minKB: 10, maxKB: 20 },
    dimensionsOfficial: false,
    dimensionsText: "Keeps your signature's shape, long side up to 600 px",
    defaultFit: "fit",
    downloadName: "signature-10-20kb.jpg",
    manualChecks: ["Check your form's notice for required pixel or cm dimensions"],
  },
  {
    id: "signature-20-50kb",
    label: "Signature 20-50 KB",
    kind: "signature",
    spec: { widthPx: unspecified(800), heightPx: unspecified(800), minKB: 20, maxKB: 50 },
    dimensionsOfficial: false,
    dimensionsText: "Keeps your signature's shape, long side up to 800 px",
    defaultFit: "fit",
    downloadName: "signature-20-50kb.jpg",
    manualChecks: ["Check your form's notice for required pixel or cm dimensions"],
  },
];
