import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const aiChatbotPost: BlogPost = {
  slug: "does-aesthetics-clinic-need-ai-chatbot",
  title: "Do aesthetics clinics need an AI chatbot?",
  seoTitle: "Do Aesthetics Clinics Need an AI Chatbot? | Zyverra",
  metaDescription:
    "When an AI chatbot helps a UK aesthetics clinic, what it should and shouldn't do, booking systems, WhatsApp and UK GDPR. A practical guide.",
  excerpt:
    "When an AI chatbot is worth it for an aesthetics clinic, what it should answer, how it connects to booking and WhatsApp, and how to keep it within UK GDPR.",
  date: "2026-11-12",
  updated: "2026-11-12",
  category: "Clinic growth",
  targetKeyword: "AI chatbot aesthetics clinic",
  image: "/blog/does-aesthetics-clinic-need-ai-chatbot/og",
  imageAlt: "An AI chatbot answering questions on an aesthetics clinic website",
  servicePath: "/custom-software-ai-chatbots",
  body: [
    {
      type: "answer",
      text: "Not every clinic needs one. An AI chatbot is worth it if you regularly miss enquiries while you're treating clients or after hours, and the same questions about prices, treatments and booking come up again and again. It should answer those questions, capture the enquiry and hand over to you. It should never give medical advice or collect health details.",
    },
    {
      type: "tldr",
      items: [
        "Good fit: busy solo practitioners and clinics with lots of repeat questions and evening enquiries.",
        "A chatbot answers from your own website content, then hands over to you, your booking system or WhatsApp.",
        "Fix the basics first: a booking button on every page, clear prices and fast replies.",
        "Keep it within UK GDPR: tell people it's automated, and keep health details for the consultation.",
      ],
    },
    { type: "heading", text: "What can an AI chatbot do for a clinic?" },
    {
      type: "paragraph",
      text: "A website chatbot sits in the corner of your site and answers typed questions. A modern AI chatbot understands questions phrased in different ways and replies in natural language, using information you've given it: your treatments, prices, opening hours, location, aftercare advice and policies.",
    },
    {
      type: "list",
      items: [
        "Answer common questions instantly, including late at night",
        "Explain what happens at a consultation and how to prepare",
        "Point people to the right treatment page and booking link",
        "Take a name, phone number and the treatment of interest for a call back",
        "Hand over to WhatsApp or a human when the question needs one",
      ],
    },
    {
      type: "paragraph",
      text: "It's an assistant for your front desk, not a practitioner. Questions about suitability, medical history, side effects in a specific person or which medicine to use belong in a consultation with a qualified prescriber.",
    },
    { type: "heading", text: "How do you stop missing enquiries when you're with clients?" },
    {
      type: "paragraph",
      text: "Let clients help themselves while you're busy, and set expectations for when you'll reply. That means a booking button on every page, prices on every treatment page, an FAQ that answers the common questions, an automatic WhatsApp away message with your reply times, and, if volume justifies it, a chatbot that captures details for a call back.",
    },
    {
      type: "table",
      caption: "Ways to stop missing enquiries, from simplest to most involved",
      head: ["Fix", "Cost", "What it solves"],
      rows: [
        ["Booking button on every page", "Usually free with your booking system", "People who are ready to book don't need to message you"],
        ["Prices and FAQs on treatment pages", "Your time", "The most common questions are answered before they're asked"],
        ["WhatsApp Business away message and quick replies", "Free app", "People know when you'll reply; you answer faster"],
        ["Enquiry form with a clear reply time", "Included in most websites", "Captures details while you're treating"],
        ["AI chatbot with call-back capture", "A build cost, quoted per project", "Answers questions and captures enquiries around the clock"],
      ],
    },
    {
      type: "paragraph",
      text: "Many clinics solve most of the problem with the first three rows. Our guide to " + POST("clinic-enquiry-conversion", "turning more enquiries into booked consultations") + " covers reply scripts and follow-up.",
    },
    { type: "heading", text: "When is a chatbot worth it?" },
    {
      type: "checklist",
      title: "A chatbot is likely to help if…",
      items: [
        "You get a steady flow of website or Instagram messages you can't answer during appointments",
        "Many enquiries arrive in the evening or at weekends",
        "Most questions are the same: price, how long it lasts, how to book, parking",
        "You already have clear treatment pages with prices for the bot to learn from",
        "Someone can review the chat log each week and improve the answers",
      ],
    },
    {
      type: "paragraph",
      text: "If you only receive a handful of enquiries a week, a chatbot is unlikely to pay for itself. Put the effort into your " + LINK.treatmentPages + " and booking journey first.",
    },
    { type: "heading", text: "What's the best booking system for a UK aesthetics clinic?" },
    {
      type: "paragraph",
      text: "The best booking system is one that suits how you work: online booking with deposits, reminders, consultation forms and a client record you can trust. Fresha, Treatwell, Booksy, Timely, Phorest, Acuity and Faces are all used by UK clinics and salons. Marketplaces bring new clients; standalone systems give you more control.",
    },
    {
      type: "table",
      caption: "Booking options UK clinics commonly use",
      head: ["Type", "Examples", "Worth knowing"],
      rows: [
        ["Marketplace with booking software", "Fresha, Treatwell, Booksy", "Can bring new clients through their apps; check fees for marketplace bookings"],
        ["Salon and clinic software", "Timely, Phorest", "Diary, reminders, client records and marketing tools for established clinics"],
        ["General scheduling", "Acuity", "Flexible appointment booking; fewer clinic-specific features"],
        ["Aesthetics-specific", "Faces", "Built for aesthetics practitioners, including consultation tools"],
      ],
      note: "Features and fees change; check each provider's current pricing before you choose.",
    },
    {
      type: "paragraph",
      text: "Fresha publishes its pricing, including fees for new clients it brings you (" + cite(SRC.fresha, "Fresha") + "), and Treatwell explains how its partner model works (" + cite(SRC.treatwell, "Treatwell") + "). Whatever you choose, your website should link to it from every treatment page. Our comparison of " + POST("fresha-treatwell-or-own-website", "Fresha, Treatwell and your own website") + " goes into more detail.",
    },
    { type: "heading", text: "Can WhatsApp be connected to your clinic website?" },
    {
      type: "paragraph",
      text: "Yes. The simplest way is a WhatsApp button that opens a chat with your business number and a pre-filled message, so clients can message you in one tap. Using the WhatsApp Business app, you can add an away message, quick replies and business hours. A chatbot can also hand conversations over to WhatsApp when a person needs to answer.",
    },
    {
      type: "paragraph",
      text: "The WhatsApp Business app is free and includes greeting and away messages and quick replies (" + cite(SRC.whatsappBusiness, "WhatsApp") + "). Treat WhatsApp like any other channel under UK GDPR: tell people in your privacy notice that you use it, don't ask for health details in chat, and keep anything clinical for the consultation (" + cite(SRC.icoSpecialCategory, "ICO") + ").",
    },
    { type: "heading", text: "What should a clinic chatbot never do?" },
    {
      type: "list",
      items: [
        "**Give medical advice** or say whether a treatment is suitable for someone",
        "**Collect health information**, such as medical history, medication or pregnancy, in an open chat",
        "**Promote prescription-only medicines** by name; it must follow the same advertising rules as your website (" + cite(SRC.asaPomWebsites, "CAP") + ")",
        "**Invent prices or offers** that aren't on your website",
        "**Pretend to be human.** Say clearly that it's an automated assistant",
      ],
    },
    {
      type: "paragraph",
      text: "The ICO's guidance on AI and data protection expects organisations to be transparent about how AI uses personal data and to keep only what's necessary (" + cite(SRC.icoAi, "ICO") + "). In practice: a short notice at the start of the chat, a link to your privacy notice, and a clear way to reach a person.",
    },
    { type: "heading", text: "A worked example: a Tuesday night enquiry" },
    {
      type: "ordered",
      items: [
        "At 10.40pm a visitor on your skin booster page types: “how much and does it hurt?”",
        "The chatbot replies with the price from your page, a plain-English description of what the treatment feels like taken from your own FAQ, and the note that a consultation comes first.",
        "The visitor asks: “can I have it if I'm on medication?” The bot says that's a question for the practitioner at consultation, and offers to take their name and number for a call back.",
        "They leave their details. At 9am you see the enquiry, the full chat and the treatment of interest, and call them before your first client.",
      ],
    },
    {
      type: "paragraph",
      text: "Nothing clinical was collected or advised in the chat, and the enquiry wasn't lost overnight.",
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "We build " + LINK.chatbot + " that answer from your own website content, capture enquiries and hand over to you or WhatsApp, with no medical advice. Most clinics start with the basics, which every one of our " + LINK.websites + " includes: booking links for Fresha, Treatwell, Booksy, Timely, Phorest, Acuity or Faces, a WhatsApp button, and an enquiry form. Websites cost £300, or £400 with an admin dashboard; see " + LINK.pricing + ".",
    },
    {
      type: "faq",
      items: [
        { q: "Can an AI chatbot book appointments for my clinic?", a: "It can send people straight to the right service in your booking system, and some systems allow deeper connections. Simplest and most reliable is a direct booking link." },
        { q: "Will a chatbot answer medical questions?", a: "It shouldn't. A clinic chatbot should answer general questions about treatments, prices and booking, and pass anything about suitability or health to a practitioner." },
        { q: "Is a website chatbot GDPR compliant?", a: "It can be. Tell people it's automated, link to your privacy notice, collect only contact details and the treatment of interest, and keep health details for the consultation." },
        { q: "Do I need a chatbot if I already use WhatsApp?", a: "Not necessarily. A WhatsApp button with an away message and quick replies covers many clinics. A chatbot adds instant answers when message volume is high." },
        { q: "How much does a clinic chatbot cost?", a: "It depends on what it needs to connect to. We quote each chatbot after a short call about your enquiries and booking system." },
      ],
    },
    { type: "sources", items: [SRC.icoAi, SRC.icoSpecialCategory, SRC.whatsappBusiness, SRC.asaPomWebsites, SRC.fresha, SRC.treatwell] },
    { type: "cta", title: "Missing enquiries while you treat?", text: "Get a free audit of your website's booking journey, or message us on WhatsApp." },
  ],
};
