import { notFound } from "next/navigation";

import { LandingPage } from "@/components/marketing/LandingPage";
import { clinicTypes, getClinicType } from "@/data/clinicTypes";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return clinicTypes.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getClinicType(slug);
  if (!t) return {};
  return pageMetadata({ title: t.title, description: t.description, path: t.content.path });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getClinicType(slug);
  if (!t) notFound();
  return <LandingPage content={t.content} />;
}
