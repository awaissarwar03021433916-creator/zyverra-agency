import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const enquiryConversionPost: BlogPost = {
  slug: "clinic-enquiry-conversion",
  title: "How to turn more clinic enquiries into booked consultations",
  seoTitle: "Clinic Enquiry Conversion: Book More Consultations | Zyverra",
  metaDescription:
    "Clinic enquiry conversion, step by step: reply fast, answer the real question, make booking easy and follow up kindly. Includes reply templates to adapt.",
  excerpt:
    "A practical system for turning website, WhatsApp and social enquiries into booked consultations, with reply templates you can adapt.",
  date: "2026-11-11",
  updated: "2026-11-11",
  category: "Clinic growth",
  targetKeyword: "clinic enquiry conversion",
  image: "/blog/clinic-enquiry-conversion/og",
  imageAlt: "Turning clinic enquiries into booked consultations",
  servicePath: "/aesthetic-clinic-website-design",
  body: [
    {
      type: "answer",
      text: "To turn more clinic enquiries into booked consultations, reply quickly, answer the question the person actually asked, give them one easy way to book, and follow up kindly if they go quiet. Most lost enquiries aren't lost on price; they're lost to slow replies, vague answers or too many steps between “I'm interested” and a confirmed appointment.",
    },
    {
      type: "tldr",
      items: [
        "Speed matters: reply the same day, ideally within a few hours.",
        "Answer the real question first, then invite them to book.",
        "Make booking one tap: send the direct booking link.",
        "Follow up once or twice, politely, then stop.",
        "Keep health details out of DMs; move them into the consultation process.",
      ],
    },
    { type: "heading", text: "Where are clinic enquiries usually lost?" },
    {
      type: "table",
      caption: "Where clinic enquiries are lost",
      head: ["Stage", "What goes wrong", "Fix"],
      rows: [
        ["First reply", "Hours or days pass before anyone answers", "Set a same-day reply standard and an owner"],
        ["The answer", "A generic “please book a consultation”", "Answer the question, then invite"],
        ["Booking", "Several messages to find a time", "Send the direct booking link"],
        ["Silence", "No follow-up after the first reply", "One or two polite follow-ups"],
        ["The consultation", "No-shows", "Deposits and reminders"],
      ],
    },
    { type: "heading", text: "How quickly should you reply?" },
    {
      type: "paragraph",
      text: "As quickly as you reasonably can, and the same day at the latest. People researching a treatment often message several clinics at once, and the first helpful reply has an advantage. Decide who answers enquiries on each day, and set an away message for evenings that says when you'll reply and links to your booking page.",
    },
    { type: "heading", text: "What should the first reply say?" },
    {
      type: "paragraph",
      text: "Answer the question they asked, in plain English, before inviting them to book. If they asked about price, give the price or range. If they asked about downtime, explain it. Then make the next step easy. Here's a template to adapt:",
    },
    {
      type: "note",
      text: "“Hi Sarah, thanks for getting in touch. A course of skin boosters is usually two to three sessions, four weeks apart, and starts from £X. Most people have mild redness for a day or so. The best next step is a free consultation where we check it's right for you. You can book here: [link]. Any other questions, just reply.”",
    },
    { type: "heading", text: "How do you handle questions about injectables?" },
    {
      type: "paragraph",
      text: "Messages, posts and replies can all count as marketing. For prescription-only treatments, focus on the consultation: what it involves, that it's with a qualified practitioner, and that treatment may or may not be recommended (" + cite(SRC.asaFineLine, "ASA") + "). Avoid sending promotional price lists for prescription-only medicines in broadcast messages.",
    },
    { type: "heading", text: "How should you handle health details in messages?" },
    {
      type: "paragraph",
      text: "Clients sometimes share medical information in a DM or WhatsApp. That's health data, which is special category data under UK GDPR (" + cite(SRC.icoSpecialCategory, "ICO") + "). Don't ask for medical history over social media; thank them and move the conversation into your consultation process, where it can be recorded securely.",
    },
    { type: "heading", text: "How do you make booking effortless?" },
    {
      type: "list",
      items: [
        "Send a direct link to book that treatment or consultation, not your homepage",
        "Offer two specific times if they prefer you to book for them",
        "Explain any deposit and cancellation policy clearly and briefly",
        "Confirm in writing with the date, time, address and what to bring",
      ],
    },
    { type: "heading", text: "How should you follow up if they go quiet?" },
    {
      type: "paragraph",
      text: "One or two follow-ups are helpful; more starts to feel like pressure. A day or two later, send a short, friendly message offering to answer any questions. A week later, one final message. Then stop. For any ongoing marketing by email or text, make sure you have the right consent (" + cite(SRC.icoEmailMarketing, "ICO") + ").",
    },
    { type: "heading", text: "How do you reduce consultation no-shows?" },
    {
      type: "list",
      items: [
        "Take a small deposit at booking, with a clear policy",
        "Send a reminder the day before, with the address and parking details",
        "Make it easy to rearrange rather than simply not turning up",
      ],
    },
    { type: "heading", text: "How do you track enquiry conversion?" },
    {
      type: "table",
      caption: "Simple enquiry tracking",
      head: ["Measure", "How to calculate", "Use it to"],
      rows: [
        ["Enquiries", "Count per week by channel", "See where enquiries come from"],
        ["Reply time", "Average time to first reply", "Spot slow days"],
        ["Enquiry-to-booking rate", "Bookings ÷ enquiries", "Judge your replies and booking flow"],
        ["Consultation-to-treatment rate", "Treatments ÷ consultations", "Judge fit and consultation quality"],
      ],
    },
    {
      type: "checklist",
      title: "Enquiry handling checklist",
      items: [
        "Someone is responsible for replies every day",
        "Same-day reply standard, with an evening away message",
        "Replies answer the question before inviting to book",
        "Direct booking link in every reply",
        "Health details moved into the consultation process",
        "One or two polite follow-ups, then stop",
        "Deposits and reminders for consultations",
        "Enquiries and bookings tracked weekly",
      ],
    },
    { type: "heading", text: "Can your website do some of this for you?" },
    {
      type: "paragraph",
      text: "Yes. Clear prices and FAQs on each treatment page answer many questions before they're asked, booking buttons let ready clients skip the conversation, and an " + LINK.chatbot + " can answer common questions out of hours and capture contact details. Read " + POST("clinic-website-not-getting-bookings", "why your clinic website isn't getting bookings") + " and " + POST("aesthetic-clinic-patient-retention", "how to increase patient retention") + ".",
    },
    { type: "heading", text: "A worked example: handling a price-only enquiry" },
    {
      type: "paragraph",
      text: "Many enquiries are a single line: “How much for lips?”. A curt price-only reply often ends the conversation. A better reply answers the question, adds one useful detail and opens the door:",
    },
    {
      type: "note",
      text: "“Hi! Lip enhancement with dermal filler starts from £X for 0.5ml and £Y for 1ml, including a review appointment two weeks later. Everything starts with a short consultation so we can talk through the look you'd like. You can book here: [link], or ask me anything else.”",
    },
    {
      type: "paragraph",
      text: "It's specific, honest and friendly, and it makes the next step obvious, which is usually all a price enquiry needs.",
    },
    { type: "heading", text: "Should the whole team use the same replies?" },
    {
      type: "paragraph",
      text: "Yes. Write a short library of replies for your most common enquiries, such as price, downtime, first-time nerves and availability, and keep it somewhere everyone can access. Personalise each reply, but use the same accurate facts. Review the library whenever prices or treatments change.",
    },
    { type: "heading", text: "Should you use an AI chatbot for enquiries?" },
    {
      type: "paragraph",
      text: "A chatbot can answer common questions about prices, opening hours, aftercare and how to book at any time of day, and capture contact details for your team to follow up. It should never give medical advice or decide whether a treatment is suitable; those questions belong in a consultation. Used that way, a chatbot shortens the gap between an evening enquiry and your reply the next morning.",
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "We build " + LINK.websites + " with prices, FAQs and booking on every treatment page, plus WhatsApp and optional AI chat. See " + LINK.pricing + " and our " + LINK.audit + ".",
    },
    {
      type: "faq",
      items: [
        { q: "How fast should a clinic reply to enquiries?", a: "The same day at the latest, and as quickly as you reasonably can. Many people message several clinics at once." },
        { q: "Should I give prices over DM?", a: "For most treatments, yes, or a range. For prescription-only treatments, focus on the consultation rather than promotional prices." },
        { q: "How many times should I follow up?", a: "Once or twice, politely, then stop. More than that can feel like pressure." },
        { q: "Can I ask about medical history on WhatsApp?", a: "It's better not to. Move health questions into your consultation process, where the information can be handled securely." },
        { q: "Do deposits reduce no-shows?", a: "A small deposit with a clear policy, plus a reminder, usually helps clients commit and makes rearranging easier than not turning up." },
      ],
    },
    { type: "sources", items: [SRC.asaFineLine, SRC.icoSpecialCategory, SRC.icoEmailMarketing, SRC.icoDirectMarketing] },
    { type: "cta", title: "Losing enquiries?", text: "Get a free audit of your website's enquiry and booking journey, or message us on WhatsApp." },
  ],
};
