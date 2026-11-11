// Blog content model. Posts are typed TypeScript modules (no MDX dependency),
// so content is validated at build time and rendered as plain server HTML.
//
// Inline text in paragraphs and list items supports a tiny markup subset:
//   **bold**, *italic*, `code`, [label](href)
// where href may be a site path ("/pricing"), an external URL, or the special
// value "whatsapp:" which resolves to the prefilled WhatsApp link.

export type Source = { label: string; url: string };

export type BlogBlock =
  /** Answer-first summary box shown at the top of a post. */
  | { type: "answer"; text: string }
  /** TL;DR bullet box (shown after the opening answer). */
  | { type: "tldr"; items: string[] }
  /** H2 — also used to build the table of contents. */
  | { type: "heading"; text: string }
  /** H3 */
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "ordered"; items: string[] }
  | { type: "checklist"; items: string[]; title?: string }
  /** Comparison or reference table. */
  | { type: "table"; caption: string; head: string[]; rows: string[][]; note?: string }
  /** Small italic disclaimer, e.g. "not legal advice". */
  | { type: "note"; text: string }
  /** Placeholder for a screenshot the owner still has to supply (dev-only). */
  | { type: "placeholder"; text: string }
  /** Visible FAQ (plain HTML, details/summary). */
  | { type: "faq"; items: { q: string; a: string }[] }
  /** Sources cited in the post. */
  | { type: "sources"; items: Source[] }
  /** Call-to-action block linking to the free audit and WhatsApp. */
  | { type: "cta"; title: string; text: string };

export type BlogCategory =
  | "Websites"
  | "Local SEO"
  | "SEO & AI search"
  | "Ads"
  | "Social media"
  | "Clinic growth"
  | "Compliance"
  | "AI & software";

export type BlogPost = {
  slug: string;
  /** Visible H1. */
  title: string;
  /**
   * Title used wherever the post is listed off its own page (blog index,
   * related guides, RSS). Lets the compliance post keep prescription-only
   * medicine brand names on its own page only.
   */
  listingTitle?: string;
  /** <title> tag, ≤60 characters. */
  seoTitle: string;
  /** Meta description, ≤155 characters. */
  metaDescription: string;
  excerpt: string;
  /** ISO dates (YYYY-MM-DD). */
  date: string;
  updated: string;
  category: BlogCategory;
  /** One main keyword per post — never shared with another post or page. */
  targetKeyword: string;
  image: string;
  imageAlt: string;
  /** The service page this post supports (used for the CTA and internal links). */
  servicePath: string;
  body: BlogBlock[];
};
