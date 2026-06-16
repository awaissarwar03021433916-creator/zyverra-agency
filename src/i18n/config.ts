// Central i18n configuration. Pure module (no server-only imports) so it can be
// safely used from the proxy, server components, and client components alike.

export const locales = ["en", "ur", "ar", "de", "fr", "es"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

// Right-to-left languages.
export const rtlLocales: readonly Locale[] = ["ur", "ar"];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function dir(locale: Locale): "rtl" | "ltr" {
  return isRtl(locale) ? "rtl" : "ltr";
}
