import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const checkAiVisibilityPost: BlogPost = {
  slug: "check-ai-assistants-mention-clinic",
  title: "How to check if AI assistants mention your clinic (free method)",
  seoTitle: "Check If ChatGPT Mentions Your Clinic: Free Method",
  metaDescription:
    "A free, repeatable way to check whether ChatGPT, Gemini, Perplexity and Google AI Overviews mention your aesthetics clinic, and what to fix if they don't.",
  excerpt:
    "A free monthly method for checking whether ChatGPT, Gemini, Perplexity and Google's AI Overviews mention your clinic, with a prompt list, a tracking table and fixes.",
  date: "2026-11-12",
  updated: "2026-11-12",
  category: "SEO & AI search",
  targetKeyword: "check AI visibility clinic",
  image: "/blog/check-ai-assistants-mention-clinic/og",
  imageAlt: "Checking whether AI assistants mention an aesthetics clinic",
  servicePath: "/seo-ai-search-for-aesthetic-clinics",
  body: [
    {
      type: "answer",
      text: "To check whether AI assistants mention your clinic, write 10–15 prompts your clients would actually type, such as “best skin clinic in Bristol”, then ask each one in ChatGPT, Gemini, Perplexity and Google, logged out. Record whether you're mentioned, where, and which websites are cited. Repeat monthly with the same prompts so you can see real change.",
    },
    {
      type: "tldr",
      items: [
        "Use fixed prompts in your clients' words: treatment + town, “near me”, and questions.",
        "Test logged out or in a private window, with the location set to your area.",
        "Record mentioned yes/no, position and cited sources in a simple spreadsheet.",
        "Fix what the cited pages have that yours don't: answers, prices, reviews, listings.",
      ],
    },
    {
      type: "paragraph",
      text: "This is the measuring step. For how to improve your chances of being recommended, read " + POST("get-clinic-recommended-by-chatgpt", "how ChatGPT chooses which clinics to recommend") + ".",
    },
    { type: "heading", text: "Why check AI assistants at all?" },
    {
      type: "paragraph",
      text: "Some clients now ask an AI assistant for recommendations instead of, or before, searching Google or scrolling Instagram. If a client asks “who's good for skin boosters in Leeds?” and your clinic never comes up, you won't see that lost enquiry anywhere in your analytics. A simple monthly check shows whether you're visible and which sources the assistants trust.",
    },
    {
      type: "paragraph",
      text: "OpenAI says ChatGPT search gives answers with links to relevant web sources (" + cite(SRC.openaiSearch, "OpenAI") + "), and Google says its AI features draw on pages in its index, with the same SEO best practices applying (" + cite(SRC.googleAiFeatures, "Google Search Central") + "). So the sources an assistant cites tell you what it relies on.",
    },
    { type: "heading", text: "Step 1: Which prompts should you test?" },
    {
      type: "paragraph",
      text: "Write prompts the way your clients speak, not in marketing language. Mix three types, and include your town or area in most of them:",
    },
    {
      type: "table",
      caption: "Example prompt list for a clinic in Bristol",
      head: ["Type", "Example prompt"],
      rows: [
        ["Treatment + place", "best skin clinic in Bristol"],
        ["Treatment + place", "lip filler Clifton Bristol"],
        ["Near me", "aesthetics clinic near me (with location set to Bristol)"],
        ["Practitioner", "aesthetic nurse in Bristol"],
        ["Question", "where can I get a skin peel in Bristol?"],
        ["Question", "how much is microneedling in Bristol?"],
        ["Comparison", "which Bristol clinics do medical-grade skin treatments?"],
        ["Brand", "[your clinic name] reviews"],
      ],
    },
    {
      type: "paragraph",
      text: "Keep the list fixed. Changing prompts month to month makes results impossible to compare. Add new prompts at the end only if you start offering a new treatment.",
    },
    { type: "heading", text: "Step 2: How should you run the tests?" },
    {
      type: "ordered",
      items: [
        "Open a private or logged-out browser window, so your history doesn't change the answer.",
        "Where the tool allows it, make sure your location is set to your area.",
        "Ask each prompt in ChatGPT (with search), Gemini, Perplexity and Google Search (noting any AI Overview).",
        "Copy the answer and the list of cited links into your spreadsheet.",
        "Do the whole list in one sitting, on the same day each month.",
      ],
    },
    {
      type: "paragraph",
      text: "Answers vary from one run to the next, so don't panic over a single result. Trends over three or more months matter more than any one check.",
    },
    { type: "heading", text: "Step 3: What should you record?" },
    {
      type: "table",
      caption: "Tracking table (one row per prompt per assistant)",
      head: ["Column", "What to write"],
      rows: [
        ["Month", "e.g. Dec 2026"],
        ["Prompt", "The exact wording"],
        ["Assistant", "ChatGPT, Gemini, Perplexity or Google"],
        ["Mentioned?", "Yes / No"],
        ["Position", "1st, 2nd, 3rd… or “sources only”"],
        ["Your URL cited", "Which page of yours, if any"],
        ["Other sources cited", "Competitors, directories, review sites, press"],
        ["Accurate?", "Are your prices, treatments and location correct?"],
      ],
    },
    {
      type: "paragraph",
      text: "The “other sources” column is the most useful. If assistants keep citing the same directory, review site or local article, that's where you need to be listed or mentioned too.",
    },
    { type: "heading", text: "Step 4: What do the results tell you?" },
    {
      type: "table",
      caption: "Reading your results",
      head: ["What you see", "What it usually means", "What to do"],
      rows: [
        ["Never mentioned, competitors cited", "Assistants can't find enough about you", "Treatment pages, consistent listings, more reviews"],
        ["Mentioned, but details wrong", "Out-of-date or inconsistent information online", "Update your website, Google profile and directories"],
        ["Directories cited, not your site", "Your own pages are thin or hard to read", "Answer-first treatment pages with prices"],
        ["Mentioned in Google, not ChatGPT", "Possibly weak Bing indexing", "Bing Webmaster Tools, submit your sitemap"],
        ["Mentioned for brand only", "Known by name, not by treatment", "Treatment + town pages and FAQs"],
      ],
    },
    { type: "heading", text: "Step 5: What should you fix first?" },
    {
      type: "list",
      items: [
        "**Indexing:** verify your site in " + cite(SRC.searchConsole) + " and " + cite(SRC.bingWebmaster) + ", and submit your sitemap to both",
        "**Treatment pages:** one per treatment, with the question as a heading and a direct answer first",
        "**Consistency:** the same name, address, phone and treatments on your website, Google profile and directories",
        "**Reputation:** genuine reviews and mentions on other sites; an Ahrefs study found brand mentions were associated with AI Overview visibility (" + cite(SRC.ahrefsAio, "Ahrefs") + ")",
        "**Accuracy:** correct any wrong prices or treatments at the source",
      ],
    },
    {
      type: "paragraph",
      text: "Our guide to " + POST("google-ai-overviews-aesthetic-clinics", "Google AI Overviews for clinics") + " covers Google's side in more detail.",
    },
    { type: "heading", text: "Can you check AI visibility automatically?" },
    {
      type: "paragraph",
      text: "Paid tools can run prompts at scale and track mentions over time, which helps multi-site groups. For a single clinic, a manual monthly check of 10–15 prompts takes about half an hour and is usually enough. Whatever you use, keep the prompts fixed and judge trends, not single answers.",
    },
    { type: "heading", text: "What shouldn't you do?" },
    {
      type: "list",
      items: [
        "Don't publish fake reviews or ask friends to post them; it breaks Google's policies (" + cite(SRC.googleContribution, "Google") + ")",
        "Don't create thin “best clinics in [town]” pages that rank yourself first",
        "Don't trust any service that guarantees ChatGPT will recommend you",
        "Don't change your clinic name or details just to match a prompt",
      ],
    },
    { type: "heading", text: "A worked example: three months of checks" },
    {
      type: "paragraph",
      text: "Imagine a skin clinic in Leeds running 12 prompts across four assistants each month. In month one it appears in 3 of 48 answers, always for its own name, and the assistants mostly cite two local directories and a competitor's treatment pages. That points to two gaps: thin treatment pages and missing directory listings.",
    },
    {
      type: "list",
      items: [
        "**Month one:** the clinic rewrites its three main treatment pages answer-first, with prices and the town in each title, and verifies the site in Bing Webmaster Tools.",
        "**Month two:** it corrects its listing on the two directories the assistants keep citing, and asks every client for a Google review.",
        "**Month three:** it reruns the same 12 prompts and records where it now appears and which pages are cited.",
      ],
    },
    {
      type: "paragraph",
      text: "The point isn't a particular number; it's that the same prompts, recorded the same way, show whether the work is moving anything. These figures are made up to show the method, not a typical result.",
    },
    { type: "heading", text: "How should you share the results with your team?" },
    {
      type: "paragraph",
      text: "Keep it simple: one line per month with the number of prompts where you were mentioned, the assistants that cited your website, and the one or two sources that keep appearing instead of you. Add a short list of actions for next month. If you work with an agency, ask for the same table so you can compare like with like.",
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "Monthly AI visibility checks across ChatGPT, Gemini and Perplexity are part of our Local + AI search package (£500 a month), alongside answer-first guides and directory consistency. See " + LINK.seo + " and " + LINK.pricing + ". Not sure where you stand? A " + LINK.audit + " includes an AI search readiness check.",
    },
    {
      type: "faq",
      items: [
        { q: "How do I know if ChatGPT recommends my clinic?", a: "Ask it the questions your clients would, logged out and with your location set, and record whether you're mentioned and which sources it cites. Repeat monthly." },
        { q: "Why do AI answers change every time I ask?", a: "AI assistants generate answers fresh each time and may use different sources. That's why you should track the same prompts over several months." },
        { q: "Which AI assistants should a clinic check?", a: "ChatGPT, Google's AI Overviews and AI Mode, Gemini and Perplexity cover the main assistants to check." },
        { q: "How often should I check?", a: "Once a month is enough for most clinics. Use the same prompts and the same day each month." },
        { q: "Can I pay to be recommended by ChatGPT?", a: "Not in its organic answers. Being recommended depends on what it can find and trust about your clinic online." },
      ],
    },
    { type: "sources", items: [SRC.openaiSearch, SRC.googleAiFeatures, SRC.searchConsole, SRC.bingWebmaster, SRC.ahrefsAio, SRC.googleContribution] },
    { type: "cta", title: "Want us to check for you?", text: "Get a free audit including AI search readiness, or message us on WhatsApp." },
  ],
};
