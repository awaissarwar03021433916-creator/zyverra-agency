// The compliance post. Prescription-only medicine brand names appear only here
// and in the /faq answer to "Can I say Botox on my website?", and only to
// explain the rule.

import type { BlogPost } from "../types";
import { POST, SRC, cite } from "../sources";

export const advertisingRulesPost: BlogPost = {
  slug: "botox-advertising-rules-clinic-website",
  title: "Can you say “Botox” on your clinic website? UK ASA rules explained",
  listingTitle: "Prescription-only medicines and your clinic website: UK ASA rules explained",
  seoTitle: "Can You Say 'Botox' on Your Website? UK ASA Rules",
  metaDescription:
    "Botox is a prescription-only medicine, so UK clinics can't advertise it to the public. Here's what the ASA allows on your website and social media.",
  excerpt:
    "What counts as advertising a prescription-only medicine, what you can say instead, and a checklist for your clinic website and social media.",
  date: "2026-11-11",
  updated: "2026-11-11",
  category: "Compliance",
  targetKeyword: "ASA botox advertising rules",
  image: "/og-image.png",
  imageAlt: "Zyverra Labs guide to UK advertising rules for clinic websites",
  servicePath: "/aesthetic-clinic-website-design",
  body: [
    {
      type: "answer",
      text: "In most cases, no. Botox and other botulinum toxin brands, such as Vistabel, Dysport, Azzalure and Bocouture, are prescription-only medicines (POMs). In the UK, the ASA's guidance is blunt: “prescription-only medicines… simply may not be advertised to the public”. Indirect references can count as advertising too. Your clinic website, Instagram, Facebook and paid ads all count as advertising. This guide covers what you can say instead.",
    },
    {
      type: "note",
      text: "This is general guidance, not legal advice. Always check the current guidance from the ASA and CAP.",
    },
    { type: "heading", text: "Why the rule exists" },
    {
      type: "paragraph",
      text: "The Committee of Advertising Practice (CAP) writes the UK advertising rules, and the Advertising Standards Authority (ASA) enforces them. CAP Code rule 12.12 states that prescription-only medicines “may not be advertised to the public”. This sits alongside the Human Medicines Regulations 2012, which ban any advertisement “likely to lead to the use of a prescription only medicine”. The idea is that a prescriber, not an advert, should decide whether you need a medicine.",
    },
    {
      type: "paragraph",
      text: "The ASA has published an Enforcement Notice specifically about advertising Botox and other botulinum toxin injections on social media, and it actively monitors clinics.",
    },
    { type: "heading", text: "What counts as “advertising” a POM" },
    {
      type: "paragraph",
      text: "It's broader than most practitioners expect. The ASA's FAQs and Enforcement Notice cover:",
    },
    {
      type: "list",
      items: [
        "**The brand name itself**: “Botox”, “Vistabel”, “Azzalure” and others.",
        "**Implied references.** The ASA's Botox FAQs state that “the word ‘relaxing’ is likely to be understood as an implied reference to Botox”, so “wrinkle-relaxing injections” is a problem. Nicknames and plays on words are treated the same way.",
        "**Prices.** The Enforcement Notice warns that “anti-wrinkle injections” shown alongside a price that relates to a POM will be seen as an ad for that POM.",
        "**Juxtaposition.** If you write “anti-wrinkle injections and dermal fillers”, the “injections” will be read as Botox.",
        "**Images** that clearly show a POM treatment being promoted.",
      ],
    },
    { type: "heading", text: "What you can say" },
    { type: "paragraph", text: "The ASA's own FAQs give clinics some room:" },
    {
      type: "list",
      items: [
        "**Use a collective term for your anti-wrinkle options.** The ASA suggests “anti-wrinkle injections” or “anti-wrinkle treatments” as a collective term, *if* you offer both prescription-only and non-prescription-only options. If you only offer the POM, it advises against “anti-wrinkle injections” because the phrase becomes an implied ad.",
        "**Promote consultations, not the medicine.** You can promote a consultation for a concern, such as lines and wrinkles, as long as it's clear the consultation may or may not lead to a prescription.",
        "**Name non-POM treatments.** Many dermal fillers, skin peels, microneedling and laser treatments are not POMs and can be described normally. Some fillers containing lidocaine may be classed differently, so check each product.",
        "**Answer questions factually where the rules allow.** In its “dos and don'ts of advertising Botox” guidance, the ASA says limited references may be acceptable “as long as they do not appear on the home page” and are “balanced and factual”. It adds that “casually browsing consumers must not be able to come across information relating to Botox or other POMs with ease”. Don't assume your page qualifies.",
      ],
    },
    { type: "heading", text: "How this affects your website structure" },
    { type: "paragraph", text: "Practical changes we make on every aesthetics site:" },
    {
      type: "ordered",
      items: [
        "**Treatment pages are built around concerns, not brand names.** For example: “Lines and wrinkles consultation”, “Lip enhancement with dermal filler”, “Skin rejuvenation”.",
        "**Price lists separate POM and non-POM treatments.** POM prices are not listed in a promotional way. We use “Price on consultation” or follow current ASA wording guidance.",
        "**No “Brotox”, “Baby Tox”, “tox” or “wrinkle-relaxing”**, anywhere, including image alt text, file names and meta descriptions. Search engines index all of these.",
        "**Offers.** Avoid time-limited or “buy now” promotions for injectable treatments. CAP's guidance on cosmetic interventions also warns against trivialising procedures and pressuring people into quick decisions.",
        "**No targeting of under-18s** for cosmetic procedures.",
        "**Before-and-after images** must be genuine, unedited and representative. If you offer both POM and non-POM treatments, make clear which treatment a photo shows.",
      ],
    },
    { type: "heading", text: "“But my competitors say Botox everywhere”" },
    {
      type: "paragraph",
      text: "Some do, and some are complained about and named in ASA rulings. Ranking for “Botox [town]” isn't worth an ASA ruling, a forced rewrite of your site or questions from your insurer. Treatment-concern pages (“lines and wrinkles”, “frown lines”, “excessive sweating consultation”) can still attract people searching for help. Clear, factual, helpful content is also exactly what Google and AI assistants favour. Our guide to [getting your clinic recommended by ChatGPT and Google AI](/blog/get-clinic-recommended-by-chatgpt) explains why.",
    },
    { type: "heading", text: "A quick compliance checklist for your site" },
    {
      type: "checklist",
      items: [
        "Search your site for “Botox” and other POM brand names, and remove promotional uses.",
        "Search for “relaxing”, “tox” and nicknames.",
        "Check price lists for POM prices displayed promotionally.",
        "Check offers and countdown banners on injectables.",
        "Check image alt text, file names, page titles and meta descriptions.",
        "Check your Google Business Profile services and social bios.",
        "Make sure before-and-after images are consented and labelled.",
      ],
    },
    { type: "heading", text: "What are the ASA rules for advertising aesthetics treatments?" },
    {
      type: "paragraph",
      text: "All UK clinic advertising, including your website and social media, must follow the CAP Code. The key rules: don't advertise prescription-only medicines to the public, don't make misleading or unproven claims, use genuine and representative before-and-after images, don't target or appeal to under-18s, and don't pressure people with time-limited offers on cosmetic interventions.",
    },
    {
      type: "paragraph",
      text: "CAP's guidance on cosmetic interventions sets out the claims and social responsibility rules (" + cite(SRC.asaCosmetic, "CAP") + ", " + cite(SRC.asaCosmeticSR, "CAP social responsibility") + "), and the full rules are in " + cite(SRC.capCode) + ". For photos, read our " + POST("before-and-after-photos-consent-asa", "guide to before-and-after photo rules") + ".",
    },
    { type: "heading", text: "How we help" },
    {
      type: "paragraph",
      text: "Every Zyverra Labs [clinic website](/aesthetic-clinic-website-design) is written with these rules in mind. With Option A's [admin dashboard](/clinic-website-admin-dashboard), you can update treatment pages and offers yourself, and we show you how to keep new content compliant.",
    },
    {
      type: "cta",
      title: "Want your current site reviewed?",
      text: "Get a quote, or message us on WhatsApp and we'll take a look at your current wording.",
    },
  ],
};
