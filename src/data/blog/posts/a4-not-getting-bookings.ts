import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const notGettingBookingsPost: BlogPost = {
  slug: "clinic-website-not-getting-bookings",
  title: "Why your clinic website isn't getting bookings (and how to fix it)",
  seoTitle: "Clinic Website Not Getting Bookings? 9 Fixes | Zyverra",
  metaDescription:
    "Clinic website not getting bookings? Find the nine most common causes, from slow mobile pages to hidden prices, and fix them in order. Get a free audit.",
  excerpt:
    "The nine most common reasons a clinic website gets visits but not bookings, how to spot each one, and the order to fix them in.",
  date: "2026-11-11",
  updated: "2026-11-11",
  category: "Websites",
  targetKeyword: "clinic website not getting bookings",
  image: "/blog/clinic-website-not-getting-bookings/og",
  imageAlt: "Why a clinic website isn't getting bookings",
  servicePath: "/clinic-website-redesign",
  body: [
    {
      type: "answer",
      text: "A clinic website usually fails to get bookings for one of three reasons: the right people aren't finding it, the people who arrive can't quickly find their treatment, price and practitioner, or booking takes too many steps. Diagnose which one it is before changing anything, then fix speed, clarity and booking friction first, because they affect every visitor.",
    },
    {
      type: "tldr",
      items: [
        "First work out whether it's a traffic problem or a conversion problem.",
        "Slow mobile pages, hidden prices and buried booking buttons are the most common culprits.",
        "Trust gaps (no practitioner, no reviews, no real photos) stop nervous first-time clients.",
        "Fix in order: speed, clarity, trust, booking, then traffic.",
      ],
    },
    { type: "heading", text: "Is it a traffic problem or a conversion problem?" },
    {
      type: "paragraph",
      text: "Open " + cite(SRC.searchConsole, "Google Search Console") + " and your analytics. If very few people visit the site, you have a visibility problem, and changing the design won't help much. If people visit but don't book, you have a conversion problem, and the fixes below will. Most clinics have some of both, but one is usually bigger.",
    },
    {
      type: "table",
      caption: "Diagnosing a clinic website that doesn't get bookings",
      head: ["What you see", "Likely problem", "Start with"],
      rows: [
        ["Few visits from Google", "Visibility", "Treatment pages, Google Business Profile, local SEO"],
        ["Visits but people leave quickly", "Speed or first impression", "Mobile speed and the first screen"],
        ["People view treatments but don't book", "Price, trust or booking friction", "Prices, practitioner page, booking button"],
        ["Lots of calls asking the same questions", "Missing information", "FAQs and treatment detail"],
        ["Enquiries arrive but don't turn into bookings", "Follow-up", "Response time and enquiry handling"],
      ],
    },
    { type: "heading", text: "Is your website too slow on mobile?" },
    {
      type: "paragraph",
      text: "Most clients will look at your site on a phone, often on mobile data. Run your homepage and your busiest treatment page through " + cite(SRC.pageSpeed, "PageSpeed Insights") + " and look at the mobile results against Google's " + cite(SRC.webVitals, "Core Web Vitals") + ". Large uncompressed photos, autoplay videos and too many add-ons are the usual causes.",
    },
    { type: "heading", text: "Can visitors tell what you do in five seconds?" },
    {
      type: "paragraph",
      text: "Show your homepage to someone who's never seen it for five seconds, then ask what you offer and where. If they can't say, your first screen needs a clearer headline and two obvious buttons: view treatments, and book.",
    },
    { type: "heading", text: "Are your prices hidden?" },
    {
      type: "paragraph",
      text: "Clients compare clinics on price. If they have to call or message to find out what a treatment costs, many won't. Show a price or a “from” price on every treatment where you can. For treatments that need a consultation first, say so and explain what happens at the consultation.",
    },
    { type: "heading", text: "Do people trust the person who'll treat them?" },
    {
      type: "paragraph",
      text: "A missing practitioner page is one of the biggest conversion gaps we see. Show names, photos, qualifications, registration and insurance. The NHS encourages people to check who will carry out a non-surgical procedure (" + cite(SRC.nhsNonSurgical, "NHS") + "), so answer that question before they ask it.",
    },
    { type: "heading", text: "How many taps does it take to book?" },
    {
      type: "paragraph",
      text: "Count them on your own phone, from your homepage to a confirmed booking for your most popular treatment. If it's more than three or four taps before the booking system opens, move the booking button into the header and onto every treatment page, and add WhatsApp for people who want to ask first.",
    },
    { type: "heading", text: "Are your results believable?" },
    {
      type: "paragraph",
      text: "Heavily filtered or obviously edited before-and-afters reduce trust, and CAP is clear that such images must not exaggerate results (" + cite(SRC.asaBeforeAfter, "CAP") + "). Use genuine, consented photos labelled with the treatment and “results vary”.",
    },
    { type: "heading", text: "Is your wording putting people off, or breaking the rules?" },
    {
      type: "paragraph",
      text: "Pressure tactics, countdown timers on injectables and promotion of prescription-only medicines can all put off careful clients and attract complaints (" + cite(SRC.asaFineLine, "ASA") + "). Calm, factual, consultation-led wording converts better with the clients you actually want.",
    },
    { type: "heading", text: "Are your treatment pages too thin to rank?" },
    {
      type: "paragraph",
      text: "If all your treatments sit on one page, Google can't match individual pages to individual searches. Give each treatment its own page, opening with a direct answer to what it is, who it suits and what it costs. Our " + POST("aesthetic-treatment-page-seo", "guide to treatment pages that rank") + " walks through the structure.",
    },
    { type: "heading", text: "What happens after someone enquires?" },
    {
      type: "paragraph",
      text: "Sometimes the website works and the follow-up doesn't. If enquiries sit unanswered for a day, many people book elsewhere. See " + POST("clinic-enquiry-conversion", "how to turn more clinic enquiries into booked consultations") + ".",
    },
    { type: "heading", text: "How do you measure whether your fixes are working?" },
    {
      type: "paragraph",
      text: "Change one thing at a time and give it at least a few weeks before judging it. Track three numbers each month: visits to your treatment pages, clicks on booking and WhatsApp buttons, and confirmed bookings or consultations. If visits rise but clicks don't, the problem is on the page. If clicks rise but bookings don't, look at your booking system and how quickly you reply.",
    },
    {
      type: "paragraph",
      text: "You don't need complex tools. " + cite(SRC.searchConsole, "Google Search Console") + " shows which pages people find you through, your booking platform shows completed bookings, and a simple, consent-aware analytics tool can count button clicks. Write the numbers in a spreadsheet each month; trends matter more than any single figure.",
    },
    { type: "heading", text: "A worked example: fixing a quiet treatment page" },
    {
      type: "paragraph",
      text: "Imagine a clinic whose skin booster page gets steady visits but almost no bookings. Looking at it on a phone reveals the problem quickly: the page opens with a long paragraph about the clinic's history, the price is at the very bottom, there's no photo of the practitioner, and the only way to book is the menu.",
    },
    {
      type: "ordered",
      items: [
        "Rewrite the opening as a two-sentence answer: what skin boosters do, who they suit, the course price and how to book.",
        "Add a booking button directly under that answer and again at the end.",
        "Add a short practitioner card with qualifications and a photo.",
        "Add three consented results with “results vary”.",
        "Add five FAQs: how many sessions, downtime, does it hurt, aftercare, how to pay.",
      ],
    },
    {
      type: "paragraph",
      text: "None of these steps needs new technology. Each one removes a doubt or a step between interest and booking, which is what most conversion problems come down to.",
    },
    {
      type: "checklist",
      title: "The fix-it order",
      items: [
        "1. Mobile speed: compress images, remove unused add-ons",
        "2. First screen: a “what and where” headline plus Book and Treatments buttons",
        "3. Prices: a price or “from” price on every treatment page",
        "4. Trust: practitioner page, real reviews, consented results",
        "5. Booking: header button, buttons on every treatment page, WhatsApp",
        "6. Wording: calm, factual, ASA-safe",
        "7. Visibility: individual treatment pages, Google Business Profile, local SEO",
        "8. Follow-up: reply to every enquiry the same day",
      ],
    },
    { type: "heading", text: "Could your Google Business Profile be the real problem?" },
    {
      type: "paragraph",
      text: "Many people never reach your website: they see your Google profile, check reviews and photos, and decide there. If your profile has old photos, few reviews or wrong opening hours, they may choose another clinic before your website gets a chance. Check your profile with the same fresh eyes you'd use on your homepage. Google says local results depend on relevance, distance and prominence (" + cite(SRC.gbpRanking, "Google Business Profile Help") + "), and our " + POST("google-business-profile-aesthetic-clinic-guide", "step-by-step profile guide") + " covers the fixes.",
    },
    { type: "heading", text: "Are you attracting the wrong enquiries?" },
    {
      type: "paragraph",
      text: "Sometimes a website gets enquiries, just not ones that book. If most messages are price-shopping for one treatment, or ask about services you don't offer, your pages may be attracting the wrong searches. Make sure each treatment page states clearly who it's for and what it costs, and remove or rewrite pages for treatments you no longer provide.",
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "Our " + LINK.audit + " checks your site against this list. If it needs more than fixes, our " + LINK.redesign + " rebuilds it without losing your Google visibility, and " + LINK.seo + " covers the traffic side. Prices are on our " + LINK.pricing + " page.",
    },
    {
      type: "faq",
      items: [
        { q: "Why does my clinic website get visits but no bookings?", a: "Usually because prices, trust signals or the booking button are hard to find on mobile. Count the taps to book and check what a first-time visitor sees first." },
        { q: "How do I know if my website is too slow?", a: "Test your key pages on PageSpeed Insights using the mobile results, and check them on your own phone using mobile data." },
        { q: "Should I add a booking widget to every page?", a: "A booking button on every treatment page and in the header is usually enough. Embedding a full widget everywhere can slow the site down." },
        { q: "Will a redesign fix my bookings?", a: "Only if the problem is on the website. Diagnose first; sometimes the fix is visibility or enquiry follow-up instead." },
        { q: "Can you tell me what's wrong with my site?", a: "Yes. Request a [free clinic website audit](/free-clinic-website-audit) and we'll list the biggest issues, most important first." },
      ],
    },
    { type: "sources", items: [SRC.searchConsole, SRC.pageSpeed, SRC.webVitals, SRC.nhsNonSurgical, SRC.asaBeforeAfter, SRC.asaFineLine] },
    { type: "cta", title: "Find out what's stopping your bookings", text: "Get a free clinic website audit, or message us on WhatsApp." },
  ],
};
