import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const mapPackPost: BlogPost = {
  slug: "google-map-pack-aesthetic-clinic",
  title: "How to rank in the Google Map Pack as an aesthetics clinic",
  seoTitle: "Google Maps Ranking for Aesthetic Clinics | Zyverra",
  metaDescription:
    "How to rank an aesthetic clinic in Google Maps and the local Map Pack: relevance, distance and prominence explained, with a 10-step action list. Read it.",
  excerpt:
    "What decides which clinics appear in Google's local Map Pack, and the practical steps that improve your chances, within Google's rules.",
  date: "2026-11-11",
  updated: "2026-11-11",
  category: "Local SEO",
  targetKeyword: "Google Maps aesthetic clinic",
  image: "/blog/google-map-pack-aesthetic-clinic/og",
  imageAlt: "Ranking an aesthetics clinic in the Google Map Pack",
  servicePath: "/google-business-profile-for-aesthetic-clinics",
  body: [
    {
      type: "answer",
      text: "Google ranks local Map Pack results mainly on relevance, distance and prominence. To improve your aesthetics clinic's position, make your Google Business Profile complete and accurate, choose the right categories, build treatment pages that match your services, keep your details consistent everywhere, and earn a steady flow of genuine reviews and local mentions. Nobody can guarantee a position.",
    },
    {
      type: "tldr",
      items: [
        "Relevance: categories, services and website content that match what people search.",
        "Distance: you can't change it, so don't fake an address.",
        "Prominence: reviews, mentions, links and how well known you are.",
        "Your website matters for Maps too; treatment pages back up your profile.",
      ],
    },
    { type: "heading", text: "What is the Google Map Pack?" },
    {
      type: "paragraph",
      text: "The Map Pack is the small map with a short list of local businesses that Google shows for searches with local intent, such as “skin clinic near me” or “lip filler Manchester”. It often appears above ordinary results, which is why it brings so many calls and website visits for clinics.",
    },
    { type: "heading", text: "How does Google decide which clinics appear?" },
    {
      type: "paragraph",
      text: "Google says local results are based mainly on three factors (" + cite(SRC.gbpRanking, "Google Business Profile Help") + "):",
    },
    {
      type: "table",
      caption: "The three local ranking factors",
      head: ["Factor", "What it means", "What you can do"],
      rows: [
        ["Relevance", "How well your profile matches the search", "Accurate categories, services and descriptions; matching treatment pages"],
        ["Distance", "How far you are from the searcher or the searched location", "Nothing to game; keep your real address or service area accurate"],
        ["Prominence", "How well known and well regarded you are", "Genuine reviews, local mentions and links, a strong website"],
      ],
    },
    { type: "heading", text: "How do you improve relevance?" },
    {
      type: "list",
      items: [
        "Choose the most specific accurate primary category, and add genuine secondary ones",
        "List every treatment as a service, with a clear description",
        "Write a plain-English business description that says what you treat",
        "Build a treatment page on your website for each service, using the same names",
        "Link your profile to your website, and use LocalBusiness structured data that matches (" + cite(SRC.googleLocalBusinessSD, "Google Search Central") + ")",
      ],
    },
    { type: "heading", text: "Why can't you game distance?" },
    {
      type: "paragraph",
      text: "It's tempting to use a second address closer to a busy area, but Google's guidelines require a real location where you see clients, or a service area if you travel to them (" + cite(SRC.gbpGuidelines, "Google guidelines") + "). Virtual offices and fake addresses risk suspension. Instead, make your profile so relevant and well regarded that you appear for people further away.",
    },
    { type: "heading", text: "How do you build prominence?" },
    {
      type: "paragraph",
      text: "Prominence reflects how well known your clinic is, online and off. Google notes that review count and score are factored into local ranking, and that information from across the web, such as links and articles, also plays a part (" + cite(SRC.gbpRanking, "Google Business Profile Help") + "). Practical ways to build it:",
    },
    {
      type: "list",
      items: [
        "Ask every happy client for a review, with a direct link, without incentives (" + cite(SRC.googleContribution, "Google policy") + ")",
        "Reply to every review professionally",
        "Get listed accurately on reputable directories and supplier “find a practitioner” lists you genuinely qualify for",
        "Earn local mentions: local press, events, partnerships with nearby businesses",
        "Keep your website strong: fast, clear treatment pages and helpful articles",
      ],
    },
    { type: "heading", text: "Does your website affect your Map Pack ranking?" },
    {
      type: "paragraph",
      text: "Yes. Google uses information from your website to understand your business, and a strong website contributes to prominence. A profile linking to a slow, thin website with one “treatments” page is weaker than one linking to a fast site with a clear page for each treatment. See " + POST("aesthetic-treatment-page-seo", "how to write treatment pages that rank") + ".",
    },
    { type: "heading", text: "What should you avoid?" },
    {
      type: "list",
      items: [
        "Keyword-stuffed business names",
        "Fake or virtual addresses",
        "Buying, swapping or incentivising reviews",
        "Duplicate profiles for the same location",
        "Inconsistent details between your profile, website and directories",
        "Prescription-only medicine names in services, posts or photos",
      ],
    },
    {
      type: "checklist",
      title: "10 steps to a stronger Map Pack presence",
      items: [
        "Claim and verify your profile",
        "Use your real business name and address or service area",
        "Choose the most accurate primary category",
        "Add every treatment as a service",
        "Upload real photos, and add new ones monthly",
        "Post updates regularly",
        "Ask for genuine reviews and reply to all of them",
        "Match your profile details to your website exactly",
        "Build a treatment page for each service",
        "Earn local mentions and listings",
      ],
    },
    { type: "heading", text: "How long does it take to move up?" },
    {
      type: "paragraph",
      text: "It depends on your area and competition. Fixing categories and details can help within weeks, while reviews and prominence build over months. Be wary of anyone promising a guaranteed Map Pack position; nobody controls Google's results.",
    },
    { type: "heading", text: "What does a Map Pack audit look like?" },
    {
      type: "ordered",
      items: [
        "Search your three most important treatments plus your town, on a phone, logged out.",
        "Note which clinics appear in the Map Pack and in what order.",
        "Compare your profile with theirs: categories, number and recency of reviews, photos, posts and services.",
        "Compare websites: does each competitor have a dedicated page for that treatment? Do you?",
        "List the three biggest gaps and fix them first.",
      ],
    },
    {
      type: "paragraph",
      text: "Repeat this every month or two. Results move as competitors change too, so trends matter more than any single day's position.",
    },
    { type: "heading", text: "Do citations and directories still matter?" },
    {
      type: "paragraph",
      text: "Being listed accurately on reputable directories and industry sites helps confirm your details and adds to how well known you are. Focus on quality and accuracy rather than quantity: your booking platform profile, relevant professional or supplier listings you genuinely qualify for, and local business directories. Make sure every listing shows exactly the same name, address and phone number as your profile.",
    },
    { type: "heading", text: "How do service-area businesses appear on Maps?" },
    {
      type: "paragraph",
      text: "If you visit clients or work from home, set your profile as a service-area business with your address hidden (" + cite(SRC.gbpGuidelines, "Google guidelines") + "). You'll still appear in local results, generally around where you're based. Make your website's location page clear about the areas you cover, and don't create pages for every nearby town; thin, near-identical location pages don't help clients and can harm your site.",
    },
    { type: "heading", text: "How should your website's location page support Maps?" },
    {
      type: "paragraph",
      text: "Your contact or visit page should repeat exactly what your profile says: business name, address or service area, phone number and opening hours, plus directions, parking and nearby landmarks. Embed a map, and link to your profile so clients can read reviews. This consistency is part of what helps Google trust your details, and it answers the practical questions clients ask before their first visit. Read " + POST("aesthetic-clinic-website-checklist", "our clinic website checklist") + " for the full list of pages.",
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "Our " + LINK.gbp + " work is included in " + LINK.seo + " packages, alongside " + LINK.websites + " built to support your profile. See " + LINK.pricing + ", and read our " + POST("google-business-profile-aesthetic-clinic-guide", "step-by-step Google Business Profile guide") + ".",
    },
    {
      type: "faq",
      items: [
        { q: "How do I get my clinic in the Google Map Pack?", a: "Complete and accurate profile, the right categories, matching treatment pages, consistent details and a steady flow of genuine reviews. Nobody can guarantee a position." },
        { q: "Do reviews affect Google Maps ranking?", a: "Google says review count and score are factored into local ranking, as part of prominence." },
        { q: "Can I rank in a town where I don't have an address?", a: "You'll mainly appear near your real location. Strong relevance and prominence can extend your reach, but faking addresses breaks Google's rules." },
        { q: "Does posting on my profile help?", a: "Regular posts keep your profile active and informative for visitors. Treat them as part of keeping the profile accurate and useful." },
        { q: "How long does local SEO take?", a: "Some changes help within weeks; reviews and reputation build over months." },
      ],
    },
    { type: "sources", items: [SRC.gbpRanking, SRC.gbpGuidelines, SRC.googleContribution, SRC.googleLocalBusinessSD] },
    { type: "cta", title: "Want to show up on Google Maps?", text: "Get a free audit of your profile and website, or message us on WhatsApp." },
  ],
};
