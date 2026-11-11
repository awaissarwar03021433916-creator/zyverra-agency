// Clinic portfolio (/work and /work/[slug]).
//
// Only clients with `published: true` get a page, a card and a sitemap entry.
// Everything stated here was checked against the live client site on
// 11 November 2026; nothing is inferred. Serra Aesthetics and Penelope J
// Aesthetics stay unpublished until they are confirmed as live clients who
// have given permission to be named.

export type ClinicCaseStudy = {
  slug: string;
  name: string;
  location: string;
  locationDetail: string;
  liveUrl: string;
  published: boolean;
  summary: string;
  goal: string;
  built: string[];
  ownerCanUpdate: string[];
  pages: string[];
  /** Real screenshot path under /public, when one exists. */
  screenshot?: { src: string; alt: string; width: number; height: number };
  /** Approved client testimonial. Leave undefined unless written permission exists. */
  testimonial?: { quote: string; author: string };
};

export const clinicCaseStudies: ClinicCaseStudy[] = [
  {
    slug: "belgrave-cosmetics",
    name: "Belgrave Cosmetics",
    location: "Bristol",
    locationDetail: "1st floor, 25 Osprey Court, Whitchurch, Bristol BS14 0BB",
    liveUrl: "https://belgravecosmetics.co.uk/",
    published: true,
    summary:
      "A treatment-led website for a South Bristol aesthetics and skin clinic, with 12 treatment menus, clear prices, a before-and-after gallery and online booking.",
    goal: "Belgrave Cosmetics offers a very wide treatment range, from facials and laser hair removal to body sculpting and skin treatments. The clinic needed a website that lets clients find the right treatment quickly, see prices up front and book without phoning.",
    built: [
      "A homepage that starts with “What would you like to work on?”, sending visitors straight to the right treatment",
      "12 specialist treatment menus with “from” prices and individually priced treatments",
      "Book now and Book a consultation buttons linked to the clinic's Book in Beautiful booking page",
      "A before-and-after gallery captioned “Results vary”, plus a dedicated Results page",
      "Reviews, FAQs (“Good to know”), a blog, and a Visit page with address, opening hours and directions",
    ],
    // TODO [CONFIRM]: which content Belgrave's own team edits via the admin
    // dashboard (the site footer currently reads "Developed & managed by
    // Zyverralabs"). The section is hidden on the page while this list is empty.
    ownerCanUpdate: [],
    pages: ["Home", "Treatments", "Results", "Reviews", "Blog", "Visit", "Contact", "Book online"],
    // TODO [CONFIRM]: add a real screenshot of the live site to /public/work/.
  },
  {
    slug: "serra-aesthetics",
    name: "Serra Aesthetics",
    location: "London",
    locationDetail: "",
    liveUrl: "https://serraaesthetics.co.uk/",
    // TODO [CONFIRM]: live client + permission to name. Unpublished until then.
    published: false,
    summary: "",
    goal: "",
    built: [],
    ownerCanUpdate: [],
    pages: [],
  },
  {
    slug: "penelope-j-aesthetics",
    name: "Penelope J Aesthetics",
    location: "",
    locationDetail: "",
    liveUrl: "https://penelopejaesthetics.com/",
    // TODO [CONFIRM]: live client + permission to name. Unpublished until then.
    published: false,
    summary: "",
    goal: "",
    built: [],
    ownerCanUpdate: [],
    pages: [],
  },
];

export const publishedCaseStudies = clinicCaseStudies.filter((c) => c.published);

export function getCaseStudy(slug: string): ClinicCaseStudy | undefined {
  return publishedCaseStudies.find((c) => c.slug === slug);
}
