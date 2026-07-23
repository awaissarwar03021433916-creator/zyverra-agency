import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FounderPage from "@/components/marketing/pages/FounderPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, locales, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { siteOrigin, breadcrumbSchema, founderSchema } from "@/lib/schema";

const PATH = "founder";
const TITLE = "Muhammad Awais — Founder & CEO | Zyverra Labs";
const DESCRIPTION =
  "Muhammad Awais, Founder & CEO of Zyverra Labs: AI engineering, software engineering, web development, AI automation, and business leadership. Mission, expertise, experience, technologies, and selected work.";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : defaultLocale;
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}/${PATH}`]));

  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: {
      canonical: `/${locale}/${PATH}`,
      languages: { ...languages, "x-default": `/${defaultLocale}/${PATH}` },
    },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: `/${locale}/${PATH}`,
      siteName: "Zyverra Labs",
      locale,
      type: "profile",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Zyverra Labs" }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const origin = siteOrigin();

  return (
    <>
      <JsonLd
        data={[
          founderSchema(origin),
          breadcrumbSchema(origin, lang, [
            { name: "Home", path: "" },
            { name: "Founder", path: "/founder" },
          ]),
        ]}
      />
      <FounderPage dict={dict} lang={lang} />
    </>
  );
}
