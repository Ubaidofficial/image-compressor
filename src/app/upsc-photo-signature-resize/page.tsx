import type { Metadata } from "next";
import ExamPresetPage from "@/components/ExamPresetPage";
import { createPageMetadata } from "@/lib/createPageMetadata";
import { upscPresets } from "@/data/uploadSpecs";
import type { FaqItem } from "@/components/FAQ";

const path = "/upsc-photo-signature-resize";
const title = "UPSC Photo and Signature Resize: JPG 20-200 KB";
const description =
  "Resize your UPSC photo to a JPG of 20-200 KB and your three-signature image to 20-100 KB at 350-500 pixels, as the UPSC online portal specifies. Free, in your browser.";

export const metadata: Metadata = createPageMetadata({ title, description, path, index: true });

const [photo, signature] = upscPresets;

const faqs: FaqItem[] = [
  {
    question: "What size should the UPSC photo be in KB?",
    answer:
      "The UPSC portal's upload instructions ask for a colour photo in JPG format between 20 KB and 200 KB, saved with the file name 'photo'. The photo preset on this page produces exactly that, and names the download photo.jpg.",
  },
  {
    question: "What are the UPSC photo dimensions in pixels?",
    answer:
      "The UPSC instructions do not state pixel dimensions for the photo. What they do require is that your face covers at least 75% (3/4th) of the photo, on a plain white background. Crop the photo so your face fills the frame before resizing it here.",
  },
  {
    question: "Why does UPSC need three signatures in one image?",
    answer:
      "The current UPSC instructions and the 2026 examination notices ask candidates to sign three times, one below the other, on plain white paper in black ink, and to scan all three signatures as a single image. A file with one signature is listed as a rejection reason.",
  },
  {
    question: "What size should the UPSC signature be?",
    answer:
      "JPG, between 20 KB and 100 KB, with image dimensions of 350 to 500 pixels, saved with the file name 'signature'. The instructions do not say whether 350-500 refers to width or height, so this tool keeps both inside that range.",
  },
  {
    question: "My signature JPG is smaller than 20 KB. What do I do?",
    answer:
      "A signature in black ink on white paper compresses very well, so it can fall below 20 KB even at full quality. The signature preset detects this and adds a blank comment block inside the JPG until the file reaches the minimum. The image you see is unchanged.",
  },
  {
    question: "Do I still need the live photo if I upload a photo?",
    answer:
      "Yes. The UPSC instructions say capture of a live photograph is mandatory, and that it is matched against the passport-size photo you upload. If the two do not match, the application cannot proceed. Use a recent photo that looks like you today.",
  },
  {
    question: "The ESE 2027 notice says 300 KB. Which limit is right?",
    answer:
      "The Engineering Services 2027 notice (dated 16 September 2026) says each file should be 20 KB to 300 KB. The portal's own upload instructions say 20-200 KB for the photo and 20-100 KB for the signature, and the portal rejects files outside its instructions. A file inside the portal's narrower range satisfies both, so the presets use it.",
  },
  {
    question: "Is my photo uploaded to your server?",
    answer:
      "No. The resizing runs in your browser on your own device. The photo and signature never leave your computer or phone until you upload them to the UPSC portal yourself.",
  },
];

export default function UpscPhotoSignatureResizePage() {
  return (
    <ExamPresetPage
      path={path}
      title={title}
      description={description}
      h1="UPSC Photo and Signature Resize"
      breadcrumbName="UPSC Photo and Signature Resize"
      intro={
        <>
          <p>
            Get your photo and signature ready for the UPSC online application (Common Application
            Form) in one click. The presets follow the size, format and file-name rules
            in the UPSC portal&apos;s upload instructions and check the result before you download it.
          </p>
          <p>
            Everything runs in your browser. Your photo and signature are not uploaded anywhere.
          </p>
        </>
      }
      presets={upscPresets}
      specHeading="UPSC photo and signature specification"
      specColumns={["Photo", "Signature"]}
      specRows={[
        { label: "Format", values: ["JPG", "JPG"] },
        { label: "File size", values: [`${photo.spec.minKB} KB - ${photo.spec.maxKB} KB`, `${signature.spec.minKB} KB - ${signature.spec.maxKB} KB`] },
        { label: "Dimensions", values: ["Not specified (face must cover 75% of the photo)", "350 - 500 pixels"] },
        { label: "File name", values: ["photo", "signature"] },
        { label: "Background / paper", values: ["Plain white", "Plain white, unlined paper"] },
        { label: "Content", values: ["Recent colour photo, frontal, both ears visible", "Three signatures in black ink, one below the other"] },
      ]}
      sources={[
        {
          source: { ...photo.source!, location: "photo: pages 2 and 4; signature: page 5" },
          verifiedOn: photo.verifiedOn!,
        },
      ]}
      specNote={
        <>
          <p>
            The same numbers appear in the portal&apos;s &quot;Instructions for uploading
            documents&quot;, which also lists the Photo ID upload as JPG, 20 KB - 200 KB, file name
            id_card.
          </p>
          <p>
            Specifications can change with each notification. Check the notice for your exam before
            you apply; if it differs from the table above, follow the notice.
          </p>
        </>
      }
      rejectionHeading="Why UPSC rejects photos and signatures"
      rejections={[
        { title: "Face too small in the frame", detail: "UPSC's sample photos are rejected when the face covers less than 3/4th of the photo. Crop close to the face before resizing." },
        { title: "Face misaligned or too close", detail: "The face must look straight at the camera with both ear lobes visible. A face out of frame or too close to the camera is rejected." },
        { title: "Dark background, uniform or dark glasses", detail: "Photos with a dark background, in uniform, or with eyes hidden behind coloured or dark glasses are not accepted. Avoid shadows and glare on spectacles." },
        { title: "Blurred photo", detail: "A blurred photo is listed as a rejection reason. Start from the sharpest original you have, not a screenshot or a forwarded copy." },
        { title: "One signature instead of three", detail: "Sign three times, one below the other, with enough space between them, and scan all three in one image." },
        { title: "Blue ink, lined or coloured paper", detail: "Only black ink on plain white, unlined paper is accepted. Signatures side by side, rotated or upside down are also rejected." },
      ]}
      faqs={faqs}
      related={[
        { href: "/ssc-photo-signature-resize", label: "SSC photo and signature resize" },
        { href: "/signature-resize", label: "Signature resize (10-20 KB, 20-50 KB)" },
        { href: "/reduce-image-size-in-kb", label: "Reduce image size in KB" },
        { href: "/compress-image-to-100kb", label: "Compress image to 100KB" },
      ]}
    >
      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">How to prepare the three-signature image</h2>
        <ol className="list-decimal pl-5 space-y-2 text-zinc-700 dark:text-zinc-300">
          <li>Take a plain white sheet with no lines. Sign three times in black ink, one signature below the other, leaving clear space between them.</li>
          <li>Scan the sheet, or photograph it straight on in good light so it is not dark or blurred.</li>
          <li>Crop the scan so the three signatures fill most of the image, then choose the UPSC signature preset above.</li>
          <li>Check the result: three signatures, upright, readable. Download signature.jpg and upload that file.</li>
        </ol>
      </section>
    </ExamPresetPage>
  );
}
