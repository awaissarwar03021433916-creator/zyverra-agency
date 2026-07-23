"use client";

import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Clock,
  Cookie,
  Database,
  ExternalLink,
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

import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { business } from "@/config/business";
import PageShell from "./PageShell";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";

// Human-readable effective date. Update this whenever the policy text changes —
// it is also surfaced in the page metadata and in the hero chips.
export const PRIVACY_LAST_UPDATED = "23 July 2026";

const LEGAL_ENTITY = "Zyverra Labs LLC";
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
      "We do not sell, rent, or trade personal information, and we do not share it for cross-context behavioural advertising. We run no ad networks or retargeting pixels on this site.",
  },
  {
    icon: Database,
    title: "We collect the minimum",
    description:
      "We ask only for what a project conversation genuinely needs: your name, your email, and what you want built. Nothing on this site requires an account.",
  },
  {
    icon: UserCheck,
    title: "You stay in control",
    description:
      "You can request a copy of your data, ask us to correct it, or ask us to delete it entirely. One email to our team is enough — no forms, no friction.",
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
    name: "Google Analytics 4",
    purpose: "Aggregate traffic and page-performance measurement",
    data: "Pseudonymous usage events, truncated IP address, device and referrer data",
    region: "United States / EU",
  },
];

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
      "Lodge a complaint with your local supervisory authority if you believe we have handled your data unlawfully.",
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
      "Opt out of the sale or sharing of personal information. We do not sell or share personal information, so there is nothing to opt out of — but the right stands.",
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

