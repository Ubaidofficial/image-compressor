import type { Metadata } from "next";
import ExamPresetPage from "@/components/ExamPresetPage";
import { createPageMetadata } from "@/lib/createPageMetadata";
import { SSC_SOURCES, SSC_VERIFIED_ON, sscPresets } from "@/data/uploadSpecs";
import type { FaqItem } from "@/components/FAQ";

const path = "/ssc-photo-signature-resize";
const title = "SSC Signature Resize 10-20 KB and SSC Photo Rules 2026";
const description =
  "Resize your SSC signature to a 10-20 KB JPG at 6.0 x 2.0 cm (300 DPI), as the 2026 SSC notices specify, and check the live photo rules. Free, runs in your browser.";

export const metadata: Metadata = createPageMetadata({ title, description, path, index: true });

const [signature] = sscPresets;

const faqs: FaqItem[] = [
  {
    question: "What is the SSC signature size in KB?",
    answer:
      "10 to 20 KB, in JPEG/JPG format. Every 2026 SSC examination notice checked (CHSL, CGL, JE, Stenographer, CAPF SI, Selection Post Phase-XIV, GD Constable) gives the same range.",
  },
  {
    question: "What are the SSC signature dimensions?",
    answer:
      "The notices say the signature should be about 6.0 cm wide and 2.0 cm high. The GD Constable 2026 notice adds 'at a resolution of 300 DPI', which works out to 709 × 236 pixels. The preset saves exactly that, with 300 DPI recorded in the file so it measures 6.0 × 2.0 cm.",
  },
  {
    question: "Some SSC notices say 4.0 cm × 2.0 cm. Which is right?",
    answer:
      "The CHSL 2026 and CGL 2026 notices say 6.0 × 2.0 cm in their main instructions but 4.0 × 2.0 cm in an annexure. The 6.0 × 2.0 cm figure is the one repeated in the main body of every 2026 notice and the only one given with a resolution, so the preset uses it. The KB range and JPG format are the same in both. If your notice says otherwise, follow your notice.",
  },
  {
    question: "Can I resize my photo for SSC here?",
    answer:
      "There is no photo file to resize. SSC's 2026 notices say you do not need a pre-existing photograph: the application module captures your photo live through the webcam, or through the mySSC app on an Android phone. Uploading a photo of a photo is a stated reason for rejection.",
  },
  {
    question: "What gets an SSC signature rejected?",
    answer:
      "The notices name blurred, illegible and 'miniature' signatures as the main reasons, and the GD Constable 2026 notice asks for the signature to be horizontally aligned. Sign large and clearly, and keep the 'Trim blank paper' option on so the signature fills the image.",
  },
  {
    question: "My SSC signature is under 10 KB. Is that a problem?",
    answer:
      "Yes: the range is 10 to 20 KB. A clean black signature on white compresses so well it can stay under 10 KB at full quality. The preset then adds a blank comment block inside the JPG to reach 10 KB; the image is unchanged.",
  },
  {
    question: "Is my signature uploaded to your server?",
    answer:
      "No. The resize happens in your browser on your own device, and nothing is sent to us.",
  },
];

