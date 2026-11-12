// Content for the standalone landing pages added in the SEO expansion.
// Original copy, UK English, ASA/CAP-safe (no prescription-only medicine
// names), no invented statistics, reviews or awards.

import type { LandingContent } from "@/components/marketing/LandingPage";
import { pricing } from "@/config/business";
import { routes } from "@/config/site";
import { faqsById } from "@/data/faqs";

const BLOG = {
  cost: { href: "/blog/aesthetic-clinic-website-cost-uk", label: "Clinic website prices in the UK" },
  asa: { href: "/blog/botox-advertising-rules-clinic-website", label: "UK advertising rules for clinic websites" },
  ai: { href: "/blog/get-clinic-recommended-by-chatgpt", label: "Getting your clinic recommended by ChatGPT" },
};

export const googleBusinessProfilePage: LandingContent = {
  path: routes.googleBusinessProfile,
  breadcrumbs: [{ name: "Google Business Profile for Aesthetic Clinics", path: routes.googleBusinessProfile }],
  eyebrow: "Google Business Profile",
  h1: ["Google Business Profile for", "aesthetic clinics"],
  heroLine: "Set up, optimise and keep your profile active, so more local clients find you on Google Maps.",
  chips: ["Google Maps visibility", "Reviews strategy", "Weekly posts", "From £300/month"],
  lead:
    "A Google Business Profile is the free listing that shows your clinic on Google Maps and in local search results. For most aesthetics clinics it is the first thing a new client sees, before they ever reach your website, so an accurate, active profile is one of the most valuable things you can invest in. We set your profile up properly, keep it updated and link it to a website that backs it up.",
  schema: {
    name: "Google Business Profile management for aesthetic clinics",
    serviceType: "Google Business Profile optimisation",
    description:
      "Set-up, optimisation and ongoing management of Google Business Profiles for UK aesthetics clinics, to improve visibility on Google Maps.",
  },
  sections: [
    {
      id: "why",
      eyebrow: "Why it matters",
      title: "Why your Google profile matters as much as your website",
      paragraphs: [
        "When someone searches for a treatment near them, Google usually shows a map with three local businesses before any ordinary results. Which clinics appear there depends mainly on three things Google describes publicly: how relevant your profile is to the search, how close you are to the person searching, and how well known and well reviewed your clinic is.",
        "You can't change your distance from a searcher, but relevance and prominence are largely in your hands. Complete, accurate information, the right categories, regular posts, real photos and a steady flow of genuine reviews all help. A website with clear treatment pages that match your profile reinforces every one of those signals.",
      ],
    },
    {
      id: "what-we-do",
      eyebrow: "What we do",
      title: "What we set up and manage",
      tone: "tint",
      cards: [
        { emoji: "pin", title: "Categories & services", description: "The primary and secondary categories that match what you actually offer, with each treatment listed as a service." },
        { emoji: "memo", title: "Business details", description: "Name, address or service area, hours and booking link, kept identical to your website and Bing Places." },
        { emoji: "camera", title: "Photos", description: "Real photos of your clinic, team and treatment room, uploaded regularly. No stock images." },
        { emoji: "speech", title: "Posts & offers", description: "Regular posts about treatments, seasonal offers and news, written within UK advertising rules." },
        { emoji: "star", title: "Reviews routine", description: "A simple, compliant way to ask happy clients for reviews, and a calm way to reply to every one." },
        { emoji: "bar-chart", title: "Monthly reporting", description: "Searches, calls, direction requests and website clicks from your profile, explained in plain English." },
      ],
    },
    {
      id: "maps",
      eyebrow: "Google Maps",
      title: "Improving your Google Maps ranking, honestly",
      bullets: [
        "We never use fake reviews, keyword-stuffed business names or virtual addresses: they break Google's guidelines and can get a profile suspended.",
        "If you see clients at home or work from a shared clinic, we set up your profile the way Google's rules require for your situation.",
        "Each treatment you list on your profile has a matching page on your website, so Google can confirm what you offer.",
        "Profile posts, photos and review replies are kept regular, because an active profile is easier for Google to trust.",
      ],
    },
    {
      id: "website",
      eyebrow: "Profile + website",
      title: "Why it works best with a website you control",
      paragraphs: [
        "Your Google profile sends people to your website, and Google looks at your website to understand your clinic. With an Option A website you can update treatments, prices and offers yourself the same day you change them on your profile, so the two never contradict each other.",
      ],
    },
  ],
  faqs: [
    ...faqsById(["near-me"]),
    { id: "gbp-cost", q: "How much does Google Business Profile management cost?", a: "Google Business Profile optimisation is included in our Local SEO package from £300 a month. The profile itself is free from Google." },
    { id: "gbp-time", q: "How long before my clinic shows higher on Google Maps?", a: "It varies by area and competition. Fixing categories, details and photos can help within weeks, while reviews and posts build up over months. Nobody can guarantee a ranking." },
    { id: "gbp-address", q: "Can I have a Google profile if I work from a shared clinic or rent a room?", a: "Usually yes, but Google has specific rules for shared and home-based businesses. We check your situation and set the profile up in a way that follows those rules." },
    { id: "gbp-reviews", q: "Can you write reviews for my clinic?", a: "No. Reviews must come from real clients. We help you ask for them in a simple, compliant way and reply to them professionally." },
    { id: "gbp-existing", q: "I already have a profile. Can you improve it?", a: "Yes. We audit your existing profile, fix anything inaccurate or missing, and then keep it active each month." },
  ],
  related: [
    { href: "/blog/local-seo-aesthetic-clinic-90-day-plan", label: "90-day local SEO plan for clinics" },
    { href: routes.seoAiSearch, label: "SEO for aesthetic clinics" },
    BLOG.ai,
    BLOG.asa,
    { href: "/clinic-types/aesthetics-clinics", label: "Marketing for aesthetics clinics" },
  ],
  ctaTitle: "Get your clinic found on Google Maps",
};

