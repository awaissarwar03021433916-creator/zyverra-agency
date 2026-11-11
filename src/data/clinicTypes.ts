// Clinic-type pages (/clinic-types/[slug]). Each targets its own main keyword
// so none competes with a service page (e.g. "beauty salon marketing UK" here
// vs "beauty salon website design UK" on the salon service page).

import type { IconName } from "@/components/marketing/ColorIcon";
import type { LandingContent } from "@/components/marketing/LandingPage";
import { pricing } from "@/config/business";
import { routes } from "@/config/site";

export type ClinicType = {
  slug: string;
  name: string;
  emoji: IconName;
  short: string;
  mainKeyword: string;
  title: string;
  description: string;
  content: LandingContent;
};

const BLOG = {
  cost: { href: "/blog/aesthetic-clinic-website-cost-uk", label: "Clinic website prices in the UK" },
  asa: { href: "/blog/botox-advertising-rules-clinic-website", label: "UK advertising rules for clinic websites" },
  ai: { href: "/blog/get-clinic-recommended-by-chatgpt", label: "Getting your clinic recommended by ChatGPT" },
};

const path = (slug: string) => `${routes.clinicTypes}/${slug}`;
const crumbs = (slug: string, name: string) => [
  { name: "Clinic Types", path: routes.clinicTypes },
  { name, path: path(slug) },
];