export default function PrivacyPolicyPage({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <PageShell dict={dict} lang={lang}>
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
        description="Zyverra Labs builds AI agents, automation, SaaS, and custom software — work that only earns trust if we treat data properly, starting with our own. This policy explains exactly what we collect, why, who processes it, and the control you keep over it."
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
          "GDPR aligned",
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
                  &ldquo;us&rdquo;) is a software studio delivering web development, AI automation,
                  SaaS products, AI voice agents, and custom software development. We are the
                  data controller for the personal information described in this policy, and you
                  can reach us at any time at <MailLink />.
                </p>
                <p>
                  This policy applies to <Term>zyverralabs.com</Term> and to the enquiry, chat, and
                  email channels we operate from it. It explains what we do with information about
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
                      <Term>Your message</Term> — the description of the project, problem, or
                      question you want to discuss.
                    </>,
                  ]}
                />

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
                  collect special-category or sensitive personal data, we do not use advertising or
                  retargeting pixels, and we do not buy contact lists or enrich your record from
                  data brokers.
                </p>
              </Section>

              <Section id="how-we-use" index={3} title="How and why we use it" icon={Scale}>
                <p>
                  We only process personal data where we have a lawful basis to do so. For visitors
                  in the UK, EU, and EEA, those bases under the GDPR are set out explicitly below.
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
                      <Term>To understand which pages are useful</Term> and improve our content and
                      performance — your consent, given through our cookie banner and withdrawable
                      at any time (Art. 6(1)(a)).
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
                  We keep this deliberately light. The site sets no marketing cookies and no
                  cross-site trackers.
                </p>

                <SubHeading>Strictly necessary</SubHeading>
                <p>
                  A preference cookie may record your chosen language so the site loads in the right
                  locale, and an administrator session cookie exists only for our own internal
                  dashboard. Neither is used to track you across sites.
                </p>

                <SubHeading>Browser local storage</SubHeading>
                <p>
                  The AI assistant stores a randomly generated session identifier and your saved
                  project threads in your browser&rsquo;s local storage. This never leaves your
                  device except as the identifier attached to your own assistant messages, and
                  clearing your browser storage removes it permanently.
                </p>

                <SubHeading>Analytics</SubHeading>
                <p>
                  Google Analytics 4 sets first-party cookies to distinguish returning visits and
                  measure traffic in aggregate. They are set only if you accept them in our cookie
                  banner, and only on the production site. You can withdraw that consent at any
                  time from our{" "}
                  <a
                    href={`/${lang}/cookies`}
                    className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
                  >
                    Cookie Policy
                  </a>
                  , which also deletes the cookies already set.
                </p>

                <p>
                  Every browser lets you block or delete cookies and clear site storage. Blocking
                  strictly necessary items may mean your language preference or assistant thread is
                  not remembered, but the site will still work.
                </p>
              </Section>

              <Section id="analytics" index={5} title="Analytics" icon={BarChart3}>
                <p>
                  We use <Term>Google Analytics 4</Term> to understand which pages people read, how
                  they arrive, and where the experience is slow. It is <Term>opt-in</Term>: the
                  Google script is not loaded until you accept analytics in our cookie banner.
                  Measurement is also enabled only on the production site, so development and
                  preview builds send nothing regardless.
                </p>
                <p>
                  Analytics data is pseudonymous. We see aggregate patterns — sessions, page views,
                  approximate location, device and browser type, referrer — not the identity of
                  individual readers, and we do not attempt to reverse it into an identity or match
                  it to your enquiry. Google Analytics 4 truncates IP addresses and does not store
                  them in reports.
                </p>
                <SubHeading>How to opt out</SubHeading>
                <Bullets
                  items={[
                    <>
                      Decline analytics in the cookie banner, or withdraw consent later from our{" "}
                      <a
                        href={`/${lang}/cookies`}
                        className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
                      >
                        Cookie Policy
                      </a>
                      , which also deletes the cookies already set.
                    </>,
                    <>
                      Install Google&rsquo;s official browser add-on at{" "}
                      <a
                        href="https://tools.google.com/dlpage/gaoptout"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-semibold text-primary underline-offset-4 transition-colors hover:underline"
                      >
                        tools.google.com/dlpage/gaoptout
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                      .
                    </>,
                    <>Block analytics cookies or scripts in your browser or extension settings.</>,
                    <>
                      Enable a tracking-prevention setting or Global Privacy Control signal — see
                      section 14.
                    </>,
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
                  We operate from Pakistan and serve clients worldwide, and several of our providers
                  are based in the United States. Personal data may therefore be transferred to and
                  processed in countries outside your own, including ones whose data-protection laws
                  differ from those where you live.
                </p>
                <p>
                  Where personal data is transferred out of the UK, EU, or EEA, we rely on the
                  European Commission&rsquo;s <Term>Standard Contractual Clauses</Term> (and the UK
                  International Data Transfer Addendum where applicable) in our agreements with those
                  providers, alongside the technical measures described in section 11. You may
                  request further detail on the safeguards applied to a specific transfer by
                  emailing <MailLink />.
                </p>
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
                  Your rights depend on where you live, but we apply the same process to every
                  request we receive, wherever it comes from.
                </p>

                <SubHeading>If you are in the UK, EU, or EEA (GDPR)</SubHeading>
                <div className="grid gap-3 sm:grid-cols-2">
                  {GDPR_RIGHTS.map((right) => (
                    <div
                      key={right.title}
                      className="rounded-xl border border-border bg-background/60 p-4"
                    >
                      <div className="text-sm font-semibold text-foreground">{right.title}</div>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {right.description}
                      </p>
                    </div>
                  ))}
                </div>

                <SubHeading>If you are in California (CCPA / CPRA)</SubHeading>
                <div className="grid gap-3 sm:grid-cols-2">
                  {CCPA_RIGHTS.map((right) => (
                    <div
                      key={right.title}
                      className="rounded-xl border border-border bg-background/60 p-4"
                    >
                      <div className="text-sm font-semibold text-foreground">{right.title}</div>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {right.description}
                      </p>
                    </div>
                  ))}
                </div>
                <p>
                  In the twelve months before this policy was published we collected the categories
                  of information described in section 2 — identifiers, commercial information about
                  a prospective project, and internet activity — for the purposes in section 3. We
                  did not sell or share any of it, and we did not disclose it for anyone else&rsquo;s
                  commercial purposes.
                </p>

                <SubHeading>How to exercise a right</SubHeading>
                <p>
                  Email <MailLink /> and tell us what you want. There is no form to complete and no
                  fee. We may ask a question or two to verify that the request really comes from you
                  — usually by confirming details from the email address on record — and we will
                  respond within <Term>30 days</Term> (45 days for California requests, extendable
                  once where the statute permits, with notice to you).
                </p>
                <p>
                  You may use an authorised agent where the law allows it. If you are unhappy with
                  our answer you can complain to your local supervisory authority, and we would
                  appreciate the chance to put it right first.
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
                  or sharing of personal information. In practice it changes nothing about our
                  behaviour, because we never sell or share personal information in the first place.
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
                      Within 30 days
                    </div>
                  </div>
                </div>
                <p>
                  Prefer to talk about a project instead? Start a conversation from the{" "}
                  <a
                    href={`/${lang}#contact`}
                    className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
                  >
                    contact section
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
    </PageShell>
  );
}
