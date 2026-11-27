import type { Metadata } from "next";
import ExamPresetPage from "@/components/ExamPresetPage";
import { createPageMetadata } from "@/lib/createPageMetadata";
import { NEET_SOURCE, NEET_VERIFIED_ON, neetPresets } from "@/data/uploadSpecs";
import type { FaqItem } from "@/components/FAQ";

const path = "/neet-photo-signature-resize";
const title = "NEET Photo and Signature Size: Resize to 10-200 KB JPG";
const description =
  "Resize your NEET (UG) photo to a JPG of 10-200 KB, your signature to 10-100 KB and your finger and thumb impressions to 50-200 KB, as NTA's bulletin specifies. Free, in your browser.";

export const metadata: Metadata = createPageMetadata({ title, description, path, index: true });

const [photo, signature, impressions] = neetPresets;

const faqs: FaqItem[] = [
  {
    question: "What is the NEET photo size in KB?",
    answer:
      "NTA's NEET (UG) 2026 Information Bulletin asks for the passport-size photo as a JPG or JPEG between 10 KB and 200 KB. The photo preset produces a JPG inside that range.",
  },
  {
    question: "What are the NEET photo dimensions in pixels?",
    answer:
      "The bulletin does not give pixel or centimetre dimensions. It does require that 80% of the image is your face, with ears visible, no mask, against a white background. Crop your photo that way before resizing.",
  },
  {
    question: "What is the NEET signature size?",
    answer:
      "JPG or JPEG between 10 KB and 100 KB, according to the 2026 bulletin. No pixel size is given. The signature preset keeps your signature's shape and trims the blank paper around it.",
  },
  {
    question: "Why does the impressions preset use 50-200 KB?",
    answer:
      "The 2026 bulletin states two different ranges for the finger and thumb impressions: 10-200 KB on one page and 50-300 KB on the next. A file between 50 and 200 KB satisfies both statements, so the preset uses that range.",
  },
  {
    question: "Has the NEET 2027 bulletin changed these sizes?",
    answer:
      "As of 27 November 2026 NTA had not published a NEET (UG) 2027 bulletin. These specs come from the 2026 bulletin; when the 2027 bulletin appears, check its upload section, and this page will be updated after it is verified.",
  },
  {
    question: "Do I still need a postcard-size photo?",
    answer:
      "The 2026 bulletin no longer lists a postcard-size photo upload, but asks you to keep printed postcard-size (4\" × 6\") colour photos with a white background, one of which is pasted on the proforma downloaded with the admit card.",
  },
  {
    question: "Is my photo stored anywhere?",
    answer: "No. Resizing happens in your browser; nothing is sent to our servers.",
  },
];

export default function NeetPhotoSignatureResizePage() {
  return (
    <ExamPresetPage
      path={path}
      title={title}
      description={description}
      h1="NEET Photo, Signature and Thumb Impression Resize"
      breadcrumbName="NEET Photo and Signature Resize"
      intro={
        <>
          <p>
            Prepare the three images the NEET (UG) application asks for: your passport-size photo,
            your signature, and your left and right hand finger and thumb impressions. Each preset
            saves a JPG inside the KB range from NTA&apos;s Information Bulletin and checks it before
            you download.
          </p>
          <p>
            NTA gives file sizes but no pixel dimensions, so the presets keep your image&apos;s own
            shape. Everything runs in your browser.
          </p>
        </>
      }
      presets={neetPresets}
      specHeading="NEET (UG) upload specification (2026 bulletin)"
      specColumns={["Photo", "Signature", "Finger & thumb impressions"]}
      specRows={[
        { label: "Format", values: ["JPG / JPEG", "JPG / JPEG", "JPG / JPEG"] },
        { label: "File size", values: [`${photo.spec.minKB} KB - ${photo.spec.maxKB} KB`, `${signature.spec.minKB} KB - ${signature.spec.maxKB} KB`, `${impressions.spec.minKB} KB - ${impressions.spec.maxKB} KB (see note)`] },
        { label: "Dimensions", values: ["Not specified", "Not specified", "Not specified"] },
        { label: "Content", values: ["80% face, ears visible, no mask, white background", "Clearly legible", "Both hands, fingers and thumbs"] },
        { label: "Other", values: ["Taken after 1 January 2026", "Your own signature", "Unclear impressions are rejected"] },
      ]}
      sources={[{ source: NEET_SOURCE, verifiedOn: NEET_VERIFIED_ON }]}
      specNote={
        <>
          <p>
            The bulletin gives the impressions two ranges (10-200 KB and 50-300 KB); 50-200 KB meets
            both. It also asks for a white background in one place while allowing colour or black
            and white photos in another; a colour photo on white meets both.
          </p>
          <p>
            No NEET (UG) 2027 bulletin had been published when this was checked. When it appears,
            follow its upload section if it differs from the table.
          </p>
        </>
      }
      rejectionHeading="What gets a NEET application rejected"
      rejections={[
        { title: "Unclear photographs", detail: "The bulletin says applications with unclear photographs are liable to be rejected, and applications without photographs are rejected." },
        { title: "Fabricated or computer-made photos", detail: "Photos that look de-shaped, hand-made or computer-generated are rejected and treated as unfair means. Polaroid photos are not accepted either." },
        { title: "Someone else's images", detail: "Uploading another person's photo, signature or impressions is treated as unfair means and can lead to cancellation and criminal action." },
        { title: "Unclear impressions", detail: "Applications with unclear left and right hand finger and thumb impressions are rejected." },
        { title: "No second chance for the photo", detail: "The bulletin warns that the photo and impressions cannot be corrected later, so check them carefully before you submit." },
        { title: "Old photo", detail: "The 2026 bulletin asked for a photo taken after 1 January 2026, and the live photo captured in the form is matched with your photograph in the Aadhaar database." },
      ]}
      faqs={faqs}
      related={[
        { href: "/upsc-photo-signature-resize", label: "UPSC photo and signature resize" },
        { href: "/ibps-photo-signature-resize", label: "IBPS photo, signature, thumb and declaration" },
        { href: "/signature-resize", label: "Signature resize (10-20 KB, 20-50 KB)" },
        { href: "/compress-image-to-100kb", label: "Compress image to 100KB" },
      ]}
    >
      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Getting the 80% face crop right</h2>
        <ol className="list-decimal pl-5 space-y-2 text-zinc-700 dark:text-zinc-300">
          <li>Use a recent photo against a white background, without a mask, with both ears visible.</li>
          <li>Crop it so your face fills about 80% of the picture, from just above the hair to just below the chin.</li>
          <li>Choose the NEET photo preset; the file is saved as a JPG between 10 and 200 KB.</li>
          <li>Keep printed postcard-size and passport-size copies of the same photo for the admit card proforma.</li>
        </ol>
      </section>
    </ExamPresetPage>
  );
}
