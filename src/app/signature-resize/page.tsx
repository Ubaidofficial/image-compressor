import type { Metadata } from "next";
import Link from "next/link";
import ExamPresetPage from "@/components/ExamPresetPage";
import { createPageMetadata } from "@/lib/createPageMetadata";
import { genericSignaturePresets } from "@/data/uploadSpecs";
import type { FaqItem } from "@/components/FAQ";

const path = "/signature-resize";
const title = "Signature Resize: 10-20 KB and 20-50 KB JPG Online";
const description =
  "Resize a scanned signature to a 10-20 KB or 20-50 KB JPG for online application forms. White background, no black edges, checked before download. Runs in your browser.";

export const metadata: Metadata = createPageMetadata({ title, description, path, index: true });

const faqs: FaqItem[] = [
  {
    question: "How do I resize my signature to 20 KB?",
    answer:
      "Scan or photograph your signature on white paper, crop it close to the ink, and choose the 10-20 KB preset. The tool saves a JPG between 10 and 20 KB and shows the final size before you download it.",
  },
  {
    question: "Which preset should I pick, 10-20 KB or 20-50 KB?",
    answer:
      "Use whatever range your form's notice states. These two are the ranges application forms ask for most often, but they are general presets, not the rule of any particular exam. For UPSC and SSC, use their dedicated pages, which follow the official instructions.",
  },
  {
    question: "Why is my signature file below the minimum size?",
    answer:
      "A signature is mostly white space, and JPG compresses white space to almost nothing. A small, clean signature can be under 10 KB even at full quality. When that happens the tool adds a blank comment block inside the JPG to reach the minimum; the image itself does not change.",
  },
  {
    question: "Does the form also need specific dimensions?",
    answer:
      "Often, yes. Many notices give the signature size in pixels or centimetres as well as in KB. These generic presets keep your signature's own shape, so check your notice and use a dedicated exam page when one exists.",
  },
  {
    question: "Can I upload a PNG signature with a transparent background?",
    answer:
      "You can choose a PNG here. Transparent areas are filled with white before the JPG is saved, so the signature does not end up on a black background, which is a common problem with transparent signatures.",
  },
  {
    question: "Is my signature uploaded anywhere?",
    answer:
      "No. Resizing happens in your browser, on your device. A signature is sensitive, so it is never sent to a server.",
  },
];

export default function SignatureResizePage() {
  return (
    <ExamPresetPage
      path={path}
      title={title}
      description={description}
      h1="Signature Resize in KB"
      breadcrumbName="Signature Resize"
      intro={
        <>
          <p>
            Turn a scanned or photographed signature into a JPG of 10-20 KB or 20-50 KB, the two
            ranges online application forms ask for most often. One click, and the tool checks the
            size before you download.
          </p>
          <p>
            Applying for UPSC or SSC? Use the{" "}
            <Link href="/upsc-photo-signature-resize" className="underline">UPSC</Link> or{" "}
            <Link href="/ssc-photo-signature-resize" className="underline">SSC</Link> page instead: their
            presets follow the official specification, including dimensions.
          </p>
        </>
      }
      presets={genericSignaturePresets}
      specHeading="What each preset produces"
      specColumns={genericSignaturePresets.map((p) => p.label)}
      specRows={[
        { label: "Format", values: genericSignaturePresets.map(() => "JPG") },
        { label: "File size", values: genericSignaturePresets.map((p) => `${p.spec.minKB} KB - ${p.spec.maxKB} KB`) },
        { label: "Dimensions", values: genericSignaturePresets.map((p) => p.dimensionsText) },
        { label: "Background", values: genericSignaturePresets.map(() => "White (transparent areas are filled)") },
      ]}
      sources={[]}
      specNote={
        <p>
          These are general size ranges, not the official specification of any exam or portal.
          Always check the notice for your form; if it states dimensions in pixels or centimetres,
          your file must meet those too.
        </p>
      }
      rejectionHeading="Common signature upload problems"
      rejections={[
        { title: "File outside the KB range", detail: "Portals check the size on upload. Too large is the usual problem, but a clean signature can also be too small; the tool handles both." },
        { title: "Black background after saving", detail: "A PNG signature with transparency often turns black when converted to JPG by other tools. This tool fills transparent areas with white first." },
        { title: "Signature too faint to read", detail: "Sign with a dark pen, then crop close to the ink so the signature fills the image rather than a small corner of a page." },
        { title: "Wrong file type", detail: "Most forms want JPG or JPEG. The presets always save a .jpg file." },
      ]}
      faqs={faqs}
      related={[
        { href: "/upsc-photo-signature-resize", label: "UPSC photo and signature resize" },
        { href: "/ssc-photo-signature-resize", label: "SSC photo and signature resize" },
        { href: "/image-compressor-to-20kb", label: "Compress image to 20KB" },
        { href: "/compress-image-to-50kb", label: "Compress image to 50KB" },
        { href: "/reduce-image-size-in-kb", label: "Reduce image size in KB" },
      ]}
    >
      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Getting a clean signature scan</h2>
        <ol className="list-decimal pl-5 space-y-2 text-zinc-700 dark:text-zinc-300">
          <li>Sign on plain white paper with a dark pen. Use your normal running signature unless your notice says otherwise.</li>
          <li>Photograph it from directly above in daylight, or scan it. Avoid shadows from your phone or hand.</li>
          <li>Crop close to the signature, leaving a small white margin.</li>
          <li>Pick the KB range your form asks for, download the JPG and upload that file.</li>
        </ol>
      </section>
    </ExamPresetPage>
  );
}
