// Cookie consent state (Step 8), kept in a tiny external store so the banner,
// the analytics loaders and the cookie settings controls all read one value.
//
// Categories:
// - Strictly necessary: always on (nothing here stores it — it isn't optional).
// - Statistics: first-party, cookieless, aggregate-only analytics (Vercel Web
//   Analytics). Runs under the UK Data (Use and Access) Act 2025 statistical-
//   purposes exemption to PECR, with a free, simple way to object: the
//   "Opt out of statistics" control on the banner and on /cookies.
// - Marketing: GA4 and the Meta Pixel. OFF by default; loads only after Accept.
//
// Backed by localStorage rather than a cookie: nothing server-side reads it.

export type ConsentState = {
  /** The visitor has made a choice (Accept or Reject) on the banner. */
  decided: boolean;
  /** Marketing scripts (GA4, Meta Pixel) allowed. Opt-in only. */
  marketing: boolean;
  /** The visitor objected to first-party statistics. */
  statisticsOptOut: boolean;
};

const STORAGE_KEY = "zyverra_cookie_consent";
const CONSENT_EVENT = "zyverra:cookie-consent";
const OPEN_EVENT = "zyverra:open-cookie-settings";

// v2: categories replaced the single analytics yes/no. Older decisions no
// longer apply, so returning visitors are asked again.
const CONSENT_VERSION = 2;

const UNDECIDED: ConsentState = { decided: false, marketing: false, statisticsOptOut: false };

type Stored = ConsentState & { version: number; decidedAt: string };

function readFromStorage(): ConsentState {
  if (typeof window === "undefined") return UNDECIDED;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return UNDECIDED;
    const parsed = JSON.parse(raw) as Partial<Stored>;
    if (parsed?.version !== CONSENT_VERSION) return UNDECIDED;
    return {
      decided: parsed.decided === true,
      marketing: parsed.marketing === true,
      statisticsOptOut: parsed.statisticsOptOut === true,
    };
  } catch {
    return UNDECIDED;
  }
}

// useSyncExternalStore needs a referentially stable snapshot.
let cachedSnapshot: ConsentState | null = null;

export function getConsentSnapshot(): ConsentState {
  if (cachedSnapshot === null) cachedSnapshot = readFromStorage();
  return cachedSnapshot;
}

export function getServerConsentSnapshot(): ConsentState {
  return UNDECIDED;
}

const listeners = new Set<() => void>();

function notify() {
  cachedSnapshot = readFromStorage();
  for (const listener of listeners) listener();
}

function handleStorage(event: StorageEvent) {
  if (event.key === null || event.key === STORAGE_KEY) notify();
}

export function subscribeConsent(onChange: () => void): () => void {
  if (listeners.size === 0 && typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
    window.addEventListener(CONSENT_EVENT, notify);
  }
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(CONSENT_EVENT, notify);
    }
  };
}

function write(next: ConsentState) {
  if (typeof window === "undefined") return;
  try {
    const value: Stored = { ...next, version: CONSENT_VERSION, decidedAt: new Date().toISOString() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    cachedSnapshot = null;
  } catch {
    // Storage unavailable: the choice applies to this page view only.
    cachedSnapshot = next;
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** Banner "Accept": marketing on; the statistics opt-out choice is kept. */
export function acceptAll(statisticsOptOut: boolean) {
  write({ decided: true, marketing: true, statisticsOptOut });
}

/** Banner "Reject": marketing off; the statistics opt-out choice is kept. */
export function rejectMarketing(statisticsOptOut: boolean) {
  write({ decided: true, marketing: false, statisticsOptOut });
  clearMarketingCookies();
}

/** Toggle the statistics objection without touching the marketing choice. */
export function setStatisticsOptOut(optOut: boolean) {
  const current = getConsentSnapshot();
  write({ ...current, statisticsOptOut: optOut });
}

/** Reopen the banner (footer "Cookie settings" link and /cookies page). */
export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function subscribeOpenSettings(onOpen: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(OPEN_EVENT, onOpen);
  return () => window.removeEventListener(OPEN_EVENT, onOpen);
}

// Withdrawal must remove what was set, not just stop setting more. GA4 writes
// `_ga*`; the Meta Pixel writes `_fbp`/`_fbc`.
export function clearMarketingCookies() {
  if (typeof document === "undefined") return;

  const names = document.cookie
    .split(";")
    .map((entry) => entry.split("=")[0]?.trim())
    .filter(
      (name): name is string =>
        !!name && (name.startsWith("_ga") || name === "_fbp" || name === "_fbc")
    );

  const { hostname } = window.location;
  const parts = hostname.split(".");
  const domains = [
    undefined,
    hostname,
    ...(parts.length > 2 ? [parts.slice(-2).join(".")] : []),
  ].flatMap((domain) => (domain ? [domain, `.${domain}`] : [undefined]));

  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}
