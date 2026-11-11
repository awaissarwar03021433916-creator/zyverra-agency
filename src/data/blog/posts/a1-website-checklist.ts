import type { BlogPost } from "../types";
import { LINK, POST, SRC } from "../sources";

export const websiteChecklistPost: BlogPost = {
  slug: "aesthetic-clinic-website-checklist",
  title: "What should an aesthetic clinic website include? (UK checklist 2026)",
  seoTitle: "Aesthetic Clinic Website Checklist (UK, 2026) | Zyverra",
  metaDescription:
    "The aesthetic clinic website checklist for UK clinics in 2026: pages, trust signals, booking, compliance and SEO. Use the free checklist and get audited.",
  excerpt:
    "Every page, trust signal and compliance step a UK aesthetic clinic website needs in 2026, as a checklist you can work through today.",
  date: "2026-11-11",
  updated: "2026-11-11",
  category: "Websites",
  targetKeyword: "aesthetic clinic website checklist",
  image: "/blog/aesthetic-clinic-website-checklist/og",
  imageAlt: "Aesthetic clinic website checklist for UK clinics, 2026",
  servicePath: "/aesthetic-clinic-website-design",
  body: [
    {
      type: "answer",
      text: "An aesthetic clinic website should include a clear homepage, one page per treatment with prices, a practitioner page showing qualifications and insurance, a consented before-and-after gallery, reviews, booking on every page, contact and location details, and UK-compliant legal pages. It also needs fast mobile pages, accurate structured data and wording that follows ASA rules on prescription-only medicines.",
    },
    {
      type: "tldr",
      items: [
        "Clients decide on trust, price and convenience, so show qualifications, prices and booking early.",
        "Give every treatment its own page; one long “treatments” page can't rank for individual searches.",
        "Your website counts as advertising: no promotion of prescription-only medicines.",
        "Cookie consent, a privacy notice and careful contact forms are legal requirements, not extras.",
        "Use the full checklist below, or ask us for a free audit against it.",
      ],
    },
    { type: "heading", text: "Why does an aesthetic clinic website need a checklist at all?" },
    {
      type: "paragraph",
      text: "Most clinic websites aren't missing one big thing; they're missing ten small ones. A price list that's out of date, a booking link hidden in the menu, a practitioner page with no qualifications, a gallery with no consent note. Each gap costs a few enquiries, and together they explain why a busy clinic can have a quiet website.",
    },
    {
      type: "paragraph",
      text: "A checklist also protects you. Aesthetics is one of the most closely watched advertising sectors in the UK: the ASA treats your website as advertising, and the ICO treats your contact form as a way of collecting personal, and sometimes health, data. Getting the basics right is cheaper than fixing a complaint.",
    },
    { type: "heading", text: "Which pages should every aesthetic clinic website have?" },
    {
      type: "paragraph",
      text: "Start with the pages clients actually use to choose a clinic. Google's own guidance is to create content that's helpful to people first, and for a clinic that means answering the questions people ask before they book ([Google Search Central](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)).",
    },
    {
      type: "table",
      caption: "Core pages for an aesthetic clinic website",
      head: ["Page", "What it must do", "Common mistake"],
      rows: [
        ["Homepage", "Say who you are, where you are and what you treat in the first screen; route visitors to treatments and booking.", "A slideshow with no clear next step."],
        ["Treatment pages", "One page per treatment or concern, with what it is, who it suits, price, downtime, aftercare and booking.", "All treatments on one long page."],
        ["Prices", "A clear price list, or “from” prices on each treatment page.", "“Prices on request” for everything."],
        ["About / practitioner", "Qualifications, professional registration, insurance and approach.", "A logo and a slogan, no people."],
        ["Results / gallery", "Genuine, consented, unedited before-and-afters with a “results vary” note.", "Filtered images or no consent record."],
        ["Reviews", "Real reviews from Google or your booking platform.", "Hand-picked quotes with no source."],
        ["Contact & visit", "Address or service area, hours, parking, map and a booking button.", "Contact form only, no phone or hours."],
        ["Legal pages", "Privacy notice, cookie policy and terms.", "Copied templates that don't match the site."],
      ],
    },
    { type: "heading", text: "What trust signals do clients look for before booking?" },
    {
      type: "paragraph",
      text: "Clients choosing a practitioner want reassurance that you're qualified, insured and honest about results. If you're a registered healthcare professional, your registration can be checked on the public register (for nurses, the [NMC register](https://www.nmc.org.uk/registration/search-the-register/)), and the NHS advises people to check who will carry out a non-surgical procedure and their qualifications ([NHS](https://www.nhs.uk/conditions/cosmetic-procedures/non-surgical-cosmetic-procedures/)). Make that easy to find.",
    },
    {
      type: "list",
      items: [
        "Practitioner names, photos, qualifications and professional registration",
        "Insurance and any accreditation you genuinely hold, such as a register like [Save Face](https://www.saveface.co.uk/) or the [JCCP](https://www.jccp.org.uk/)",
        "A clear consultation process that explains a consultation may not lead to treatment",
        "Real reviews, linked to the platform they came from",
        "Realistic results, with consented photos and no promises of permanent outcomes",
      ],
    },
    { type: "heading", text: "How should booking work on a clinic website?" },
    {
      type: "paragraph",
      text: "Booking should never be more than one tap away. Put a booking button in the header and at the top and bottom of every treatment page, linked to the system you already use, whether that's Fresha, Treatwell, Timely or Phorest. For clients who prefer to ask first, add WhatsApp and a short enquiry form. Our post on " + POST("fresha-treatwell-or-own-website", "Fresha, Treatwell or your own website") + " covers how to combine them.",
    },
    { type: "heading", text: "What do UK advertising rules mean for your website?" },
    {
      type: "paragraph",
      text: "Your website is advertising, so the CAP Code applies to it. Prescription-only medicines can't be advertised to the public, which means anti-wrinkle injections are presented as a consultation, not by brand name ([ASA](https://www.asa.org.uk/news/a-fine-line-the-dos-and-don-ts-of-advertising-botox.html)). CAP also expects before-and-after images to be genuine and representative, and requires that cosmetic intervention ads aren't directed at under-18s ([CAP](https://www.asa.org.uk/advice-online/cosmetic-interventions.html)). We explain the detail in " + POST("botox-advertising-rules-clinic-website", "our guide to the advertising rules") + ".",
    },
    { type: "heading", text: "What legal pages and data protection does a clinic website need?" },
    {
      type: "paragraph",
      text: "You need a privacy notice that tells people what you collect and why ([ICO, right to be informed](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/)), a cookie banner that asks before setting non-essential cookies ([ICO, cookies](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/)), and care with contact forms: anything about a person's health is special category data ([ICO](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/special-category-data/)). Keep forms short and avoid asking for medical history before a consultation. See " + POST("clinic-website-gdpr-cookies", "GDPR, cookies and consent forms on clinic websites") + ".",
    },
    { type: "heading", text: "What technical and SEO basics should be in place?" },
    {
      type: "list",
      items: [
        "Fast pages on mobile, measured against Google's [Core Web Vitals](https://web.dev/articles/vitals)",
        "A unique title and description for every page, and one clear H1",
        "LocalBusiness structured data that matches your Google Business Profile ([Google](https://developers.google.com/search/docs/appearance/structured-data/local-business))",
        "A sitemap submitted to Google Search Console and Bing Webmaster Tools",
        "Image alt text that describes the image, not keywords",
      ],
    },
    {
      type: "checklist",
      title: "The aesthetic clinic website checklist",
      items: [
        "Homepage says who, where and what in the first screen",
        "One page per treatment or concern, each with a price or range",
        "Practitioner page with qualifications, registration and insurance",
        "Booking button in the header and on every treatment page",
        "WhatsApp or phone visible on mobile",
        "Consented, unedited before-and-afters with a “results vary” note",
        "Real reviews, linked to their source",
        "No prescription-only medicine names used promotionally",
        "Privacy notice, cookie banner and terms that match how the site works",
        "Contact form that doesn't ask for medical history",
        "Mobile pages load quickly",
        "Titles, descriptions and structured data set up",
        "Google Business Profile details match the website",
        "You (or your developer) can update prices the day they change",
      ],
    },
    { type: "heading", text: "What does a good homepage look like? A worked example" },
    {
      type: "paragraph",
      text: "Here's how we'd rework a typical clinic homepage, using a fictional clinic, “Riverside Aesthetics” in Leeds. The original homepage opens with a full-screen photo slideshow, the words “Welcome to Riverside Aesthetics”, and a menu with fourteen items. Prices are in a PDF. The booking link is the last item in the menu.",
    },
    {
      type: "ordered",
      items: [
        "**First screen.** Replace the slideshow with one strong photo of the treatment room, a headline that says what and where (“Skin and aesthetic treatments in Headingley, Leeds”), one line about the practitioner, and two buttons: *Book a consultation* and *View treatments & prices*.",
        "**Route by need.** Directly below, a row of treatment categories (Skin, Injectables, Laser, Body) with a “from” price on each, so visitors self-select in one tap.",
        "**Prove it.** A short practitioner introduction with qualifications and registration, three real reviews linked to Google, and a small, consented results gallery.",
        "**Remove friction.** Prices move out of the PDF and onto each treatment page. The booking button moves into the header, and WhatsApp sits beside it on mobile.",
        "**Answer questions.** A short FAQ covers consultation, downtime, payment and parking, the things people otherwise phone to ask.",
        "**Close.** A final call to action repeats the booking button, with opening hours and the address underneath.",
      ],
    },
    {
      type: "paragraph",
      text: "None of these changes needs a bigger budget. They come from asking, at every point on the page, “what does a nervous first-time client need to know next?” That question is the real checklist behind the checklist.",
    },
    { type: "heading", text: "How often should you review your clinic website?" },
    {
      type: "paragraph",
      text: "Prices, treatments, team members and offers change constantly in aesthetics. A website that was accurate at launch can be misleading six months later, and an out-of-date price is both a lost booking and a potential complaint. Review the checklist at least every quarter, and update prices and treatments the day they change. If every edit means emailing a developer, that's a sign your website is working against you rather than for you.",
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "We build " + LINK.websites + " with every item on this checklist included, and with Option A you get a " + LINK.dashboard + " to keep prices and treatments current yourself. See " + LINK.pricing + " or " + LINK.work + ".",
    },
    {
      type: "faq",
      items: [
        { q: "What is the most important page on an aesthetic clinic website?", a: "Your treatment pages. They're what people search for and what convinces them to book, so each treatment deserves its own page with a price." },
        { q: "Should I show prices on my clinic website?", a: "For most treatments, yes. Clients compare clinics on price, and clear pricing builds trust. Treatments that require a consultation can be shown as “price on consultation”." },
        { q: "Do I need a blog?", a: "It isn't essential on day one, but answering common questions in articles helps search engines and AI assistants understand your expertise over time." },
        { q: "How many pages should a clinic website have?", a: "Enough to cover each treatment, plus the core pages in this checklist. For most single-site clinics that's somewhere between ten and thirty pages." },
        { q: "Can you check my website against this checklist?", a: "Yes. Request a [free clinic website audit](/free-clinic-website-audit) and we'll tell you which items are missing, most important first." },
      ],
    },
    {
      type: "sources",
      items: [SRC.googleHelpful, SRC.asaFineLine, SRC.asaCosmetic, SRC.icoInformed, SRC.icoCookies, SRC.icoSpecialCategory, SRC.nhsNonSurgical, SRC.webVitals],
    },
    {
      type: "cta",
      title: "See how your website measures up",
      text: "Get a free clinic website audit against this checklist, or message us on WhatsApp.",
    },
  ],
};
