"use client";

import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Clock,
  Cookie,
  Database,
  Eye,
  FileText,
  Globe2,
  Handshake,
  KeyRound,
  Lock,
  Mail,
  RefreshCw,
  Scale,
  Server,
  ShieldCheck,
  UserCheck,
  Users,
} from "lucide-react";

import { business } from "@/config/business";
import { routes } from "@/config/site";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";

// Human-readable effective date. Update this whenever the policy text changes —
// it is also surfaced in the page metadata and in the hero chips.
export const PRIVACY_LAST_UPDATED = "11 November 2026";

// TODO [CONFIRM]: the registered legal entity name, if different from the trading name.
const LEGAL_ENTITY = "Zyverra Labs";
const PRIVACY_EMAIL = business.email;

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

// Short, plain-language promises shown above the legal text so a visitor can
// understand our position in ten seconds without reading the full policy.
const AT_A_GLANCE = [
  {
    icon: ShieldCheck,
    title: "We never sell your data",
    description:
      "We do not sell, rent, or trade personal information. Advertising and marketing tags (Google Analytics and the Meta Pixel) only load if you accept marketing cookies.",
  },
  {
    icon: Database,
    title: "We collect the minimum",
    description:
      "We ask only for what an enquiry genuinely needs: your name, email, clinic name, town and what you want help with. Nothing on this site requires an account.",
  },
  {
    icon: UserCheck,
    title: "You stay in control",
    description:
      "Under UK GDPR you can request a copy of your data, ask us to correct it, or ask us to delete it entirely. One email to our team is enough — no forms, no friction.",
  },
  {
    icon: Lock,
    title: "Security is engineered in",
    description:
      "Encrypted transport, validated inputs, least-privilege access, and secrets kept out of the codebase. The same standard we apply to the software we build for clients.",
  },
];

// Sub-processors we rely on to run the site and the business. Kept explicit so
// visitors can see exactly who touches their data and why.
const SUBPROCESSORS = [
  {
    name: "Vercel",
    purpose: "Website hosting, edge delivery, and server-side rendering",
    data: "IP address, user agent, request metadata in operational logs",
    region: "United States / global edge network",
  },
  {
    name: "Neon / PostgreSQL",
    purpose: "Managed database for enquiries, leads, and assistant conversations",
    data: "Contact details and message content you submit",
    region: "Configured cloud region",
  },
  {
    name: "OpenAI",
    purpose: "Powers the AI assistant's replies and enquiry summarisation",
    data: "Assistant message content and any details you type into the chat",
    region: "United States",
  },
  {
    name: "Resend",
    purpose: "Delivers enquiry notification emails to our team",
    data: "Your name, email address, and enquiry message",
    region: "United States",
  },
  {
    name: "Vercel Web Analytics",
    purpose: "First-party, cookieless, aggregate visit statistics (you can opt out)",
    data: "Page views, referrer, country, device and browser type — no cookies, no cross-site identifier",
    region: "United States / global edge network",
  },
  {
    name: "Google Analytics 4",
    purpose: "Marketing measurement — only if you accept marketing cookies",
    data: "Pseudonymous usage events, truncated IP address, device and referrer data",
    region: "United States / EU",
  },
  {
    name: "Meta (Meta Pixel)",
    purpose: "Advertising measurement — only if you accept marketing cookies",
    data: "Pseudonymous browsing events on this site, device and browser data",
    region: "United States / Ireland",
  },
  {
    name: "WhatsApp (Meta)",
    purpose: "Messages you choose to send us on WhatsApp",
    data: "Your phone number, WhatsApp profile name and the messages you send",
    region: "United States / global",
  },
];
// TODO [CONFIRM]: confirm this processor list is complete and accurate (including the
// database region), and remove the Meta Pixel row if the Pixel is never enabled.

