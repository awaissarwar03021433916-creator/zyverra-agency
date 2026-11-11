// Single source of truth for the business NAP (Name, Address, Phone) and the
// commercial facts the site repeats everywhere (prices, timeline, payment
// plans). Schema, metadata, llms.txt, the footer and page copy all read from
// here so the details never drift apart.
//
// The address below is used ONLY by the legal pages (privacy controller and
// international-transfer disclosures, which UK GDPR requires). Marketing copy
// and schema do not show a location. Never add a virtual UK address.

export const business = {
  name: "Zyverra Labs",
  email: "hello@zyverralabs.com",
  // E.164 for schema/tel: links, and a human-readable form for display.
  phone: "+923024258017",
  phoneDisplay: "+92 302 4258017",
  whatsappNumber: "923024258017",
  address: {
    street: "",
    city: "Lahore",
    region: "Punjab",
    postalCode: "",
    country: "PK",
    countryName: "Pakistan",
  },
  geo: { latitude: 31.5204, longitude: 74.3587 },
  areaServed: "United Kingdom",
} as const;


// Commercial facts. Change a price here and every page, table, FAQ answer and
// JSON-LD Offer updates with it.
export const pricing = {
  optionA: {
    name: "Option A",
    label: "Website with admin dashboard",
    price: 400,
  },
  optionB: {
    name: "Option B",
    label: "Website without admin dashboard",
    price: 300,
  },
  // TODO [CONFIRM]: "from receipt of content" — the timeline is stated as
  // working days once the clinic's logo, treatment list, prices and photos arrive.
  timeline: "7–10 working days",
  paymentPlans: ["50/50", "30/40/30"],
  // 30/40/30 is spread over 45 days: 30% to start, 40% after 15 days, and the
  // final 30% by day 45.
  instalments: "30% to start, 40% after 15 days and the final 30% by day 45",
  // Major changes (new features, layouts, integrations) and Option B content
  // updates are priced per update.
  updateFee: "£50–£100",
  // Blogs: Option A includes 3 SEO-optimised posts and the dashboard to add
  // more; Option B includes 3 posts only.
  blogPostsIncluded: 3,
  trainingFormat: "Google Meet",
  // Availability for UK clients (confirmed by the owner).
  hours: "6am to 8pm UK time",
  // Booking systems we link or embed (confirmed: "Fresha, etc.").
  bookingSystems: ["Fresha", "Treatwell", "Timely", "Phorest"],
  // Free audit turnaround. TODO [CONFIRM]: turnaround promised on /free-clinic-website-audit.
  auditTurnaround: "2 working days",
} as const;

// Monthly marketing packages. Set at the value end of published UK market
// rates (Nov 2026: Meta ads management ~£360–£800/mo + ad spend; local SEO
// ~£400–£1,500/mo; social media management ~£500–£1,500/mo), to match the
// £300/£400 website positioning. Ad spend is always paid directly to Meta.
export type MarketingPackage = {
  name: string;
  price: number;
  /** Shown under the price. */
  summary: string;
  features: string[];
  highlight?: boolean;
};

export const marketingPackages: Record<"metaAds" | "seo" | "social", MarketingPackage[]> = {
  metaAds: [
    {
      name: "Starter",
      price: 350,
      summary: "For one clinic promoting its core treatments",
      features: [
        "1 consultation-led campaign on Facebook & Instagram",
        "4 ad creatives a month (images and short video)",
        "Audience set-up for your local area (18+ only)",
        "Landing page on your own website",
        "Monthly report in plain English",
      ],
    },
    {
      name: "Growth",
      price: 550,
      summary: "For clinics ready to scale enquiries",
      highlight: true,
      features: [
        "Up to 3 campaigns running at once",
        "8 ad creatives a month, tested against each other",
        "Retargeting of website visitors (with consent)",
        "Landing pages for each campaign",
        "Fortnightly report and optimisation call",
      ],
    },
  ],
  seo: [
    {
      name: "Local",
      price: 300,
      summary: "Get found by clients near your clinic",
      features: [
        "Google Business Profile optimisation and monthly posts",
        "Bing Places set-up and matching business details",
        "2 new or improved treatment pages a month",
        "Schema markup kept up to date",
        "Monthly ranking and enquiry report",
      ],
    },
    {
      name: "Local + AI search",
      price: 500,
      summary: "Show up on Google and in AI assistants",
      highlight: true,
      features: [
        "Everything in Local",
        "4 answer-first pages or guides a month",
        "Directory and citation building",
        "AI visibility checks in ChatGPT, Gemini and Perplexity",
        "Quarterly strategy review",
      ],
    },
  ],
  social: [
    {
      name: "Essentials",
      price: 300,
      summary: "A steady, professional presence",
      features: [
        "8 posts a month on Instagram and Facebook",
        "4 reels a month, edited from your footage",
        "Captions and hashtags written in UK English",
        "Content calendar agreed in advance",
        "Checked against UK advertising rules",
      ],
    },
    {
      name: "Reels-led",
      price: 550,
      summary: "Short-form video that brings in enquiries",
      highlight: true,
      features: [
        "12 posts and 8 reels a month",
        "Stories each week",
        "Reel scripts and filming guidance",
        "Best content repurposed on your website",
        "Monthly performance report",
      ],
    },
  ],
};

export const whatsappMessage =
  "Hi Zyverra Labs, I run a clinic in the UK and I'd like to talk about a new website/marketing. My clinic is: ";

export function whatsappHref(message: string = whatsappMessage): string {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Shared "Key facts" (Home, Pricing, clinic websites page). Plain facts only.
export const keyFacts = [
  { label: "Price", value: `£${pricing.optionB.price} website, or £${pricing.optionA.price} with an admin dashboard` },
  { label: "Timeline", value: `Live in ${pricing.timeline} once we have your content` },
  { label: "Payment", value: "50/50, or 30/40/30 over 45 days" },
  { label: "What's included", value: "Custom design, treatment pages with prices, booking links, SEO and schema set-up, legal pages" },
  { label: "Who it's for", value: "UK aesthetics clinics, aesthetic nurses, med spas and beauty salons" },
  { label: "UK coverage", value: "England, Scotland, Wales and Northern Ireland, remotely" },
  { label: "Updates after launch", value: `Do it yourself (Option A), or ${pricing.updateFee} per update` },
  { label: "Contact", value: `${business.email} · WhatsApp ${business.phoneDisplay} · ${pricing.hours}` },
] as const;
