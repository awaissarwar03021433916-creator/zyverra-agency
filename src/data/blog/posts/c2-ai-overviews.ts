import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const aiOverviewsPost: BlogPost = {
  slug: "google-ai-overviews-aesthetic-clinics",
  title: "Google AI Overviews and aesthetics clinics: what changes in 2026",
  seoTitle: "Google AI Overviews for Aesthetic Clinics (2026) | Zyverra",
  metaDescription:
    "What Google AI Overviews mean for aesthetic clinics in 2026: how they choose sources, what changes for clinic websites, and a practical response plan.",
  excerpt:
    "What Google's AI Overviews and AI Mode mean for aesthetics clinics, what Google says about appearing in them, and what to do next.",
  date: "2026-11-11",
  updated: "2026-11-11",
  category: "SEO & AI search",
  targetKeyword: "AI Overviews aesthetic clinic",
  image: "/blog/google-ai-overviews-aesthetic-clinics/og",
  imageAlt: "Google AI Overviews and aesthetics clinics",
  servicePath: "/seo-ai-search-for-aesthetic-clinics",
  body: [
    {
      type: "answer",
      text: "Google AI Overviews summarise answers at the top of some search results and link to supporting pages. For aesthetics clinics, that means informational questions about treatments may be answered before anyone clicks, while local, ready-to-book searches still lead to Maps and websites. Google says the same SEO best practices apply, so clear, helpful, well-structured pages remain the way to be included.",
    },
    {
      type: "tldr",
      items: [
        "AI Overviews appear for some searches, not all, and link to source pages.",
        "Google says there's no special optimisation for AI features beyond good SEO.",
        "Informational treatment questions are most affected; local booking searches still rely on Maps and websites.",
        "Answer-first pages, accurate details and genuine reputation help you be cited.",
      ],
    },
    { type: "heading", text: "What are Google AI Overviews?" },
    {
      type: "paragraph",
      text: "AI Overviews are AI-generated summaries that appear at the top of some Google results, with links to the pages they draw on. AI Mode is a more conversational search experience built on similar technology. Google describes both, and how sites can appear in them, in its documentation for site owners (" + cite(SRC.googleAiFeatures, "Google Search Central") + ").",
    },
    { type: "heading", text: "Which clinic searches are most affected?" },
    {
      type: "table",
      caption: "How AI Overviews may affect different clinic searches",
      head: ["Type of search", "Example", "Likely effect"],
      rows: [
        ["Informational", "“How long does a chemical peel take to heal?”", "Often answered in an overview; fewer clicks, but citations are possible"],
        ["Comparison", "“Microneedling vs chemical peel”", "Overview summaries likely; clear comparison pages may be cited"],
        ["Local, ready to book", "“Skin clinic near me”", "Map results and local websites remain central"],
        ["Branded", "“[Your clinic] reviews”", "Your profile, website and review sites dominate"],
      ],
      note: "Illustrative; Google decides when overviews appear and they change over time.",
    },
    { type: "heading", text: "What does Google say about appearing in AI Overviews?" },
    {
      type: "paragraph",
      text: "Google's guidance is that the same fundamentals apply: make pages that are helpful and people-first, technically accessible to Google, with important content in text, and accurate structured data that matches what's visible (" + cite(SRC.googleAiFeatures, "Google Search Central") + ", " + cite(SRC.googleHelpful, "Google Search Central") + "). There's no separate markup or file you need for AI features.",
    },
    { type: "heading", text: "How should a clinic website respond?" },
    { type: "subheading", text: "Write pages that are worth citing" },
    {
      type: "paragraph",
      text: "AI Overviews draw on pages that answer questions clearly. A treatment page that opens with a direct, accurate answer and then covers downtime, sessions, price and aftercare is easier to cite than a page of marketing language. See " + POST("aesthetic-treatment-page-seo", "how to write treatment pages that rank and convert") + ".",
    },
    { type: "subheading", text: "Strengthen your local signals" },
    {
      type: "paragraph",
      text: "Ready-to-book searches still lead to Maps and websites, so local SEO matters as much as ever. Keep your Google Business Profile complete and active (" + cite(SRC.gbpRanking, "Google Business Profile Help") + "). Read " + POST("google-map-pack-aesthetic-clinic", "how to rank in the Google Map Pack") + ".",
    },
    { type: "subheading", text: "Build a genuine reputation" },
    {
      type: "paragraph",
      text: "Research by Ahrefs found that brand mentions across the web correlated with appearing in AI Overviews (" + cite(SRC.ahrefsAio, "Ahrefs") + "). Reviews, local press, professional listings and partnerships all count. Avoid shortcuts: Google warns against inauthentic mentions.",
    },
    { type: "subheading", text: "Stay accurate and compliant" },
    {
      type: "paragraph",
      text: "AI summaries can repeat what your pages say, so accuracy matters. Keep prices and treatments current, and keep wording within UK advertising rules, especially for injectables (" + cite(SRC.asaFineLine, "ASA") + ").",
    },
    { type: "heading", text: "Should clinics worry about losing traffic?" },
    {
      type: "paragraph",
      text: "Some informational clicks may go down when questions are answered on the results page. But many people researching an aesthetic treatment still want to see the clinic, the practitioner, prices and results before they book. Clinics that answer questions clearly, show who they are and make booking easy are well placed, whether visitors arrive from a classic result, a Map listing or an overview citation.",
    },
    { type: "heading", text: "How can you track AI Overview visibility?" },
    {
      type: "list",
      items: [
        "Watch impressions and clicks for your treatment pages in " + cite(SRC.searchConsole, "Google Search Console") + "",
        "Search your key treatment questions monthly and note whether an overview appears and whom it cites",
        "Track enquiries and bookings alongside traffic; they matter more than clicks",
      ],
    },
    {
      type: "checklist",
      title: "AI Overviews action plan for clinics",
      items: [
        "List the ten questions clients ask most about your top treatments",
        "Make sure each is answered clearly on a treatment page or FAQ",
        "Open every treatment page with a direct two-sentence answer",
        "Check structured data matches visible content",
        "Keep your Google Business Profile complete and active",
        "Earn genuine mentions and reviews",
        "Review monthly which questions show overviews and who's cited",
      ],
    },
    { type: "heading", text: "A worked example: making a treatment FAQ citable" },
    {
      type: "paragraph",
      text: "Suppose people often ask “How long does redness last after microneedling?”. A weak answer buried in a long paragraph is hard for any system to use. A citable answer is a clear question as a heading, followed by a direct, accurate first sentence and then the detail:",
    },
    {
      type: "note",
      text: "“How long does redness last after microneedling? Most people have mild redness for one to three days. It's usually similar to a light sunburn and fades steadily; we'll give you aftercare to help it settle.”",
    },
    {
      type: "paragraph",
      text: "Make sure the answer is accurate for your clinic and the treatment you offer, and keep it up to date. Clear question-and-answer structure helps human readers first, which is exactly what Google says it rewards (" + cite(SRC.googleHelpful, "Google Search Central") + ").",
    },
    { type: "heading", text: "What about Bing, Perplexity and ChatGPT?" },
    {
      type: "paragraph",
      text: "AI answers don't only come from Google. ChatGPT search draws on web results, and published research found its citations closely matched Bing's results, so make sure your site is verified in " + cite(SRC.bingWebmaster, "Bing Webmaster Tools") + " and use " + cite(SRC.indexNow, "IndexNow") + " for updates. The same clear, accurate pages serve every assistant.",
    },
    { type: "heading", text: "What mistakes should clinics avoid in the AI era?" },
    {
      type: "list",
      items: [
        "Publishing large volumes of thin, AI-written pages; Google's guidance focuses on helpful, original content",
        "Creating near-identical pages for every town",
        "Buying mentions or fake reviews",
        "Letting prices, treatments and team details go out of date",
        "Making medical or results claims your clinic can't support",
      ],
    },
    { type: "heading", text: "What should you do this month?" },
    {
      type: "ordered",
      items: [
        "Pick your three most important treatments.",
        "Search the five questions clients ask most about each, and note whether an overview appears and whom it cites.",
        "Rewrite the opening of each treatment page as a direct, accurate two-sentence answer.",
        "Add any missing questions as FAQs, answered in full sentences.",
        "Check your Google Business Profile is complete and your details match your website.",
      ],
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "Our " + LINK.seo + " service covers Google, AI Overviews and other assistants, and our " + LINK.websites + " are built with answer-first pages and structured data. See " + LINK.pricing + ", and read " + POST("get-clinic-recommended-by-chatgpt", "how ChatGPT chooses which clinics to recommend") + ".",
    },
    {
      type: "faq",
      items: [
        { q: "Can I opt my clinic into AI Overviews?", a: "No. Google decides when overviews appear and which pages they cite. Good SEO and helpful pages give you the best chance." },
        { q: "Do I need special schema for AI Overviews?", a: "Google says no special markup is needed. Use accurate structured data that matches your visible content." },
        { q: "Will AI Overviews reduce my bookings?", a: "They may reduce some informational clicks, but local, ready-to-book searches still lead to Maps and websites." },
        { q: "How do I know if my clinic appears in AI Overviews?", a: "Search your key treatment questions regularly and note which sources are cited, and watch your Search Console data." },
        { q: "Is AI search the same as SEO?", a: "Largely. Google says its AI features rely on the same SEO fundamentals, with reputation across the web playing a supporting role." },
      ],
    },
    { type: "sources", items: [SRC.googleAiFeatures, SRC.googleHelpful, SRC.gbpRanking, SRC.ahrefsAio, SRC.asaFineLine, SRC.searchConsole] },
    { type: "cta", title: "Ready for AI search?", text: "Get a free audit that checks your AI search readiness, or message us on WhatsApp." },
  ],
};
