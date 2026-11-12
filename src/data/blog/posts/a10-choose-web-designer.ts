import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const chooseWebDesignerPost: BlogPost = {
  slug: "choose-web-designer-clinic-avoid-scams",
  title: "How to choose a web designer for your clinic (and avoid scams)",
  seoTitle: "How to Choose a Clinic Web Designer (Avoid Scams)",
  metaDescription:
    "How UK clinics can choose a web designer safely: scam checks, questions to ask, payment plans, domain ownership and working with offshore designers.",
  excerpt:
    "The checks, questions and contract terms that help a UK clinic choose a trustworthy web designer, including offshore designers, payment plans and domain ownership.",
  date: "2026-11-12",
  updated: "2026-11-12",
  category: "Websites",
  targetKeyword: "choose web designer clinic",
  image: "/blog/choose-web-designer-clinic-avoid-scams/og",
  imageAlt: "A clinic owner checking a web designer's work before hiring",
  servicePath: "/aesthetic-clinic-website-design",
  body: [
    {
      type: "answer",
      text: "Choose a clinic web designer on evidence, not promises. Visit live websites they've built, get the price, timeline, payment stages and ownership terms in writing, and keep your domain in your own name. Avoid anyone who wants full payment upfront, guarantees Google rankings or can't explain the UK advertising rules for clinics. Location matters less than transparency.",
    },
    {
      type: "tldr",
      items: [
        "Ask for live client websites you can visit, and contact one of those clinics if you can.",
        "Get scope, price, timeline, payment stages and ownership in writing before paying.",
        "Your domain should be registered in your name; check with an ICANN lookup.",
        "Staged payment plans protect both sides; full payment upfront is a red flag.",
      ],
    },
    { type: "heading", text: "How do you know if a web design agency is legit and not a scam?" },
    {
      type: "paragraph",
      text: "A legitimate designer can show you live websites they've built, tells you clearly who they are and where they're based, puts the price and scope in writing, and takes payment in stages tied to the work. Warning signs are pressure to decide quickly, full payment upfront, guaranteed rankings, vague contracts and no real examples you can visit.",
    },
    {
      type: "paragraph",
      text: "Citizens Advice suggests checking a business's details independently and being wary of pressure, unusual payment requests and offers that seem too good to be true (" + cite(SRC.citizensAdviceScams, "Citizens Advice") + "). For a UK limited company, you can look it up on Companies House (" + cite(SRC.companiesHouse, "Companies House") + "); for a designer based elsewhere, look for a long-standing online footprint and real clients you can contact.",
    },
    {
      type: "table",
      caption: "Green flags and red flags when hiring a web designer",
      head: ["Green flag", "Red flag"],
      rows: [
        ["Live client websites you can open and click through", "Only screenshots or mock-ups"],
        ["A written quote with scope, timeline and payment stages", "A price given only in a chat, with no scope"],
        ["Staged payments, e.g. 50/50 or 30/40/30", "100% upfront, or payment by gift card or crypto"],
        ["Your domain registered in your name", "Domain held in the designer's name with no transfer terms"],
        ["Honest about where they're based", "Hides their location or uses a virtual address"],
        ["Explains what they can't promise", "Guarantees first place on Google or in ChatGPT"],
      ],
    },
    { type: "heading", text: "What questions should you ask before hiring a web designer?" },
    {
      type: "paragraph",
      text: "Ask questions that reveal how they work, not just what they charge: which clinic websites they've built, what's included, how long it takes, who can edit the site afterwards, what ongoing costs there are, who owns the domain and content, and how they handle the advertising rules for injectable treatments. Get the answers in writing.",
    },
    {
      type: "ordered",
      items: [
        "Which clinic or salon websites have you built, and can I contact one of those clients?",
        "Exactly what's included in the price: pages, treatment pages, blog posts, booking links, legal pages?",
        "How long will it take once you have my content?",
        "Can I change prices, treatments and photos myself, and how?",
        "What will I pay after launch: hosting, domain, updates, support?",
        "Whose name will the domain be registered in, and who owns the content and design?",
        "How do you keep the wording within the CAP Code for prescription-only treatments?",
        "What are the payment stages, and what do I get at each one?",
        "What happens if I want to leave or move the site later?",
      ],
    },
    {
      type: "paragraph",
      text: "A designer who knows clinics will answer question seven confidently. If they don't know what the CAP Code is, your website may end up breaking it (" + cite(SRC.asaPomWebsites, "CAP") + ").",
    },
    { type: "heading", text: "Who should own your domain, you or the designer?" },
    {
      type: "paragraph",
      text: "You should. Your domain name is the address of your business online, and whoever it's registered to controls it. Ask your designer to register it in your name and email, or to transfer it to you, so you can move your website later without losing your address, email or Google history. A designer can still manage it for you.",
    },
    {
      type: "paragraph",
      text: "You can check who a domain is registered to with " + cite(SRC.icannLookup, "ICANN Lookup") + ", although many registrars hide personal details for privacy. The simplest check is whether you have your own login at the registrar. A domain usually costs about £10–£20 a year, so there's no good reason for it to be held hostage.",
    },
    {
      type: "placeholder",
      text: "TODO [CONFIRM]: state whether Zyverra registers every client domain in the client's name, and add one sentence here once confirmed.",
    },
    {
      type: "paragraph",
      text: "Look after the logins too. The NCSC's small business guide recommends strong, separate passwords and two-step verification on important accounts (" + cite(SRC.ncscSmallBusiness, "NCSC") + "): your domain registrar, website admin, booking system and email.",
    },
    { type: "heading", text: "Is it safe to use an offshore web designer for your UK clinic?" },
    {
      type: "paragraph",
      text: "It can be, if you take the same precautions you would with any designer: live work you can check, a written scope, staged payments and ownership agreed up front. What matters more than location is whether they understand UK clinics: UK English, prices in pounds, UK GDPR, the CAP Code, and availability during your working hours.",
    },
    {
      type: "paragraph",
      text: "To be open about our own position: Zyverra Labs is based in Lahore, Pakistan, and works remotely with UK aesthetics clinics, aesthetic nurses and salons. We work 6am to 8pm UK time, price in pounds sterling, write in UK English, train you on Google Meet and keep in touch by WhatsApp and email. You can see live sites we've built for Belgrave Cosmetics and Penelope J Aesthetics in Bristol and Serra Aesthetics in London on our " + LINK.work + " page.",
    },
    {
      type: "placeholder",
      text: "TODO [CONFIRM]: add verbatim client testimonials here once each client has given written permission to be quoted. Do not paraphrase or invent quotes.",
    },
    { type: "heading", text: "Do any web designers offer payment plans for small businesses?" },
    {
      type: "paragraph",
      text: "Yes, many do, and staged payment is a good sign because it ties what you pay to what you receive. Common structures are 50% to start and 50% at launch, or three payments. Ours are 50/50, or 30/40/30 over 45 days: 30% to start, 40% after 15 days and the final 30% by day 45.",
    },
    {
      type: "table",
      caption: "Example: 30/40/30 on a £400 website",
      head: ["Stage", "When", "Amount"],
      rows: [
        ["Deposit (30%)", "To start", "£120"],
        ["Second payment (40%)", "After 15 days", "£160"],
        ["Final payment (30%)", "By day 45", "£120"],
      ],
    },
    {
      type: "paragraph",
      text: "Whoever you hire, write down what each payment unlocks, such as the design preview, the full build and launch, so there's no argument later. See " + LINK.pricing + " for what our two options include.",
    },
    { type: "heading", text: "What should the written agreement include?" },
    {
      type: "checklist",
      title: "Before you pay a deposit",
      items: [
        "List of pages and features included",
        "Timeline from receipt of your content",
        "Payment stages and what each one covers",
        "How many rounds of changes are included before launch",
        "Running costs after launch (hosting, domain, updates)",
        "Who owns the domain, content, photos and design",
        "How to leave: what you'll receive if you move the site",
        "How personal data from your forms is handled",
      ],
    },
    { type: "heading", text: "How do you compare quotes fairly?" },
    {
      type: "paragraph",
      text: "Put quotes side by side on the same items: number of treatment pages, whether you can edit it yourself, booking integration, SEO set-up, legal pages, timeline and the total cost over three years including monthly fees. A cheap build with a high monthly fee can cost more than a custom site. Our guides to " + POST("aesthetic-clinic-website-cost-uk", "clinic website prices in the UK") + " and " + POST("wix-squarespace-or-custom-clinic-website", "Wix, Squarespace or custom") + " help with the comparison.",
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "We build " + LINK.websites + " for £300, or £400 with an admin dashboard, live in 7–10 working days. Hosting is free, a domain is about £10–£20 a year, and updates after launch cost £50–£100 each if you don't use the dashboard. You can visit every site we've built before you decide, and ask us any of the questions above. If you're unsure where to start, get a " + LINK.audit + " first.",
    },
    {
      type: "faq",
      items: [
        { q: "How do I check a web designer is real?", a: "Visit live websites they've built, contact one of their clients, check for a long-standing online presence, and get a written quote before paying." },
        { q: "Should I pay a web designer upfront?", a: "A deposit is normal. Paying 100% upfront before any work is shown is a risk; staged payments tied to the work are safer." },
        { q: "Who should own my clinic's domain name?", a: "You should. Ask for it to be registered in your name and email, with your own login at the registrar." },
        { q: "Is it safe to hire a web designer outside the UK?", a: "It can be, if they're open about where they are, show real UK client work, agree everything in writing and take staged payments." },
        { q: "What if my current designer won't give me my domain?", a: "Ask in writing for the transfer code. If the domain was bought for your business, your agreement and the registrar's transfer process usually let you move it." },
      ],
    },
    { type: "sources", items: [SRC.citizensAdviceScams, SRC.companiesHouse, SRC.icannLookup, SRC.ncscSmallBusiness, SRC.asaPomWebsites] },
    { type: "cta", title: "Want to see our work first?", text: "Look through our client websites, get a free audit, or message us on WhatsApp." },
  ],
};
