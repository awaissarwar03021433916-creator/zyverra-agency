import { LandingPage, type LandingContent } from "@/components/marketing/LandingPage";
import { Section, SectionHeading } from "@/components/marketing/blocks";
import { Reveal } from "@/components/marketing/pages/Reveal";
import { ColorIcon, type IconName } from "@/components/marketing/ColorIcon";
import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Treatment Pages That Rank for Aesthetic Clinics | Zyverra",
  description:
    "How we build aesthetic treatment pages that rank on Google and convert: answer-first structure, prices, FAQs and schema. 8 examples. Read and ask us.",
  path: routes.treatmentPages,
});

// Eight example structures. Device and treatment names below are not
// prescription-only medicines; anti-wrinkle work is only ever presented as a
// consultation.
const EXAMPLES: { name: string; emoji: IconName; opening: string; sections: string[]; note: string }[] = [
  {
    name: "Lip filler",
    emoji: "lipstick",
    opening: "What lip filler does, who it suits, the price per ml and how long results usually last.",
    sections: ["What to expect on the day", "Swelling and downtime", "Natural-looking results", "Aftercare", "Prices and booking"],
    note: "Check each filler product's classification; consented before-and-afters only.",
  },
  {
    name: "Skin boosters",
    emoji: "bubbles",
    opening: "How skin boosters hydrate and improve skin quality, how many sessions are usual, and the course price.",
    sections: ["Who skin boosters suit", "Course length", "Skin boosters vs facials", "Aftercare", "Prices and booking"],
    note: "Avoid promising guaranteed or permanent results.",
  },
  {
    name: "Polynucleotides",
    emoji: "gem",
    opening: "What polynucleotides are used for, common treatment areas such as under-eyes, and the typical course.",
    sections: ["Treatment areas", "How many sessions", "What it feels like", "Aftercare", "Prices and booking"],
    note: "Explain clearly and factually; no exaggerated claims.",
  },
  {
    name: "Morpheus8",
    emoji: "sparkles",
    opening: "What radiofrequency microneedling with Morpheus8 does, areas treated, downtime and price per session.",
    sections: ["Areas treated", "Downtime", "Course and results timeline", "Who it isn't suitable for", "Prices and booking"],
    note: "Device-led page; keep results claims realistic.",
  },
  {
    name: "HydraFacial",
    emoji: "lotus",
    opening: "The steps of a HydraFacial, who it suits, how long it takes and the price, including add-ons.",
    sections: ["The treatment step by step", "Add-on boosters", "How often to book", "Aftercare", "Prices and booking"],
    note: "Great for answer-first FAQs: “How long does it take?”",
  },
  {
    name: "Microneedling",
    emoji: "tools",
    opening: "What microneedling helps with, such as texture and scarring, how many sessions are usual and the price.",
    sections: ["Concerns it helps", "Downtime", "Course length", "Microneedling vs peels", "Prices and booking"],
    note: "Link to concern pages such as acne scarring.",
  },
  {
    name: "Chemical peels",
    emoji: "mirror",
    opening: "The types of chemical peel offered, what each is for, downtime and price.",
    sections: ["Peel types compared", "Preparing your skin", "Peeling and downtime", "Sun protection", "Prices and booking"],
    note: "A comparison table helps clients choose.",
  },
  {
    name: "Laser hair removal",
    emoji: "light-bulb",
    opening: "How laser hair removal works, the number of sessions needed, a patch test and prices by area.",
    sections: ["Areas and prices", "Patch test", "How many sessions", "Skin and hair types", "Booking a course"],
    note: "Price-by-area tables are what clients look for first.",
  },
];

