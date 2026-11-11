import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

const SEER = { label: "Seer Interactive — 87% of SearchGPT citations match Bing's top results (Feb 2025)", url: "https://www.seerinteractive.com/insights/87-percent-of-searchgpt-citations-match-bings-top-results" };
const AHREFS_LLMS = { label: "Ahrefs — llms.txt study of 137,210 sites", url: "https://ahrefs.com/blog/llmstxt-study/" };

export const aiSearchPost: BlogPost = {
  slug: "get-clinic-recommended-by-chatgpt",
  title: "How ChatGPT chooses which clinics to recommend (and how to be one of them)",
  seoTitle: "How ChatGPT Chooses Which Clinics to Recommend | Zyverra",
  metaDescription:
    "How ChatGPT recommends clinics, and how to be one of them: crawlable pages, Bing indexing, consistent details and genuine mentions. A UK clinic's guide.",
  excerpt:
    "How AI assistants like ChatGPT find and choose clinics, and the practical steps that make yours easier to recommend.",
  date: "2026-11-11",
  updated: "2026-11-11",
  category: "SEO & AI search",
  targetKeyword: "ChatGPT recommend clinic",
  image: "/blog/get-clinic-recommended-by-chatgpt/og",
  imageAlt: "How ChatGPT chooses which clinics to recommend",
  servicePath: "/seo-ai-search-for-aesthetic-clinics",
  body: [
    {
      type: "answer",
      text: "When ChatGPT recommends a clinic, it usually searches the web and summarises the pages it finds. To be one of the clinics it mentions, you need clear, crawlable pages that answer people's questions, indexing in Bing as well as Google, consistent business details everywhere, and genuine mentions of your clinic on reputable websites. Nobody can guarantee a recommendation, but these are the foundations.",
    },
    {
      type: "tldr",
      items: [
        "ChatGPT search looks things up on the web, then cites sources.",
        "A 2025 study found ChatGPT search citations closely matched Bing's results, so Bing indexing matters.",
        "Answer-first treatment pages and consistent details make you easy to understand.",
        "Mentions of your clinic on other sites correlate with AI visibility in published research.",
        "llms.txt is optional; it's not where to start.",
      ],
    },
    { type: "heading", text: "How does ChatGPT find clinics to recommend?" },
    {
      type: "paragraph",
      text: "When a question benefits from current information, ChatGPT can search the web and show the sources it used (" + cite(SRC.openaiSearch, "OpenAI") + "). It then summarises what it found. So when someone asks “Who's a good skin clinic in Leeds?”, the answer depends heavily on which pages its search turns up, and what those pages say about your clinic.",
    },
    {
      type: "paragraph",
      text: "In a February 2025 analysis of more than 500 citations, Seer Interactive found that 87% of SearchGPT citations matched Bing's top results, compared with 56% for Google (" + cite(SEER, "Seer Interactive") + "). Search behaviour changes over time, so treat this as a direction rather than a rule, but the practical point stands: if Bing hasn't indexed your site, you're at a disadvantage.",
    },
    { type: "heading", text: "Do Google's AI features and other assistants work the same way?" },
    {
      type: "list",
      items: [
        "**Google AI Overviews and AI Mode** use Google's search systems. Google says the same SEO best practices apply, and that you don't need special files or tactics for its AI features (" + cite(SRC.googleAiFeatures, "Google Search Central") + ").",
        "**Gemini** draws on Google's systems.",
        "**Perplexity** runs its own crawler and index.",
        "**ChatGPT search** draws on web search results, with Bing closely aligned in published research.",
      ],
    },
    { type: "paragraph", text: "So “AI SEO” is mostly good SEO, done for more than one search engine. Our " + POST("google-ai-overviews-aesthetic-clinics", "guide to Google AI Overviews for clinics") + " covers Google's side in detail." },
    { type: "heading", text: "Step 1: Is your website easy for AI to read?" },
    {
      type: "list",
      items: [
        "**One page per treatment or concern**, opening with a two- or three-sentence direct answer: what it is, who it's for, the price or range, and how to book. See " + POST("aesthetic-treatment-page-seo", "how to write treatment pages that rank") + ".",
        "**Real text**, not information locked inside images, sliders or PDFs.",
        "**Fast, mobile-friendly pages**, measured against " + cite(SRC.webVitals, "Core Web Vitals") + ".",
        "**FAQs** answering real client questions in full sentences.",
      ],
    },
    { type: "heading", text: "Step 2: Does your structured data describe you accurately?" },
    {
      type: "paragraph",
      text: "Structured data tells machines who you are: business type, location, hours and services. Use LocalBusiness (or a more specific type) and breadcrumb markup, and only describe what's visible on the page (" + cite(SRC.googleLocalBusinessSD, "Google Search Central") + "). It won't make a weak page rank, but it removes ambiguity about your clinic's name, location and services.",
    },
    { type: "heading", text: "Step 3: Is your site indexed in Bing as well as Google?" },
    {
      type: "ordered",
      items: [
        "Verify your site in " + cite(SRC.searchConsole, "Google Search Console") + " and submit your sitemap.",
        "Verify it in " + cite(SRC.bingWebmaster, "Bing Webmaster Tools") + " (you can import from Search Console) and submit the sitemap.",
        "Use " + cite(SRC.indexNow, "IndexNow") + " so Bing hears about new and updated pages quickly.",
        "Claim Bing Places for Business as well as your Google Business Profile, with identical details.",
      ],
    },
    { type: "heading", text: "Step 4: Are your details consistent everywhere?" },
    {
      type: "paragraph",
      text: "Your clinic's name, address or service area, phone number, hours and treatments should match on your website, Google Business Profile, Bing Places, booking platforms, social profiles and directories. Conflicting details make it harder for any system, human or AI, to be confident about your clinic.",
    },
    { type: "heading", text: "Step 5: Is your clinic mentioned on other websites?" },
    {
      type: "paragraph",
      text: "This is the step most clinics skip. In a study of 75,000 brands, Ahrefs found that branded web mentions correlated more strongly with appearing in Google's AI Overviews (0.664) than backlinks did (0.218) (" + cite(SRC.ahrefsAio, "Ahrefs") + "). Ahrefs is clear that correlation isn't proof of cause, but the direction is useful: being talked about on reputable sites matters.",
    },
    {
      type: "list",
      items: [
        "Genuine reviews on Google and your booking platform",
        "Local press or trade publication features",
        "Supplier and training-academy “find a practitioner” listings you genuinely qualify for",
        "Talks, podcasts and videos",
        "Partnerships with nearby businesses",
      ],
    },
    {
      type: "paragraph",
      text: "Avoid fake reviews and paid listicles; Google's guidance warns against inauthentic mentions (" + cite(SRC.googleAiFeatures, "Google Search Central") + ").",
    },
    { type: "heading", text: "Step 6: Does your website look current?" },
    {
      type: "paragraph",
      text: "Clinics with current prices, recent treatments and up-to-date information are easier to trust. This is where an " + LINK.dashboard + " helps: if you can update your own site in minutes, it never goes stale waiting for a developer.",
    },
    { type: "heading", text: "Should you add an llms.txt file?" },
    {
      type: "paragraph",
      text: "llms.txt is a proposed file that summarises a site for AI tools. Google says it isn't needed for its search features (" + cite(SRC.googleAiFeatures, "Google Search Central") + "), and an Ahrefs study of 137,210 sites found that 97% of llms.txt files received no requests in the month measured (" + cite(AHREFS_LLMS, "Ahrefs") + "). It's cheap to add, but put your effort into steps 1–5 first.",
    },
    { type: "heading", text: "A worked example: checking where your clinic stands" },
    {
      type: "ordered",
      items: [
        "Ask ChatGPT, Gemini and Perplexity: “Which clinics in [your town] offer [your main treatment]?” Note who appears and which sources are cited.",
        "Search `site:yourdomain.co.uk` on Bing. If few pages appear, start with Bing Webmaster Tools.",
        "Open the cited sources for competitors. Are they directories, reviews, news articles? Those are the kinds of places to be mentioned.",
        "Compare your treatment pages with theirs: does yours answer the question in the first two sentences?",
        "Repeat the same questions monthly and record the results in a spreadsheet.",
      ],
    },
    { type: "paragraph", text: "We cover this monthly check in more detail in our planned guide to checking AI visibility." },
    {
      type: "checklist",
      title: "AI visibility checklist",
      items: [
        "One answer-first page per treatment",
        "LocalBusiness and breadcrumb structured data",
        "Google Search Console and Bing Webmaster Tools verified, sitemaps submitted",
        "IndexNow set up",
        "Google Business Profile and Bing Places identical to your website",
        "A steady flow of genuine reviews",
        "At least a few reputable sites mentioning your clinic",
        "Prices and treatments up to date",
      ],
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "We build " + LINK.websites + " with answer-first treatment pages, structured data, Google and Bing set-up and IndexNow included, and our " + LINK.seo + " packages handle the ongoing work. See " + LINK.pricing + ". If you're budgeting, read " + POST("aesthetic-clinic-website-cost-uk", "clinic website prices in the UK") + ".",
    },
    {
      type: "faq",
      items: [
        { q: "Can you guarantee ChatGPT will recommend my clinic?", a: "No one can. We focus on the foundations that make your clinic easier for AI assistants to find, understand and trust." },
        { q: "Does ChatGPT use Google or Bing?", a: "ChatGPT search draws on web search results; published research in 2025 found its citations closely matched Bing's top results. Being indexed in both is the safe approach." },
        { q: "Do I need an llms.txt file?", a: "It's optional. Google says it isn't needed for its AI features, and research suggests few AI bots request it. Focus on clear pages and indexing first." },
        { q: "How do I check if ChatGPT mentions my clinic?", a: "Ask the same local questions in ChatGPT, Gemini and Perplexity each month and record which clinics and sources appear." },
        { q: "What's the difference between SEO and AI search optimisation?", a: "They overlap heavily. AI search optimisation is mostly good SEO done for several search engines, plus earning mentions across the web." },
      ],
    },
    { type: "sources", items: [SRC.openaiSearch, SEER, SRC.googleAiFeatures, SRC.ahrefsAio, AHREFS_LLMS, SRC.bingWebmaster, SRC.indexNow, SRC.googleLocalBusinessSD] },
    { type: "cta", title: "Want your clinic to be easier to recommend?", text: "Get a free audit that includes AI search readiness, or message us on WhatsApp." },
  ],
};
