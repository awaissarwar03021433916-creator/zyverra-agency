/**
 * Google Analytics 4 event helpers.
 *
 * Thin, type-safe wrappers around `window.gtag` for tracking custom events.
 * Every helper is a no-op when GA hasn't loaded (no measurement ID, or not in
 * production — see `src/components/analytics/Analytics.tsx`), so call sites can
 * fire events unconditionally without guarding for the analytics runtime.
 *
 * The page_view event is handled automatically by the Analytics component on
 * route changes; the helpers below are for future custom event tracking.
 */

type EventParams = Record<string, unknown>;

/**
 * Send a custom GA4 event. Safe to call anywhere on the client — silently does
 * nothing when gtag is unavailable (SSR, dev, or analytics disabled).
 */
export function trackEvent(name: string, params: EventParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

// --- Optional prep: ready-to-wire helpers for common conversions. Not yet
// called anywhere; wire them into the relevant UI when event tracking is
// switched on. ---

/** Contact form submission. */
export function trackContactSubmit(params: EventParams = {}): void {
  trackEvent("contact_submit", params);
}

/** Chat widget interaction (e.g. opened, message sent). */
export function trackChatEvent(action: string, params: EventParams = {}): void {
  trackEvent("chat_interaction", { action, ...params });
}

/** Call-to-action click. */
export function trackCtaClick(label: string, params: EventParams = {}): void {
  trackEvent("cta_click", { label, ...params });
}

/** Calendly booking. */
export function trackCalendlyBooking(params: EventParams = {}): void {
  trackEvent("calendly_booking", params);
}
