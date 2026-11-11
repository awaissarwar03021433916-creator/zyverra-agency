import type { ReactNode } from "react";
import { BarChart3, Cookie, Globe2, Mail, Megaphone, RefreshCw, ShieldCheck, SlidersHorizontal } from "lucide-react";

import { PageHero } from "./PageHero";
import { CookieControls } from "@/components/analytics/CookieControls";
import { CookieSettingsButton } from "@/components/analytics/CookieSettingsButton";
import { business } from "@/config/business";
import { routes } from "@/config/site";

export const COOKIE_POLICY_LAST_UPDATED = "11 November 2026";

type Row = { name: string; provider: string; purpose: string; duration: string; type: string };

const NECESSARY: Row[] = [
  {
    name: "zyverra_cookie_consent",
    provider: "Zyverra Labs",
    purpose: "Remembers your cookie choices",
    duration: "Until you clear it",
    type: "Local storage",
  },
  {
    name: "Chat session identifier",
    provider: "Zyverra Labs",
    purpose: "Keeps your AI assistant conversation across page loads",
    duration: "Until you clear it",
    type: "Local storage",
  },
  {
    name: "Admin session",
    provider: "Zyverra Labs",
    purpose: "Signs our own staff into the internal dashboard (never set for visitors)",
    duration: "Session",
    type: "Cookie",
  },
];

const STATISTICS: Row[] = [
  {
    name: "Vercel Web Analytics",
    provider: "Vercel",
    purpose: "Counts page views in aggregate — no cookies and no cross-site identifier",
    duration: "None stored on your device",
    type: "Script (cookieless)",
  },
];

const MARKETING: Row[] = [
  {
    name: "_ga, _ga_<ID>",
    provider: "Google Analytics 4",
    purpose: "Measures visits and marketing performance",
    duration: "Up to 2 years",
    type: "Cookie",
  },
  {
    name: "_fbp, _fbc",
    provider: "Meta Pixel",
    purpose: "Measures whether Facebook and Instagram ads lead to enquiries",
    duration: "Up to 90 days",
    type: "Cookie",
  },
];

function PolicySection({ id, title, icon: Icon, children }: { id: string; title: string; icon: typeof Cookie; children: ReactNode }) {
  return (
    <section id={id} className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon aria-hidden className="h-5 w-5" />
        </span>
        <h2 className="font-heading text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{title}</h2>
      </div>
      <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">{children}</div>
    </section>
  );
}

