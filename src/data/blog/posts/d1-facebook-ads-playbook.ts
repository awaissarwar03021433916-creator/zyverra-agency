import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const facebookAdsPlaybookPost: BlogPost = {
  slug: "facebook-ads-aesthetic-clinics-uk-playbook",
  title: "Facebook and Instagram ads for aesthetic clinics: a compliant UK playbook",
  seoTitle: "Compliant Facebook Ads for UK Aesthetic Clinics | Zyverra",
  metaDescription:
    "A compliant UK playbook for Facebook and Instagram ads for aesthetic clinics: ASA rules, Meta policy, audiences, landing pages, budgets and metrics.",
  excerpt:
    "How to run Facebook and Instagram ads for an aesthetics clinic that bring consultations without breaking ASA rules or Meta's policies.",
  date: "2026-11-11",
  updated: "2026-11-11",
  category: "Ads",
  targetKeyword: "compliant Facebook ads aesthetic clinic UK",
  image: "/blog/facebook-ads-aesthetic-clinics-uk-playbook/og",
  imageAlt: "Compliant Facebook and Instagram ads for UK aesthetic clinics",
  servicePath: "/meta-ads-for-aesthetic-clinics",
  body: [
    {
      type: "answer",
      text: "Compliant Facebook and Instagram ads for a UK aesthetics clinic promote consultations rather than prescription-only medicines, target adults only, use realistic and consented imagery, and send people to a fast landing page on the clinic's own website. Good campaigns pair that with quick follow-up of every enquiry and simple metrics: cost per enquiry and cost per booked consultation.",
    },
    {
      type: "tldr",
      items: [
        "Two rulebooks apply: the UK CAP Code (enforced by the ASA) and Meta's advertising standards.",
        "Never promote prescription-only medicines; advertise the consultation instead.",
        "Cosmetic intervention ads must not be directed at under-18s.",
        "Send traffic to a dedicated landing page, not your homepage or a DM.",
        "Measure cost per booked consultation, not likes or clicks.",
      ],
    },
    {
      type: "note",
      text: "General guidance, not legal advice. Check the current ASA/CAP guidance and Meta's policies before running ads; CAP's Copy Advice service can review ads in advance.",
    },
    { type: "heading", text: "Which rules apply to clinic ads on Facebook and Instagram?" },
    {
      type: "paragraph",
      text: "Two sets of rules apply at once. The UK " + cite(SRC.capCode, "CAP Code") + " covers the content of your ads and is enforced by the ASA. Meta's " + cite(SRC.metaStandards, "Advertising Standards") + " decide what the platform allows, and include specific policies on health and wellness and on cosmetic procedures (" + cite(SRC.metaHealth, "Meta") + ", " + cite(SRC.metaCosmetic, "Meta") + "). An ad can be approved by Meta and still breach UK rules, so plan for both.",
    },
    { type: "heading", text: "What can't you advertise?" },
    {
      type: "paragraph",
      text: "Prescription-only medicines can't be advertised to the public in the UK, and that includes botulinum toxin products used for anti-wrinkle treatment, even when a health professional administers them (" + cite(SRC.asaBotulinum, "CAP") + "). The ASA has issued an Enforcement Notice specifically about social media ads for these products (" + cite(SRC.asaEnforcement, "ASA") + "). Indirect references, nicknames and prices linked to the medicine can also count as advertising it (" + cite(SRC.asaFineLine, "ASA") + "). Our " + POST("botox-advertising-rules-clinic-website", "guide to the advertising rules") + " covers this in detail.",
    },
    { type: "heading", text: "What can you advertise?" },
    {
      type: "list",
      items: [
        "Consultations for a concern, such as lines and wrinkles or skin quality, making clear a consultation may not lead to treatment",
        "Treatments that aren't prescription-only medicines, such as many skin treatments, facials and laser hair removal, described accurately",
        "Your clinic, team, expertise and approach",
        "Free or paid consultations, with clear terms",
        "Seasonal offers on eligible treatments, without pressure tactics",
      ],
    },
    { type: "heading", text: "Who can you target?" },
    {
      type: "paragraph",
      text: "CAP rules say ads for cosmetic interventions must not be directed at under-18s, including through the media or context in which they appear (" + cite(SRC.asaCosmeticSR, "CAP") + "). Meta's cosmetic procedures policy also restricts these ads to people aged 18 and over (" + cite(SRC.metaCosmetic, "Meta") + "). Set the minimum age to 18 and avoid creative that's likely to appeal particularly to younger audiences.",
    },
    { type: "heading", text: "What should the creative look like?" },
    {
      type: "list",
      items: [
        "Real photos and short videos of your clinic, team and treatment experience",
        "Before-and-afters only where allowed, genuine, unedited and representative (" + cite(SRC.asaBeforeAfter, "CAP") + "), and never for prescription-only medicines",
        "No messaging that plays on insecurity or implies people should be unhappy with how they look (" + cite(SRC.asaBodyImage, "CAP") + ")",
        "No countdown timers or “last chance” pressure on injectable treatments",
        "Plain, specific copy: what it is, who it's for, what happens at the consultation",
      ],
    },
    { type: "heading", text: "Where should your ads send people?" },
    {
      type: "paragraph",
      text: "Send people to a dedicated landing page on your own website, not your homepage, and not only to Instagram DMs. The page should match the ad exactly: the same treatment or consultation, the same offer, a clear price or “price on consultation”, the practitioner, a few FAQs and one obvious action. A landing page you control also lets you update the offer instantly with an " + LINK.dashboard + ".",
    },
    { type: "heading", text: "What happens after someone enquires?" },
    {
      type: "paragraph",
      text: "Ads often fail after the click. Decide in advance who replies to leads, how quickly and how. A same-day reply, a short script, and an easy way to book the consultation make a bigger difference than any targeting setting. See " + POST("clinic-enquiry-conversion", "how to turn more clinic enquiries into booked consultations") + ".",
    },
    { type: "heading", text: "How much should a clinic spend on ads?" },
    {
      type: "paragraph",
      text: "There's no single right budget; it depends on your area, treatments and how quickly you can handle enquiries. The table below shows an illustrative way to structure a monthly budget for a single-site clinic. These are example figures for planning, not benchmarks or predicted results.",
    },
    {
      type: "table",
      caption: "Illustrative monthly Meta ads budget for a single-site clinic",
      head: ["Item", "Example amount", "Notes"],
      rows: [
        ["Ad spend (paid to Meta)", "£300–£600", "Start small, then scale what works"],
        ["Management", "From £350", "Strategy, creative, set-up and reporting"],
        ["Creative production", "Included or extra", "Real photos and short videos from your clinic"],
        ["Landing page", "One-off or included", "One page per campaign on your own website"],
      ],
      note: "Illustrative only. Actual results and costs vary by area, treatment, season and offer.",
    },
    { type: "heading", text: "Which metrics matter?" },
    {
      type: "table",
      caption: "Metrics for clinic ad campaigns",
      head: ["Metric", "What it tells you", "Watch out for"],
      rows: [
        ["Cost per enquiry", "How efficiently ads create leads", "Cheap leads that never book"],
        ["Enquiry-to-consultation rate", "How well you follow up", "Slow replies"],
        ["Cost per booked consultation", "The number that matters most", "Not tracking bookings back to ads"],
        ["Consultation-to-treatment rate", "Fit of the people you attract", "Mismatched offers"],
        ["Landing page conversion rate", "Whether the page persuades", "Slow or confusing pages"],
      ],
    },
    {
      type: "paragraph",
      text: "Tracking needs consent: Meta's Pixel is a marketing cookie, so it should only load after a visitor accepts marketing cookies (" + cite(SRC.icoCookies, "ICO") + "). Read " + POST("clinic-website-gdpr-cookies", "GDPR, cookies and consent on clinic websites") + ".",
    },
    {
      type: "checklist",
      title: "Pre-launch checklist for a clinic ad",
      items: [
        "Promotes a consultation or a non-prescription-only treatment",
        "No prescription-only medicine names, nicknames or linked prices",
        "Minimum age set to 18; creative not aimed at younger audiences",
        "Images genuine, consented and not misleading",
        "No pressure tactics or body-image messaging",
        "Landing page matches the ad and loads fast on mobile",
        "Lead handling plan: who replies, how fast",
        "Meta Pixel only fires after marketing consent",
        "Tracking from ad to booked consultation in place",
      ],
    },
    { type: "heading", text: "A worked example: a consultation campaign for skin treatments" },
    {
      type: "ordered",
      items: [
        "**Offer:** a free skin consultation for adults with concerns about texture or pigmentation.",
        "**Audience:** adults 18+, within a realistic travelling distance of the clinic.",
        "**Creative:** a 20-second video of the practitioner explaining what happens at a consultation, plus a carousel of the treatment room and team.",
        "**Copy:** what the consultation covers, that it's with a qualified practitioner, and that treatment may not be recommended.",
        "**Landing page:** a dedicated page with the consultation details, practitioner card, FAQs and a booking button.",
        "**Follow-up:** same-day replies with a direct booking link; one polite follow-up.",
      ],
    },
    {
      type: "paragraph",
      text: "Notice what's absent: no prescription-only medicine, no countdown, no filtered results, no claims you can't support.",
    },
    { type: "heading", text: "How should you test and improve campaigns?" },
    {
      type: "paragraph",
      text: "Change one thing at a time: the creative, the opening line, the offer or the landing page. Give each test enough time and budget to produce a meaningful number of enquiries before judging it, and always judge by booked consultations, not clicks. Keep a simple log of what you changed and when, so you learn from every campaign rather than starting again each time.",
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "Our " + LINK.metaAds + " service plans, creates and manages consultation-led campaigns from £350 a month, with landing pages on " + LINK.websites + " you control. See " + LINK.pricing + ".",
    },
    {
      type: "faq",
      items: [
        { q: "Can aesthetic clinics advertise on Facebook?", a: "Yes, within UK advertising rules and Meta's policies: promote consultations and eligible treatments, target adults only and keep imagery genuine." },
        { q: "Can I advertise anti-wrinkle injections on Instagram?", a: "You can't promote prescription-only medicines. Advertise a consultation for the concern instead, without naming or pricing the medicine." },
        { q: "Can I use before-and-after photos in ads?", a: "Only where they're genuine, unedited and representative, and never to promote prescription-only medicines." },
        { q: "How much should my clinic spend on Meta ads?", a: "It depends on your area and capacity. Many clinics start with a modest test budget and scale what produces booked consultations." },
        { q: "Why are my ads getting leads but no bookings?", a: "Usually slow follow-up, a landing page that doesn't match the ad, or an offer that attracts the wrong people." },
      ],
    },
    { type: "sources", items: [SRC.capCode, SRC.asaBotulinum, SRC.asaEnforcement, SRC.asaFineLine, SRC.asaCosmeticSR, SRC.asaBeforeAfter, SRC.asaBodyImage, SRC.metaStandards, SRC.metaHealth, SRC.metaCosmetic, SRC.icoCookies] },
    { type: "cta", title: "Planning a campaign?", text: "Get a free audit of your website and landing pages first, or message us on WhatsApp." },
  ],
};
