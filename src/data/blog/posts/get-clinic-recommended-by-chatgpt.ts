import type { BlogPost } from "../types";

export const aiSearchPost: BlogPost = {
  slug: "get-clinic-recommended-by-chatgpt",
  title: "How to get your aesthetics clinic recommended by ChatGPT and Google AI",
  seoTitle: "How to Get Your Clinic Recommended by ChatGPT | Zyverra",
  metaDescription:
    "How ChatGPT, Google AI Overviews and Perplexity choose which clinics to mention — and the practical steps UK aesthetics clinics can take in 2026.",
  excerpt:
    "How AI assistants find clinics, and six practical steps — from answer-first pages to Bing indexing and brand mentions — that make yours easier to recommend.",
  date: "2026-11-11",
  updated: "2026-11-11",
  category: "SEO & AI search",
  targetKeyword: "get clinic recommended by ChatGPT",
  image: "/og-image.png",
  imageAlt: "Zyverra Labs guide to AI search visibility for aesthetics clinics",
  servicePath: "/seo-ai-search-for-aesthetic-clinics",
  body: [
    {
      type: "answer",
      text: "AI assistants recommend clinics they can find, understand and trust. In practice that means five things: a fast website that search engines can crawl, with clear, answer-first treatment pages; accurate structured data; being indexed in both Google *and* Bing (ChatGPT's live search leans on Bing); consistent business details everywhere; and your clinic's name being mentioned on other reputable websites. No one can guarantee a recommendation, but these are the foundations every recommendation is built on.",
    },
    { type: "heading", text: "How AI assistants actually find clinics" },
    {
      type: "paragraph",
      text: "When someone asks “Who's a good aesthetics clinic in Leeds for skin treatments?”, the assistant usually runs a live web search and then summarises what it finds. The sources differ by platform:",
    },
    {
      type: "list",
      items: [
        "**Google AI Overviews and AI Mode** use Google's normal Search index. Google's guide to optimising for its generative AI features says: “For Google Search, you can ignore tactics like ‘chunking’ content, creating unnecessary AI text files (like llms.txt), or pursuing inauthentic mentions.”",
        "**ChatGPT search** relies heavily on Bing's index and third-party data. A February 2025 Seer Interactive study found that 87% of ChatGPT search citations matched Bing's top results, compared with 56% for Google's. A larger replication found a much lower overlap, so treat this as directional. Either way, a site that Bing hasn't indexed is effectively invisible to it.",
        "**Perplexity** uses its own crawler and index.",
        "**Gemini** draws on Google's systems.",
      ],
    },
    { type: "paragraph", text: "So “AI SEO” is mostly good SEO, done for more than one search engine." },
    { type: "heading", text: "Step 1: Make your website easy to read" },
    {
      type: "list",
      items: [
        "**One page per treatment or concern.** Open each with a two- or three-sentence direct answer: what it is, who it's for, the price or range, and how to book.",
        "**Plain HTML text.** Avoid putting key information only inside images, sliders or PDFs.",
        "**Fast and mobile-friendly.** Google's guidance lists page experience among the basics.",
        "**An FAQ section** answering real client questions in full sentences.",
      ],
    },
    { type: "heading", text: "Step 2: Add accurate structured data" },
    {
      type: "paragraph",
      text: "Schema markup tells machines exactly who you are: your business type, address, opening hours, services, prices and practitioners. Use LocalBusiness (or a more specific type), Service, FAQPage and BreadcrumbList. Google says no *special* schema is required for AI features, but correct schema removes ambiguity about your clinic's name, location and services. Only mark up information that is visible on the page.",
    },
    { type: "heading", text: "Step 3: Get indexed in Bing as well as Google" },
    {
      type: "ordered",
      items: [
        "Verify your site in **Google Search Console** and submit your sitemap. Google now offers a generative AI performance report, which helps you see how your content performs in its AI features.",
        "Verify your site in **Bing Webmaster Tools**. You can import it from Search Console in minutes. Submit the sitemap and enable IndexNow so new pages are picked up quickly.",
        "Claim **Bing Places for Business** as well as your **Google Business Profile**, and keep the two identical.",
      ],
    },
    { type: "heading", text: "Step 4: Keep your details consistent everywhere" },
    {
      type: "paragraph",
      text: "Your clinic's name, address, phone number, opening hours and treatments should match on your website, Google Business Profile, Bing Places, social profiles, booking platforms and directories. Conflicting details make it harder for AI systems to be confident about your clinic.",
    },
    { type: "heading", text: "Step 5: Earn mentions on other websites" },
    {
      type: "paragraph",
      text: "This is the step most clinics skip, and it's probably the most important.",
    },
    {
      type: "list",
      items: [
        "In a 2025 study of 75,000 brands with a Domain Rating above 40, Ahrefs found that **branded web mentions** had the strongest Spearman correlation with visibility in Google AI Overviews: 0.664, compared with 0.218 for backlinks.",
        "Ahrefs' December 2025 follow-up across ChatGPT, AI Mode and AI Overviews found **YouTube mentions** correlated even more strongly, at roughly 0.737, the strongest signal it measured.",
      ],
    },
    {
      type: "paragraph",
      text: "Ahrefs itself stresses these are correlations, not proof of cause, but the direction is clear. Ways to earn mentions: reviews on Google and other platforms; features in local press or trade publications; supplier and training-academy “find a practitioner” listings; talks, podcasts and YouTube videos; genuine community discussion.",
    },
    {
      type: "paragraph",
      text: "Avoid paid fake reviews or spammy listicles. Google explicitly says inauthentic mentions are not the way.",
    },
    { type: "heading", text: "Step 6: Keep content fresh" },
    {
      type: "paragraph",
      text: "AI assistants and search engines favour clinics that look active: current prices, new treatments, recent blog posts and up-to-date results. This is where an [admin dashboard](/clinic-website-admin-dashboard) helps. If you can update your own site in minutes, it stays accurate without waiting for a developer.",
    },
    { type: "heading", text: "What about llms.txt?" },
    {
      type: "paragraph",
      text: "llms.txt is a proposed text file that summarises your site for AI tools. It's cheap to add, but don't expect miracles. Google says it is not needed for Google Search. Ahrefs' June 2026 study checked 137,210 domains and found about 38,000 with a valid llms.txt. Of those, 97% received zero requests in May 2026, and AI retrieval bots made only 1.1% of the requests that did occur. Add one if you like, but put your effort into steps 1–6.",
    },
    { type: "heading", text: "A 30-minute starter checklist" },
    {
      type: "checklist",
      items: [
        "Search ChatGPT, Gemini and Perplexity for “[your treatment] clinic in [your town]”, and note who appears.",
        "Check your site is indexed in Bing (search `site:yourdomain.co.uk` on Bing).",
        "Make sure your Google Business Profile and Bing Places details match your website exactly.",
        "Add a direct-answer opening paragraph to your top three treatment pages.",
        "Ask five happy clients for a review this week.",
      ],
    },
    { type: "heading", text: "How we help" },
    {
      type: "paragraph",
      text: "Zyverra Labs builds [clinic websites](/aesthetic-clinic-website-design) with all of this built in: answer-first treatment pages, schema, Google and Bing setup, IndexNow and an admin dashboard so your content stays current. Our [local SEO and AI search visibility](/seo-ai-search-for-aesthetic-clinics) service handles the ongoing work. If you're still budgeting, read [what a clinic website costs in the UK](/blog/aesthetic-clinic-website-cost-uk).",
    },
    {
      type: "cta",
      title: "Want your clinic to be easier to find?",
      text: "Get a quote, or message us on WhatsApp to talk through where your clinic stands today.",
    },
  ],
};
