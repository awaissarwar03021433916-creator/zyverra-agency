"use client";

import type { ReactNode } from "react";
import {
  ArrowRight,
  Ban,
  BarChart3,
  Cookie,
  ExternalLink,
  Globe2,
  Mail,
  Megaphone,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { business } from "@/config/business";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import PageShell from "./PageShell";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";

// Human-readable effective date. Update this whenever the policy changes — it is
// also surfaced in the page metadata and in the hero chips.
export const COOKIE_POLICY_LAST_UPDATED = "23 July 2026";

const LEGAL_ENTITY = "Zyverra Labs LLC";
const CONTACT_EMAIL = business.email;

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

// Plain-language summary shown above the detail. Every claim here is backed by
// the inventory tables below.
const AT_A_GLANCE = [
  {
    icon: Ban,
    title: "No marketing cookies at all",
    description:
      "We run no advertising pixels, no retargeting tags, and no cross-site trackers. There is no marketing category on this site to opt out of.",
  },
  {
    icon: ShieldCheck,
    title: "Two first-party cookies",
    description:
      "One remembers the language you chose. One is an administrator login session that only our own team ever receives. That is the entire essential set.",
  },
  {
    icon: BarChart3,
    title: "Analytics only if you agree",
    description:
      "Google Analytics 4 loads only after you accept it, only on the live site, and only in aggregate. Decline and no analytics script is ever requested.",
  },
  {
    icon: SlidersHorizontal,
    title: "Your browser is the control panel",
    description:
      "Every cookie here can be blocked or deleted from your own browser settings, and the site keeps working without them.",
  },
];

// Essential first-party cookies. These map one-to-one to what the code actually
// sets — the locale cookie in the navbar language selector and the admin
// session cookie issued on login.
const ESSENTIAL_COOKIES = [
  {
    name: "NEXT_LOCALE",
    provider: "Zyverra Labs (first-party)",
    purpose:
      "Stores the language you pick in the language selector so the site loads in that locale on your next visit.",
    duration: "1 year",
  },
  {
    name: "zyverra_admin",
    provider: "Zyverra Labs (first-party)",
    purpose:
      "Authenticated session for our internal admin dashboard. Only ever set for our own team after login; a visitor never receives it.",
    duration: "8 hours",
  },
];

// Analytics cookies set by GA4 once measurement is enabled in production.
const ANALYTICS_COOKIES = [
  {
    name: "_ga",
    provider: "Google Analytics 4",
    purpose:
      "Distinguishes one browser from another so repeat visits are not counted as new people. Pseudonymous — it holds a random identifier, not your identity.",
    duration: "2 years",
  },
  {
    name: "_ga_<measurement ID>",
    provider: "Google Analytics 4",
    purpose:
      "Persists session state so a visit that spans several pages is measured as one session rather than several.",
    duration: "2 years",
  },
];

// Browser local storage — not cookies, but people reasonably expect to find it
// on a cookie policy, so it is documented in the same terms.
const LOCAL_STORAGE = [
  {
    name: "zyverra_session",
    provider: "Zyverra Labs (first-party)",
    purpose:
      "A randomly generated identifier that lets the AI assistant reload your own conversation thread after a refresh.",
    duration: "Until you clear browser storage",
  },
  {
    name: "zyverra_projects",
    provider: "Zyverra Labs (first-party)",
    purpose:
      "Keeps the list of project threads you have started with the assistant, so you can switch between them.",
    duration: "Until you clear browser storage",
  },
];

// Per-browser cookie settings. Links point at each vendor's own current help
// page so they stay accurate as the UIs change.
const BROWSER_LINKS = [
  {
    name: "Google Chrome",
    href: "https://support.google.com/chrome/answer/95647",
  },
  {
    name: "Mozilla Firefox",
    href: "https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop",
  },
  {
    name: "Apple Safari",
    href: "https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac",
  },
  {
    name: "Microsoft Edge",
    href: "https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09",
  },
];

// Section registry — drives both the sticky table of contents and the rendered
// order, so the two can never drift apart.
const SECTIONS = [
  { id: "what-are-cookies", title: "What cookies are", icon: Cookie },
  { id: "essential-cookies", title: "Essential cookies", icon: ShieldCheck },
  { id: "analytics-cookies", title: "Analytics cookies", icon: BarChart3 },
  { id: "marketing-cookies", title: "Marketing cookies", icon: Megaphone },
  { id: "managing-cookies", title: "Managing cookies", icon: SlidersHorizontal },
  { id: "third-party-cookies", title: "Third-party cookies", icon: Globe2 },
  { id: "contact", title: "Contact information", icon: Mail },
] as const;

// ---------------------------------------------------------------------------
// Building blocks
// ---------------------------------------------------------------------------

function Section({
  id,
  index,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  index: number;
  title: string;
  icon: (typeof SECTIONS)[number]["icon"];
  children: ReactNode;
}) {
  return (
    <Reveal>
      <section
        id={id}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors duration-300 hover:border-primary/30 sm:p-8"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-widest text-primary">
              Section {String(index).padStart(2, "0")}
            </div>
            <h2 className="mt-1 font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {title}
            </h2>
          </div>
        </div>
        <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">{children}</div>
      </section>
    </Reveal>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 text-sm font-semibold tracking-tight text-foreground">{children}</h3>;
}

function Bullets({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Term({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-foreground">{children}</strong>;
}

function MailLink() {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
    >
      {CONTACT_EMAIL}
    </a>
  );
}

function ExternalLinkInline({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 transition-colors hover:underline"
    >
      {children}
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-primary/25 bg-primary/[0.06] p-4 text-sm leading-6 text-foreground/90">
      {children}
    </div>
  );
}

// Live consent control. Shows the visitor's current analytics choice and lets
// them change it here — withdrawing has to be as easy as agreeing, and sending
// someone back to a banner they already dismissed is not "easy".
function ConsentControl() {
  const { status, accept, reject } = useCookieConsent();

  const label =
    status === "granted"
      ? "Analytics cookies are currently allowed on this browser."
      : status === "denied"
        ? "Analytics cookies are currently declined on this browser."
        : "You have not made a choice yet on this browser. Until you do, no analytics cookies are set.";

  return (
    <div className="rounded-xl border border-border bg-background/60 p-5">
      <div className="flex items-center gap-2.5">
        <span
          className={`h-2.5 w-2.5 shrink-0 rounded-full ${
            status === "granted" ? "bg-primary" : "bg-muted-foreground/40"
          }`}
          aria-hidden="true"
        />
        <div className="text-sm font-semibold text-foreground">Your current setting</div>
      </div>
      <p className="mt-2 text-sm leading-6 text-muted-foreground" aria-live="polite">
        {label}
      </p>
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <button
          type="button"
          onClick={accept}
          disabled={status === "granted"}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md disabled:pointer-events-none disabled:opacity-45"
        >
          Allow analytics
        </button>
        <button
          type="button"
          onClick={reject}
          disabled={status === "denied"}
          className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background/70 px-5 text-sm font-semibold text-foreground shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted disabled:pointer-events-none disabled:opacity-45"
        >
          Decline analytics
        </button>
      </div>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Your choice is stored in this browser only. Declining also deletes any analytics cookies
        already set here.
      </p>
    </div>
  );
}

// Inventory table. Scrolls inside its own container so the page body never
// scrolls horizontally on a phone.
function CookieTable({
  caption,
  rows,
  nameLabel = "Name",
}: {
  caption: string;
  rows: { name: string; provider: string; purpose: string; duration: string }[];
  nameLabel?: string;
}) {
  return (
    <div className="-mx-6 overflow-x-auto px-6 sm:-mx-8 sm:px-8">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border">
            <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-foreground">
              {nameLabel}
            </th>
            <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-foreground">
              Provider
            </th>
            <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-foreground">
              Purpose
            </th>
            <th className="py-3 text-xs font-semibold uppercase tracking-widest text-foreground">
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-border/70 align-top">
              <td className="py-4 pr-4 font-mono text-xs font-semibold text-foreground">
                {row.name}
              </td>
              <td className="py-4 pr-4 leading-6 text-muted-foreground">{row.provider}</td>
              <td className="py-4 pr-4 leading-6 text-muted-foreground">{row.purpose}</td>
              <td className="py-4 leading-6 text-muted-foreground">{row.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function CookiePolicyPage({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <PageShell dict={dict} lang={lang}>
      {/* Hero */}
      <PageHero
        eyebrow="Legal"
        title={
          <>
            A cookie policy short enough to{" "}
            <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
              actually finish.
            </span>
          </>
        }
        description="Most cookie policies are long because the site is doing a lot you would object to. Ours is short: two first-party cookies, one analytics tool, no advertising trackers of any kind. Here is every single one, named."
        actions={
          <>
            <a
              href="#essential-cookies"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
            >
              See every cookie we set
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
            </a>
            <a
              href="#managing-cookies"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-6 text-sm font-semibold text-foreground shadow-xs backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted"
            >
              How to turn them off
            </a>
          </>
        }
        chips={[
          `Last updated ${COOKIE_POLICY_LAST_UPDATED}`,
          "No advertising cookies",
          "No cross-site tracking",
          "Analytics you can opt out of",
        ]}
      />

      {/* At a glance */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            The short version
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            What this site does, in four lines.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            This summary is written for people, not lawyers. The tables further down name every
            cookie behind it.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {AT_A_GLANCE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="group flex h-full gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-lg">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Policy body with sticky table of contents */}
      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-12">
            {/* Table of contents */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <Reveal>
                <nav
                  aria-label="Cookie policy contents"
                  className="rounded-2xl border border-border bg-card p-5 shadow-sm"
                >
                  <div className="text-[11px] font-bold uppercase tracking-widest text-primary">
                    Contents
                  </div>
                  <ol className="mt-4 space-y-1.5">
                    {SECTIONS.map((section, i) => (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          className="flex gap-2.5 rounded-md px-2 py-1.5 text-sm leading-snug text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                        >
                          <span className="font-mono text-xs text-border">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span>{section.title}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </Reveal>
            </aside>

            {/* Sections */}
            <div className="min-w-0 space-y-6">
              <Section id="what-are-cookies" index={1} title="What cookies are" icon={Cookie}>
                <p>
                  A cookie is a small text file that a website asks your browser to store on your
                  device. When you return, the browser sends it back, so the site can recognise the
                  same browser and remember something about it — a language choice, a login, or the
                  fact that a visit is continuing rather than starting fresh.
                </p>
                <p>
                  Cookies cannot read your hard drive, run programs, or carry viruses. What makes
                  them worth a policy is not the file itself but what a site chooses to record in
                  it, and who else gets to read it.
                </p>

                <SubHeading>The distinctions that matter</SubHeading>
                <Bullets
                  items={[
                    <>
                      <Term>First-party vs third-party.</Term> First-party cookies are set by the
                      site you are visiting. Third-party cookies are set by another domain
                      altogether, which is how tracking across unrelated websites usually works.
                    </>,
                    <>
                      <Term>Session vs persistent.</Term> Session cookies are deleted when you close
                      the browser. Persistent cookies survive until they expire or you delete them.
                    </>,
                    <>
                      <Term>Essential vs optional.</Term> Essential cookies are needed for the site
                      to do what you asked. Everything else — analytics, personalisation,
                      advertising — is optional, and in many jurisdictions requires your consent.
                    </>,
                  ]}
                />

                <SubHeading>Related technologies</SubHeading>
                <p>
                  <Term>Local storage</Term> serves a similar purpose but is not a cookie: it lives
                  in your browser and is never automatically transmitted with requests. We use it
                  for the AI assistant, and because people reasonably expect to find it on a page
                  like this, we document ours in section 2 alongside the cookies.
                </p>
                <p>
                  This policy covers <Term>zyverralabs.com</Term>. It sits alongside our{" "}
                  <a
                    href={`/${lang}/privacy`}
                    className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
                  >
                    Privacy Policy
                  </a>
                  , which explains everything else we do with personal data, and our{" "}
                  <a
                    href={`/${lang}/terms`}
                    className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
                  >
                    Terms &amp; Conditions
                  </a>
                  .
                </p>
              </Section>

              <Section
                id="essential-cookies"
                index={2}
                title="Essential cookies"
                icon={ShieldCheck}
              >
                <p>
                  Essential cookies make the site do what you asked it to. They set no advertising
                  profile, follow you nowhere, and under UK and EU rules they are exempt from
                  consent precisely because they are strictly necessary. There are two.
                </p>

                <CookieTable caption="Essential first-party cookies" rows={ESSENTIAL_COOKIES} />

                <p>
                  <Term>NEXT_LOCALE</Term> is written only when you actively pick a language from
                  the selector in the navigation bar. Until you do, we work out a sensible default
                  from your browser&rsquo;s own language setting and store nothing.
                </p>
                <p>
                  <Term>zyverra_admin</Term> is an internal staff cookie. It is issued only after a
                  successful login to our admin dashboard, it is <Term>HttpOnly</Term> so no
                  JavaScript can read it, it is marked <Term>Secure</Term> in production, it uses{" "}
                  <Term>SameSite=Lax</Term>, and it expires after 8 hours. If you are a visitor
                  rather than a member of our team, your browser will never receive it.
                </p>

                <SubHeading>Browser local storage</SubHeading>
                <p>
                  The AI assistant stores two entries in your browser&rsquo;s local storage. Neither
                  is a cookie, and neither is attached automatically to any request.
                </p>

                <CookieTable
                  caption="Browser local storage entries"
                  rows={LOCAL_STORAGE}
                  nameLabel="Key"
                />

                <p>
                  The session key is a random identifier generated in your browser. It is not linked
                  to your identity unless you tell the assistant who you are, and clearing your
                  browser storage removes it permanently — the only consequence is that the
                  assistant no longer remembers your earlier thread.
                </p>
              </Section>

              <Section id="analytics-cookies" index={3} title="Analytics cookies" icon={BarChart3}>
                <p>
                  We use <Term>Google Analytics 4</Term> to understand which pages people read, how
                  they arrive, and where the experience is slow. It is the only analytics tool on
                  this site, and it is <Term>opt-in</Term>: the script is not requested at all
                  until you accept it in the consent banner, so none of the cookies below exist
                  before then. It also runs <Term>only on the live production site</Term> —
                  development and preview builds send nothing regardless.
                </p>

                <CookieTable caption="Analytics cookies" rows={ANALYTICS_COOKIES} />

                <p>
                  These are set as first-party cookies on our own domain. The data behind them is
                  pseudonymous: we see sessions, page views, approximate location at country or city
                  level, device and browser type, and the referring site. We do not see who you are,
                  we do not try to reverse the identifier into an identity, and we never join
                  analytics data to an enquiry you send us.
                </p>
                <p>
                  Google Analytics 4 does not store full IP addresses in its reports. We use no
                  Google Signals, no demographic or interest reporting, and no advertising features,
                  so this data never becomes an ad audience.
                </p>

                <SubHeading>Turning analytics off</SubHeading>
                <Bullets
                  items={[
                    <>
                      <Term>Decline in the banner</Term>, or change your mind at any time from{" "}
                      <a
                        href="#managing-cookies"
                        className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
                      >
                        section 5
                      </a>
                      . Declining also deletes any analytics cookies already set in this browser.
                    </>,
                    <>
                      Install Google&rsquo;s official opt-out browser add-on at{" "}
                      <ExternalLinkInline href="https://tools.google.com/dlpage/gaoptout">
                        tools.google.com/dlpage/gaoptout
                      </ExternalLinkInline>
                      , which blocks measurement on every site you visit.
                    </>,
                    <>
                      Block analytics cookies or scripts in your browser settings or a content
                      blocker — see section 5.
                    </>,
                    <>
                      Use a browser with tracking prevention enabled, or send a Global Privacy
                      Control signal.
                    </>,
                  ]}
                />
                <Callout>
                  Blocking analytics costs you nothing. Every feature of this site works exactly the
                  same way with these cookies refused.
                </Callout>
              </Section>

              <Section id="marketing-cookies" index={4} title="Marketing cookies" icon={Megaphone}>
                <Callout>
                  <Term>We do not use marketing cookies.</Term> There is no advertising category on
                  this site, and therefore nothing in it for you to opt out of.
                </Callout>
                <p>
                  To be specific about what that rules out, this site carries none of the following:
                </p>
                <Bullets
                  items={[
                    <>
                      <Term>Advertising or conversion pixels</Term> — no Meta pixel, no LinkedIn
                      Insight Tag, no Google Ads remarketing tag, no TikTok or X pixel.
                    </>,
                    <>
                      <Term>Retargeting cookies</Term> — nothing that follows you to another site to
                      show you an advertisement for us.
                    </>,
                    <>
                      <Term>Cross-site tracking or data brokers</Term> — we do not build behavioural
                      profiles, and we do not buy, sell, or enrich visitor data.
                    </>,
                    <>
                      <Term>Affiliate or ad-network tags</Term> — we run no advertising on this site
                      and host no third-party ad code.
                    </>,
                  ]}
                />
                <p>
                  Because we neither sell nor share personal information for cross-context
                  behavioural advertising, a <Term>Global Privacy Control</Term> signal changes
                  nothing about how this site behaves — we already act as though it were always on.
                </p>
                <p>
                  If this ever changes, we will update this page before any such cookie is set, ask
                  for your consent first where the law requires it, and give you a way to withdraw
                  it just as easily.
                </p>
              </Section>

              <Section
                id="managing-cookies"
                index={5}
                title="Managing cookies"
                icon={SlidersHorizontal}
              >
                <p>
                  You are in control. Analytics cookies are set only if you accept them in the
                  consent banner, you can change that decision at any time right here, and every
                  cookie on this page can also be blocked or deleted from your own browser.
                </p>

                <SubHeading>Your analytics consent</SubHeading>
                <ConsentControl />
                <p>
                  We ask once, on your first visit, and we remember the answer so we do not ask
                  again. Declining is a single click and carries no penalty — nothing on this site
                  is gated behind accepting.
                </p>

                <SubHeading>In your browser settings</SubHeading>
                <p>
                  Every major browser lets you view stored cookies, delete them individually or in
                  bulk, block third-party cookies, or refuse all cookies from a specific site.
                  Current instructions from each vendor:
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {BROWSER_LINKS.map((browser) => (
                    <a
                      key={browser.name}
                      href={browser.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-background/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-sm"
                    >
                      <span className="text-sm font-semibold text-foreground">{browser.name}</span>
                      <ExternalLink
                        className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                        aria-hidden="true"
                      />
                    </a>
                  ))}
                </div>

                <SubHeading>Clearing local storage</SubHeading>
                <p>
                  Local storage is cleared separately from cookies in most browsers, usually under a
                  &ldquo;cookies and site data&rdquo; or &ldquo;clear browsing data&rdquo; option.
                  Clearing it removes your AI assistant session and saved project threads from this
                  device.
                </p>

                <SubHeading>Private browsing and content blockers</SubHeading>
                <p>
                  A private or incognito window discards cookies and site data when you close it. A
                  content blocker or privacy-focused browser will typically block the analytics
                  script before it ever runs.
                </p>

                <SubHeading>What you lose by blocking</SubHeading>
                <Bullets
                  items={[
                    <>
                      <Term>Analytics cookies</Term> — nothing at all. The site is identical without
                      them.
                    </>,
                    <>
                      <Term>NEXT_LOCALE</Term> — the site stops remembering your chosen language and
                      falls back to your browser&rsquo;s setting on each visit. You can still switch
                      language manually every time.
                    </>,
                    <>
                      <Term>Local storage</Term> — the AI assistant starts a fresh conversation
                      instead of restoring your previous thread.
                    </>,
                  ]}
                />
                <p>
                  No page, form, or feature on this site is gated behind accepting a cookie.
                </p>

                <SubHeading>How our banner behaves</SubHeading>
                <p>
                  Our consent banner has no pre-ticked boxes, no &ldquo;legitimate interest&rdquo;
                  toggles left on by default, and no dark patterns making refusal harder than
                  agreement — accept and decline are one click each, side by side, with equal
                  weight. Until you choose, nothing optional runs.
                </p>
                <p>
                  If we ever add a non-essential cookie beyond the ones listed on this page, we will
                  document it here and ask for your consent again before it is set.
                </p>
              </Section>

              <Section
                id="third-party-cookies"
                index={6}
                title="Third-party cookies"
                icon={Globe2}
              >
                <p>
                  A third-party cookie is one set by a domain other than the site you are on. This
                  site sets none for advertising. The only external party involved in cookies here
                  is Google, through Analytics.
                </p>

                <SubHeading>Google Analytics</SubHeading>
                <p>
                  The <Term>_ga</Term> cookies described in section 3 are written as first-party
                  cookies on our domain, but the data is processed by Google as our analytics
                  provider. Their handling is governed by{" "}
                  <ExternalLinkInline href="https://policies.google.com/privacy">
                    Google&rsquo;s Privacy Policy
                  </ExternalLinkInline>{" "}
                  and their{" "}
                  <ExternalLinkInline href="https://business.safety.google/privacy/">
                    business data terms
                  </ExternalLinkInline>
                  .
                </p>

                <SubHeading>Other services we use, which set no cookies here</SubHeading>
                <p>
                  Several providers support this site without placing anything in your browser. They
                  are listed in full, with what each one processes, in our{" "}
                  <a
                    href={`/${lang}/privacy`}
                    className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
                <Bullets
                  items={[
                    <>
                      <Term>Vercel</Term> hosts the site and keeps operational request logs
                      server-side.
                    </>,
                    <>
                      <Term>OpenAI</Term> powers the AI assistant&rsquo;s replies via a server-side
                      API call — the request goes from our server, not from your browser.
                    </>,
                    <>
                      <Term>Resend</Term> delivers enquiry notifications to our own inbox. It sets
                      nothing on this site, and we use no tracking pixels in the emails we send you.
                    </>,
                    <>
                      <Term>Neon / PostgreSQL</Term> stores enquiries and assistant conversations.
                      It is reachable only from our server.
                    </>,
                  ]}
                />

                <SubHeading>Links to other sites</SubHeading>
                <p>
                  Our footer links to profiles such as LinkedIn, and articles may link to external
                  sites. Once you follow a link you are on someone else&rsquo;s domain, under their
                  cookie policy, and we have no control over what they set. We suggest reading the
                  policy of any site you are not familiar with.
                </p>

                <SubHeading>Client products we build</SubHeading>
                <p>
                  This policy covers zyverralabs.com only. Software we design and build for clients
                  runs under the client&rsquo;s own cookie and privacy policies, and they decide
                  what those products set.
                </p>
              </Section>

              <Section id="contact" index={7} title="Contact information" icon={Mail}>
                <p>
                  Questions about a specific cookie, a request to delete data associated with one,
                  or a correction to this page — all go to the same place, and a person reads every
                  one.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-border bg-background/60 p-4">
                    <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                      Legal entity
                    </div>
                    <div className="mt-1.5 text-sm font-semibold text-foreground">
                      {LEGAL_ENTITY}
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-background/60 p-4">
                    <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                      Email
                    </div>
                    <div className="mt-1.5 text-sm">
                      <MailLink />
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-background/60 p-4">
                    <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                      Website
                    </div>
                    <div className="mt-1.5 text-sm font-semibold text-foreground">
                      zyverralabs.com
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-background/60 p-4">
                    <div className="text-xs font-semibold uppercase tracking-widest text-primary">
                      Response time
                    </div>
                    <div className="mt-1.5 text-sm font-semibold text-foreground">
                      Within 30 days
                    </div>
                  </div>
                </div>

                <SubHeading>Updates to this policy</SubHeading>
                <p>
                  We will update this page whenever the cookies on this site change. The effective
                  date at the top always reflects the current version, and any new non-essential
                  cookie will be documented here before it is set.
                </p>
                <p>
                  To exercise a data access, correction, or deletion right, see the{" "}
                  <a
                    href={`/${lang}/privacy`}
                    className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
                  >
                    Privacy Policy
                  </a>
                  . To talk about a project instead, start from the{" "}
                  <a
                    href={`/${lang}#contact`}
                    className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
                  >
                    contact section
                  </a>
                  .
                </p>
              </Section>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-border bg-gradient-to-b from-primary/[0.05] to-background">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 md:py-24">
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-widest text-primary">
              Still have a question?
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Ask us about any cookie here.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              If something on this page is unclear, or you think we have missed one, tell us and we
              will fix it.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Cookie%20policy%20question`}
              className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
            >
              Email {CONTACT_EMAIL}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
            </a>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
