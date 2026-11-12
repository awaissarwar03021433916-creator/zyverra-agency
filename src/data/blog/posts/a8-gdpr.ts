import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const gdprPost: BlogPost = {
  slug: "clinic-website-gdpr-cookies",
  title: "GDPR, cookies and consent forms on UK clinic websites (2026)",
  seoTitle: "Clinic Website GDPR, Cookies & Consent Forms | Zyverra",
  metaDescription:
    "Clinic website GDPR explained for UK clinics: privacy notices, cookie banners, contact forms and health data, with a checklist to work through in 2026.",
  excerpt:
    "What UK GDPR and the cookie rules mean for a clinic website: privacy notices, cookie banners, contact forms and health information.",
  date: "2026-11-11",
  updated: "2026-11-11",
  category: "Compliance",
  targetKeyword: "clinic website GDPR",
  image: "/blog/clinic-website-gdpr-cookies/og",
  imageAlt: "GDPR and cookies on UK clinic websites",
  servicePath: "/aesthetic-clinic-website-design",
  body: [
    {
      type: "answer",
      text: "A UK clinic website needs a clear privacy notice, a cookie banner that asks before setting non-essential cookies, and contact forms that collect only what's necessary. Information about someone's health is special category data under UK GDPR, so avoid collecting medical history through general website forms and handle it securely through your consultation process instead.",
    },
    {
      type: "tldr",
      items: [
        "UK GDPR covers personal data; the cookie rules (PECR) cover cookies and tracking.",
        "Tell people what you collect and why in a privacy notice written in plain English.",
        "Ask before setting advertising or tracking cookies, with Accept and Reject equally easy.",
        "Health information is special category data: keep it off general contact forms.",
        "This guide is general information, not legal advice.",
      ],
    },
    {
      type: "note",
      text: "This is general information for UK clinics, not legal advice. Check the ICO's guidance or a qualified adviser for your situation.",
    },
    { type: "heading", text: "Does your clinic website need to be GDPR compliant?" },
    {
      type: "paragraph",
      text: "Yes. If your website collects any personal data, through enquiry forms, booking details, analytics or advertising cookies, UK GDPR and PECR apply. In practice that means a clear privacy notice, a cookie banner that asks before non-essential cookies load, secure forms that avoid collecting health details, and paying the ICO data protection fee if it applies to you.",
    },
    { type: "heading", text: "Which rules apply to a clinic website?" },
    {
      type: "paragraph",
      text: "Two sets of rules matter most. UK GDPR and the Data Protection Act 2018 cover how you handle personal data, including anything people send you through your website (" + cite(SRC.govDataProtection, "GOV.UK") + "). The Privacy and Electronic Communications Regulations (PECR) cover cookies and similar technologies on your site (" + cite(SRC.icoCookies, "ICO") + "). The Information Commissioner's Office (ICO) regulates both.",
    },
    { type: "heading", text: "What must a clinic privacy notice include?" },
    {
      type: "paragraph",
      text: "People have the right to be told how their data is used (" + cite(SRC.icoInformed, "ICO") + "). Your privacy notice should explain who you are, what data you collect through the website and why, your lawful basis, who you share it with (such as your booking platform or email provider), how long you keep it, people's rights and how to complain, including to the ICO. Write it for your clients, not for lawyers, and make sure it matches what your website actually does.",
    },
    { type: "heading", text: "Do you need a cookie banner?" },
    {
      type: "paragraph",
      text: "If your website sets non-essential cookies, such as advertising pixels or many analytics tools, you need consent before setting them, and refusing must be as easy as accepting (" + cite(SRC.icoCookies, "ICO") + "). Strictly necessary cookies, such as those that remember a cookie choice or run a booking session, don't need consent. Recent changes to PECR introduced some exemptions, including for certain statistical purposes with a clear way to object, so check the ICO's current guidance before relying on any exemption.",
    },
    {
      type: "table",
      caption: "Common clinic website cookies and consent",
      head: ["Cookie or tool", "Typical purpose", "Consent needed?"],
      rows: [
        ["Cookie-choice storage", "Remembers the visitor's choice", "No — strictly necessary"],
        ["Booking session", "Keeps a booking in progress", "Usually no — strictly necessary"],
        ["Meta Pixel", "Advertising measurement and targeting", "Yes"],
        ["Google Analytics", "Visit measurement", "Usually yes; check current ICO guidance on exemptions"],
        ["Embedded videos or maps", "May set third-party cookies", "Often yes — check the provider"],
      ],
      note: "General guidance only; check how each tool is configured on your site.",
    },
    { type: "heading", text: "Is health information from contact forms special category data?" },
    {
      type: "paragraph",
      text: "Yes, if it reveals information about someone's health. Data concerning health is special category data under UK GDPR, which needs both a lawful basis and an additional condition for processing, plus extra care with security (" + cite(SRC.icoSpecialCategory, "ICO") + "). A general contact form doesn't need to ask about medical history, allergies or medication. Keep forms to name, contact details and what the person is interested in, and collect health information during the consultation, through a secure consultation or consent process.",
    },
    { type: "heading", text: "What about before-and-after photos?" },
    {
      type: "paragraph",
      text: "Photos of clients are personal data, and images taken in a treatment context may reveal health information. Get specific written consent for each use, such as your website, social media or advertising, record it, and let people withdraw it. Store photos securely and don't keep them longer than you need. Advertising rules apply too: CAP expects before-and-afters to be genuine and not to exaggerate results (" + cite(SRC.asaBeforeAfter, "CAP") + ").",
    },
    { type: "heading", text: "Do you need to pay the ICO data protection fee?" },
    {
      type: "paragraph",
      text: "Most organisations that process personal data must pay the data protection fee unless they're exempt. Clinics handling client records and enquiries will usually need to pay. Use the ICO's self-assessment to check (" + cite(SRC.icoFee, "ICO") + ").",
    },
    { type: "heading", text: "What about WhatsApp, email and booking platforms?" },
    {
      type: "paragraph",
      text: "If clients contact you through WhatsApp or email, those messages are personal data too, and they may contain health information. Mention these channels in your privacy notice, avoid asking for detailed medical information over chat, and move that conversation into your consultation process. Booking platforms process data on your behalf, so list them in your privacy notice and check their data protection terms.",
    },
    {
      type: "checklist",
      title: "Clinic website data protection checklist",
      items: [
        "Privacy notice in plain English, matching what the site really does",
        "Cookie banner with equal Accept and Reject, before non-essential cookies load",
        "Cookie policy listing the cookies and tools you use",
        "Contact forms that don't ask for medical history",
        "Forms sent over HTTPS, with access limited to people who need it",
        "Written, specific consent for every before-and-after photo",
        "WhatsApp, email and booking platforms listed in the privacy notice",
        "ICO data protection fee checked and paid if required",
        "A way for people to make a data protection complaint",
      ],
    },
    { type: "heading", text: "What does a compliant contact form look like?" },
    {
      type: "ordered",
      items: [
        "**Fields:** name, email or phone, the treatment they're interested in, and a short message box.",
        "**No health questions:** no medical history, medication, allergies or pregnancy questions.",
        "**A short privacy line** under the form, linking to your privacy notice.",
        "**No pre-ticked boxes** for marketing; if you want to send marketing, ask separately and clearly.",
        "**Secure delivery** to a mailbox or system only the right people can access.",
      ],
    },
    { type: "heading", text: "How long should you keep website enquiries?" },
    {
      type: "paragraph",
      text: "Only as long as you need them. Decide a retention period for enquiries that don't become clients, for example a set number of months, and delete them after that. Client records follow your clinical record-keeping rules, which are separate. Write your retention periods into your privacy notice so they're clear to everyone.",
    },
    { type: "heading", text: "What about analytics and advertising pixels?" },
    {
      type: "paragraph",
      text: "Analytics and advertising tools can collect a lot about visitors, and on a clinic website the pages someone views can hint at health interests. Load advertising pixels only after consent, configure analytics to collect no more than you need, and check each tool's settings for health-related restrictions. Meta's policies, for example, restrict how health-related data can be used for advertising (" + cite(SRC.metaHealth, "Meta") + ").",
    },
    { type: "heading", text: "What should you do if something goes wrong?" },
    {
      type: "paragraph",
      text: "If personal data is lost, sent to the wrong person or accessed without permission, that may be a personal data breach. Contain it, record what happened and assess the risk; some breaches must be reported to the ICO within 72 hours. Having a short written plan before anything happens makes it far easier to respond calmly.",
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "Every " + LINK.websites + " we build includes a privacy notice, cookie policy and a consent banner where marketing cookies only load after Accept, plus contact forms designed not to collect health data. See " + LINK.pricing + " and our " + LINK.audit + ". For more, read our " + POST("aesthetic-clinic-website-checklist", "aesthetic clinic website checklist") + " and " + POST("botox-advertising-rules-clinic-website", "the advertising rules for clinic websites") + ".",
    },
    {
      type: "faq",
      items: [
        { q: "Does my clinic website need a cookie banner?", a: "If it sets non-essential cookies, such as advertising pixels or most analytics, yes. Strictly necessary cookies don't need consent." },
        { q: "Can I ask about medical history on my contact form?", a: "It's best not to. Health information is special category data; collect it during the consultation through a secure process instead." },
        { q: "Do I need a privacy policy if I only have a contact form?", a: "Yes. If you collect any personal data, people have the right to know how you use it." },
        { q: "Is a Meta Pixel allowed on a clinic website?", a: "Only with consent, and only after the visitor accepts marketing cookies. Check Meta's own policies on health-related data too." },
        { q: "Do I need to register with the ICO?", a: "Most clinics need to pay the data protection fee. Use the ICO's self-assessment to check whether you're exempt." },
      ],
    },
    { type: "sources", items: [SRC.govDataProtection, SRC.icoCookies, SRC.icoInformed, SRC.icoSpecialCategory, SRC.icoFee, SRC.asaBeforeAfter] },
    { type: "cta", title: "Is your clinic website compliant?", text: "Get a free audit that includes cookies and forms, or message us on WhatsApp." },
  ],
};
