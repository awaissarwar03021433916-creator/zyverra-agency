// Clinic portfolio (/work and /work/[slug]).
//
// Every fact here was checked against the live client site on 11 November
// 2026 (each site's footer credits Zyverra Labs). Nothing is inferred.

export type ClinicCaseStudy = {
  slug: string;
  name: string;
  /** Short location label used on cards. */
  location: string;
  locationDetail: string;
  liveUrl: string;
  published: boolean;
  /** Who the site is for, e.g. "Aesthetics & skin clinic". */
  type: string;
  summary: string;
  /** Meta description, ≤155 characters. */
  metaDescription: string;
  goal: string;
  built: string[];
  ownerCanUpdate: string[];
  pages: string[];
  /** Short highlight chips shown on cards. */
  highlights: string[];
  screenshot: { src: string; alt: string; width: number; height: number };
  /** Brand accent used for the card glow. */
  accent: string;
  /** Real screenshots of this client's admin dashboard. */
  adminShots?: { src: string; alt: string; width: number; height: number; caption: string }[];
  testimonial?: { quote: string; author: string };
};

export const clinicCaseStudies: ClinicCaseStudy[] = [
  {
    slug: "belgrave-cosmetics",
    name: "Belgrave Cosmetics",
    location: "Bristol",
    locationDetail: "Hawkfield Business Park, Whitchurch, Bristol BS14",
    liveUrl: "https://belgravecosmetics.co.uk/",
    published: true,
    type: "Beauty & aesthetic clinic",
    summary:
      "A treatment-led website for a South Bristol beauty and aesthetic clinic, with 12 treatment menus, clear prices, a before-and-after gallery and online booking.",
    metaDescription:
      "Belgrave Cosmetics, Bristol: a clinic website with 12 treatment menus, prices, online booking and an admin dashboard. See the case study.",
    goal: "Belgrave Cosmetics offers a very wide treatment range, from facials and laser hair removal to body sculpting and skin treatments. The clinic needed a website that lets clients find the right treatment quickly, see prices up front and book without phoning.",
    built: [
      "A homepage that starts with “What would you like to work on?”, sending visitors straight to the right treatment",
      "12 specialist treatment menus with “from” prices and individually priced treatments",
      "Book now and Book a consultation buttons linked to the clinic's Book in Beautiful booking page",
      "A before-and-after gallery captioned “Results vary”, plus a dedicated Results page",
      "Reviews, FAQs (“Good to know”), a blog, and a Visit page with address, opening hours and directions",
    ],
    // From the real admin screenshots (public/work/admin/belgrave-admin-*.png).
    ownerCanUpdate: [
      "Every home page section: hero, reviews, treatments, video, before-and-after and FAQs",
      "All 12 treatment categories: add, reorder, feature, hide or delete them",
      "Each treatment page's prices, photo, text and FAQs",
      "Reviews and before-and-after photos",
      "Blog posts: add, edit and publish",
    ],
    pages: ["Home", "Treatments", "Results", "Reviews", "Blog", "Visit", "Contact", "Book online"],
    highlights: ["12 treatment menus", "Online booking", "Before & afters"],
    screenshot: {
      src: "/work/belgrave.png",
      alt: "Belgrave Cosmetics homepage: Beauty & Aesthetic Clinic in South Bristol, built by Zyverra Labs",
      width: 1284,
      height: 606,
    },
    accent: "#7cb342",
    adminShots: [
      { src: "/work/admin/belgrave-admin-home-page.png", width: 1365, height: 601, caption: "Editing the home page", alt: "Belgrave Cosmetics admin dashboard: editing the home page hero headline and intro text" },
      { src: "/work/admin/belgrave-admin-treatments.png", width: 1347, height: 607, caption: "Treatment categories & prices", alt: "Belgrave Cosmetics admin dashboard: 12 treatment categories with prices, featured and live toggles" },
      { src: "/work/admin/belgrave-admin-treatment-photo.png", width: 1352, height: 604, caption: "Treatment page photo & text", alt: "Belgrave Cosmetics admin dashboard: replacing a treatment page photo and its description" },
      { src: "/work/admin/belgrave-admin-blog.png", width: 1364, height: 606, caption: "Blog posts", alt: "Belgrave Cosmetics admin dashboard: list of published blog posts with edit, view and delete buttons" },
    ],
  },
  {
    slug: "penelope-j-aesthetics",
    name: "Penelope J Aesthetics",
    location: "Bristol",
    locationDetail: "Hanham, Whitchurch and Longwell Green, Bristol",
    liveUrl: "https://www.penelopejaesthetics.com/",
    published: true,
    type: "Aesthetic practitioner, 3 clinics",
    summary:
      "An elegant website for an advanced aesthetic practitioner working across three Bristol clinics, with clear prices, a clinic selector, Klarna finance and a before-and-after gallery.",
    metaDescription:
      "Penelope J Aesthetics, Bristol: a practitioner website covering 3 clinics, with prices, Klarna, WhatsApp booking and an admin dashboard.",
    goal: "Penelope treats clients at three Bristol locations, each booked a different way. She needed one website that presents her natural-looking approach, shows prices clearly and sends each client to the right clinic and booking route.",
    built: [
      "A hero built around her approach — “Timeless beauty. Natural elegance.” — with booking and treatment buttons",
      "A clinic selector for Hanham, Whitchurch and Longwell Green, each with its own booking route",
      "Signature treatment pages with clear “from” prices and a free-consultation message",
      "Klarna “pay later” finance information and a featured seasonal offer",
      "A before-and-after gallery, client reviews, FAQs and a Meet Penelope introduction",
    ],
    // From the real admin screenshots (public/work/admin/penelope-admin-*.png).
    ownerCanUpdate: [
      "Treatment categories and services: add a category, add or remove services, change prices",
      "Clinics, opening hours and offers",
      "The “Signature treatments” cards on the home page",
      "Reviews, FAQs and before-and-after photos (and which appear on the home page)",
      "Appointments overview",
    ],
    pages: ["Home", "Treatments", "Locations", "About", "Reviews", "Blog", "Contact"],
    highlights: ["3 clinic locations", "Klarna finance", "WhatsApp booking"],
    screenshot: {
      src: "/work/penelope.png",
      alt: "Penelope J Aesthetics homepage: Timeless beauty, natural elegance, aesthetic clinic in Hanham, Bristol, built by Zyverra Labs",
      width: 1316,
      height: 603,
    },
    accent: "#b0784a",
    adminShots: [
      { src: "/work/admin/penelope-admin-overview.png", width: 1345, height: 492, caption: "Dashboard overview", alt: "Penelope J Aesthetics dashboard overview: appointments, services and prices, reviews, before-and-after photos and FAQs" },
      { src: "/work/admin/penelope-admin-treatments.png", width: 1366, height: 605, caption: "Treatments & prices", alt: "Penelope J Aesthetics dashboard: treatment categories and service prices with visibility toggles" },
      { src: "/work/admin/penelope-admin-home-cards.png", width: 1366, height: 576, caption: "Home page cards", alt: "Penelope J Aesthetics dashboard: editing the signature treatment cards shown on the home page" },
      { src: "/work/admin/penelope-admin-before-after.png", width: 1358, height: 603, caption: "Before & after photos", alt: "Penelope J Aesthetics dashboard: uploading and ordering before-and-after photos" },
    ],
  },
  {
    slug: "serra-aesthetics",
    name: "Serra Aesthetics",
    location: "London",
    locationDetail: "Priory Court, Walthamstow, London E17",
    liveUrl: "https://www.serraaesthetics.co.uk/",
    published: true,
    type: "Practitioner-led clinic",
    summary:
      "A warm, practitioner-led website for a Walthamstow aesthetics clinic, with treatment prices, online booking, a results gallery and booking guides.",
    metaDescription:
      "Serra Aesthetics, Walthamstow London: a practitioner-led clinic website with prices, online booking and a results gallery. See the case study.",
    goal: "Serra Aesthetics is a practitioner-led clinic in Walthamstow. Founder Berna wanted a website that builds trust before the first consultation, explains treatments and prices clearly, and makes booking straightforward.",
    built: [
      "A hero that leads with natural, confidence-boosting results in Walthamstow and a free-consultation call to action",
      "A trust bar — reviewed on Google, fully insured, medical-grade products",
      "Treatment sections for injectables, skin boosters, facials and body, with prices shown",
      "Online booking (choose a treatment, day and time) with a clear booking and cancellation policy",
      "A “Real clients · real results” gallery, client reviews, guides and a Visit the clinic section",
    ],
    ownerCanUpdate: [],
    pages: ["Home", "Treatments", "About", "Blog", "FAQ", "Contact", "Book online"],
    highlights: ["Online booking", "Results gallery", "Booking guides"],
    screenshot: {
      src: "/work/serra.png",
      alt: "Serra Aesthetics homepage: Natural, confidence-boosting aesthetics in Walthamstow, built by Zyverra Labs",
      width: 1064,
      height: 617,
    },
    accent: "#b8954a",
  },
];

export const publishedCaseStudies = clinicCaseStudies.filter((c) => c.published);

export function getCaseStudy(slug: string): ClinicCaseStudy | undefined {
  return publishedCaseStudies.find((c) => c.slug === slug);
}