const content: LandingContent = {
  path: routes.treatmentPages,
  breadcrumbs: [{ name: "Treatment Pages", path: routes.treatmentPages }],
  eyebrow: "Treatment pages",
  h1: ["Treatment pages that rank", "and get booked"],
  heroLine: "How we structure every treatment page so Google, AI assistants and clients all understand it.",
  chips: ["Answer-first", "Prices shown", "FAQs + schema"],
  lead:
    "A treatment page that ranks answers the client's question in its first two sentences: what the treatment is, who it suits, what it costs and how to book. We build one page per treatment or concern, with a clear structure, real prices, FAQs and structured data, so it can be found on Google and quoted by AI assistants.",
  schema: {
    name: "Treatment page design for aesthetic clinics",
    serviceType: "SEO treatment page design",
    description: "Answer-first treatment pages with prices, FAQs and structured data for UK aesthetics clinics.",
  },
  sections: [
    {
      id: "structure",
      eyebrow: "The structure",
      title: "What every treatment page includes",
      cards: [
        { emoji: "speech", title: "An answer-first opening", description: "Two sentences an AI assistant could quote: what, who, price, booking." },
        { emoji: "pound", title: "Prices", description: "A clear price or range, with consultation-only treatments shown separately." },
        { emoji: "hourglass", title: "Downtime & aftercare", description: "The practical questions clients ask before they book." },
        { emoji: "picture", title: "Results", description: "Consented, unedited before-and-afters with a “results vary” note." },
        { emoji: "thinking", title: "FAQs", description: "Real questions in full sentences, marked up with schema." },
        { emoji: "calendar", title: "Booking", description: "A booking button at the top and bottom of every page." },
      ],
    },
    {
      id: "rules",
      eyebrow: "Compliance",
      title: "Written within UK advertising rules",
      tone: "muted",
      bullets: [
        "Anti-wrinkle work is presented as a consultation, never by a prescription-only medicine name",
        "No “wrinkle-relaxing” wording or nicknames in headings, alt text or file names",
        "Prices for consultation-only treatments aren't displayed promotionally",
        "No guaranteed or permanent results claims",
      ],
    },
  ],
  faqs: [
    { id: "tp-one", q: "Should every treatment have its own page?", a: "Yes. A page per treatment or concern lets Google match it to the right search, and gives clients everything they need in one place." },
    { id: "tp-length", q: "How long should a treatment page be?", a: "Long enough to answer the questions clients actually ask: what it is, who it suits, price, downtime, aftercare and booking. Usually several hundred words plus FAQs." },
    { id: "tp-prices", q: "Should I show prices on treatment pages?", a: "For most treatments, yes. Clients compare on price, and pages with clear prices tend to be more useful. Consultation-only treatments are handled differently." },
    { id: "tp-update", q: "Can I add new treatment pages myself?", a: "Yes. With the Option A admin dashboard you can add new treatment pages and categories yourself." },
  ],
  related: [
    { href: routes.seoAiSearch, label: "SEO for aesthetic clinics" },
    { href: "/blog/get-clinic-recommended-by-chatgpt", label: "Getting your clinic recommended by ChatGPT" },
    { href: "/blog/botox-advertising-rules-clinic-website", label: "UK advertising rules for clinic websites" },
    { href: "/clinic-types/skin-clinics", label: "Skin clinic website design" },
  ],
  ctaTitle: "Get treatment pages that rank",
};

export default function Page() {
  return (
    <LandingPage content={content}>
      <Section id="examples" tone="tint">
        <SectionHeading
          eyebrow="Examples"
          title="8 example treatment page structures"
          description="How we'd structure each page, from the answer-first opening to booking."
        />
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {EXAMPLES.map((e, i) => (
            <Reveal key={e.name} delay={(i % 4) * 0.06} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-border bg-card p-5 shadow-xs transition-shadow duration-300 hover:shadow-lg">
                <div className="flex items-center gap-3">
                  <ColorIcon name={e.emoji} size={32} />
                  <h3 className="font-heading text-lg font-semibold text-foreground">{e.name}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  <span className="font-semibold">Opening: </span>
                  {e.opening}
                </p>
                <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-muted-foreground marker:text-primary">
                  {e.sections.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
                <p className="mt-auto pt-4 text-xs text-muted-foreground">{e.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </LandingPage>
  );
}
