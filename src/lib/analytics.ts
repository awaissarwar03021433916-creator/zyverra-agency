/**
 * One consent-aware tracking helper (Section G8).
 *
 * `track()` forwards an event to:
 * - Vercel Web Analytics (first-party statistics) unless the visitor opted out;
 * - GA4 and the Meta Pixel only when marketing consent was given (those
 *   scripts are never loaded otherwise, so the globals don't exist).
 *
 * Safe to call anywhere on the client; it is a no-op on the server.
 */

import { track as vercelTrack } from "@vercel/analytics";

import { getConsentSnapshot } from "@/lib/cookieConsent";

export type TrackEvent =
  | "whatsapp_click"
  | "quote_form_submit"
  | "audit_form_submit"
  | "book_call_click"
  | "email_click"
  | "pricing_view";

type Params = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: TrackEvent, params: Params = {}): void {
  if (typeof window === "undefined") return;
  const consent = getConsentSnapshot();

  if (!consent.statisticsOptOut) {
    try {
      vercelTrack(event, params);
    } catch {
      // Analytics must never break the UI.
    }
  }

  if (consent.marketing) {
    if (typeof window.gtag === "function") window.gtag("event", event, params);
    if (typeof window.fbq === "function") window.fbq("trackCustom", event, params);
  }
}