export const nurseWebsitesPage: LandingContent = {
  path: routes.nurseWebsites,
  breadcrumbs: [{ name: "Websites for Aesthetic Nurses", path: routes.nurseWebsites }],
  eyebrow: "Aesthetic nurse websites",
  h1: ["A website for aesthetic nurses", "and practitioners"],
  heroLine: "A professional site that shows your qualifications, treatments and prices, and that you can update yourself.",
  chips: [`From £${pricing.optionB.price}`, `Live in ${pricing.timeline}`, "Nurse prescribers welcome"],
  lead:
    "A website for an aesthetic nurse needs to do three things: show your qualifications and approach, list your treatments and prices clearly, and make booking a consultation easy. We build professional, mobile-first websites for independent nurses, nurse prescribers and aesthetic practitioners from £300, live in 7–10 working days, with an optional dashboard so you can keep everything current yourself.",
  schema: {
    name: "Website design for aesthetic nurses",
    serviceType: "Website design for aesthetic practitioners",
    description: "Websites for independent aesthetic nurses, nurse prescribers and aesthetic practitioners in the UK.",
    offers: true,
  },
  sections: [
    {
      id: "you",
      eyebrow: "Built around you",
      title: "Your website is your reputation online",
      paragraphs: [
        "Clients choosing an independent practitioner are choosing a person, not a building. Your website should introduce you properly: your nursing background, your training, your insurance and why you work the way you do. That is what turns a search into a consultation.",
        "Many practitioners work across more than one location, such as their own room, a salon or a partner clinic. We build clear location sections with the right booking route for each, so clients never book the wrong place.",
      ],
    },
    {
      id: "pages",
      eyebrow: "What's included",
      title: "Pages most aesthetic practitioners need",
      tone: "tint",
      cards: [
        { emoji: "heart", title: "About you", description: "Your background, qualifications, insurance and approach to natural results." },
        { emoji: "clipboard", title: "Treatment pages", description: "One page per treatment or concern, with prices, downtime and aftercare." },
        { emoji: "picture", title: "Before & after gallery", description: "Genuine, consented photos, labelled clearly and kept realistic." },
        { emoji: "calendar", title: "Booking & locations", description: "Your booking system or WhatsApp, with a route for each location you work from." },
        { emoji: "star", title: "Reviews", description: "Your genuine Google reviews, displayed where they help clients decide." },
        { emoji: "memo", title: "Aftercare & FAQs", description: "Answers to the questions clients ask before and after treatment." },
      ],
    },
    {
      id: "prescribers",
      eyebrow: "Compliance",
      title: "Websites for nurse prescribers",
      paragraphs: [
        "If you prescribe, your website still counts as advertising, so prescription-only medicines can't be promoted to the public. We build your treatment pages around concerns and consultations instead, with wording that makes clear a consultation may or may not lead to a prescription.",
      ],
      bullets: [
        "Concern-led page titles such as “Lines and wrinkles consultation”",
        "No prescription-only medicine names in headings, prices, image names or meta descriptions",
        "Consented, unedited before-and-after photos",
        "Privacy, cookie and terms pages that meet UK GDPR",
      ],
    },
    {
      id: "update",
      eyebrow: "Admin dashboard",
      title: "Change prices and add treatments yourself",
      paragraphs: [
        `With Option A (£${pricing.optionA.price}) you get an admin dashboard to add treatments, change prices, upload photos, post offers and write blog posts yourself. Option B (£${pricing.optionB.price}) is the same website, with changes made by us on request at ${pricing.updateFee} per update.`,
      ],
    },
  ],
  faqs: [
    ...faqsById(["leaving-nhs"]),
    { id: "nurse-cost", q: "How much does a website for an aesthetic nurse cost?", a: `£${pricing.optionB.price} for a custom website, or £${pricing.optionA.price} with an admin dashboard so you can update it yourself. Both go live in ${pricing.timeline}.` },
    { id: "nurse-new", q: "I'm just starting out. Do I need a full website?", a: "A focused site with an about page, treatment pages, prices and booking is enough to start. You can add pages and blog posts later." },
    { id: "nurse-locations", q: "I work from more than one place. Can the website handle that?", a: "Yes. We add a clear section for each location with its own booking route and opening times." },
    { id: "nurse-prescriber", q: "Can I list the medicines I prescribe?", a: "Not promotionally. Prescription-only medicines can't be advertised to the public, so we use concern-led, consultation-first wording instead." },
    { id: "nurse-photos", q: "Can I show before-and-after photos?", a: "Yes, if they are genuine, unedited, from your own clients and used with written consent." },
  ],
  related: [
    { href: "/blog/leaving-nhs-start-aesthetics-business-online", label: "Leaving the NHS for aesthetics" },
    { href: routes.aestheticClinicWebsites, label: "Aesthetic clinic website design" },
    BLOG.asa,
    BLOG.cost,
    { href: "/clinic-types/aesthetic-nurses", label: "Marketing for aesthetic nurses" },
    { href: `${routes.work}/penelope-j-aesthetics`, label: "Penelope J Aesthetics case study" },
  ],
  ctaTitle: "Get a website that represents your practice",
};

