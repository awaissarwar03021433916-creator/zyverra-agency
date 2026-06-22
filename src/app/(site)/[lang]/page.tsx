import { notFound } from "next/navigation";

import HomePage from "@/components/marketing/home/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import {
  siteOrigin,
  localBusinessSchema,
  serviceSchemas,
  softwareApplicationSchemas,
} from "@/lib/schema";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const origin = siteOrigin();

  return (
    <>
      <JsonLd
        data={[
          localBusinessSchema(origin),
          ...serviceSchemas(origin),
          ...softwareApplicationSchemas(origin),
        ]}
      />
      <HomePage dict={dict} lang={lang} />
    </>
  );
}
