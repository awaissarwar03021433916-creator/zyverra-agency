import type { Metadata } from "next";

import { appConfig } from "@/config/app";
import { siteOrigin } from "@/lib/schema";

const DEFAULT_OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Zyverra Labs — websites and marketing for UK aesthetics clinics",
};

/**
 * Per-page metadata with a self-referencing absolute canonical, en-GB +
 * x-default alternates, and matching Open Graph / Twitter tags.
 *
 * `title` is used verbatim (the root layout has no title template), so the
 * Section D titles render exactly as specified.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  image,
}: {
  title: string;
  description: string;
  /** Site path beginning with "/" ("/" for home). */
  path: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  const origin = siteOrigin();
  const url = path === "/" ? `${origin}/` : `${origin}${path}`;
  const ogImage = image ?? DEFAULT_OG_IMAGE;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: { "en-GB": url, "x-default": url },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: appConfig.name,
      locale: appConfig.ogLocale,
      type,
      images: [ogImage],
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime ?? publishedTime }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: ogImage.url, alt: ogImage.alt }],
    },
  };
}