export const redesignPage: LandingContent = {
  path: routes.redesign,
  breadcrumbs: [{ name: "Clinic Website Redesign", path: routes.redesign }],
  eyebrow: "Clinic website redesign",
  h1: ["Clinic website redesign", "for UK clinics"],
  heroLine: "Replace a slow, dated or hard-to-edit website without losing the Google visibility you've built.",
  chips: ["Wix, Squarespace & WordPress", "Rankings protected", `Live in ${pricing.timeline}`],
  lead:
    "A clinic website redesign replaces your current site with a faster, clearer one, while keeping the content and search visibility that already work. We rebuild clinic websites from Wix, Squarespace, WordPress or older custom sites, set up redirects so existing Google rankings carry over, and add an admin dashboard so you never get stuck again.",
  schema: {
    name: "Clinic website redesign",
    serviceType: "Website redesign for aesthetics clinics",
    description: "Redesign and rebuild of UK clinic websites from Wix, Squarespace or WordPress, with redirects to protect search visibility.",
    offers: true,
  },
  sections: [
    {
      id: "signs",
      eyebrow: "Signs it's time",
      title: "When it's time to replace your clinic website",
      tone: "tint",
      cards: [
        { emoji: "hourglass", title: "It's slow on phones", description: "Most clients find you on a phone. If pages take a long time to load, many leave." },
        { emoji: "locked", title: "You can't edit it", description: "Every price change means waiting for, or paying, someone else." },
        { emoji: "thinking", title: "It looks like everyone else's", description: "A template site makes it hard to show what makes your clinic different." },
        { emoji: "search", title: "It's not found on Google", description: "Treatments are hidden in one long page, so Google can't match them to searches." },
        { emoji: "shield", title: "Wording may break the rules", description: "Older sites often name prescription-only medicines in a way the ASA doesn't allow." },
        { emoji: "pound", title: "You pay monthly for little", description: "Builder subscriptions and add-ons add up for features you don't use." },
      ],
    },
    {
      id: "wix",
      eyebrow: "From Wix and others",
      title: "Moving from Wix, Squarespace or WordPress to a custom clinic website",
      paragraphs: [
        "Website builders are a fine way to start, but clinics often outgrow them: pages get slow as more apps are added, treatment pages are hard to structure for search, and the monthly cost keeps rising. A custom clinic website is built around your treatments from the start and loads quickly on mobile.",
        "We move across the content that works, rewrite what doesn't, and keep the same domain name, so clients and Google can still find you at the same address.",
      ],
    },
    {
      id: "rankings",
      eyebrow: "Protecting your rankings",
      title: "How we protect your existing Google visibility",
      bullets: [
        "We list every page on your current site before we start",
        "Each old page address is permanently redirected (301) to its new equivalent",
        "Titles and descriptions are kept or improved, never lost",
        "We submit the new sitemap to Google Search Console and Bing on launch day",
        "We check for broken links and missing pages after launch",
      ],
    },
    {
      id: "process",
      eyebrow: "How it works",
      title: "Your redesign, step by step",
      paragraphs: [
        `We start with a free review of your current site, agree what to keep, then design and build the new site. You review it on your own devices before launch, and we hand over the admin dashboard on ${pricing.trainingFormat}. Most redesigns go live in ${pricing.timeline} once we have your content.`,
      ],
    },
  ],
  faqs: [
    ...faqsById(["fed-up-developer"]),
    { id: "re-cost", q: "How much does a clinic website redesign cost?", a: `The same as a new website: £${pricing.optionB.price}, or £${pricing.optionA.price} with an admin dashboard so you can update it yourself.` },
    { id: "re-rankings", q: "Will I lose my Google rankings if I redesign?", a: "Not if it's done properly. We redirect every old page to its new address and keep or improve titles, which is what protects existing visibility." },
    { id: "re-domain", q: "Do I keep my domain name?", a: "Yes. Your website keeps the same address; only what's behind it changes." },
    { id: "re-content", q: "Do I need to rewrite all my content?", a: "No. We keep what works, improve what doesn't and fill gaps, such as missing treatment pages or prices." },
    { id: "re-wix", q: "Can you move my site off Wix?", a: "Yes. We rebuild it as a custom clinic website and set up redirects from your old Wix page addresses." },
  ],
  related: [
    { href: "/blog/aesthetic-clinic-website-mistakes", label: "12 clinic website mistakes to fix" },
    { href: routes.aestheticClinicWebsites, label: "Aesthetic clinic website design" },
    BLOG.cost,
    BLOG.ai,
    { href: "/clinic-types/skin-clinics", label: "Skin clinic website design" },
  ],
  ctaTitle: "Find out what your current website is missing",
  secondaryCta: { href: routes.freeAudit, label: "Get a free website audit", short: "Free audit" },
};