// GDPR-style rights. Presented alongside the US (CCPA/CPRA) equivalents below
// so neither audience has to translate the other's terminology.
const GDPR_RIGHTS = [
  {
    title: "Access",
    description: "Ask us to confirm what personal data we hold about you and receive a copy of it.",
  },
  {
    title: "Rectification",
    description: "Ask us to correct information that is inaccurate or incomplete.",
  },
  {
    title: "Erasure",
    description:
      "Ask us to delete your personal data where we have no overriding legal or contractual reason to keep it.",
  },
  {
    title: "Restriction",
    description:
      "Ask us to pause processing while an accuracy dispute or objection is being resolved.",
  },
  {
    title: "Portability",
    description:
      "Receive the data you gave us in a structured, machine-readable format, or have it sent to another provider.",
  },
  {
    title: "Objection",
    description:
      "Object to processing we carry out under legitimate interests, including any direct marketing.",
  },
  {
    title: "Withdraw consent",
    description:
      "Withdraw consent at any time where consent is the basis we rely on. This does not affect processing already carried out.",
  },
  {
    title: "Complain",
    description:
      "Complain to us first (see our complaints page), and you can always complain to the Information Commissioner's Office (ICO) at ico.org.uk/make-a-complaint.",
  },
];

const CCPA_RIGHTS = [
  {
    title: "Right to know",
    description:
      "Request the categories and specific pieces of personal information we have collected about you, the sources, and the purposes.",
  },
  {
    title: "Right to delete",
    description:
      "Request deletion of personal information we collected from you, subject to the exceptions the statute allows.",
  },
  {
    title: "Right to correct",
    description: "Request correction of inaccurate personal information we maintain about you.",
  },
  {
    title: "Right to opt out",
    description:
      "Opt out of the sale or sharing of personal information. We never sell it; advertising tags load only if you accept marketing cookies, and pressing Reject is your opt-out.",
  },
  {
    title: "Right to limit",
    description:
      "Limit the use of sensitive personal information. We do not collect sensitive personal information through this website.",
  },
  {
    title: "Right to non-discrimination",
    description:
      "Exercise any of these rights without receiving a different price, quality, or level of service from us.",
  },
];

