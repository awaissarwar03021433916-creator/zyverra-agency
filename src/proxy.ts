import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { locales, defaultLocale, isLocale } from "@/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

function getPreferredLocale(request: NextRequest): string {
  // 1) An explicit choice saved by the language selector wins.
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;

  // 2) Otherwise negotiate from the Accept-Language header.
  const accept = request.headers.get("accept-language");
  if (accept) {
    const requested = accept
      .split(",")
      .map((part) => part.split(";")[0]?.trim().toLowerCase())
      .filter(Boolean);

    for (const lang of requested) {
      if (isLocale(lang)) return lang;
      const base = lang.split("-")[0];
      if (isLocale(base)) return base;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return;

  const locale = getPreferredLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Run on everything except internal Next paths, API/admin routes, and files
  // (anything containing a dot, e.g. robots.txt, sitemap.xml, logo.png).
  matcher: ["/((?!_next|api|admin|.*\\..*).*)"],
};
