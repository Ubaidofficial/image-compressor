import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PseoLandingPage from "@/components/PseoLandingPage";
import { createPageMetadata } from "@/lib/createPageMetadata";
import {
  getPseoPage,
  isPseoPageIndexable,
  pseoCanonicalPath,
  pseoPages,
} from "@/data/pseoPages";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 86400;

export function generateStaticParams() {
  return pseoPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPseoPage(slug);

  if (!page) {
    return {};
  }

  // Consolidated pages canonicalise to their head page, so `path` is the
  // canonical target rather than this page's own URL.
  return createPageMetadata({
    title: page.title,
    description: page.metaDescription,
    path: pseoCanonicalPath(page),
    index: isPseoPageIndexable(page),
  });
}

export default async function PseoDynamicPage({ params }: Props) {
  const { slug } = await params;
  const page = getPseoPage(slug);

  if (!page) {
    notFound();
  }

  return <PseoLandingPage page={page} />;
}
