import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const localSeoPlanPost: BlogPost = {
  slug: "local-seo-aesthetic-clinic-90-day-plan",
  title: "Local SEO for aesthetic clinics: a 90-day plan",
  seoTitle: "Local SEO for Aesthetic Clinics: 90-Day Plan | Zyverra",
  metaDescription:
    "A week-by-week 90-day local SEO plan for UK aesthetic clinics: Google Business Profile, treatment pages, reviews, Bing and measurement. Free to follow.",
  excerpt:
    "A practical 90-day local SEO plan for UK aesthetics clinics, from fixing your Google Business Profile to treatment pages, reviews and measuring results.",
  date: "2026-11-12",
  updated: "2026-11-12",
  category: "Local SEO",
  targetKeyword: "local SEO plan aesthetic clinic",
  image: "/blog/local-seo-aesthetic-clinic-90-day-plan/og",
  imageAlt: "A 90-day local SEO plan for an aesthetics clinic",
  servicePath: "/seo-ai-search-for-aesthetic-clinics",
  body: [
    {
      type: "answer",
      text: "A 90-day local SEO plan for an aesthetics clinic has three stages. In days 1–30, fix the foundations: Google Business Profile, consistent details, Search Console and Bing. In days 31–60, build a page for every treatment and start a steady review routine. In days 61–90, earn local mentions and measure what's working. Expect early gains, not finished results.",
    },
    {
      type: "tldr",
      items: [
        "Month 1: profile, categories, matching details everywhere, Search Console and Bing Webmaster Tools.",
        "Month 2: one page per treatment with price and town, plus a review request after every appointment.",
        "Month 3: local mentions, directories you genuinely qualify for, and a simple monthly report.",
        "SEO for a small clinic usually shows first movement in weeks and builds over months.",
      ],
    },
    { type: "heading", text: "Why does a clinic need a local SEO plan?" },
    {
      type: "paragraph",
      text: "Most people choosing an aesthetics clinic search for a treatment and a place: “lip filler Bristol”, “skin clinic near me”, “laser hair removal Clapham”. Google answers those searches with a map of local businesses and a list of web pages. A plan stops you doing random tasks and makes sure the work that moves rankings happens in the right order.",
    },
    {
      type: "paragraph",
      text: "Google says local results are based mainly on relevance, distance and prominence (" + cite(SRC.gbpRanking, "Google Business Profile Help") + "). You can't change distance, so the plan below focuses on the two you can: how relevant your profile and website are to each search, and how well known and well reviewed your clinic is.",
    },
    { type: "heading", text: "Why does your competitor show up on Google and you don't?" },
    {
      type: "paragraph",
      text: "Usually because their profile and website look more relevant and better established to Google. They may have a more accurate category, more treatments listed, more recent reviews, a page for each treatment that mentions the town, and consistent details across the web. Sometimes they're simply closer to the person searching, which you can't change.",
    },
    {
      type: "paragraph",
      text: "Search for your main treatment and town in a private browser window, then compare yourself with the top three clinics on these points:",
    },
    {
      type: "table",
      caption: "Competitor comparison checklist",
      head: ["Check", "Where to look", "What good looks like"],
      rows: [
        ["Primary category", "Their Google Business Profile", "The most specific accurate category, not a generic one"],
        ["Services listed", "Profile → Services", "Every treatment, with a short description"],
        ["Reviews", "Profile → Reviews", "Recent, steady reviews with owner replies"],
        ["Treatment pages", "Their website", "A separate page per treatment, with price and location"],
        ["Photos", "Profile → Photos", "Real photos of the clinic, team and room, added regularly"],
        ["Consistency", "Directories, social profiles", "Same name, address and phone everywhere"],
      ],
    },
    {
      type: "paragraph",
      text: "Each gap you find becomes a task in the plan. Don't copy their wording; build something more useful for your own clients.",
    },
    { type: "heading", text: "Days 1–30: what are the foundations?" },
    {
      type: "paragraph",
      text: "The first month is about making sure Google, Bing and AI assistants have accurate, complete information about your clinic. None of it is glamorous, but everything later depends on it.",
    },
    {
      type: "checklist",
      title: "Month 1 checklist",
      items: [
        "Claim or create your Google Business Profile and verify it",
        "Use your real business name, with no added keywords, as Google's guidelines require",
        "Choose the most specific accurate primary category and any genuine secondary ones",
        "List every treatment as a service with a short, factual description",
        "Add opening hours, your booking link and at least 10 real photos",
        "Set up Google Search Console and submit your sitemap",
        "Set up Bing Webmaster Tools and Bing Places, using the same details",
        "Write your name, address and phone number down once, and use exactly that everywhere",
      ],
    },
    {
      type: "paragraph",
      text: "Google's guidelines are strict about names and addresses: no virtual offices, and no keywords stuffed into the business name (" + cite(SRC.gbpGuidelines, "Google guidelines") + "). Breaking them can get a profile suspended, which costs far more than it gains. Search Console shows which searches already find you (" + cite(SRC.searchConsole) + "), and Bing Webmaster Tools does the same for Bing (" + cite(SRC.bingWebmaster) + ").",
    },
    {
      type: "paragraph",
      text: "Our " + POST("google-business-profile-aesthetic-clinic-guide", "step-by-step Google Business Profile guide") + " walks through every field.",
    },
    { type: "heading", text: "Days 31–60: how do treatment pages and reviews fit in?" },
    {
      type: "paragraph",
      text: "Month two builds relevance. Google needs to see that your clinic offers the exact treatment someone searched for, in the place they searched. The strongest signal you control is a dedicated page on your website for each treatment.",
    },
    {
      type: "list",
      items: [
        "**One page per treatment**, with a title such as “Skin peels in Clifton, Bristol”",
        "**An answer-first opening**: what it is, who it suits, price and how long it takes",
        "**Your practitioner**, with qualifications and a link to their public register entry",
        "**Consented results**, genuine and unedited, with context about typical outcomes",
        "**FAQs** in your clients' own words, and a booking button on every screen",
      ],
    },
    {
      type: "paragraph",
      text: "Keep injectable pages consultation-led and avoid naming prescription-only medicines promotionally; the ASA treats your website as advertising (" + cite(SRC.asaPomWebsites, "CAP") + "). Our guide to " + POST("aesthetic-treatment-page-seo", "writing treatment pages that rank") + " has a worked example.",
    },
    {
      type: "paragraph",
      text: "Alongside the pages, start a review routine. Send a direct review link by text or email after every appointment, and reply to every review. Google says the number and score of reviews are factored into local ranking (" + cite(SRC.gbpRanking, "Google") + "), and its policies forbid incentives and fake reviews (" + cite(SRC.googleContribution, "Google policy") + ").",
    },
    { type: "heading", text: "Days 61–90: how do you build prominence?" },
    {
      type: "paragraph",
      text: "Month three is about being known. Prominence comes from what the wider web says about your clinic: links, mentions, listings and reviews. Work through these steadily rather than all at once:",
    },
    {
      type: "list",
      items: [
        "List your clinic on reputable directories and registers you genuinely qualify for, such as " + cite(SRC.saveFace, "Save Face") + " or the " + cite(SRC.jccp, "JCCP") + " register",
        "Ask product suppliers whose training you've completed about their “find a practitioner” listings",
        "Partner with nearby businesses (hair salons, gyms, bridal shops) for genuine cross-promotion",
        "Offer local press or community groups a useful expert comment on skin or safety topics",
        "Post a Google Business Profile update every week: a new photo, an FAQ answer, an event",
      ],
    },
    { type: "heading", text: "What does the 90-day plan look like week by week?" },
    {
      type: "table",
      caption: "90-day local SEO plan for an aesthetics clinic",
      head: ["Weeks", "Focus", "Tasks"],
      rows: [
        ["1–2", "Profile", "Claim and verify, category, services, hours, photos, booking link"],
        ["3–4", "Consistency", "Search Console, Bing Webmaster Tools, Bing Places, fix mismatched directory details"],
        ["5–6", "Treatment pages", "Top three treatments rewritten answer-first with price and town"],
        ["7–8", "Reviews", "Review link after every appointment; reply to every review"],
        ["9–10", "More pages", "Remaining treatments, FAQ page, location page if you have more than one site"],
        ["11–12", "Prominence", "Directories, supplier listings, local partnerships"],
        ["13", "Measure", "Compare calls, website clicks, direction requests and bookings with week 1"],
      ],
      note: "A guide, not a guarantee. Busy cities and competitive treatments take longer.",
    },
    { type: "heading", text: "How long does SEO take for a small clinic?" },
    {
      type: "paragraph",
      text: "Fixing your Google Business Profile can help within a few weeks, because Google picks up profile changes quickly. New treatment pages often take several weeks to be indexed and start ranking. Reviews and local reputation build over months. For most small clinics, expect first movement within 4–8 weeks and steadier results after three to six months.",
    },
    {
      type: "paragraph",
      text: "Those ranges are a planning guide rather than a promise. Timing depends on your area, how many clinics compete for the same treatments and how much work was already in place. Nobody can guarantee a ranking, and any agency that promises one is a red flag.",
    },
    { type: "heading", text: "How do you measure whether local SEO is working?" },
    {
      type: "paragraph",
      text: "Track a small set of numbers on the first working day of each month, in a simple spreadsheet:",
    },
    {
      type: "list",
      items: [
        "**Google Business Profile performance:** calls, website clicks, direction requests and bookings",
        "**Search Console:** clicks and impressions for treatment-plus-town searches",
        "**Bookings by source:** ask new clients how they found you and record it",
        "**Reviews:** total count, new reviews this month and average rating",
      ],
    },
    {
      type: "paragraph",
      text: "If impressions rise but clicks don't, improve the page titles and descriptions. If clicks rise but bookings don't, the problem is on the page itself; our guide to " + POST("clinic-website-not-getting-bookings", "why a clinic website isn't getting bookings") + " covers the fixes.",
    },
    { type: "heading", text: "What should you avoid?" },
    {
      type: "list",
      items: [
        "Fake or virtual addresses to appear in a nearby town",
        "Keywords added to your business name on Google",
        "Buying, swapping or incentivising reviews",
        "Copying treatment descriptions from suppliers or competitors",
        "Promoting prescription-only medicines by name in your profile, posts or pages",
      ],
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "Our " + LINK.seo + " packages follow this plan for you: Local costs £300 a month and covers your Google Business Profile, Bing Places, two treatment pages a month and reporting; Local + AI search costs £500 a month and adds answer-first guides and AI visibility checks. If your website can't support treatment pages, our " + LINK.websites + " start at £300 and go live in 7–10 working days. See " + LINK.pricing + ", or read about " + POST("google-map-pack-aesthetic-clinic", "ranking in the Google Map Pack") + ".",
    },
    {
      type: "faq",
      items: [
        { q: "What is local SEO for an aesthetics clinic?", a: "It's the work that helps your clinic appear when people nearby search for your treatments: your Google Business Profile, treatment pages, consistent details across the web, and genuine reviews and mentions." },
        { q: "How long does local SEO take for a clinic?", a: "Profile fixes can help within weeks; treatment pages and reviews usually take three to six months to build steady results. Nobody can guarantee a ranking." },
        { q: "Can I do local SEO myself?", a: "Yes. The 90-day plan above is designed to be followed by a clinic owner in a few hours a week. Many clinics do month one themselves and outsource the treatment pages." },
        { q: "Do I need a website for local SEO, or is a Google profile enough?", a: "A profile alone can appear on Maps, but a website with a page for each treatment gives Google far more to match against searches, and gives clients somewhere to book." },
        { q: "How much does local SEO cost for a clinic in the UK?", a: "UK agencies commonly charge from a few hundred pounds a month upwards. Our Local package costs £300 a month and Local + AI search costs £500 a month." },
      ],
    },
    { type: "sources", items: [SRC.gbpRanking, SRC.gbpGuidelines, SRC.googleContribution, SRC.searchConsole, SRC.bingWebmaster, SRC.asaPomWebsites] },
    { type: "cta", title: "Want this plan done for you?", text: "Get a free audit of your Google profile and website, or message us on WhatsApp." },
  ],
};
