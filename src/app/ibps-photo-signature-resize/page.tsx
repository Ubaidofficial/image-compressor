import type { Metadata } from "next";
import ExamPresetPage from "@/components/ExamPresetPage";
import { createPageMetadata } from "@/lib/createPageMetadata";
import { IBPS_DECLARATION_TEXT, IBPS_SOURCES, IBPS_VERIFIED_ON, ibpsPresets } from "@/data/uploadSpecs";
import type { FaqItem } from "@/components/FAQ";

const path = "/ibps-photo-signature-resize";
const title = "IBPS Photo, Signature, Thumb and Declaration Resize";
const description =
  "Resize your IBPS photo (200×230, 20-50 KB), signature (140×60, 10-20 KB), left thumb impression and handwritten declaration to the sizes in the 2026 IBPS notifications. Free, in your browser.";

export const metadata: Metadata = createPageMetadata({ title, description, path, index: true });

const [photo, signature, thumb, declaration] = ibpsPresets;
const kbRange = (p: (typeof ibpsPresets)[number]) => `${p.spec.minKB} KB - ${p.spec.maxKB} KB`;

const faqs: FaqItem[] = [
  {
    question: "What is the IBPS photo size in pixels and KB?",
    answer:
      "The 2026 notifications give 200 × 230 pixels as the preferred size and a file between 20 KB and 50 KB, in JPG or JPEG. The photo preset produces exactly 200 × 230 px inside that range.",
  },
  {
    question: "Are the IBPS pixel sizes compulsory?",
    answer:
      "IBPS labels every pixel size \"preferred\"; the file size ranges are the firm part, and the portal will not let you continue until the photo and signature meet its specifications. Using the preferred size and staying inside the KB range is the safest choice.",
  },
  {
    question: "Why is my 140 × 60 signature below 10 KB?",
    answer:
      "A 140 × 60 pixel image is tiny, so even at full JPG quality it is often only a few kilobytes. The signature preset adds a blank comment block inside the JPG until it reaches 10 KB; the image itself is unchanged.",
  },
  {
    question: "What do I write in the IBPS handwritten declaration?",
    answer: `The notification gives the exact text: "${IBPS_DECLARATION_TEXT}" Write it in English, in your own handwriting, in black ink on white paper, and not in capital letters.`,
  },
  {
    question: "What if I cannot give a left thumb impression?",
    answer:
      "The notification allows the right thumb if the left is missing, then a left-hand finger starting from the forefinger, then a right-hand finger, then the left toe. Write which finger or toe you used on the uploaded image.",
  },
  {
    question: "Does IBPS still need a live photo?",
    answer:
      "Yes. As well as the uploaded photo, the 2026 notifications ask you to capture a live photo with a webcam or your phone during registration. That one is taken in the form itself, so there is no file to resize.",
  },
  {
    question: "Are my documents uploaded to your site?",
    answer: "No. All four files are resized in your browser and never leave your device until you upload them to IBPS yourself.",
  },
];

export default function IbpsPhotoSignatureResizePage() {
  return (
    <ExamPresetPage
      path={path}
      title={title}
      description={description}
      h1="IBPS Photo, Signature, Thumb and Declaration Resize"
      breadcrumbName="IBPS Photo and Signature Resize"
      intro={
        <>
          <p>
            An IBPS application needs four scanned images: photo, signature, left thumb impression
            and a handwritten declaration, each with its own pixel size and KB range. Pick the one
            you are uploading and the preset produces a JPG at the size the 2026 PO/MT and Clerk
            notifications prefer.
          </p>
          <p>Nothing is uploaded: the resizing runs on your device.</p>
        </>
      }
      presets={ibpsPresets}
      specHeading="IBPS upload specification (CRP PO/MT-XVI and CSA-XVI)"
      specColumns={["Photo", "Signature", "Left thumb", "Declaration"]}
      specRows={[
        { label: "Format", values: ["JPG / JPEG", "JPG / JPEG", "JPG / JPEG", "JPG / JPEG"] },
        { label: "File size", values: [kbRange(photo), kbRange(signature), kbRange(thumb), kbRange(declaration)] },
        { label: "Preferred size", values: ["200 × 230 px (4.5 × 3.5 cm)", "140 × 60 px", "240 × 240 px at 200 DPI (3 × 3 cm)", "800 × 400 px at 200 DPI (10 × 5 cm)"] },
        { label: "Ink / background", values: ["Light, preferably white background", "Black ink, white paper", "Black or blue ink, white paper", "Black ink, white paper"] },
        { label: "Rule", values: ["Recent colour photo", "Not in capital letters", "Left thumb (alternatives allowed)", "English, own handwriting, not in capitals"] },
      ]}
      sources={IBPS_SOURCES.map((source) => ({ source, verifiedOn: IBPS_VERIFIED_ON }))}
      specNote={
        <p>
          IBPS marks each pixel size as &quot;preferred&quot;; the KB ranges are firm. The notifications
          for RRB recruitment were not available to check, so confirm the notice for your exam
          before applying.
        </p>
      }
      rejectionHeading="Why IBPS rejects uploads"
      rejections={[
        { title: "Unclear or smudged images", detail: "The notifications say an application can be rejected if the face, signature, thumb impression or declaration is unclear or smudged." },
        { title: "Capital letters", detail: "A signature or handwritten declaration in CAPITAL LETTERS is not accepted." },
        { title: "Written by someone else", detail: "The signature, thumb impression and declaration must be yours. A declaration written by anyone else, or in a language other than English, makes the application invalid." },
        { title: "Cap, dark glasses or shadows", detail: "Caps, hats and dark glasses are not acceptable in the photo; religious headwear is allowed if it does not cover the face. Avoid harsh shadows and reflections on glasses." },
        { title: "Wrong place or too small", detail: "A photo or signature uploaded in the wrong field can stop you appearing for the exam, and the notifications list small-size photographs among the don'ts." },
        { title: "Signature mismatch", detail: "If your signature at the exam does not match the uploaded one, the notifications say you will be disqualified." },
      ]}
      faqs={faqs}
      related={[
        { href: "/ssc-photo-signature-resize", label: "SSC signature resize" },
        { href: "/upsc-photo-signature-resize", label: "UPSC photo and signature resize" },
        { href: "/signature-resize", label: "Signature resize (10-20 KB, 20-50 KB)" },
        { href: "/image-compressor-to-20kb", label: "Compress image to 20KB" },
      ]}
    >
      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">The handwritten declaration text</h2>
        <blockquote className="border-l-4 border-blue-300 dark:border-blue-700 pl-4 italic text-zinc-700 dark:text-zinc-300">
          {IBPS_DECLARATION_TEXT}
        </blockquote>
        <p className="mt-4 text-zinc-700 dark:text-zinc-300">
          Write it in English on white paper in black ink, in normal (not capital) letters, then
          photograph or scan it and choose the declaration preset. Candidates who cannot write may
          type the text and put their left thumb impression below it, as the notification allows.
        </p>
      </section>
    </ExamPresetPage>
  );
}
