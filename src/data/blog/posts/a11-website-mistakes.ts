import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const websiteMistakesPost: BlogPost = {
  slug: "aesthetic-clinic-website-mistakes",
  title: "12 aesthetic clinic website mistakes (and how to fix them)",
  seoTitle: "12 Aesthetic Clinic Website Mistakes and Fixes | Zyverra",
  metaDescription:
    "The 12 most common aesthetic clinic website mistakes, from hidden prices to risky wording and lost domains, with a quick fix for each. UK guide, 2026.",
  excerpt:
    "Twelve mistakes that cost UK aesthetics clinics bookings, rankings or compliance, from hidden prices to borrowed photos and lost domains, each with a fix.",
  date: "2026-11-12",
  updated: "2026-11-12",
  category: "Websites",
  targetKeyword: "aesthetic clinic website mistakes",
  image: "/blog/aesthetic-clinic-website-mistakes/og",
  imageAlt: "Common mistakes on aesthetic clinic websites and how to fix them",
  servicePath: "/aesthetic-clinic-website-design",
  body: [
    {
      type: "answer",
      text: "The most common aesthetic clinic website mistakes are hidden prices, all treatments squeezed onto one page, slow mobile pages, a hard-to-find booking button, stock or borrowed photos, wording that promotes prescription-only medicines, and a site the owner can't update. Most are quick to fix, and fixing them usually helps bookings, Google rankings and compliance at the same time.",
    },
    {
      type: "tldr",
      items: [
        "Booking mistakes: hidden prices, buried booking buttons, no clear next step.",
        "Search mistakes: one page for every treatment, slow mobile pages, no town names.",
        "Trust mistakes: stock photos, no practitioner, borrowed results.",
        "Risk mistakes: prescription-only medicine names, no privacy notice, a domain you don't own.",
      ],
    },
    {
      type: "paragraph",
      text: "This guide is the “what goes wrong” companion to our " + POST("aesthetic-clinic-website-checklist", "aesthetic clinic website checklist") + ". Use the checklist when you're planning a site; use this list to audit the one you already have.",
    },
    { type: "heading", text: "Which mistakes stop people booking?" },
    { type: "subheading", text: "1. Hiding your prices" },
    {
      type: "paragraph",
      text: "Clients compare clinics before they contact anyone. If your treatment pages say “prices on request”, many visitors leave to find a clinic that tells them. Show a price, a “from” price or the consultation fee on every treatment page. For prescription-only treatments, show the consultation fee rather than a price for the medicine (" + cite(SRC.asaPomWebsites, "CAP") + ").",
    },
    { type: "subheading", text: "2. Making booking hard to find" },
    {
      type: "paragraph",
      text: "On a phone, the booking button should be visible on every screen, usually as a sticky bar at the bottom. Link each treatment to its own service in your booking system rather than a general calendar, so clients don't have to search twice.",
    },
    { type: "subheading", text: "3. No clear next step for consultation-led treatments" },
    {
      type: "paragraph",
      text: "Injectable and medical-grade treatments start with a consultation, but many sites never explain what that involves. Add a short section on what happens, how long it takes, what it costs and whether it's redeemable against treatment. People book what they understand.",
    },
    { type: "heading", text: "Which mistakes hold back your Google rankings?" },
    { type: "subheading", text: "4. One page for every treatment" },
    {
      type: "paragraph",
      text: "A single “Treatments” page listing everything can't rank for “skin peel Bristol” and “lip filler Bristol” at the same time. Give each treatment its own page, with its own title, price, FAQs and booking button. Our guide to " + POST("aesthetic-treatment-page-seo", "treatment pages that rank") + " shows the structure.",
    },
    { type: "subheading", text: "5. Slow pages on mobile" },
    {
      type: "paragraph",
      text: "Large uncompressed images, video headers and heavy templates make pages slow on a phone signal. Google uses Core Web Vitals as part of its page experience signals (" + cite(SRC.webVitals, "web.dev") + "). Test your homepage and top treatment pages in " + cite(SRC.pageSpeed) + " and fix anything marked poor.",
    },
    { type: "subheading", text: "6. Never saying where you are" },
    {
      type: "paragraph",
      text: "If your town or area isn't in your page titles, headings and copy, Google has less to connect your treatments with local searches. Mention your location naturally on treatment pages, add a location page if you work from more than one place, and use LocalBusiness structured data (" + cite(SRC.googleLocalBusinessSD, "Google Search Central") + ").",
    },
    { type: "heading", text: "Which mistakes damage trust?" },
    { type: "subheading", text: "7. Stock photos of models" },
    {
      type: "paragraph",
      text: "Clients want to see who will treat them and where. Replace stock images with real photos of you, your team and your room. A single professional photo session is one of the best-value improvements a clinic site can get.",
    },
    { type: "subheading", text: "8. No practitioner information" },
    {
      type: "paragraph",
      text: "State who treats clients, their profession, registration and aesthetics training, and make it easy to check a public register where one applies, such as the " + cite(SRC.nmcRegister, "NMC register") + " for nurses. This is especially important for injectable treatments.",
    },
    { type: "subheading", text: "9. Borrowed or edited before-and-after photos" },
    {
      type: "paragraph",
      text: "Supplier images, another clinic's results or filtered photos can mislead clients and break the CAP Code (" + cite(SRC.asaBeforeAfter, "CAP") + "). Use genuine, unedited photos of your own clients, with written consent. Our guide to " + POST("before-and-after-photos-consent-asa", "before-and-after photo rules") + " covers consent forms and captions.",
    },
    { type: "heading", text: "Which mistakes create legal or business risk?" },
    { type: "subheading", text: "10. Promoting prescription-only medicines" },
    {
      type: "paragraph",
      text: "Brand names of prescription-only medicines in headings, menus, prices or offers are the most common compliance problem on clinic sites. Your website counts as advertising, so present these treatments as consultations for the concern you treat (" + cite(SRC.asaFineLine, "ASA") + "). Our guide to " + POST("botox-advertising-rules-clinic-website", "the UK advertising rules") + " gives compliant wording.",
    },
    { type: "subheading", text: "11. No privacy notice or cookie consent" },
    {
      type: "paragraph",
      text: "If your site has a contact form, analytics or an advertising pixel, it needs a privacy notice and a cookie banner that asks before non-essential cookies load (" + cite(SRC.icoCookies, "ICO") + "). Keep contact forms to contact details and the treatment of interest; collect health information at consultation.",
    },
    { type: "subheading", text: "12. A website or domain you don't control" },
    {
      type: "paragraph",
      text: "If your domain is registered to a former designer, or every price change needs a developer, you've lost control of your main marketing asset. Make sure the domain is in your name, keep your own logins, and choose a site you can update yourself. Read " + POST("choose-web-designer-clinic-avoid-scams", "how to choose a web designer") + " for the questions to ask.",
    },
    { type: "heading", text: "How do you find these mistakes on your own site?" },
    {
      type: "table",
      caption: "A 30-minute self-audit",
      head: ["Check", "How", "Mistake it catches"],
      rows: [
        ["Open a treatment page on your phone", "Is the price and booking button visible without scrolling far?", "1, 2"],
        ["Search “[treatment] [your town]”", "Does a page of yours appear, or only your homepage?", "4, 6"],
        ["Run PageSpeed Insights on mobile", "Any Core Web Vitals marked poor?", "5"],
        ["Read your about page", "Name, profession, registration and a real photo?", "7, 8"],
        ["Look through your gallery", "All your own clients, unedited, with consent on file?", "9"],
        ["Search your site for medicine brand names", "Any in headings, menus, prices or offers?", "10"],
        ["Check the footer and forms", "Privacy notice, cookie banner, no health questions?", "11"],
        ["Log in to your domain registrar", "Is the account in your name?", "12"],
      ],
    },
    { type: "heading", text: "Which fixes should you do first?" },
    {
      type: "ordered",
      items: [
        "**Compliance first** (mistakes 10 and 11): they carry real risk and are quick to change.",
        "**Booking next** (1–3): prices and booking buttons tend to affect enquiries fastest.",
        "**Trust** (7–9): real photos and practitioner details support every other fix.",
        "**Search** (4–6): treatment pages and speed take longer, but compound over months.",
        "**Control** (12): sort the domain and logins before you change designer.",
      ],
    },
    {
      type: "paragraph",
      text: "If several of these apply, a rebuild is often quicker than patching an old template. Our " + LINK.redesign + " service keeps what works and redirects old pages so you don't lose rankings.",
    },
    { type: "heading", text: "What does a mistake-free treatment page look like?" },
    {
      type: "paragraph",
      text: "Put the fixes together and a good treatment page follows a simple order. Each part removes one of the mistakes above, so it's a useful template when you rewrite your top three pages first.",
    },
    {
      type: "list",
      items: [
        "**Title and opening:** the treatment and your town, then two sentences on what it is, who it suits and the price",
        "**Booking:** a button straight after the opening, and a sticky bar on mobile",
        "**What happens:** consultation, the treatment itself, downtime and aftercare, in plain English",
        "**Who treats:** name, profession, registration and a real photo",
        "**Results:** genuine, consented photos with captions saying when they were taken",
        "**FAQs:** the questions clients actually ask, answered in two or three sentences each",
        "**Links:** to related treatments, your consultation page and your privacy notice",
      ],
    },
    {
      type: "paragraph",
      text: "Write it once for your most popular treatment, check it on your phone, then use the same structure for the rest. If you'd like a worked example, our guide to " + POST("aesthetic-treatment-page-seo", "treatment pages that rank") + " walks through a full rewrite step by step.",
    },
    { type: "heading", text: "How often should you check for these mistakes?" },
    {
      type: "paragraph",
      text: "Run the 30-minute self-audit every three months, and again whenever you add a treatment, change prices or change your booking system. Mistakes creep back in: a new treatment page copied from a supplier brochure, an old price left on one page, or a staff member adding a medicine name to an offer. A quarterly check catches them before a client, a competitor or the ASA does.",
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "Every one of our " + LINK.websites + " is built to avoid these twelve mistakes: a page and price for every treatment, booking on every screen, consultation-led wording, legal pages and fast mobile pages. Option A (£400) adds an " + LINK.dashboard + " so you can change prices and photos yourself; Option B costs £300. Both go live in 7–10 working days. See " + LINK.pricing + ", or get a " + LINK.audit + " to find out which mistakes your site has.",
    },
    {
      type: "faq",
      items: [
        { q: "What is the biggest mistake on clinic websites?", a: "Hiding prices and making booking hard to find are the most common reasons visitors leave without enquiring. Promoting prescription-only medicines is the most common compliance problem." },
        { q: "Should every treatment have its own page?", a: "Yes. A separate page for each treatment, with its own title, price and FAQs, gives Google something specific to rank for each search." },
        { q: "Can I show prices for anti-wrinkle treatments?", a: "Don't show prices that promote a prescription-only medicine. Showing the consultation fee is the safer approach." },
        { q: "How do I know if my website is too slow?", a: "Test your key pages in PageSpeed Insights on mobile and check the Core Web Vitals. Anything marked poor needs attention." },
        { q: "Is it better to fix my old website or start again?", a: "If only a few of these mistakes apply, fix them. If the site is slow, can't give each treatment its own page and needs a developer for every change, rebuilding is usually quicker." },
      ],
    },
    { type: "sources", items: [SRC.asaPomWebsites, SRC.asaFineLine, SRC.asaBeforeAfter, SRC.webVitals, SRC.pageSpeed, SRC.googleLocalBusinessSD, SRC.icoCookies, SRC.nmcRegister] },
    { type: "cta", title: "Which of these is your site making?", text: "Get a free audit that checks all twelve, or message us on WhatsApp." },
  ],
};
