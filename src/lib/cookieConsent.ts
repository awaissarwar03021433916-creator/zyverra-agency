// Cookie consent state, kept in a tiny external store so both the banner and
// the analytics loader read the same value without prop drilling or context.
//
// Deliberately backed by localStorage rather than a cookie: storing the choice
// itself in a cookie is legal but needs explaining, and nothing server-side
// needs to read it — analytics is a client-only script.

export type ConsentStatus = "granted" | "denied" | "unset";

const STORAGE_KEY = "zyverra_cookie_consent";
const CONSENT_EVENT = "zyverra:cookie-consent";

// Bump when the cookies we set materially change, so previously stored consent
// stops applying and visitors are asked again.
const CONSENT_VERSION = 1;

type StoredConsent = {
  status: Exclude<ConsentStatus, "unset">;
  version: number;
  decidedAt: string;
};

function readFromStorage(): ConsentStatus {
  if (typeof window === "undefined") return "unset";
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return "unset";
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    if (parsed?.version !== CONSENT_VERSION) return "unset";
    return parsed.status === "granted" || parsed.status === "denied" ? parsed.status : "unset";
  } catch {
    // Private mode, disabled storage, or corrupt JSON — treat as no decision.
    return "unset";
  }
}

// useSyncExternalStore requires a referentially stable snapshot, so the value is
// cached and only recomputed when something notifies us of a change.
let cachedSnapshot: ConsentStatus | null = null;

export function getConsentSnapshot(): ConsentStatus {
  if (cachedSnapshot === null) cachedSnapshot = readFromStorage();
  return cachedSnapshot;
}

// On the server, and during hydration, nobody has decided anything yet. This
// keeps the server and first client render identical.
export function getServerConsentSnapshot(): ConsentStatus {
  return "unset";
}

const listeners = new Set<() => void>();

function notify() {
  cachedSnapshot = readFromStorage();
  for (const listener of listeners) listener();
}

// Another tab changed the decision — mirror it here.
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

function write(status: Exclude<ConsentStatus, "unset">) {
  if (typeof window === "undefined") return;
  try {
    const value: StoredConsent = {
      status,
      version: CONSENT_VERSION,
      decidedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage unavailable. The choice still applies for this page view via the
    // in-memory snapshot below; we simply cannot remember it next time.
  }
  cachedSnapshot = status;
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function grantConsent() {
  write("granted");
}

export function denyConsent() {
  write("denied");
  clearAnalyticsCookies();
}

// Clears the stored decision so the banner is shown again — used by the
// "Cookie settings" control on the cookie policy page.
export function resetConsent() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to clear.
  }
  cachedSnapshot = "unset";
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

// Withdrawal has to actually remove what was set, not just stop setting more.
// GA4 writes `_ga` and `_ga_<measurement id>` on the registrable domain, so we
// expire each candidate name across the plausible domain and path scopes.
export function clearAnalyticsCookies() {
  if (typeof document === "undefined") return;

  const names = document.cookie
    .split(";")
    .map((entry) => entry.split("=")[0]?.trim())
    .filter((name): name is string => !!name && (name === "_ga" || name.startsWith("_ga")));

  const { hostname } = window.location;
  const parts = hostname.split(".");
  // e.g. "app.zyverralabs.com" -> ["app.zyverralabs.com", "zyverralabs.com"]
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