// Section registry — drives both the sticky table of contents and the rendered
// order, so the two can never drift apart.
const SECTIONS = [
  { id: "scope", title: "Who we are and what this covers", icon: FileText },
  { id: "information-we-collect", title: "Information we collect", icon: Database },
  { id: "how-we-use", title: "How and why we use it", icon: Scale },
  { id: "cookies", title: "Cookies and local storage", icon: Cookie },
  { id: "analytics", title: "Analytics", icon: BarChart3 },
  { id: "ai-assistant", title: "The AI assistant and automated processing", icon: Bot },
  { id: "third-parties", title: "Third-party services and sub-processors", icon: Server },
  { id: "client-data", title: "Client project data and our role as processor", icon: Handshake },
  { id: "transfers", title: "International data transfers", icon: Globe2 },
  { id: "retention", title: "How long we keep data", icon: Clock },
  { id: "security", title: "How we protect your data", icon: KeyRound },
  { id: "your-rights", title: "Your privacy rights", icon: UserCheck },
  { id: "children", title: "Children's privacy", icon: Users },
  { id: "signals", title: "Do Not Track and Global Privacy Control", icon: Eye },
  { id: "changes", title: "Changes to this policy", icon: RefreshCw },
  { id: "contact", title: "How to contact us", icon: Mail },
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
  return (
    <h3 className="pt-2 text-sm font-semibold tracking-tight text-foreground">{children}</h3>
  );
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
      href={`mailto:${PRIVACY_EMAIL}`}
      className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
    >
      {PRIVACY_EMAIL}
    </a>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Privacy policy built on{" "}
            <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
              restraint, not fine print.
            </span>
          </>
        }
        description="Zyverra Labs builds websites and marketing for UK clinics, and AI and custom software — work that only earns trust if we treat data properly, starting with our own. This policy explains exactly what we collect, why, who processes it, and the control you keep over it."
        actions={
          <>
            <a
              href={`mailto:${PRIVACY_EMAIL}?subject=Privacy%20request`}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
            >
              Make a privacy request
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
            </a>
            <a
              href="#scope"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-6 text-sm font-semibold text-foreground shadow-xs backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted"
            >
              Read the policy
            </a>
          </>
        }
        chips={[
          `Last updated ${PRIVACY_LAST_UPDATED}`,
          "UK GDPR aligned",
          "CCPA / CPRA aligned",
          "No data selling",
        ]}
      />

      {/* At a glance */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            The short version
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Four commitments, before the legal detail.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            This summary is written for people, not lawyers. It does not replace the full policy
            below, but nothing below contradicts it.
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
                  aria-label="Privacy policy contents"
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
              <Section id="scope" index={1} title="Who we are and what this covers" icon={FileText}>
                <p>
                  <Term>{LEGAL_ENTITY}</Term> (&ldquo;Zyverra Labs&rdquo;, &ldquo;we&rdquo;,
                  &ldquo;us&rdquo;) based in Lahore, Pakistan, builds websites, admin dashboards,
                  local SEO, AI search visibility, Meta ads and AI chatbots for UK aesthetics
                  clinics and beauty salons, and custom software for other businesses. We are the
                  data controller for the personal information described in this policy, and you
                  can reach us at any time at <MailLink />.
                </p>
                <p>
                  This policy applies to <Term>zyverralabs.com</Term> and to the enquiry form, AI
                  assistant, email and WhatsApp channels we operate from it. It explains what we do with information about
                  visitors, prospective clients, and people who contact us.
                </p>
                <p>
                  It does <Term>not</Term> cover the data inside systems we build and operate on
                  behalf of a client — in those engagements the client is the controller and their
                  own privacy notice governs. Section 8 explains that relationship. It also does not
                  cover third-party sites we link to, each of which has its own policy.
                </p>
                <p>
                  This policy takes effect on {PRIVACY_LAST_UPDATED} and replaces any earlier
                  version.
                </p>
              </Section>

              <Section
                id="information-we-collect"
                index={2}
                title="Information we collect"
                icon={Database}
              >
                <p>
                  We group what we collect by how it reaches us. Everything in the first two groups
                  is information you actively choose to give us.
                </p>

                <SubHeading>Information you give us through the enquiry form</SubHeading>
                <Bullets
                  items={[
                    <>
                      <Term>Your name and email address</Term>, so we know who you are and can
                      reply.
                    </>,
                    <>
                      <Term>Your clinic details and message</Term> — your clinic or salon name, town or
                      city, current website (optional), the services you are interested in, and what
                      you want to discuss.
                    </>,
                  ]}
                />

                <SubHeading>Information you give us on WhatsApp</SubHeading>
                <p>
                  If you message us on WhatsApp, we receive your phone number, your WhatsApp
                  profile name and the messages you send. WhatsApp is operated by Meta under its
                  own terms and privacy policy.
                </p>

                <SubHeading>Information you give us through the AI assistant</SubHeading>
                <Bullets
                  items={[
                    <>
                      <Term>The messages you type</Term> into the assistant, and the replies it
                      generates, stored as a conversation thread.
                    </>,
                    <>
                      <Term>Project qualification details</Term> you volunteer during that
                      conversation — such as business type, project type, indicative budget,
                      timeline, and an optional phone number.
                    </>,
                    <>
                      <Term>An anonymous session identifier</Term>, generated in your browser, that
                      lets the assistant remember your thread across page loads. It is not linked to
                      your identity unless you tell the assistant who you are.
                    </>,
                  ]}
                />
                <p>
                  The assistant is a sales and scoping tool. Please do not paste passwords, payment
                  card numbers, health information, government identifiers, or confidential
                  third-party material into it. If you do so by accident, email us and we will
                  delete it.
                </p>

                <SubHeading>Information collected automatically</SubHeading>
                <Bullets
                  items={[
                    <>
                      <Term>Server and security logs</Term>, which record the request path, method,
                      response status, timestamp, and the requesting IP address. We use these to
                      keep the site available and to enforce rate limits against abuse.
                    </>,
                    <>
                      <Term>Aggregate analytics events</Term> — pages viewed, approximate location
                      at country or city level, device and browser type, and the referring site.
                      See section 5.
                    </>,
                    <>
                      <Term>Local storage entries</Term> set by your own browser to keep your
                      assistant session and saved project threads. See section 4.
                    </>,
                  ]}
                />

                <SubHeading>Information we do not collect</SubHeading>
                <p>
                  This site has no user accounts, no passwords, and no payment processing. We do not
                  collect special-category or sensitive personal data, advertising and measurement tags
                  (Google Analytics, the Meta Pixel) only load after you accept marketing cookies,
                  and we do not buy contact lists or enrich your record from
                  data brokers.
                </p>
              </Section>

              <Section id="how-we-use" index={3} title="How and why we use it" icon={Scale}>
                <p>
                  We only process personal data where we have a lawful basis to do so. Under the UK GDPR
                  (and the EU GDPR for visitors in the EU and EEA), those bases are set out below.
                </p>
                <Bullets
                  items={[
                    <>
                      <Term>To respond to your enquiry</Term> and scope potential work — necessary
                      to take steps at your request prior to entering a contract
                      (Art. 6(1)(b)).
                    </>,
                    <>
                      <Term>To deliver and support engagements</Term> you have signed with us —
                      performance of a contract (Art. 6(1)(b)).
                    </>,
                    <>
                      <Term>To operate, secure, and debug the website</Term>, including rate
                      limiting and abuse prevention — our legitimate interest in running a safe,
                      functioning service (Art. 6(1)(f)).
                    </>,
                    <>
                      <Term>To count visits in aggregate</Term> with cookieless, first-party statistics —
                      our legitimate interest in understanding which pages are useful (Art. 6(1)(f)),
                      relying on the statistical-purposes exemption in PECR as amended by the Data
                      (Use and Access) Act 2025. You can opt out at any time.
                    </>,
                    <>
                      <Term>To measure marketing and advertising</Term> with Google Analytics and the
                      Meta Pixel — your consent, given by pressing Accept in our cookie banner and
                      withdrawable at any time (Art. 6(1)(a)).
                    </>,
                    <>
                      <Term>To triage and prioritise enquiries</Term> using automated summarisation
                      and scoring of the details you provided — legitimate interest in responding
                      efficiently (Art. 6(1)(f)). See section 6 for the safeguards.
                    </>,
                    <>
                      <Term>To meet legal, tax, and accounting obligations</Term> and to establish or
                      defend legal claims — legal obligation and legitimate interest
                      (Art. 6(1)(c) and 6(1)(f)).
                    </>,
                  ]}
                />
                <p>
                  We do not use your information for automated advertising profiles, and we will not
                  add you to a marketing list from an enquiry alone. If we ever introduce a
                  newsletter, it will be opt-in with a one-click unsubscribe.
                </p>
              </Section>

              <Section id="cookies" index={4} title="Cookies and local storage" icon={Cookie}>
                <p>
                  We use three categories. Our{" "}
                  <a href={routes.cookies} className="font-semibold text-primary underline-offset-4 transition-colors hover:underline">
                    Cookie Policy
                  </a>{" "}
                  lists each item in detail, and you can change your choice at any time from the
                  &ldquo;Cookie settings&rdquo; link in the footer.
                </p>
                <SubHeading>Strictly necessary</SubHeading>
                <p>
                  Your cookie choice is remembered in your browser&rsquo;s local storage, the AI
                  assistant keeps a random session identifier there, and an administrator session
                  cookie exists only for our own internal dashboard. None of these track you across
                  sites, and they are always on.
                </p>
                <SubHeading>Statistics</SubHeading>
                <p>
                  Vercel Web Analytics counts visits in aggregate. It sets no cookies and builds no
                  cross-site profile. It runs by default under the statistical-purposes exemption in
                  PECR (as amended by the Data (Use and Access) Act 2025), and you can opt out free of
                  charge using the &ldquo;Opt out of statistics&rdquo; box in the cookie banner or on
                  our Cookie Policy page.
                </p>
                <SubHeading>Marketing</SubHeading>
                <p>
                  Google Analytics 4 and the Meta Pixel are off by default. They load only after you
                  press Accept, only on the live site, and withdrawing consent deletes the cookies
                  they set.
                </p>
              </Section>

              <Section id="analytics" index={5} title="Analytics" icon={BarChart3}>
                <p>
                  <Term>Statistics (Vercel Web Analytics).</Term> We see aggregate numbers — page
                  views, referring sites, country, device and browser type — so we know which pages
                  are useful. No cookies are set and no individual is identified. Opt out at any time
                  in the cookie banner or on our Cookie Policy page.
                </p>
                <p>
                  <Term>Marketing (Google Analytics 4 and the Meta Pixel).</Term> Only if you press
                  Accept. Google Analytics 4 truncates IP addresses and does not store them in
                  reports. The Meta Pixel lets us measure whether our Facebook and Instagram ads lead
                  to enquiries. Neither is used to identify you or matched to your enquiry by us.
                </p>
                <SubHeading>How to opt out</SubHeading>
                <Bullets
                  items={[
                    <>Press Reject in the cookie banner, or reopen it from &ldquo;Cookie settings&rdquo; in the footer.</>,
                    <>Tick &ldquo;Opt out of statistics&rdquo; to stop aggregate visit counting on your browser.</>,
                    <>Block cookies or scripts in your browser or extension settings.</>,
                  ]}
                />
              </Section>

              <Section
                id="ai-assistant"
                index={6}
                title="The AI assistant and automated processing"
                icon={Bot}
              >
                <p>
                  Building AI systems is our work, so we hold our own to the standard we would
                  expect of a client&rsquo;s. Here is precisely how ours behaves.
                </p>
                <Bullets
                  items={[
                    <>
                      <Term>Where your messages go.</Term> The assistant is powered by OpenAI models.
                      Your messages, together with a short instruction prompt and relevant excerpts
                      from our own service knowledge base, are sent to OpenAI&rsquo;s API to generate
                      each reply.
                    </>,
                    <>
                      <Term>Training.</Term> We use OpenAI&rsquo;s business API, under which data
                      submitted through the API is not used to train their models. We do not train
                      any model of our own on your conversations.
                    </>,
                    <>
                      <Term>What we store.</Term> Conversation threads, and any contact or project
                      details you volunteer, are stored in our database so we can pick up the
                      conversation where you left it and prepare a useful reply.
                    </>,
                    <>
                      <Term>Automated summarisation and scoring.</Term> We generate a short summary
                      and a priority indication from the details you provided, purely to help a
                      human decide what to read first.
                    </>,
                    <>
                      <Term>No decisions with legal effect.</Term> No automated decision produces a
                      legal or similarly significant effect on you within the meaning of GDPR
                      Art. 22. Every reply that matters — whether we take on a project, on what
                      terms, at what price — is made by a person.
                    </>,
                    <>
                      <Term>Accuracy.</Term> Language models can be confidently wrong. Nothing the
                      assistant says is a quote, a commitment, or professional advice until a person
                      from our team confirms it in writing.
                    </>,
                  ]}
                />
                <p>
                  You can ask us to delete an assistant conversation at any time by emailing{" "}
                  <MailLink /> with the approximate date of the chat.
                </p>
              </Section>

              <Section
                id="third-parties"
                index={7}
                title="Third-party services and sub-processors"
                icon={Server}
              >
                <p>
                  We use a small, deliberate set of providers to run the site and the business. Each
                  is bound by its own contractual data-protection terms, receives only the data it
                  needs, and processes it on our instructions.
                </p>
                <div className="-mx-6 overflow-x-auto px-6 sm:-mx-8 sm:px-8">
                  <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                          Provider
                        </th>
                        <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                          Purpose
                        </th>
                        <th className="py-3 pr-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                          Data involved
                        </th>
                        <th className="py-3 text-xs font-semibold uppercase tracking-widest text-foreground">
                          Processing region
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {SUBPROCESSORS.map((p) => (
                        <tr key={p.name} className="border-b border-border/70 align-top">
                          <td className="py-4 pr-4 font-semibold text-foreground">{p.name}</td>
                          <td className="py-4 pr-4 leading-6 text-muted-foreground">{p.purpose}</td>
                          <td className="py-4 pr-4 leading-6 text-muted-foreground">{p.data}</td>
                          <td className="py-4 leading-6 text-muted-foreground">{p.region}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p>
                  Beyond these, we disclose personal data only where the law requires it — a valid
                  legal request, a regulatory obligation, or the need to establish or defend a legal
                  claim — or where it is necessary to protect the rights and safety of our users. If
                  our business is ever restructured or acquired, personal data may transfer as part
                  of that transaction, and this policy will continue to apply until you are given
                  notice of any change.
                </p>
              </Section>

              <Section
                id="client-data"
                index={8}
                title="Client project data and our role as processor"
                icon={Handshake}
              >
                <p>
                  When we design, build, or operate software for a client — a SaaS platform, an
                  automation pipeline, an AI voice agent, or a custom application — the client is
                  the <Term>controller</Term> of the personal data flowing through that system and
                  we act as a <Term>processor</Term> on their documented instructions.
                </p>
                <Bullets
                  items={[
                    <>
                      We process client data only to deliver the agreed engagement: building,
                      testing, debugging, migrating, and supporting the system.
                    </>,
                    <>
                      We work against anonymised, synthetic, or minimised datasets wherever it is
                      practical, and we ask for production access only when a task genuinely
                      requires it.
                    </>,
                    <>
                      Access is least-privilege and time-bound. Credentials live in managed secret
                      stores, never in the codebase or in chat.
                    </>,
                    <>
                      We enter a data processing agreement where one is required, engage
                      sub-processors only with the client&rsquo;s agreement, and support the client
                      in answering requests from their own users.
                    </>,
                    <>
                      At the end of an engagement we return or delete client data on request, apart
                      from records we must retain for legal or accounting purposes.
                    </>,
                  ]}
                />
                <p>
                  If you are an end user of a product we built for someone else, please direct your
                  privacy request to that organisation. If you send it to us, we will forward it to
                  them.
                </p>
              </Section>

              <Section id="transfers" index={9} title="International data transfers" icon={Globe2}>
                <p>
                  We are based in Lahore, Pakistan, so personal data you send us is accessed and
                  processed in Pakistan. Several of the providers listed in section 7 are based in the
                  United States. Personal data may therefore be processed outside the UK, in
                  countries whose data-protection laws differ from UK law.
                </p>
                <p>
                  Where personal data is transferred out of the UK, we rely on the UK International
                  Data Transfer Agreement or the International Data Transfer Addendum to the EU
                  Standard Contractual Clauses in our agreements with providers, alongside the
                  security measures described in section 11. You can ask for details of the
                  safeguards for a specific transfer by emailing <MailLink />.
                </p>
                {/* TODO [CONFIRM]: the named processors and the transfer mechanism used with each. */}
              </Section>

              <Section id="retention" index={10} title="How long we keep data" icon={Clock}>
                <p>
                  We keep personal data only as long as it serves the purpose it was collected for,
                  then delete it. Our working periods are:
                </p>
                <Bullets
                  items={[
                    <>
                      <Term>Enquiries that do not become projects</Term> — up to 24 months from the
                      last contact, so we have context if you come back to us.
                    </>,
                    <>
                      <Term>AI assistant conversations</Term> — up to 12 months from the last
                      message, unless linked to an active engagement.
                    </>,
                    <>
                      <Term>Client and project records</Term> — for the life of the engagement and
                      then as long as required by contract, tax, and accounting law, typically six
                      to seven years.
                    </>,
                    <>
                      <Term>Server and security logs</Term> — a short rolling window, normally under
                      90 days, unless a specific security investigation requires longer.
                    </>,
                    <>
                      <Term>Analytics data</Term> — retained according to the retention period
                      configured in Google Analytics 4, after which it is deleted by Google.
                    </>,
                  ]}
                />
                <p>
                  You can ask us to delete your data sooner. We will do so unless we have an
                  overriding legal obligation to keep a specific record, in which case we will tell
                  you what we are keeping and why.
                </p>
              </Section>

              <Section id="security" index={11} title="How we protect your data" icon={KeyRound}>
                <p>
                  Security is treated as a feature of the product, not a task before launch. The
                  measures protecting this site are the same ones we build into client systems.
                </p>
                <Bullets
                  items={[
                    <>
                      <Term>Encryption in transit</Term> via HTTPS/TLS across the site and every API
                      call, with encryption at rest on our managed database.
                    </>,
                    <>
                      <Term>Strict input validation</Term> on every endpoint, with typed, schema-
                      validated payloads rejected at the boundary before they reach any logic.
                    </>,
                    <>
                      <Term>Parameterised database access</Term> through an ORM, which removes entire
                      classes of injection vulnerability by construction.
                    </>,
                    <>
                      <Term>Rate limiting and abuse controls</Term> on public endpoints such as the
                      contact form and the assistant.
                    </>,
                    <>
                      <Term>Least-privilege access</Term> to production systems, with an
                      authenticated internal dashboard and credentials held in managed secret
                      storage, never committed to source control.
                    </>,
                    <>
                      <Term>Hardened response headers</Term> and dependency updates as part of
                      routine maintenance.
                    </>,
                  ]}
                />
                <p>
                  No system on the internet is perfectly secure, and we will not pretend otherwise.
                  If a breach ever affects your personal data, we will notify the relevant
                  supervisory authority and the people affected without undue delay, as the law
                  requires. If you believe you have found a vulnerability, please report it to{" "}
                  <MailLink /> and we will respond quickly.
                </p>
              </Section>

              <Section id="your-rights" index={12} title="Your privacy rights" icon={UserCheck}>
                <p>
                  Under the UK GDPR you have the following rights. Visitors in the EU and EEA have
                  equivalent rights under the EU GDPR, and we apply the same process to every
                  request, wherever it comes from.
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {GDPR_RIGHTS.map((right) => (
                    <div key={right.title} className="rounded-xl border border-border bg-background/60 p-4">
                      <div className="text-sm font-semibold text-foreground">{right.title}</div>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{right.description}</p>
                    </div>
                  ))}
                </div>

                <SubHeading>If you are in California (CCPA / CPRA)</SubHeading>
                <div className="grid gap-3 sm:grid-cols-2">
                  {CCPA_RIGHTS.map((right) => (
                    <div key={right.title} className="rounded-xl border border-border bg-background/60 p-4">
                      <div className="text-sm font-semibold text-foreground">{right.title}</div>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{right.description}</p>
                    </div>
                  ))}
                </div>

                <SubHeading>How to exercise a right</SubHeading>
                <p>
                  Email <MailLink /> and tell us what you want. There is no form to complete and no
                  fee. We may ask a question or two to confirm the request really comes from you, and
                  we will respond within <Term>one month</Term>, as the UK GDPR requires (extendable by
                  up to two further months for complex requests, with notice to you).
                </p>

                <SubHeading>How to complain</SubHeading>
                <p>
                  If you are unhappy with how we have handled your data, please tell us first — our{" "}
                  <a href={routes.complaints} className="font-semibold text-primary underline-offset-4 transition-colors hover:underline">
                    complaints page
                  </a>{" "}
                  explains the process. You also have the right to complain to the UK{" "}
                  <Term>Information Commissioner&rsquo;s Office (ICO)</Term> at{" "}
                  <a
                    href="https://ico.org.uk/make-a-complaint/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
                  >
                    ico.org.uk/make-a-complaint
                  </a>
                  .
                </p>
              </Section>

              <Section id="children" index={13} title="Children's privacy" icon={Users}>
                <p>
                  Our services are built for businesses. This site is not directed at children, and
                  we do not knowingly collect personal data from anyone under 16 (or under 13 in the
                  United States).
                </p>
                <p>
                  If you believe a child has provided us with personal data, email <MailLink /> and
                  we will delete it promptly.
                </p>
              </Section>

              <Section
                id="signals"
                index={14}
                title="Do Not Track and Global Privacy Control"
                icon={Eye}
              >
                <p>
                  There is still no common standard for how sites should interpret browser{" "}
                  <Term>Do Not Track</Term> signals, so we do not respond to them differently — a
                  position we would rather state plainly than imply otherwise.
                </p>
                <p>
                  We do recognise <Term>Global Privacy Control</Term> as a valid opt-out of the sale
                  or sharing of personal information. We never sell personal information, and the
                  only advertising tag on this site (the Meta Pixel) loads solely after you press
                  Accept in the cookie banner.
                </p>
              </Section>

              <Section id="changes" index={15} title="Changes to this policy" icon={RefreshCw}>
                <p>
                  We will update this policy when our services, providers, or legal obligations
                  change. The effective date at the top of the page always reflects the current
                  version.
                </p>
                <p>
                  If a change materially affects how we handle your personal data, we will make it
                  prominent on the site and, where we hold your address and the law requires it,
                  notify you by email. Continuing to use the site after an update means you accept
                  the revised policy.
                </p>
              </Section>

              <Section id="contact" index={16} title="How to contact us" icon={Mail}>
                <p>
                  Privacy questions, access requests, deletion requests, and vulnerability reports
                  all go to the same place, and a person reads every one.
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
                      Privacy contact
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
                      Within one month
                    </div>
                  </div>
                </div>
                <p>
                  Prefer to talk about a project instead? Start a conversation from the{" "}
                  <a
                    href={routes.contact}
                    className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
                  >
                    contact page
                  </a>{" "}
                  and we will reply personally.
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
              Ask us anything about your data.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              We would rather answer a direct question than have you guess at what a policy means.
              Email us and a person will reply.
            </p>
            <a
              href={`mailto:${PRIVACY_EMAIL}?subject=Privacy%20question`}
              className="group mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
            >
              Email {PRIVACY_EMAIL}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
