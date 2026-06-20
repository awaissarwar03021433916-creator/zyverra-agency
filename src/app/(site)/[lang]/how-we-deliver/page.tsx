import type { Metadata } from "next";
import { notFound } from "next/navigation";

import HowWeDeliverPage from "@/components/marketing/pages/HowWeDeliverPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale, locales, defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { howWeDeliverFaqs } from "@/data/faqs";
import { siteOrigin, faqPageSchema, breadcrumbSchema } from "@/lib/schema";

const PATH = "how-we-deliver";
const TITLE = "How We Deliver | Zyverra Labs";
const DESCRIPTION =
  "How Zyverra Labs delivers production-ready AI and software: a clear phased process, concrete deliverables, weekly communication, security by default, and support past launch.";

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
      type: "website",
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
          faqPageSchema(howWeDeliverFaqs),
          breadcrumbSchema(origin, lang, [
            { name: "Home", path: "" },
            { name: "How We Deliver", path: "/how-we-deliver" },
          ]),
        ]}
      />
      <HowWeDeliverPage dict={dict} lang={lang} />
    </>
  );
}
