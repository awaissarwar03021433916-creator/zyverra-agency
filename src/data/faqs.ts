// Section E FAQs. One data source drives the visible FAQ (on /faq and on each
// service page) and the FAQPage JSON-LD, so the structured data always matches
// the on-page text exactly.
//
// Answers that depend on facts only the owner knows are marked `confirmed:
// false`. They render with neutral wording but are left out of FAQPage schema
// until confirmed, so no unverified claim reaches structured data.

export type Faq = { id: string; q: string; a: string; confirmed?: boolean };
export type FaqGroup = { title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    title: "Cost & payment",
    items: [
      {
        id: "cost",
        q: "How much does an aesthetic clinic website cost in the UK?",
        a: "Our clinic websites cost £400 with an admin dashboard (Option A) or £300 without (Option B). Across the UK, clinic website prices range from a few hundred pounds for template sites to £8,000 or more for bespoke agency builds, so ask exactly what's included and who can edit the site afterwards.",
      },
      {
        id: "options",
        q: "What is the difference between Option A and Option B?",
        a: "Option A (£400) includes the admin dashboard, so you can change treatments, prices, photos, offers and blog posts yourself, and comes with 3 SEO-optimised blog posts you can add to. Option B (£300) is the same custom website with 3 blog posts but no dashboard, so content changes are made by us on request at £50–£100 per update.",
      },
      {
        id: "instalments",
        q: "Can I pay in instalments?",
        a: "Yes. You can pay 50% to start and 50% at launch, or split the cost into three payments over 45 days: 30% to start, 40% after 15 days and the final 30% by day 45.",
      },
      {
        id: "monthly-fees",
        q: "Are there any monthly fees?",
        // TODO [CONFIRM]: hosting/domain costs and whether any monthly fee applies.
        a: "We explain every running cost, such as your domain name and hosting, in writing before you commit, so there are no surprises after launch.",
        confirmed: false,
      },
    ],
  },
  {
    title: "Your website & dashboard",
    items: [
      {
        id: "timeline",
        q: "How long does it take to build my clinic website?",
        a: "Most clinic websites go live in 7–10 working days once we have your logo, treatment list, prices and photos.",
      },
      {
        id: "dashboard-edits",
        q: "What can I change myself with the admin dashboard?",
        a: "Everything. You can add, rename or remove service categories, add services to any category, update prices, edit every page section, upload images and before-and-after photos, publish offers, write blog posts and change your opening hours and contact details, all without a developer.",
      },
      {
        id: "developer",
        q: "When would I still need a developer?",
        a: "Only for major changes, such as a new feature, a new page layout, a third-party integration or a redesign. These cost £50–£100 per update depending on the change, and we confirm the price before we start. Day-to-day content changes are yours to make.",
      },
      {
        id: "booking",
        q: "Can clients book online through my website?",
        // TODO [CONFIRM]: the list of supported booking systems.
        a: "Yes. We link or embed the booking system you already use, including Fresha, Treatwell, Timely and Phorest, so clients can go from a treatment page to booking in a couple of taps.",
      },
      {
        id: "redesign",
        q: "Can you redesign my existing clinic website?",
        a: "Yes. We can rebuild an existing Wix, Squarespace or WordPress site, keep the content that works, and set up redirects so you don't lose existing Google rankings.",
      },
      {
        id: "ownership",
        q: "Do I own my website and domain?",
        // TODO [CONFIRM]: who owns the domain and the code.
        a: "We agree ownership of your domain, content and code in writing before work starts, so you know exactly what is yours.",
        confirmed: false,
      },
    ],
  },
  {
    title: "SEO & AI search",
    items: [
      {
        id: "rank",
        q: "Will my website rank on Google?",
        a: "Every site is built with the foundations Google looks for: fast mobile pages, clear treatment pages, correct titles, schema markup and a sitemap. No honest agency can guarantee rankings, and ongoing local SEO is available as a separate service.",
      },
      {
        id: "chatgpt",
        q: "Can you get my clinic recommended by ChatGPT or Google AI Overviews?",
        a: "We can make your clinic much easier for AI assistants to find and trust, but nobody can guarantee a recommendation. We focus on crawlable answer-first content, accurate structured data, Bing and Google indexing, consistent listings and genuine mentions on other websites.",
      },
      {
        id: "ai-visibility",
        q: "What is AI search visibility?",
        a: "It is how often AI assistants such as ChatGPT, Gemini, Perplexity and Google's AI Overviews mention or link to your clinic when people ask for recommendations. It builds on normal SEO plus your reputation across the wider web.",
      },
    ],
  },
  {
    title: "Marketing",
    items: [
      {
        id: "meta-ads",
        q: "Do you run Meta ads for aesthetics clinics?",
        a: "Yes. We run Facebook and Instagram campaigns built around consultations, with landing pages on your own website and monthly reporting, and we keep the wording within UK advertising rules.",
      },
      {
        id: "reels",
        q: "Do you create reels and manage social media?",
        a: "Yes. We plan, script, edit and schedule reels and posts for clinics and salons, and repurpose the best content on your website to help SEO.",
      },
      {
        id: "chatbot",
        q: "Can you add an AI chatbot to my clinic website?",
        a: "Yes. We build chatbots that answer common questions about treatments, prices and opening hours and capture enquiries out of hours, with a clear handover to you. They do not give medical advice.",
      },
    ],
  },
  {
    title: "Working with us",
    items: [
      {
        id: "location",
        q: "Do you work with clinics across the UK?",
        a: "Yes. We build websites and run marketing for aesthetics clinics, aesthetic nurses, med spas and beauty salons across the UK, including London and Bristol. Everything is handled remotely by video call, email and WhatsApp, from 6am to 8pm UK time, prices are in pounds sterling and all copy is written in UK English.",
      },
      {
        id: "solo",
        q: "Do you work with aesthetic nurses and solo practitioners?",
        a: "Yes. We build sites for independent aesthetic nurses and practitioners as well as multi-room clinics, med spas and beauty salons.",
      },
      {
        id: "start",
        q: "What do you need from me to start?",
        a: "Your logo, treatment list with prices, practitioner bio and qualifications, photos, booking link and any existing website login. If you don't have everything, we'll help you put it together.",
      },
    ],
  },
  {
    title: "Compliance",
    items: [
      {
        id: "pom-wording",
        q: "Can I name prescription-only anti-wrinkle brands on my clinic website?",
        a: "Generally, no. Botulinum toxin brands are prescription-only medicines, and the ASA says these may not be advertised to the public. We use compliant, consultation-led wording and explain the rules before launch.",
      },
      {
        id: "before-after",
        q: "Can I show before-and-after photos?",
        a: "Yes, if they are genuine, unedited, from your own clients, used with written consent and not misleading about typical results. Option A's dashboard lets you manage the gallery yourself.",
      },
      {
        id: "gdpr",
        q: "Is my website GDPR and cookie compliant?",
        a: "Each site includes a privacy policy, a cookie policy and a cookie banner. Advertising and tracking cookies (such as the Meta Pixel) only load after consent, in line with UK GDPR and PECR.",
      },
    ],
  },
];

export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.items);

export function faqsById(ids: string[]): Faq[] {
  return ids
    .map((id) => allFaqs.find((f) => f.id === id))
    .filter((f): f is Faq => Boolean(f));
}

// Only confirmed answers are eligible for FAQPage schema.
export function schemaFaqs(faqs: Faq[]): Faq[] {
  return faqs.filter((f) => f.confirmed !== false);
}
