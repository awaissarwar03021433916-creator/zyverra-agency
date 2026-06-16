import type { Locale } from "./config";
import type { Dictionary } from "./types";

// Each dictionary is dynamically imported so only the requested locale's strings
// are loaded on the server. These modules are only ever imported by Server
// Components (layout/page), so they never reach the client bundle.
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  ur: () => import("./dictionaries/ur").then((m) => m.default),
  ar: () => import("./dictionaries/ar").then((m) => m.default),
  de: () => import("./dictionaries/de").then((m) => m.default),
  fr: () => import("./dictionaries/fr").then((m) => m.default),
  es: () => import("./dictionaries/es").then((m) => m.default),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
