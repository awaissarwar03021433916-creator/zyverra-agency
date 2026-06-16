import { notFound } from "next/navigation";

import HomePage from "@/components/marketing/home/HomePage";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export default async function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  return <HomePage dict={dict} lang={lang} />;
}
