"use client";

import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  ClipboardCheck,
  Copyright,
  CreditCard,
  FileText,
  Gavel,
  Lock,
  Mail,
  PackageCheck,
  RotateCcw,
  ShieldAlert,
  XCircle,
} from "lucide-react";

import type { Dictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/config";
import { business } from "@/config/business";
import PageShell from "./PageShell";
import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";

// Human-readable effective date. Update this whenever the terms change — it is
// also surfaced in the page metadata and in the hero chips.
export const TERMS_LAST_UPDATED = "23 July 2026";

const LEGAL_ENTITY = "Zyverra Labs LLC";
const CONTACT_EMAIL = business.email;

// Governing law is deliberately a single constant: it is the one clause most
// likely to change once the entity's registration is confirmed, and it appears
// in several places in the text below.
const GOVERNING_LAW = {
  jurisdiction: "the Islamic Republic of Pakistan",
  courts: "the courts of Lahore, Punjab, Pakistan",
  seat: "Lahore, Pakistan",
};

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

// Plain-language summary shown above the legal text. Every point here is
// restated, in binding form, in the numbered sections below.
const AT_A_GLANCE = [
  {
    icon: FileText,
    title: "The proposal wins, not this page",
    description:
      "These terms are the default. Where a signed proposal or master services agreement says something different, that document governs and this page fills the gaps around it.",
  },
  {
    icon: Copyright,
    title: "You own what we build",
    description:
      "On final payment, the deliverables are assigned to you outright. We keep only our pre-existing tooling and the general know-how in our engineers' heads.",
  },
  {
    icon: BadgeCheck,
    title: "Scope is fixed, honestly",
    description:
      "We define the deliverables, the revision rounds, and the timeline in writing before we start, and we tell you early — in writing — if anything threatens them.",
  },
  {
    icon: Lock,
    title: "Confidentiality runs both ways",
    description:
      "Everything you share about your business stays private, and the obligation binds us both for five years past the end of the engagement.",
  },
];

// Section registry — drives both the sticky table of contents and the rendered
// order, so the two can never drift apart.
const SECTIONS = [
  { id: "agreement", title: "Agreement and scope", icon: FileText },
  { id: "services", title: "Services", icon: Briefcase },
  { id: "payments", title: "Payments", icon: CreditCard },
  { id: "intellectual-property", title: "Intellectual property", icon: Copyright },
  { id: "client-responsibilities", title: "Client responsibilities", icon: ClipboardCheck },
  { id: "revisions", title: "Revisions", icon: RotateCcw },
  { id: "project-delivery", title: "Project delivery", icon: PackageCheck },
  { id: "liability", title: "Limitation of liability", icon: ShieldAlert },
  { id: "confidentiality", title: "Confidentiality", icon: Lock },
  { id: "termination", title: "Termination", icon: XCircle },
  { id: "governing-law", title: "Governing law and disputes", icon: Gavel },
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

// Callout for the clauses a client should not be able to miss — used sparingly
// so it keeps its weight.
function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-primary/25 bg-primary/[0.06] p-4 text-sm leading-6 text-foreground/90">
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function TermsPage({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <PageShell dict={dict} lang={lang}>
      {/* Hero */}
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Terms written to be{" "}
            <span className="bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
              read, not survived.
            </span>
          </>
        }
        description="These are the terms on which Zyverra Labs designs, builds, and supports software — web platforms, AI automation, SaaS products, AI voice agents, and custom development. They are deliberately specific about scope, payment, ownership, and what happens when a project changes."
        actions={
          <>
            <a
              href={`/${lang}#contact`}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-md"
            >
              Start your project
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180" />
            </a>
            <a
              href="#agreement"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-border bg-background/70 px-6 text-sm font-semibold text-foreground shadow-xs backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-muted"
            >
              Read the terms
            </a>
          </>
        }
        chips={[
          `Last updated ${TERMS_LAST_UPDATED}`,
          "Client owns the deliverables",
          "Fixed scope & revisions",
          "Mutual confidentiality",
        ]}
      />

      {/* At a glance */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="text-xs font-semibold uppercase tracking-widest text-primary">
            The short version
          </div>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Four things worth knowing up front.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            This summary is written for people, not lawyers. It does not replace the terms below,
            but nothing below contradicts it.
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

      {/* Terms body with sticky table of contents */}
      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-12">
            {/* Table of contents */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <Reveal>
                <nav
                  aria-label="Terms and conditions contents"
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
              <Section id="agreement" index={1} title="Agreement and scope" icon={FileText}>
                <p>
                  These Terms and Conditions govern your use of <Term>zyverralabs.com</Term> and any
                  services provided by <Term>{LEGAL_ENTITY}</Term> (&ldquo;Zyverra Labs&rdquo;,
                  &ldquo;we&rdquo;, &ldquo;us&rdquo;). By browsing this site, submitting an enquiry,
                  using our AI assistant, or engaging us for work, you accept these terms. If you do
                  not accept them, please do not use the site or our services.
                </p>
                <p>
                  Where you accept a written proposal, statement of work, or master services
                  agreement from us (each, a <Term>&ldquo;Project Agreement&rdquo;</Term>), that
                  document forms a contract with you and incorporates these terms.
                </p>
                <Callout>
                  <Term>Order of precedence.</Term> If a signed Project Agreement conflicts with
                  these terms, the Project Agreement prevails for that engagement. These terms
                  govern everything it does not address.
                </Callout>
                <p>
                  If you accept these terms on behalf of a company, you confirm you are authorised
                  to bind it, and &ldquo;you&rdquo; means that company. Our services are offered to
                  businesses and to individuals acting in a professional capacity; they are not
                  directed at consumers, and nothing here limits any non-waivable statutory right
                  you may hold.
                </p>
                <p>
                  Personal data is handled as described in our{" "}
                  <a
                    href={`/${lang}/privacy`}
                    className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
                  >
                    Privacy Policy
                  </a>
                  , which forms part of these terms.
                </p>
                <SubHeading>Changes to these terms</SubHeading>
                <p>
                  We may update these terms as our services and legal obligations evolve. The
                  effective date at the top of the page always reflects the current version.
                  Changes apply to new engagements and to continued use of the site; they do not
                  retroactively change the terms of a signed Project Agreement already in progress.
                </p>
              </Section>

              <Section id="services" index={2} title="Services" icon={Briefcase}>
                <p>
                  We provide software design, engineering, and support services, which may include
                  any of the following:
                </p>
                <Bullets
                  items={[
                    <>
                      <Term>Web and application development</Term> — marketing sites, web platforms,
                      dashboards, and internal tools.
                    </>,
                    <>
                      <Term>SaaS product development</Term> — multi-tenant products, billing
                      integration, and the surrounding infrastructure.
                    </>,
                    <>
                      <Term>AI automation and AI agents</Term> — assistants, retrieval systems,
                      workflow automation, and integrations with third-party models.
                    </>,
                    <>
                      <Term>AI voice agents</Term> — conversational voice systems and the telephony
                      or streaming integrations they depend on.
                    </>,
                    <>
                      <Term>Custom software development</Term> — bespoke systems, APIs, data models,
                      and migrations.
                    </>,
                    <>
                      <Term>Ongoing support and maintenance</Term> where agreed in writing.
                    </>,
                  ]}
                />
                <SubHeading>What is in scope</SubHeading>
                <p>
                  The specific deliverables, milestones, technologies, revision rounds, and fees for
                  your engagement are defined in your Project Agreement. Anything not described in
                  that document is out of scope. Requests that fall outside it are handled as a
                  change request under section 7, not as part of the agreed fee.
                </p>
                <SubHeading>Website content and the AI assistant</SubHeading>
                <p>
                  Content on this site, including case studies, articles, and anything generated by
                  our AI assistant, is provided for general information. It is not a quote, a
                  commitment, or professional advice. AI-generated responses can be inaccurate, and
                  nothing the assistant says binds us until a person from our team confirms it in
                  writing.
                </p>
                <SubHeading>Acceptable use</SubHeading>
                <p>
                  You agree not to misuse this site or our services — including attempting to gain
                  unauthorised access, probing or scanning our systems without written permission,
                  interfering with availability, scraping content at scale, submitting unlawful or
                  infringing material, or using our services to build anything unlawful. We may
                  suspend access immediately where we reasonably suspect such misuse.
                </p>
                <SubHeading>Subcontracting</SubHeading>
                <p>
                  We may engage vetted subcontractors or specialist collaborators to deliver parts
                  of an engagement. We remain fully responsible to you for their work and for their
                  compliance with the confidentiality obligations in section 9.
                </p>
              </Section>

              <Section id="payments" index={3} title="Payments" icon={CreditCard}>
                <p>
                  Fees, currency, payment schedule, and any expenses are set out in your Project
                  Agreement. Unless that document says otherwise, the following applies.
                </p>
                <Bullets
                  items={[
                    <>
                      <Term>Deposit.</Term> Fixed-scope projects require an advance payment of{" "}
                      <Term>50%</Term> of the total fee before work begins. We schedule engineering
                      capacity only once it clears.
                    </>,
                    <>
                      <Term>Milestones.</Term> The remaining balance is invoiced against the
                      milestones defined in the Project Agreement, or on completion where no
                      milestones are defined.
                    </>,
                    <>
                      <Term>Retainers and ongoing work.</Term> Monthly engagements are invoiced in
                      advance at the start of each period. Unused hours do not roll over unless the
                      Project Agreement says they do.
                    </>,
                    <>
                      <Term>Payment terms.</Term> Invoices are payable within <Term>14 days</Term>{" "}
                      of the invoice date.
                    </>,
                    <>
                      <Term>Taxes and charges.</Term> Fees are exclusive of VAT, sales tax,
                      withholding tax, and any other duties, which are your responsibility. Bank
                      transfer, currency conversion, and payment processor fees are borne by you, so
                      that we receive the full invoiced amount.
                    </>,
                    <>
                      <Term>Third-party costs.</Term> Hosting, domains, model and API usage, licences,
                      and other third-party services are billed to you at cost, or are purchased in
                      your own accounts. We are not responsible for a provider&rsquo;s price changes.
                    </>,
                  ]}
                />
                <SubHeading>Late payment</SubHeading>
                <p>
                  Invoices more than <Term>14 days</Term> overdue may accrue interest at{" "}
                  <Term>1.5% per month</Term> on the outstanding balance, or the maximum permitted
                  by law if lower. We may suspend work, deployments, and support after written
                  notice while an invoice remains unpaid, and any affected timeline shifts
                  accordingly. Work suspended for non-payment does not constitute a breach by us.
                </p>
                <SubHeading>Refunds</SubHeading>
                <p>
                  Fees cover engineering time and reserved capacity, and are non-refundable once the
                  corresponding work has been performed. If you terminate a fixed-scope project
                  early, you are billed for all work completed and committed up to the effective
                  termination date; any balance you have paid beyond that amount is refunded within
                  30 days. Deposits are non-refundable once work has commenced.
                </p>
                <SubHeading>Disputed invoices</SubHeading>
                <p>
                  Raise any dispute in writing within <Term>10 days</Term> of the invoice date,
                  identifying the specific items in question. Undisputed amounts remain payable on
                  the original terms while we resolve the rest in good faith.
                </p>
              </Section>

              <Section
                id="intellectual-property"
                index={4}
                title="Intellectual property"
                icon={Copyright}
              >
                <SubHeading>What you own</SubHeading>
                <p>
                  On receipt of <Term>full payment</Term> of all sums due for an engagement, we
                  assign to you all right, title, and interest in the{" "}
                  <Term>deliverables</Term> created specifically for you under that engagement —
                  including bespoke source code, designs, and documentation. The assignment is
                  worldwide, perpetual, and irrevocable.
                </p>
                <p>
                  You also retain everything you brought to the project: your brand, content, data,
                  trademarks, and any materials or systems existing before the engagement
                  (&ldquo;Client Materials&rdquo;). You grant us a limited licence to use Client
                  Materials solely to perform the services.
                </p>
                <SubHeading>What we keep</SubHeading>
                <p>
                  We retain ownership of our <Term>pre-existing and background IP</Term>: internal
                  libraries, boilerplates, architectural patterns, prompt frameworks, tooling, and
                  general methods developed before or independently of your project. Where any of it
                  is embedded in a deliverable, we grant you a perpetual, worldwide, royalty-free,
                  non-exclusive licence to use, modify, and sublicense it as part of that
                  deliverable — you never need our permission to run, change, or resell your own
                  product.
                </p>
                <p>
                  Nothing in these terms restricts our engineers from using the general skills,
                  knowledge, and experience gained during an engagement on future work, provided no
                  confidential information of yours is disclosed.
                </p>
                <Callout>
                  <Term>Until payment clears, ownership stays with us.</Term> Deliverables are
                  licensed to you for review only before final payment, and may not be deployed to
                  production or used commercially until the assignment takes effect.
                </Callout>
                <SubHeading>Third-party and open-source components</SubHeading>
                <p>
                  Deliverables may incorporate open-source or commercially licensed third-party
                  components. These remain the property of their respective owners and are supplied
                  to you under their own licences, which you agree to comply with. We will tell you
                  about any component whose licence imposes an obligation materially affecting how
                  you can use the deliverable.
                </p>
                <SubHeading>AI-assisted development and model outputs</SubHeading>
                <p>
                  We may use AI-assisted tooling during development. We take responsibility for
                  reviewing and testing all code we deliver, whatever produced the first draft.
                  Where a deliverable calls a third-party AI model at runtime, rights in the
                  generated outputs are governed by that provider&rsquo;s terms; we make no separate
                  ownership claim over them, and we do not warrant that model outputs are accurate,
                  original, or non-infringing.
                </p>
                <SubHeading>Portfolio rights</SubHeading>
                <p>
                  We may identify you as a client and describe the work at a general level in our
                  portfolio and marketing, including a screenshot or visual excerpt, unless you ask
                  us in writing not to. We will never disclose confidential information, metrics,
                  or source code in doing so, and we will honour a withdrawal request within 30 days.
                </p>
                <SubHeading>Site content</SubHeading>
                <p>
                  All content on zyverralabs.com — text, design, code, logos, and marks — is owned by
                  {" "}
                  {LEGAL_ENTITY} or its licensors and is protected by copyright and trademark law.
                  You may not copy, republish, or create derivative works from it without our
                  written permission.
                </p>
              </Section>

              <Section
                id="client-responsibilities"
                index={5}
                title="Client responsibilities"
                icon={ClipboardCheck}
              >
                <p>
                  Software projects fail on inputs far more often than on engineering. To deliver on
                  time, we need the following from you.
                </p>
                <Bullets
                  items={[
                    <>
                      <Term>A single decision-maker</Term> with authority to approve scope, designs,
                      and milestones, available for the agreed check-ins.
                    </>,
                    <>
                      <Term>Timely feedback and approvals</Term> — within{" "}
                      <Term>5 business days</Term> of a request, unless we agree otherwise in
                      writing.
                    </>,
                    <>
                      <Term>Content, assets, and credentials</Term> — copy, images, brand
                      guidelines, and access to the accounts, APIs, repositories, and environments
                      the work depends on.
                    </>,
                    <>
                      <Term>Accurate, lawful materials.</Term> You confirm you own or are licensed
                      to use everything you give us, and that our agreed use of it will not infringe
                      any third-party right or breach any law.
                    </>,
                    <>
                      <Term>Compliance in your domain.</Term> You are responsible for the legal and
                      regulatory requirements applying to your business and your users — including
                      your own privacy notices, consent flows, and any sector-specific rules — and
                      for telling us about them before we build.
                    </>,
                    <>
                      <Term>Your own accounts and costs.</Term> Hosting, domains, model usage, and
                      third-party subscriptions after handover are yours to hold and pay for.
                    </>,
                    <>
                      <Term>Security hygiene on your side</Term> — protecting the credentials you
                      hold, revoking access when your staff change, and telling us promptly of any
                      compromise.
                    </>,
                  ]}
                />
                <SubHeading>Delays caused by inputs</SubHeading>
                <p>
                  Where we are waiting on you, the timeline extends by the length of the delay and
                  we are not liable for the resulting slip. If an engagement is paused on your side
                  for more than <Term>30 consecutive days</Term>, we may release the reserved
                  capacity, invoice for all work completed to that point, and reschedule the
                  remainder subject to availability. Restarting after a pause may require a
                  remobilisation fee.
                </p>
                <SubHeading>Non-solicitation</SubHeading>
                <p>
                  During an engagement and for <Term>12 months</Term> afterwards, neither party will
                  directly solicit for employment any individual who worked on the project for the
                  other, without written consent. General public job advertising is not a breach of
                  this clause.
                </p>
              </Section>

              <Section id="revisions" index={6} title="Revisions" icon={RotateCcw}>
                <p>
                  Every engagement includes a defined number of revision rounds so that refinement
                  is planned rather than open-ended. Unless your Project Agreement states otherwise:
                </p>
                <Bullets
                  items={[
                    <>
                      <Term>Design</Term> — up to <Term>two</Term> rounds of consolidated revisions
                      per screen or design deliverable.
                    </>,
                    <>
                      <Term>Development</Term> — up to <Term>two</Term> rounds of consolidated
                      revisions per milestone, within the approved scope.
                    </>,
                    <>
                      <Term>Bug fixes are never revisions.</Term> Defects — where a deliverable does
                      not behave as specified — are corrected free of charge and do not consume a
                      round.
                    </>,
                  ]}
                />
                <SubHeading>How a round works</SubHeading>
                <p>
                  A round means one consolidated set of written feedback, delivered together. Please
                  gather comments from all your stakeholders before sending them; feedback arriving
                  piecemeal after we have begun a round counts as the next round.
                </p>
                <SubHeading>What counts as a change, not a revision</SubHeading>
                <p>
                  Refining something already approved is a revision. The following are{" "}
                  <Term>change requests</Term>, quoted separately before any work starts:
                </p>
                <Bullets
                  items={[
                    <>New features, screens, or integrations not in the approved scope.</>,
                    <>
                      Reversing a decision you previously signed off, where work has been built on
                      it.
                    </>,
                    <>
                      A change of direction on brand, platform, architecture, or core user flow.
                    </>,
                    <>Revisions requested after a milestone has been accepted under section 7.</>,
                  ]}
                />
                <p>
                  Additional revision rounds beyond the included allowance are billed at our
                  prevailing hourly rate, quoted and approved in writing first. We will never
                  perform chargeable work without telling you the cost in advance.
                </p>
              </Section>

              <Section id="project-delivery" index={7} title="Project delivery" icon={PackageCheck}>
                <SubHeading>Timelines</SubHeading>
                <p>
                  Timelines in a proposal are good-faith estimates based on the agreed scope and on
                  your inputs arriving as described in section 5. They are not guarantees, and they
                  assume no change requests mid-flight. We tell you in writing, early, if anything
                  threatens a date — that commitment matters more to us than an optimistic estimate.
                </p>
                <SubHeading>Milestones and acceptance</SubHeading>
                <p>
                  We deliver in milestones. On delivery of each, you have <Term>7 days</Term> to
                  review it against the agreed specification and either accept it or send written
                  notice of specific deficiencies. We correct genuine deficiencies at no cost and
                  redeliver.
                </p>
                <Callout>
                  <Term>Deemed acceptance.</Term> A milestone is treated as accepted if you do not
                  respond within <Term>7 days</Term>, or if you deploy it to production or use it
                  commercially. Accepted work is invoiced, and later changes to it are handled as
                  change requests.
                </Callout>
                <SubHeading>Change requests</SubHeading>
                <p>
                  Any change to the agreed scope is documented in writing with its effect on fees
                  and timeline, and takes effect only once you approve it. We do not absorb scope
                  silently, and we do not bill for it silently either.
                </p>
                <SubHeading>Handover</SubHeading>
                <p>
                  On completion and full payment we hand over source code, deployment access, and
                  the agreed documentation. Where we have held credentials or infrastructure on your
                  behalf, we transfer them to your accounts.
                </p>
                <SubHeading>Warranty period</SubHeading>
                <p>
                  For <Term>30 days</Term> after final delivery, we fix defects in our work at no
                  charge — cases where a deliverable does not perform as specified. The warranty
                  does not cover changes you or a third party make to the code, faults in
                  third-party services or models, changes in third-party APIs, new feature requests,
                  or issues arising from use outside the documented environment.
                </p>
                <SubHeading>Third-party dependencies</SubHeading>
                <p>
                  Deliverables may depend on third-party platforms, APIs, and AI models we do not
                  control. We are not responsible for their availability, performance, pricing, or
                  changes to their terms. Where such a change requires rework, we quote it as a
                  change request.
                </p>
                <SubHeading>Force majeure</SubHeading>
                <p>
                  Neither party is liable for delay or failure caused by events beyond its
                  reasonable control, including natural disasters, war, civil unrest, epidemics,
                  strikes, government action, and failures of internet, power, or major cloud
                  infrastructure. Affected obligations are suspended for the duration, and each
                  party will work in good faith to limit the impact.
                </p>
              </Section>

              <Section id="liability" index={8} title="Limitation of liability" icon={ShieldAlert}>
                <p>
                  Nothing in these terms excludes or limits liability for death or personal injury
                  caused by negligence, for fraud or fraudulent misrepresentation, or for any other
                  liability that cannot lawfully be excluded. Subject to that:
                </p>
                <Bullets
                  items={[
                    <>
                      <Term>Liability cap.</Term> Each party&rsquo;s total aggregate liability
                      arising out of or in connection with an engagement is limited to the{" "}
                      <Term>total fees paid by you to us for that engagement in the 12 months
                      preceding the event</Term> giving rise to the claim.
                    </>,
                    <>
                      <Term>Excluded losses.</Term> Neither party is liable for indirect,
                      incidental, special, or consequential loss, nor for loss of profit, revenue,
                      anticipated savings, business, goodwill, or data, however arising, even if
                      advised of the possibility.
                    </>,
                    <>
                      <Term>Third-party services.</Term> We are not liable for loss caused by
                      third-party platforms, APIs, hosting providers, or AI models, including
                      outages, price changes, deprecations, or their own security incidents.
                    </>,
                    <>
                      <Term>AI outputs.</Term> Generative systems can produce inaccurate or
                      unexpected output. Where a deliverable uses AI, you are responsible for the
                      human review, guardrails, and monitoring appropriate to your use case, and we
                      are not liable for decisions made in reliance on model output.
                    </>,
                    <>
                      <Term>After handover.</Term> Once code is handed over, we are not liable for
                      changes made by you or by anyone else, nor for issues arising from
                      unmaintained dependencies outside a support agreement.
                    </>,
                    <>
                      <Term>Website use.</Term> This website and its AI assistant are provided
                      &ldquo;as is&rdquo;. To the fullest extent permitted by law we disclaim all
                      implied warranties, including merchantability, fitness for a particular
                      purpose, and non-infringement.
                    </>,
                  ]}
                />
                <SubHeading>Backups and data</SubHeading>
                <p>
                  You are responsible for maintaining backups of your data and content, unless a
                  written support agreement puts that duty on us. We are not liable for data loss
                  where no such agreement is in place.
                </p>
                <SubHeading>Indemnity</SubHeading>
                <p>
                  You will indemnify us against claims arising from Client Materials you supplied,
                  from your use of the deliverables in breach of these terms or of applicable law,
                  and from your failure to meet regulatory obligations in your own domain. We will
                  indemnify you against third-party claims that the bespoke deliverables we created
                  infringe their intellectual property rights, provided you notify us promptly and
                  let us control the defence. That indemnity does not apply to Client Materials,
                  third-party or open-source components, AI model outputs, or modifications made
                  after handover.
                </p>
                <SubHeading>Time limit</SubHeading>
                <p>
                  Any claim arising out of an engagement must be brought within <Term>12 months</Term>{" "}
                  of the date the claiming party became aware, or should reasonably have become
                  aware, of the circumstances giving rise to it.
                </p>
              </Section>

              <Section id="confidentiality" index={9} title="Confidentiality" icon={Lock}>
                <p>
                  <Term>Confidential Information</Term> means any non-public information disclosed by
                  one party to the other in connection with an engagement — business plans, source
                  code, architecture, data, customer lists, pricing, roadmaps, credentials, and
                  anything a reasonable person would understand to be confidential given its nature
                  or the circumstances of disclosure.
                </p>
                <p>Each party agrees, as the receiving party, to:</p>
                <Bullets
                  items={[
                    <>
                      Use the other&rsquo;s Confidential Information solely to perform or receive the
                      services.
                    </>,
                    <>
                      Protect it with at least the same care it applies to its own confidential
                      information, and never less than a reasonable standard of care.
                    </>,
                    <>
                      Disclose it only to employees and subcontractors who need it for the
                      engagement and who are bound by equivalent obligations, remaining responsible
                      for their compliance.
                    </>,
                    <>
                      Return or destroy it on written request at the end of the engagement, save for
                      copies retained in routine backups or required by law.
                    </>,
                  ]}
                />
                <SubHeading>Exclusions</SubHeading>
                <p>
                  These obligations do not apply to information that is or becomes public through no
                  fault of the receiving party, was lawfully known to it before disclosure, is
                  lawfully received from a third party without restriction, or is independently
                  developed without reference to the other&rsquo;s Confidential Information.
                </p>
                <SubHeading>Compelled disclosure</SubHeading>
                <p>
                  If disclosure is required by law, regulation, or court order, the receiving party
                  may comply, but will give the other prompt written notice where legally permitted
                  so it can seek protective measures, and will disclose only what is required.
                </p>
                <SubHeading>Duration</SubHeading>
                <p>
                  Confidentiality obligations survive termination and continue for{" "}
                  <Term>five years</Term> afterwards. Trade secrets and personal data remain
                  protected for as long as the law provides. Personal data is additionally governed
                  by our{" "}
                  <a
                    href={`/${lang}/privacy`}
                    className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
                  >
                    Privacy Policy
                  </a>{" "}
                  and, where we process personal data on your behalf, by the data processing
                  agreement between us.
                </p>
                <p>
                  Damages may not be an adequate remedy for a breach of this section, and either
                  party may seek injunctive relief in addition to any other remedy available.
                </p>
              </Section>

              <Section id="termination" index={10} title="Termination" icon={XCircle}>
                <SubHeading>Termination for convenience</SubHeading>
                <p>
                  Either party may terminate an engagement on <Term>14 days</Term> written notice.
                  You remain liable for all work completed, plus work already committed and capacity
                  reserved for the notice period. We will not start new workstreams during notice
                  without your written approval.
                </p>
                <SubHeading>Termination for cause</SubHeading>
                <p>
                  Either party may terminate immediately on written notice if the other commits a
                  material breach that is not remedied within <Term>14 days</Term> of written notice
                  describing it, or if the other becomes insolvent, enters administration or
                  liquidation, or ceases to trade. Non-payment more than <Term>30 days</Term> past
                  due is a material breach.
                </p>
                <SubHeading>Immediate suspension</SubHeading>
                <p>
                  We may suspend services or site access immediately, without notice, where we
                  reasonably believe there has been unlawful activity, a breach of the acceptable
                  use provisions in section 2, or a threat to the security or integrity of our
                  systems or another client&rsquo;s data.
                </p>
                <SubHeading>What happens on termination</SubHeading>
                <Bullets
                  items={[
                    <>
                      We invoice all work performed and committed to the effective date; those sums
                      become immediately payable.
                    </>,
                    <>
                      On payment in full, ownership of the completed deliverables assigns to you
                      under section 4. Where sums remain unpaid, no assignment takes place and you
                      have no licence to use the work.
                    </>,
                    <>
                      We provide a reasonable handover of completed work, source code, and access
                      credentials. Handover assistance beyond a reasonable transfer may be quoted
                      separately.
                    </>,
                    <>
                      Each party returns or destroys the other&rsquo;s Confidential Information on
                      request, subject to section 9.
                    </>,
                  ]}
                />
                <SubHeading>Survival</SubHeading>
                <p>
                  Sections 3 (accrued payment obligations), 4, 8, 9, 10, and 11 survive termination
                  or expiry, together with any other provision that by its nature is intended to.
                </p>
              </Section>

              <Section id="governing-law" index={11} title="Governing law and disputes" icon={Gavel}>
                <p>
                  These terms and any dispute or claim arising out of them — including
                  non-contractual disputes — are governed by the laws of{" "}
                  <Term>{GOVERNING_LAW.jurisdiction}</Term>, without regard to conflict-of-law
                  principles. The United Nations Convention on Contracts for the International Sale
                  of Goods does not apply.
                </p>
                <SubHeading>Resolving a dispute</SubHeading>
                <p>
                  We would rather solve a problem than litigate one. Before starting formal
                  proceedings, the parties will escalate the matter to senior representatives and
                  attempt in good faith to resolve it within <Term>30 days</Term> of written notice
                  describing the dispute. This step does not prevent either party from seeking
                  urgent injunctive relief.
                </p>
                <SubHeading>Jurisdiction</SubHeading>
                <p>
                  If the dispute is not resolved, the parties submit to the exclusive jurisdiction
                  of <Term>{GOVERNING_LAW.courts}</Term>. Where a Project Agreement instead
                  provides for arbitration, that dispute will be finally settled by arbitration
                  seated in {GOVERNING_LAW.seat}, conducted in English, before a single arbitrator,
                  and the award will be final and binding.
                </p>
                <SubHeading>Individual claims</SubHeading>
                <p>
                  Disputes are brought on an individual basis only. Neither party may bring a claim
                  as a plaintiff or class member in a class, consolidated, or representative action.
                </p>
                <SubHeading>General</SubHeading>
                <Bullets
                  items={[
                    <>
                      <Term>Entire agreement.</Term> These terms, together with your Project
                      Agreement and our Privacy Policy, form the entire agreement between us and
                      supersede all prior discussions, proposals, and representations.
                    </>,
                    <>
                      <Term>Severability.</Term> If any provision is held unenforceable, it is
                      modified to the minimum extent necessary, or severed, and the rest remains in
                      full force.
                    </>,
                    <>
                      <Term>No waiver.</Term> Failing to enforce a provision is not a waiver of the
                      right to enforce it later.
                    </>,
                    <>
                      <Term>Assignment.</Term> Neither party may assign these terms without the
                      other&rsquo;s written consent, except to a successor in connection with a
                      merger, acquisition, or sale of substantially all assets.
                    </>,
                    <>
                      <Term>Independent contractors.</Term> We are independent contractors. Nothing
                      here creates a partnership, joint venture, agency, or employment relationship.
                    </>,
                    <>
                      <Term>Notices.</Term> Formal notices are given in writing by email to{" "}
                      {CONTACT_EMAIL} and to the address you supplied, and are deemed received on
                      the next business day.
                    </>,
                    <>
                      <Term>Language.</Term> These terms are drafted in English. Any translation is
                      provided for convenience, and the English version governs.
                    </>,
                    <>
                      <Term>Third parties.</Term> No one other than the parties has any right to
                      enforce these terms.
                    </>,
                  ]}
                />
              </Section>

              <Section id="contact" index={12} title="Contact information" icon={Mail}>
                <p>
                  Questions about these terms, a proposal, or an engagement all go to the same
                  place, and a person reads every one.
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
                      Governing law
                    </div>
                    <div className="mt-1.5 text-sm font-semibold text-foreground">
                      {GOVERNING_LAW.seat}
                    </div>
                  </div>
                </div>
                <p>
                  For privacy requests, data access, or deletion, see our{" "}
                  <a
                    href={`/${lang}/privacy`}
                    className="font-semibold text-primary underline-offset-4 transition-colors hover:underline"
                  >
                    Privacy Policy
                  </a>
                  . To discuss a project, start a conversation from the{" "}
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
              Questions before you sign?
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Ask us about any clause here.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              We would rather explain a term now than have it surprise you later. Email us and a
              person will reply.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Question%20about%20your%20terms`}
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
