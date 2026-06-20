import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PseoLandingPage from "@/components/PseoLandingPage";
import { createPageMetadata } from "@/lib/createPageMetadata";
import {
  getPseoPage,
  isPseoPagePublished,
  pseoPages,
  pseoPath,
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

  return createPageMetadata({
    title: page.title,
    description: page.metaDescription,
    path: pseoPath(page.slug),
    index: isPseoPagePublished(page),
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
