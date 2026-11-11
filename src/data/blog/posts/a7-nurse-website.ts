import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const nurseWebsitePost: BlogPost = {
  slug: "aesthetic-nurse-website-starting-out",
  title: "Website for an aesthetic nurse: what you need when you're starting out",
  seoTitle: "Aesthetic Nurse Website: What You Need to Start | Zyverra",
  metaDescription:
    "Starting out as an aesthetic nurse? What your first website needs: pages, registration details, booking, compliance and budget, in a simple launch plan.",
  excerpt:
    "A practical launch plan for an aesthetic nurse's first website: the pages you need, what to leave until later and how to stay within the rules.",
  date: "2026-11-11",
  updated: "2026-11-11",
  category: "Websites",
  targetKeyword: "aesthetic nurse website starting out",
  image: "/blog/aesthetic-nurse-website-starting-out/og",
  imageAlt: "Website for an aesthetic nurse starting out",
  servicePath: "/website-for-aesthetic-nurses",
  body: [
    {
      type: "answer",
      text: "When you're starting out as an aesthetic nurse, your first website needs five things: a page about you with your registration and insurance, one page per treatment with prices, a clear way to book or message you, a few consented results when you have them, and a privacy notice and cookie banner. Everything else, such as a blog, offers and extra locations, can come later.",
    },
    {
      type: "tldr",
      items: [
        "Start small: about you, treatments with prices, booking, legal pages.",
        "Lead with your nursing background and registration; that's your biggest advantage.",
        "You can't promote prescription-only medicines, so use consultation-led wording.",
        "Choose a set-up you can update yourself as you add treatments.",
      ],
    },
    { type: "heading", text: "Do you really need a website when you're just starting?" },
    {
      type: "paragraph",
      text: "Many new practitioners begin with Instagram alone. That can bring early clients, but it has limits: posts are hard to find later, prices and aftercare get lost in captions, and you're not visible when someone searches Google for a treatment near them. A simple website gives you one dependable place to send people from Instagram, your Google Business Profile and word of mouth.",
    },
    { type: "heading", text: "Which pages should your first website have?" },
    {
      type: "table",
      caption: "Pages for an aesthetic nurse's first website",
      head: ["Page", "Must include", "Can wait"],
      rows: [
        ["Home", "Who you are, where you work, main treatments, booking", "Video, animations"],
        ["About you", "Nursing background, registration, training, insurance, approach", "Long personal story"],
        ["Treatments", "One page per treatment with price, downtime, aftercare", "Pages for treatments you don't offer yet"],
        ["Book / contact", "Booking link, WhatsApp, area or address, hours", "Complex forms"],
        ["Results", "Consented photos once you have them", "Large galleries"],
        ["Legal", "Privacy notice, cookie banner, terms", "—"],
      ],
    },
    { type: "heading", text: "What should your “about” page say?" },
    {
      type: "paragraph",
      text: "Your nursing background is your strongest selling point, so make it specific: your clinical experience, aesthetics training, the treatments you're trained in, and your insurance. Clients can check a nurse's registration on the " + cite(SRC.nmcRegister, "NMC register") + ", and the " + cite(SRC.nmcCode, "NMC Code") + " expects nurses to be honest and act with integrity, which extends to how you describe your experience. Add a friendly photo and a short paragraph on your approach to natural, realistic results.",
    },
    { type: "heading", text: "How do you write about injectables if you're a prescriber?" },
    {
      type: "paragraph",
      text: "Your website is advertising, so prescription-only medicines can't be promoted to the public, even by a prescriber (" + cite(SRC.asaFineLine, "ASA") + "). Build those pages around the concern and the consultation instead, for example a “lines and wrinkles consultation” page, and make clear a consultation may or may not lead to a prescription. CAP has specific advice on websites offering prescription-only medicines following a consultation (" + cite(SRC.asaPomWebsites, "CAP") + "). Our " + POST("botox-advertising-rules-clinic-website", "guide to the advertising rules") + " explains more.",
    },
    { type: "heading", text: "Where do you work, and how should the website show it?" },
    {
      type: "paragraph",
      text: "Many nurses start by renting a room in a salon or clinic, working from home, or visiting clients. Say clearly where you see clients and how they book at each place. If you work from home, you can show a service area rather than your full address. If you work from more than one location, give each its own section with the correct booking route.",
    },
    { type: "heading", text: "How much should a first website cost?" },
    {
      type: "paragraph",
      text: "You don't need to spend thousands. A focused site with the pages above is enough to look professional and start ranking for local searches. Our " + POST("aesthetic-clinic-website-cost-uk", "guide to clinic website prices in the UK") + " explains typical ranges; our own websites start at £300, or £400 with a dashboard so you can update it yourself (" + LINK.pricing + ").",
    },
    { type: "heading", text: "What should you set up alongside the website?" },
    {
      type: "list",
      items: [
        "A Google Business Profile that matches your website details",
        "An Instagram bio that links to your website",
        "Registration with the ICO if you need to pay the data protection fee (" + cite(SRC.icoFee, "ICO") + ")",
        "A simple booking system with deposits and reminders",
        "A consent process for before-and-after photos from day one",
      ],
    },
    { type: "heading", text: "What can wait until later?" },
    {
      type: "paragraph",
      text: "Blogs, offers pages, memberships, multiple galleries and advertising can all wait until you're getting steady bookings. Adding pages for treatments you don't yet offer creates work and can mislead clients. Grow the site as your practice grows; a set-up you can update yourself makes that easy.",
    },
    { type: "heading", text: "A worked example: a launch plan for your first month" },
    {
      type: "ordered",
      items: [
        "**Week 1:** Write your about page and list the treatments you're fully trained and insured for, with prices.",
        "**Week 2:** Take photos of your treatment room and yourself; set up your booking system and Google Business Profile.",
        "**Week 3:** Launch the website with your about page, treatment pages, booking, contact and legal pages.",
        "**Week 4:** Link your website from Instagram and Google, ask your first clients for reviews, and start collecting consented results.",
      ],
    },
    {
      type: "checklist",
      title: "First website checklist for aesthetic nurses",
      items: [
        "About page with nursing background, registration, training and insurance",
        "One page per treatment you offer, with prices",
        "No prescription-only medicine names used promotionally",
        "Booking link and WhatsApp on every page",
        "Service area or address, and opening times",
        "Privacy notice, cookie banner and terms",
        "Consent process for before-and-after photos",
        "Google Business Profile matching your website",
      ],
    },
    { type: "heading", text: "How should you photograph yourself and your room?" },
    {
      type: "paragraph",
      text: "You don't need a professional shoot to start, but you do need clear, honest photos. Use natural light from a window, a plain background and a recent phone. Take a friendly head-and-shoulders photo, a few of you at work (with no client identifiable unless they've consented), and wide shots of a clean, tidy treatment room. These photos will appear on your website, Google profile and Instagram, so consistency helps people recognise you.",
    },
    { type: "heading", text: "What wording should you use for prices?" },
    {
      type: "paragraph",
      text: "Show prices for treatments you can advertise, as a single price or a “from” price. Mention what's included, such as a review appointment. For prescription-only treatments, use “price on consultation” and explain what the consultation costs, if anything, and what it involves. Never present a prescription-only medicine as a deal or bundle.",
    },
    { type: "heading", text: "How do you build trust when you're new?" },
    {
      type: "list",
      items: [
        "Lead with your clinical experience; years as a nurse count, even if aesthetics is new",
        "Explain your training clearly and honestly, without overstating it",
        "Mention your insurance and how you handle complications or concerns",
        "Show a clear consultation process, including when you'd advise against treatment",
        "Ask early clients for honest reviews, without offering incentives",
      ],
    },
    {
      type: "paragraph",
      text: "Industry registers and bodies such as " + cite(SRC.saveFace, "Save Face") + " and the " + cite(SRC.jccp, "JCCP") + " offer accreditation routes some practitioners choose. Only mention memberships you genuinely hold.",
    },
    { type: "heading", text: "How will regulation affect your website?" },
    {
      type: "paragraph",
      text: "The government has confirmed plans for a licensing scheme for non-surgical cosmetic procedures in England (" + cite(SRC.govLicensing, "GOV.UK") + "). Details and timing are still being worked out, so follow official updates. Whatever happens, a website that clearly shows your qualifications, insurance and premises will make it easy to add licence details once they apply.",
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "Our " + LINK.nurse + " service covers everything on this checklist, and you can add the " + LINK.dashboard + " to update it yourself. When you're ready to grow, see " + LINK.gbp + ". For more ideas, read our " + POST("aesthetic-clinic-website-checklist", "aesthetic clinic website checklist") + ".",
    },
    {
      type: "faq",
      items: [
        { q: "Do I need a website to start as an aesthetic nurse?", a: "It isn't compulsory, but it gives you a professional home for your treatments, prices and booking, and helps you appear when people search locally." },
        { q: "Should I show my NMC PIN on my website?", a: "There's no general rule that you must, but stating that you're a registered nurse and making your registration easy to verify builds trust. Clients can check the NMC register." },
        { q: "Can I list the treatments I prescribe?", a: "Not promotionally. Prescription-only medicines can't be advertised to the public, so use concern-led, consultation-first pages instead." },
        { q: "I work from home. What address should I show?", a: "You can show your town or service area rather than your full address, and share the exact location after booking." },
        { q: "How quickly can I get a website live?", a: "Our websites go live in 7–10 working days once we have your content, logo, treatment list and photos." },
      ],
    },
    { type: "sources", items: [SRC.nmcRegister, SRC.nmcCode, SRC.asaFineLine, SRC.asaPomWebsites, SRC.icoFee] },
    { type: "cta", title: "Starting your practice?", text: "Get a free review of your plans or current site, or message us on WhatsApp." },
  ],
};