function CookieTable({ rows, caption }: { rows: Row[]; caption: string }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-border bg-secondary/50 text-foreground">
            <th scope="col" className="px-4 py-3 font-semibold">Name</th>
            <th scope="col" className="px-4 py-3 font-semibold">Provider</th>
            <th scope="col" className="px-4 py-3 font-semibold">Purpose</th>
            <th scope="col" className="px-4 py-3 font-semibold">Duration</th>
            <th scope="col" className="px-4 py-3 font-semibold">Type</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name} className="border-b border-border last:border-0">
              <th scope="row" className="px-4 py-3 font-mono text-xs font-medium text-foreground">{r.name}</th>
              <td className="px-4 py-3">{r.provider}</td>
              <td className="px-4 py-3">{r.purpose}</td>
              <td className="px-4 py-3">{r.duration}</td>
              <td className="px-4 py-3">{r.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const link = "font-semibold text-primary underline-offset-4 hover:underline";

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Cookie Policy"
        description="Which cookies and similar technologies this site uses, why, and how to change your choice at any time."
        chips={[`Last updated ${COOKIE_POLICY_LAST_UPDATED}`, "Marketing off by default", "Equal Accept and Reject"]}
      />

      <div className="mx-auto max-w-4xl space-y-6 px-4 py-16 sm:px-6 md:py-20">
        <div>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">Your current settings</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Changes apply immediately. You can also reopen the banner at any time with{" "}
            <CookieSettingsButton className={link}>Cookie settings</CookieSettingsButton>.
          </p>
          <div className="mt-5">
            <CookieControls />
          </div>
        </div>

        <PolicySection id="what-are-cookies" title="What cookies are" icon={Cookie}>
          <p>
            Cookies are small text files a website stores on your device. Similar technologies, such as browser
            local storage and measurement scripts, work in a comparable way. UK law (the Privacy and Electronic
            Communications Regulations, PECR, as amended by the Data (Use and Access) Act 2025) says which of
            these need your consent. We group ours into three categories.
          </p>
        </PolicySection>

        <PolicySection id="strictly-necessary" title="Strictly necessary — always on" icon={ShieldCheck}>
          <p>These make the site work and remember your choices. They are not used to track you across sites.</p>
          <CookieTable rows={NECESSARY} caption="Strictly necessary storage" />
        </PolicySection>

        <PolicySection id="statistics" title="Statistics — on unless you opt out" icon={BarChart3}>
          <p>
            We use <strong className="text-foreground">Vercel Web Analytics</strong>, a first-party, cookieless
            tool, to count visits in aggregate so we know which pages are useful. It does not set cookies, does
            not build a profile of you and is not used for advertising.
          </p>
          <p>
            Under the statistical-purposes exemption introduced by the Data (Use and Access) Act 2025 (in force
            since 5 February 2026), this may run without consent provided it is clearly explained and you can
            object simply and free of charge. To object, tick &ldquo;Opt out of statistics&rdquo; above or in the
            cookie banner.
          </p>
          <CookieTable rows={STATISTICS} caption="Statistics" />
        </PolicySection>

        <PolicySection id="marketing" title="Marketing — off unless you press Accept" icon={Megaphone}>
          <p>
            <strong className="text-foreground">Google Analytics 4</strong> and the{" "}
            <strong className="text-foreground">Meta Pixel</strong> never load before you press Accept, and only
            run on the live site. If you press Reject, or change your mind later, they stop loading and the
            cookies they set are deleted from this site.
          </p>
          <CookieTable rows={MARKETING} caption="Marketing cookies" />
          {/* TODO [CONFIRM]: remove the Meta Pixel row if NEXT_PUBLIC_META_PIXEL_ID is never set. */}
        </PolicySection>

        <PolicySection id="managing" title="Managing cookies" icon={SlidersHorizontal}>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              Use <CookieSettingsButton className={link}>Cookie settings</CookieSettingsButton> (also in the footer
              of every page) to Accept or Reject marketing cookies at any time.
            </li>
            <li>Tick &ldquo;Opt out of statistics&rdquo; to stop aggregate visit counting on this browser.</li>
            <li>Every browser also lets you block or delete cookies and clear site storage.</li>
          </ul>
        </PolicySection>

        <PolicySection id="third-parties" title="Third-party services" icon={Globe2}>
          <p>
            Vercel hosts the site and keeps short-lived operational request logs. Links to WhatsApp, Instagram,
            LinkedIn and GitHub take you to those services, which apply their own cookie policies once you are
            there. Our{" "}
            <a href={routes.privacy} className={link}>
              Privacy Policy
            </a>{" "}
            lists every provider that processes personal data.
          </p>
        </PolicySection>

        <PolicySection id="changes" title="Changes to this policy" icon={RefreshCw}>
          <p>
            If we add or change a cookie in a way that affects your choices, we will update this page and ask
            again for your consent where needed.
          </p>
        </PolicySection>

        <PolicySection id="contact" title="Contact" icon={Mail}>
          <p>
            Questions about cookies:{" "}
            <a href={`mailto:${business.email}`} className={link}>
              {business.email}
            </a>
            . To complain about how we handle personal data, see our{" "}
            <a href={routes.complaints} className={link}>
              complaints page
            </a>
            .
          </p>
        </PolicySection>
      </div>
    </>
  );
}