export const clinicTypes: ClinicType[] = [
  {
    slug: "aesthetics-clinics",
    name: "Aesthetics clinics",
    emoji: "sparkles",
    short: "Multi-treatment clinics that need every treatment found and booked.",
    mainKeyword: "aesthetics clinic marketing",
    title: "Aesthetics Clinic Marketing & Websites | Zyverra Labs",
    description:
      "Aesthetics clinic marketing that fills your diary: a website you can edit, local SEO and Meta ads. Websites from £300, live in 7–10 days. Get a quote.",
    content: {
      path: path("aesthetics-clinics"),
      breadcrumbs: crumbs("aesthetics-clinics", "Aesthetics Clinics"),
      eyebrow: "For aesthetics clinics",
      h1: ["Aesthetics clinic marketing", "that fills your diary"],
      heroLine: "A website built around your treatments, plus the local SEO and ads that bring consultations in.",
      chips: ["Treatment-led websites", "Local SEO", "Meta ads"],
      lead:
        "Aesthetics clinic marketing works best when every channel points to one website that clients trust. We build that website around your treatments and prices, then add local SEO, Google Business Profile management and consultation-led Meta ads, so new clients can find you, compare you and book without phoning.",
      schema: {
        name: "Marketing and websites for aesthetics clinics",
        serviceType: "Website design and marketing for aesthetics clinics",
        description: "Websites, local SEO and Meta ads for UK aesthetics clinics.",
        offers: true,
      },
      sections: [
        {
          id: "who",
          eyebrow: "Who this is for",
          title: "Clinics offering a wide range of treatments",
          paragraphs: [
            "Most aesthetics clinics offer far more than one treatment: skin treatments, injectables, laser, body treatments and wellness services, often delivered by more than one practitioner. That range is a strength, but on a poorly structured website it becomes a maze, and clients leave before they find what they came for.",
          ],
        },
        {
          id: "needs",
          eyebrow: "What your site needs",
          title: "What an aesthetics clinic website needs",
          tone: "tint",
          cards: [
            { emoji: "clipboard", title: "Treatment categories", description: "Clear groups, such as skin, injectables, laser and body, each with its own page." },
            { emoji: "pound", title: "Visible prices", description: "“From” prices on every category and full price lists on each page." },
            { emoji: "handshake", title: "Practitioner profiles", description: "Who treats clients, their qualifications and insurance." },
            { emoji: "calendar", title: "One-tap booking", description: "A booking link on every treatment page, connected to your existing system." },
          ],
          cardColumns: 4,
        },
        {
          id: "compliance",
          eyebrow: "Compliance",
          title: "Compliance notes for aesthetics clinics",
          bullets: [
            "Injectable treatments are presented as consultation-led, without promoting prescription-only medicines",
            "Price lists keep consultation-only treatments separate from freely advertised ones",
            "Before-and-after galleries use consented, unedited photos with a “results vary” note",
            "Offers avoid pressure tactics or countdowns on injectable treatments",
          ],
        },
        {
          id: "example",
          eyebrow: "Example",
          title: "Example: Belgrave Cosmetics, Bristol",
          paragraphs: [
            "Belgrave Cosmetics offers 12 treatment categories. We built a homepage that asks “What would you like to work on?” and sends visitors straight to the right menu, with prices on every category and booking on every page.",
          ],
        },
      ],
      faqs: [
        { id: "ac-channels", q: "Which marketing should an aesthetics clinic start with?", a: "Start with a clear website and an accurate Google Business Profile. Once those are working, local SEO and Meta ads bring more people to a site that converts them." },
        { id: "ac-many", q: "We offer dozens of treatments. Will the website be cluttered?", a: "No. We group treatments into categories, give each its own page and keep the homepage focused on helping clients choose." },
        { id: "ac-team", q: "Can each practitioner have a profile?", a: "Yes. Each practitioner can have a profile with their qualifications and the treatments they provide." },
        { id: "ac-update", q: "Can our team update the website ourselves?", a: `Yes, with Option A (£${pricing.optionA.price}) you get an admin dashboard to change treatments, categories, prices, photos and offers.` },
      ],
      related: [
        { href: routes.aestheticClinicWebsites, label: "Aesthetic clinic website design" },
        { href: routes.metaAds, label: "Facebook ads for aesthetic clinics" },
        BLOG.asa,
        BLOG.ai,
      ],
      ctaTitle: "Tell us about your aesthetics clinic",
    },
  },
  {
    slug: "skin-clinics",
    name: "Skin clinics",
    emoji: "lotus",
    short: "Clinics selling courses and skin journeys, not single appointments.",
    mainKeyword: "skin clinic website design",
    title: "Skin Clinic Website Design | Zyverra Labs",
    description:
      "Skin clinic website design for UK clinics: concern-led pages, courses, consultations and booking. From £300, live in 7–10 days. Get your quote today.",
    content: {
      path: path("skin-clinics"),
      breadcrumbs: crumbs("skin-clinics", "Skin Clinics"),
      eyebrow: "For skin clinics",
      h1: ["Skin clinic website design", "built around skin concerns"],
      heroLine: "Help clients understand their skin, choose a course and book a consultation.",
      chips: ["Concern-led pages", "Courses & packages", "Skin consultations"],
      lead:
        "Skin clinic website design is different from a general beauty website because clients usually arrive with a concern, such as acne, pigmentation or ageing skin, rather than a treatment name. We build skin clinic websites around those concerns, explain the courses that address them and lead clients to a skin consultation.",
      schema: {
        name: "Skin clinic website design",
        serviceType: "Website design for skin clinics",
        description: "Concern-led websites for UK skin clinics, with treatment courses, consultations and booking.",
        offers: true,
      },
      sections: [
        {
          id: "concerns",
          eyebrow: "Concern-led",
          title: "Pages organised by skin concern",
          paragraphs: [
            "Someone searching for help with acne scarring may not know whether they need microneedling, a peel or a laser treatment. A concern page explains the options in plain English, who each suits, how many sessions are usual and what a course costs, then invites them to a consultation.",
          ],
          cards: [
            { emoji: "bubbles", title: "Acne & scarring", description: "Options, typical course length and realistic expectations." },
            { emoji: "mirror", title: "Pigmentation", description: "Causes, treatments and the role of daily skincare." },
            { emoji: "lotus", title: "Ageing skin", description: "Texture, firmness and hydration treatments, without prescription-only medicine promotion." },
            { emoji: "heart", title: "Sensitive skin", description: "Gentle options and a clear consultation process." },
          ],
          cardColumns: 4,
        },
        {
          id: "courses",
          eyebrow: "Courses",
          title: "Selling courses, not single sessions",
          tone: "tint",
          bullets: [
            "Course prices shown alongside single-session prices",
            "A skincare products section if you sell retail",
            "Progress-focused galleries showing results across a course",
            "Aftercare pages clients can return to between sessions",
          ],
        },
        {
          id: "compliance",
          eyebrow: "Compliance",
          title: "Compliance notes for skin clinics",
          bullets: [
            "No promises of guaranteed results or “permanent” outcomes",
            "Prescription skincare is mentioned only as part of a consultation, never promoted",
            "Before-and-after photos are consented, unedited and representative",
          ],
        },
      ],
      faqs: [
        { id: "sk-concern", q: "Should my skin clinic website be organised by treatment or by concern?", a: "Both. Concern pages help clients who don't know the treatment they need; treatment pages help those who do. We link the two together." },
        { id: "sk-courses", q: "Can I show course prices?", a: "Yes. We show course and single-session prices together so clients can compare." },
        { id: "sk-products", q: "Can I sell skincare products on the website?", a: "We can add a products section linking to your shop or booking system. Full e-commerce can be quoted separately." },
        { id: "sk-update", q: "Can I add new treatments myself?", a: "Yes, with the Option A admin dashboard you can add treatments, concerns and prices yourself." },
      ],
      related: [
        { href: routes.treatmentPages, label: "Treatment pages that rank" },
        { href: routes.seoAiSearch, label: "SEO for aesthetic clinics" },
        BLOG.cost,
        BLOG.asa,
      ],
      ctaTitle: "Tell us about your skin clinic",
    },
  },
  {
    slug: "med-spas",
    name: "Med spas",
    emoji: "bubbles",
    short: "Packages, memberships and seasonal offers that change often.",
    mainKeyword: "med spa website design UK",
    title: "Med Spa Website Design UK | Zyverra Labs",
    description:
      "Med spa website design UK: packages, memberships, offers and booking you can update yourself. From £300, live in 7–10 working days. Request a quote.",
    content: {
      path: path("med-spas"),
      breadcrumbs: crumbs("med-spas", "Med Spas"),
      eyebrow: "For med spas",
      h1: ["Med spa website design", "for UK med spas"],
      heroLine: "Present packages, memberships and seasonal offers, and change them yourself.",
      chips: ["Packages & memberships", "Seasonal offers", "Gift vouchers"],
      lead:
        "Med spa website design needs to balance a relaxing, premium feel with clear medical credibility. We build med spa websites that present packages, memberships and seasonal offers clearly, show the clinical team behind them, and let you update offers yourself as often as they change.",
      schema: {
        name: "Med spa website design",
        serviceType: "Website design for med spas",
        description: "Websites for UK med spas with packages, memberships, offers and booking.",
        offers: true,
      },
      sections: [
        {
          id: "experience",
          eyebrow: "The experience",
          title: "A premium feel with clinical credibility",
          paragraphs: [
            "Med spa clients are often buying an experience as much as a treatment. Your website should feel calm and premium, with strong photography of your space, while still making the clinical side clear: who performs treatments, their qualifications, and how consultations work.",
          ],
        },
        {
          id: "commercial",
          eyebrow: "What sells",
          title: "Packages, memberships and offers",
          tone: "tint",
          cards: [
            { emoji: "gem", title: "Packages", description: "Bundled treatments with clear prices and what's included." },
            { emoji: "spiral-calendar", title: "Memberships", description: "Monthly plans explained simply, with a clear way to join." },
            { emoji: "sparkles", title: "Seasonal offers", description: "Offers you can publish and remove yourself from the dashboard." },
            { emoji: "money-bag", title: "Gift vouchers", description: "A link to your voucher system, prominent at key times of year." },
          ],
          cardColumns: 4,
        },
        {
          id: "compliance",
          eyebrow: "Compliance",
          title: "Compliance notes for med spas",
          bullets: [
            "Offers and packages never include prescription-only medicines promotionally",
            "No time pressure or countdown timers on injectable treatments",
            "Spa and wellness claims are kept factual and not medical",
          ],
        },
      ],
      faqs: [
        { id: "ms-offers", q: "Can I change offers myself?", a: "Yes. With the Option A dashboard you can publish, edit and remove offers and packages whenever you like." },
        { id: "ms-memberships", q: "Can the website take membership sign-ups?", a: "We link to the membership or booking system you use, and explain each plan clearly on the site." },
        { id: "ms-vouchers", q: "Can you add gift vouchers?", a: "Yes. We link your voucher system and can feature it prominently at busy times of year." },
        { id: "ms-cost", q: "How much does a med spa website cost?", a: `£${pricing.optionB.price}, or £${pricing.optionA.price} with an admin dashboard. Both go live in ${pricing.timeline}.` },
      ],
      related: [
        { href: routes.aestheticClinicWebsites, label: "Aesthetic clinic website design" },
        { href: routes.socialReels, label: "Social media management for aesthetic clinics" },
        BLOG.cost,
        BLOG.ai,
      ],
      ctaTitle: "Tell us about your med spa",
    },
  },
  {
    slug: "aesthetic-nurses",
    name: "Aesthetic nurses",
    emoji: "heart",
    short: "Independent practitioners building a personal brand.",
    mainKeyword: "aesthetic nurse marketing",
    title: "Aesthetic Nurse Marketing UK | Zyverra Labs",
    description:
      "Aesthetic nurse marketing: a personal-brand website, Google profile and Instagram that win clients. Websites from £300, live in 7–10 days. Get started.",
    content: {
      path: path("aesthetic-nurses"),
      breadcrumbs: crumbs("aesthetic-nurses", "Aesthetic Nurses"),
      eyebrow: "For aesthetic nurses",
      h1: ["Aesthetic nurse marketing", "for independent practitioners"],
      heroLine: "Build a personal brand clients trust: website, Google profile and Instagram working together.",
      chips: ["Personal brand", "Google profile", "Instagram"],
      lead:
        "Aesthetic nurse marketing is about building trust in you as a practitioner. The most effective mix for most independent nurses is a professional website, an active Google Business Profile and a consistent Instagram presence, all telling the same story about your training and approach.",
      schema: {
        name: "Marketing for aesthetic nurses",
        serviceType: "Marketing for aesthetic practitioners",
        description: "Website, Google Business Profile and social media marketing for UK aesthetic nurses.",
      },
      sections: [
        {
          id: "brand",
          eyebrow: "Personal brand",
          title: "Clients choose a practitioner, not a logo",
          paragraphs: [
            "For an independent nurse, your name is the brand. Marketing should introduce you clearly and consistently: your nursing background, your training, your values and the kind of results you aim for. The same photos, wording and details should appear on your website, Google profile and social media.",
          ],
        },
        {
          id: "channels",
          eyebrow: "Channels",
          title: "Where aesthetic nurses find new clients",
          tone: "tint",
          cards: [
            { emoji: "desktop", title: "Your website", description: "The home of your brand, with treatments, prices and booking.", href: routes.nurseWebsites, linkLabel: "Websites for aesthetic nurses" },
            { emoji: "pin", title: "Google Business Profile", description: "How local clients find you on Google Maps.", href: routes.googleBusinessProfile, linkLabel: "Google profile" },
            { emoji: "movie-camera", title: "Instagram & reels", description: "Showing your work and personality, within the rules.", href: routes.socialReels, linkLabel: "Social media" },
            { emoji: "star", title: "Reviews", description: "Genuine reviews that new clients read before booking." },
          ],
          cardColumns: 4,
        },
        {
          id: "compliance",
          eyebrow: "Compliance",
          title: "Compliance notes for aesthetic nurses",
          bullets: [
            "Social posts and captions never promote prescription-only medicines",
            "Reels avoid nicknames and plays on words for anti-wrinkle treatments",
            "No targeting of under-18s for cosmetic procedures",
            "Consent is collected for every before-and-after photo used",
          ],
        },
      ],
      faqs: [
        { id: "an-start", q: "Where should a new aesthetic nurse start with marketing?", a: "A simple website and a complete Google Business Profile first, then Instagram once you have results to show." },
        { id: "an-budget", q: "How much should I spend on marketing?", a: `A website starts at £${pricing.optionB.price}. Monthly marketing packages start from £300, and you can add them only when you're ready.` },
        { id: "an-instagram", q: "Can you manage my Instagram?", a: "Yes. Our social media packages include posts, reels and captions written within UK advertising rules." },
        { id: "an-website", q: "Do you build websites for aesthetic nurses too?", a: "Yes. See our dedicated page on websites for aesthetic nurses and practitioners." },
      ],
      related: [
        { href: routes.nurseWebsites, label: "Website for aesthetic nurses" },
        { href: routes.socialReels, label: "Instagram marketing for aesthetic clinics" },
        BLOG.asa,
        BLOG.ai,
      ],
      ctaTitle: "Build your practice's online presence",
    },
  },
  {
    slug: "beauty-salons",
    name: "Beauty salons",
    emoji: "scissors",
    short: "Busy salons where the website's job is getting bookings.",
    mainKeyword: "beauty salon marketing UK",
    title: "Beauty Salon Marketing UK | Zyverra Labs",
    description:
      "Beauty salon marketing UK: a website with your menu and booking, Google Maps visibility and reels. Websites from £300, live in 7–10 days. Get a quote.",
    content: {
      path: path("beauty-salons"),
      breadcrumbs: crumbs("beauty-salons", "Beauty Salons"),
      eyebrow: "For beauty salons",
      h1: ["Beauty salon marketing", "that brings bookings"],
      heroLine: "Turn searches and scrolls into bookings with a fast website, Google Maps and reels.",
      chips: ["Booking-led", "Google Maps", "Instagram reels"],
      lead:
        "Beauty salon marketing has one main job: turning people who find you on Google or Instagram into bookings. The most effective salons pair a fast website with their full menu and prices, an active Google Business Profile and regular reels, all leading to the same booking link.",
      schema: {
        name: "Marketing for beauty salons",
        serviceType: "Marketing for beauty salons",
        description: "Websites, Google Business Profile and social media marketing for UK beauty salons.",
      },
      sections: [
        {
          id: "journey",
          eyebrow: "The booking journey",
          title: "From search to booking in a few taps",
          paragraphs: [
            "Salon clients often decide quickly. They search “nails near me” or see a reel, check your prices and photos, and book, usually on their phone. Every step of your marketing should make that path shorter: a profile that shows your prices, a website that loads fast and a booking button that's always in reach.",
          ],
        },
        {
          id: "mix",
          eyebrow: "Marketing mix",
          title: "The marketing that works for salons",
          tone: "tint",
          cards: [
            { emoji: "desktop", title: "Salon website", description: "Menu, prices, gallery and booking.", href: routes.beautySalonWebsites, linkLabel: "Beauty salon website design" },
            { emoji: "pin", title: "Google Maps", description: "Show up for “near me” searches.", href: routes.googleBusinessProfile, linkLabel: "Google profile" },
            { emoji: "movie-camera", title: "Reels", description: "Short videos of your work and team.", href: routes.socialReels, linkLabel: "Reels" },
            { emoji: "megaphone", title: "Local ads", description: "Seasonal campaigns to fill quiet weeks.", href: routes.metaAds, linkLabel: "Meta ads" },
          ],
          cardColumns: 4,
        },
        {
          id: "own-site",
          eyebrow: "Your own front door",
          title: "Why your own website still matters",
          paragraphs: [
            "Booking marketplaces are useful for discovery, but every client who books through your own website books with you directly. Your website is the one place you control your brand, your menu and the way clients book.",
          ],
        },
      ],
      faqs: [
        { id: "bs-first", q: "What's the most important marketing for a beauty salon?", a: "An accurate Google Business Profile and a fast website with your prices and booking link. Social media then keeps you front of mind." },
        { id: "bs-booking", q: "Can the website connect to my booking system?", a: "Yes. We link or embed Fresha, Treatwell, Timely, Phorest or whichever system you use." },
        { id: "bs-reels", q: "Do I need reels?", a: "They're one of the most effective ways to show your work, but they work best when they lead to a website and booking link." },
        { id: "bs-price", q: "How much does salon marketing cost?", a: `Websites start at £${pricing.optionB.price}. Social media, SEO and Meta ads packages each start from £300 to £350 a month.` },
      ],
      related: [
        { href: routes.beautySalonWebsites, label: "Beauty salon website design UK" },
        { href: routes.socialReels, label: "Social media management for salons" },
        BLOG.cost,
        BLOG.ai,
      ],
      ctaTitle: "Tell us about your salon",
    },
  },
  {
    slug: "lash-and-brow-studios",
    name: "Lash & brow studios",
    emoji: "lipstick",
    short: "Small, booking-led studios that need to look established.",
    mainKeyword: "lash and brow studio website",
    title: "Lash and Brow Studio Website Design | Zyverra Labs",
    description:
      "A lash and brow studio website that looks established and gets bookings: services, prices, gallery and booking. From £300, live in 7–10 days. Ask us.",
    content: {
      path: path("lash-and-brow-studios"),
      breadcrumbs: crumbs("lash-and-brow-studios", "Lash & Brow Studios"),
      eyebrow: "For lash & brow studios",
      h1: ["A lash and brow studio website", "that gets you booked"],
      heroLine: "Look established, show your work and send clients straight to booking.",
      chips: ["Service menu", "Gallery", "Patch-test info"],
      lead:
        "A lash and brow studio website needs to look polished, show your work and make booking effortless. We build simple, fast websites for lash and brow artists with a clear service menu, a gallery of your best sets and shapes, patch-test and aftercare information, and a booking button on every page.",
      schema: {
        name: "Lash and brow studio website design",
        serviceType: "Website design for lash and brow studios",
        description: "Websites for UK lash and brow studios with services, prices, gallery and booking.",
        offers: true,
      },
      sections: [
        {
          id: "studio",
          eyebrow: "Small studio, big impression",
          title: "Look as established as your work",
          paragraphs: [
            "Many lash and brow artists work from a small studio, a room in a salon or from home. A professional website gives new clients confidence before they book, especially when it shows your training, hygiene standards and real photos of your work.",
          ],
        },
        {
          id: "pages",
          eyebrow: "What's included",
          title: "What a lash and brow website needs",
          tone: "tint",
          cards: [
            { emoji: "clipboard", title: "Service menu", description: "Lash sets, infills, lifts, brow shaping and tints, each with a price." },
            { emoji: "picture", title: "Gallery", description: "Your best work, grouped by style." },
            { emoji: "check", title: "Patch tests", description: "When a patch test is needed and how to book one." },
            { emoji: "memo", title: "Aftercare", description: "Aftercare guides clients can find again after their appointment." },
          ],
          cardColumns: 4,
        },
        {
          id: "booking",
          eyebrow: "Booking",
          title: "Booking without the back-and-forth",
          bullets: [
            "A booking button on every page, linked to your booking system",
            "Clear deposit and cancellation policy",
            "WhatsApp for quick questions",
          ],
        },
      ],
      faqs: [
        { id: "lb-cost", q: "How much is a website for a lash and brow studio?", a: `£${pricing.optionB.price} for a custom website, or £${pricing.optionA.price} with a dashboard to change prices and photos yourself.` },
        { id: "lb-home", q: "I work from home. Can I still have a professional website?", a: "Yes. We show your service area rather than a full address, and focus on your work, training and reviews." },
        { id: "lb-gallery", q: "Can I update my gallery myself?", a: "Yes, with the Option A admin dashboard you can upload new photos whenever you like." },
        { id: "lb-booking", q: "Which booking systems do you work with?", a: "Fresha, Treatwell, Timely, Phorest and most other booking systems with a booking link." },
      ],
      related: [
        { href: routes.beautySalonWebsites, label: "Beauty salon website design UK" },
        { href: routes.socialReels, label: "Instagram marketing" },
        BLOG.cost,
        BLOG.ai,
      ],
      ctaTitle: "Tell us about your studio",
    },
  },
];

export function getClinicType(slug: string): ClinicType | undefined {
  return clinicTypes.find((t) => t.slug === slug);
}