export default function SscPhotoSignatureResizePage() {
  return (
    <ExamPresetPage
      path={path}
      title={title}
      description={description}
      h1="SSC Signature Resize and Photo Rules"
      breadcrumbName="SSC Photo and Signature Resize"
      intro={
        <>
          <p>
            Resize your signature for an SSC application in one click: a JPG of 10-20 KB at
            6.0 × 2.0 cm (709 × 236 pixels at 300 DPI), the size SSC&apos;s 2026 notices ask for.
            The tool checks the file before you download it.
          </p>
          <p>
            Looking for SSC photo resize? SSC no longer takes an uploaded photo: it captures it
            live during the application.{" "}
            <a href="#ssc-photo" className="underline">See the live photo rules below.</a>
          </p>
        </>
      }
      presets={sscPresets}
      specHeading="SSC signature and photo specification (2026 notices)"
      specColumns={["Signature (upload)", "Photo"]}
      specRows={[
        { label: "How it is provided", values: ["Scanned file you upload", "Captured live by the application module (webcam or mySSC app)"] },
        { label: "Format", values: ["JPEG / JPG", "Not applicable: no file"] },
        { label: "File size", values: [`${signature.spec.minKB} KB - ${signature.spec.maxKB} KB`, "Not applicable"] },
        { label: "Dimensions", values: ["About 6.0 cm (width) × 2.0 cm (height); 300 DPI per GD Constable 2026 notice = 709 × 236 px", "Face fully inside the area shown by the camera"] },
        { label: "Other", values: ["Horizontally aligned; not blurred or miniature", "Good light, plain background; no cap, mask or glasses"] },
      ]}
      sources={SSC_SOURCES.map((source) => ({ source, verifiedOn: SSC_VERIFIED_ON }))}
      specNote={
        <>
          <p>
            The CHSL 2026 and CGL 2026 notices give 4.0 cm × 2.0 cm for the signature in their
            annexures while saying 6.0 cm × 2.0 cm in the main instructions. This page follows the
            main instructions.
          </p>
          <p>
            Candidates who complete Aadhaar authentication are told their application will not be
            rejected because the photo or signature is not as per the prescribed standards. Specs
            can change with each notification: check the notice for your exam before applying.
          </p>
        </>
      }
      rejectionHeading="Why SSC rejects signatures and photos"
      rejections={[
        { title: "Miniature signature", detail: "SSC names 'miniature' signatures as the major reason for signature rejection. The GD notice advises signing so the signature occupies at least 80% of the box." },
        { title: "Blurred or illegible signature", detail: "Blurred or illegible signatures are rejected. Scan or photograph the signature in good light and keep it in focus." },
        { title: "Signature not horizontal", detail: "The signature should be horizontally aligned, not slanted across the image or rotated." },
        { title: "Photo of a photograph", detail: "SSC captures your photo live. Capturing a pre-existing photograph instead of yourself is a stated reason for rejection." },
        { title: "Cap, spectacles or goggles", detail: "Photos with a cap or hat, spectacles or goggles are shown as not acceptable. Remove them before capturing." },
        { title: "Dark, blurred or side-facing photo", detail: "Too dark, blurred, too small, too close, inverted and side-facing photos are listed as not acceptable." },
      ]}
      faqs={faqs}
      related={[
        { href: "/upsc-photo-signature-resize", label: "UPSC photo and signature resize" },
        { href: "/signature-resize", label: "Signature resize (10-20 KB, 20-50 KB)" },
        { href: "/image-compressor-to-20kb", label: "Compress image to 20KB" },
        { href: "/reduce-image-size-in-kb", label: "Reduce image size in KB" },
      ]}
    >
      <section id="ssc-photo" className="mt-14 max-w-3xl scroll-mt-20">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">SSC photo: live capture, not upload</h2>
        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
          The 2026 notices say a candidate is not required to have a pre-existing photograph. When
          prompted, you stand or sit in front of the camera, and the notices ask you to:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-zinc-700 dark:text-zinc-300">
          <li>Find a place with good light and a plain background.</li>
          <li>Keep the camera at eye level.</li>
          <li>Sit directly in front of the camera and look straight ahead.</li>
          <li>Keep your face fully inside the area marked by the camera, neither too close nor too far.</li>
          <li>Not wear a cap, mask or glasses/spectacles.</li>
        </ol>
        <p className="text-zinc-700 dark:text-zinc-300 mt-4">
          If your computer has no camera, the notices point to a QR code in the Upload Documents
          step for the mySSC Android app, which captures the photo on your phone. Because the photo
          is taken live, your appearance at the exam should match it.
        </p>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Making a signature that is not &quot;miniature&quot;</h2>
        <ol className="list-decimal pl-5 space-y-2 text-zinc-700 dark:text-zinc-300">
          <li>Draw a box about 6 cm wide and 2 cm high on plain paper and sign so the signature fills most of it.</li>
          <li>Photograph or scan it straight on, in good light, without shadows.</li>
          <li>Choose the image above. With &quot;Trim blank paper&quot; on, the tool crops to the ink before resizing.</li>
          <li>Check the preview, then download ssc-signature.jpg and upload it.</li>
        </ol>
      </section>
    </ExamPresetPage>
  );
}
