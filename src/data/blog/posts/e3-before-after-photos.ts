import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const beforeAfterPhotosPost: BlogPost = {
  slug: "before-and-after-photos-consent-asa",
  title: "Before-and-after photos: consent and ASA rules for UK clinics",
  seoTitle: "Before-and-After Photo Rules for UK Clinics | Zyverra",
  metaDescription:
    "Before-and-after photo rules for UK aesthetics clinics: written consent, UK GDPR, ASA and CAP guidance on editing, and what you can post on Instagram.",
  excerpt:
    "How UK clinics can use before-and-after photos on their website and Instagram: consent, storage under UK GDPR, CAP rules on editing and representative results.",
  date: "2026-11-12",
  updated: "2026-11-12",
  category: "Compliance",
  targetKeyword: "before and after photos rules UK",
  image: "/blog/before-and-after-photos-consent-asa/og",
  imageAlt: "Before-and-after photo consent and rules for an aesthetics clinic",
  servicePath: "/clinic-website-admin-dashboard",
  body: [
    {
      type: "answer",
      text: "UK clinics can use before-and-after photos if they are genuine photos of your own clients, taken with their explicit written consent, not edited in a way that exaggerates the result, and representative of what most clients can expect. The same rules apply on your website and Instagram, and photos must not be used to promote prescription-only medicines.",
    },
    {
      type: "tldr",
      items: [
        "Consent: specific, written, for each place you'll use the photo, and easy to withdraw.",
        "Photos of identifiable people in a clinical context are personal data, and often health data, under UK GDPR.",
        "CAP: no filters or retouching that change the result; same lighting, angle and distance before and after.",
        "Show typical results, say when the “after” was taken, and never use them to sell a prescription-only medicine.",
      ],
    },
    { type: "heading", text: "Can you post before-and-after photos on Instagram and your website?" },
    {
      type: "paragraph",
      text: "Yes, as long as each photo is genuine, unedited, from your own client and shared with their written consent for that specific use. The CAP Code applies to your website and your social media posts alike, so the same rules on accuracy and representative results apply in both places, and images must not promote prescription-only medicines.",
    },
    {
      type: "paragraph",
      text: "CAP's advice on before-and-after photos says they must not exaggerate the effect of a treatment, and that advertisers should be able to show the photos are genuine and that the results are typical (" + cite(SRC.asaBeforeAfter, "CAP") + "). That applies to a reel, a grid post, a story or a gallery on your website.",
    },
    { type: "heading", text: "What consent do you need?" },
    {
      type: "paragraph",
      text: "Consent to treatment and consent to marketing are separate. A client agreeing to have their photo taken for their clinical record hasn't agreed to it appearing on Instagram. For marketing use, the ICO expects consent to be freely given, specific, informed and as easy to withdraw as it was to give (" + cite(SRC.icoConsent, "ICO") + ").",
    },
    {
      type: "checklist",
      title: "What a photo consent form should cover",
      items: [
        "Which photos (and whether the face or other identifying features will show)",
        "Exactly where they'll be used: website, Instagram, Facebook, ads, printed material",
        "Whether they'll be cropped or have features covered for anonymity",
        "How long you'll use them for",
        "How to withdraw consent, and what you'll do if they do (remove from the website and future posts)",
        "A separate tick box for each use, not one blanket signature",
        "Date, client signature, and a copy for the client",
      ],
    },
    {
      type: "paragraph",
      text: "Keep consent forms with the client record, and keep a simple log of which photo is used where, so you can remove it quickly if consent is withdrawn.",
    },
    { type: "heading", text: "Are before-and-after photos special category data?" },
    {
      type: "paragraph",
      text: "Often, yes. A photo of an identifiable person taken in the course of treatment can reveal information about their health, which makes it special category data under UK GDPR. That needs a lawful basis plus an additional condition, and stronger protection (" + cite(SRC.icoSpecialCategory, "ICO") + "). For marketing use, explicit consent is the usual route.",
    },
    {
      type: "list",
      items: [
        "Store originals securely, not in a personal camera roll or a shared chat",
        "Limit who on your team can access them",
        "Strip location data from image files before publishing",
        "Mention photo use in your privacy notice",
      ],
    },
    {
      type: "paragraph",
      text: "Our guide to " + POST("clinic-website-gdpr-cookies", "GDPR, cookies and consent on clinic websites") + " covers privacy notices and data storage in more detail.",
    },
    { type: "heading", text: "What editing is allowed?" },
    {
      type: "paragraph",
      text: "Very little. Don't use filters, retouching, skin smoothing or lighting changes that alter how the treated area looks. Cropping, removing a background or covering eyes for anonymity is generally fine, provided it doesn't change the result. Take the before and after photos in the same lighting, angle, distance and expression, so the comparison is fair.",
    },
    {
      type: "table",
      caption: "Before-and-after photos: do and don't",
      head: ["Do", "Don't"],
      rows: [
        ["Use the same light, angle, distance and camera", "Use brighter light or a better angle for the “after”"],
        ["Crop or cover eyes for anonymity", "Smooth skin, remove blemishes or apply filters"],
        ["Show results typical of most clients", "Pick only your single most dramatic result"],
        ["Say when the after photo was taken", "Show a result straight after treatment as if it's final"],
        ["Describe the concern treated", "Name or price a prescription-only medicine next to the photo"],
        ["Use your own clients' photos", "Use supplier, stock or another clinic's images"],
      ],
    },
    {
      type: "paragraph",
      text: "CAP's guidance on body image adds that ads shouldn't present an unrealistic or irresponsible ideal, or suggest people should be unhappy with their appearance (" + cite(SRC.asaBodyImage, "CAP") + ").",
    },
    { type: "heading", text: "How do photos interact with the prescription-only medicine rules?" },
    {
      type: "paragraph",
      text: "Results photos for anti-wrinkle injections are where clinics most often go wrong. Because the medicine is prescription-only, a before-and-after image that promotes it to the public can break the rules even if the photo itself is genuine. Present such results only in the context of a consultation, without naming or pricing the medicine, and keep them away from promotional offers (" + cite(SRC.asaPomWebsites, "CAP") + ").",
    },
    {
      type: "paragraph",
      text: "Our guide to " + POST("botox-advertising-rules-clinic-website", "the UK advertising rules for injectables") + " explains the wider rule.",
    },
    { type: "heading", text: "How should you caption before-and-after photos?" },
    {
      type: "list",
      items: [
        "**What was treated:** the concern and the treatment type, in plain English",
        "**When:** “after” photo taken six weeks after treatment, for example",
        "**How many sessions:** if it took a course, say so",
        "**A typicality note:** “results vary; your practitioner will discuss what's realistic for you”",
        "**Who treated:** the practitioner's name and profession",
      ],
    },
    {
      type: "paragraph",
      text: "Avoid “amazing”, “flawless” or “guaranteed” language, and don't pair photos with time-limited offers for cosmetic interventions (" + cite(SRC.asaCosmeticSR, "CAP") + ").",
    },
    { type: "heading", text: "Do Instagram and Facebook have their own rules?" },
    {
      type: "paragraph",
      text: "Yes. On top of UK law and the CAP Code, Meta's advertising standards restrict ads for cosmetic procedures, can limit how before-and-after imagery is used in paid ads, and require these ads to target over-18s only (" + cite(SRC.metaCosmetic, "Meta") + "). Check the current policy before each campaign. Organic posts are still covered by the CAP Code, because they promote your business.",
    },
    { type: "heading", text: "A worked example: publishing a skin peel result" },
    {
      type: "ordered",
      items: [
        "Before the first session, the client signs a photo consent form ticking “website gallery” and “Instagram”, but not “paid ads”.",
        "You photograph them in the treatment room by the same window, at the same distance, with no make-up, before session one and four weeks after session three.",
        "You crop both photos identically and blur nothing on the skin.",
        "The caption reads: “Course of three skin peels for uneven tone. After photo taken four weeks after the final session. Results vary.”",
        "You log the photo, the consent and the two places it's used. Months later the client withdraws consent; you remove it from the gallery and delete the post the same day.",
      ],
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "With our " + LINK.dashboard + ", you add, caption and remove before-and-after photos yourself, so withdrawing a photo takes seconds, not a developer request. Our " + LINK.websites + " cost £300, or £400 with the dashboard, and our " + LINK.social + " team checks results posts against the CAP Code before they go out. See " + LINK.pricing + ".",
    },
    {
      type: "faq",
      items: [
        { q: "Do I need written consent for before-and-after photos?", a: "For marketing use, yes in practice. Explicit, specific consent for each place you'll use the photo, recorded in writing, is the safest way to meet UK GDPR." },
        { q: "Can I use filters on before-and-after photos?", a: "No. Filters, retouching or lighting changes that alter the result can make the image misleading under the CAP Code." },
        { q: "Can I post before-and-after photos of anti-wrinkle injections?", a: "Only with great care. Don't name or price the prescription-only medicine, and present results in the context of a consultation rather than as a promotion." },
        { q: "Can I use photos from the product supplier?", a: "Don't present them as your own results. Using your own genuine client photos, with consent, is the safest approach." },
        { q: "What if a client withdraws consent?", a: "Remove the photo from your website and stop using it in new posts straight away, and keep a record of the date you did so." },
      ],
    },
    {
      type: "note",
      text: "This is general guidance, not legal advice. For a specific campaign, CAP's Copy Advice team can review your ad.",
    },
    { type: "sources", items: [SRC.asaBeforeAfter, SRC.asaBodyImage, SRC.asaCosmeticSR, SRC.asaPomWebsites, SRC.icoConsent, SRC.icoSpecialCategory, SRC.metaCosmetic] },
    { type: "cta", title: "Want a results gallery you control?", text: "Get a free audit of your website and gallery, or message us on WhatsApp." },
  ],
};
