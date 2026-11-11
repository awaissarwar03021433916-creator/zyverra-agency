import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const gbpGuidePost: BlogPost = {
  slug: "google-business-profile-aesthetic-clinic-guide",
  title: "Google Business Profile for aesthetic clinics: step-by-step (2026)",
  seoTitle: "Google Business Profile Setup for Clinics (2026) | Zyverra",
  metaDescription:
    "Google Business Profile setup for an aesthetic clinic, step by step: categories, services, photos, posts and reviews, within Google's rules. Start now.",
  excerpt:
    "A step-by-step guide to setting up and optimising a Google Business Profile for a UK aesthetics clinic, within Google's guidelines.",
  date: "2026-11-11",
  updated: "2026-11-11",
  category: "Local SEO",
  targetKeyword: "Google Business Profile setup aesthetic clinic",
  image: "/blog/google-business-profile-aesthetic-clinic-guide/og",
  imageAlt: "Google Business Profile step-by-step guide for aesthetic clinics",
  servicePath: "/google-business-profile-for-aesthetic-clinics",
  body: [
    {
      type: "answer",
      text: "To set up a Google Business Profile for an aesthetic clinic, claim or create your profile, verify it, choose an accurate primary category, add your services with descriptions, upload real photos, set your hours and booking link, and keep the profile active with posts and genuine reviews. Every detail should match your website and follow Google's guidelines for representing your business.",
    },
    {
      type: "tldr",
      items: [
        "Accuracy beats cleverness: Google's guidelines penalise keyword-stuffed names and fake addresses.",
        "Your primary category is the most important single setting.",
        "List each treatment as a service, matching your website's treatment pages.",
        "Real photos, regular posts and genuine reviews keep the profile active.",
      ],
    },
    { type: "heading", text: "Why does a Google Business Profile matter for clinics?" },
    {
      type: "paragraph",
      text: "When someone searches for a treatment near them, Google often shows a map with local businesses before ordinary results. Your Google Business Profile is what appears there. Google says local results are based mainly on relevance, distance and prominence (" + cite(SRC.gbpRanking, "Google Business Profile Help") + "). You can't change your distance from the searcher, but you can make your profile as relevant and prominent as possible.",
    },
    { type: "heading", text: "Step 1: How do you claim or create your profile?" },
    {
      type: "paragraph",
      text: "Search for your clinic on Google Maps first; a profile may already exist. If it does, claim it. If not, create one at Google Business Profile using your clinic's real name, exactly as it appears on your signage and website. Then verify it using the method Google offers you, which may include a video, phone or postcard verification.",
    },
    { type: "placeholder", text: "add a screenshot of the Google Business Profile creation screen." },
    { type: "heading", text: "Step 2: What name and address should you use?" },
    {
      type: "paragraph",
      text: "Use your real-world business name only. Adding keywords such as “Best Lip Filler Leeds” to your name breaks Google's guidelines and can get the profile suspended, as well as breaching advertising rules (" + cite(SRC.gbpGuidelines, "Google guidelines") + "). Use your real address. If you see clients at home or at their homes, set a service area and hide your address. Never use a virtual office or an address where you don't actually see clients.",
    },
    { type: "heading", text: "Step 3: Which category should you choose?" },
    {
      type: "paragraph",
      text: "Your primary category tells Google what you are. Choose the one that best describes your main business, then add a few secondary categories for other genuine services. Look at the categories Google offers when you type, and pick the most specific accurate one rather than the broadest. Review your categories if your services change.",
    },
    { type: "heading", text: "Step 4: How should you list services and treatments?" },
    {
      type: "paragraph",
      text: "Add each treatment you offer as a service, with a short, factual description and a price where appropriate. Use the same names as your website's treatment pages, so Google can match them. For anti-wrinkle work, use consultation-led wording; profile content counts as advertising too (" + cite(SRC.asaFineLine, "ASA") + ").",
    },
    { type: "heading", text: "Step 5: What details should you complete?" },
    {
      type: "list",
      items: [
        "Opening hours, including special hours for bank holidays",
        "Phone number and website (link to your homepage or most relevant page)",
        "Booking link, where Google allows one",
        "A business description in plain English: what you treat, who you are, your approach",
        "Attributes that genuinely apply, such as accessibility details",
        "Opening date, so the profile reflects how long you've been established",
      ],
    },
    { type: "heading", text: "Step 6: What photos should you upload?" },
    {
      type: "paragraph",
      text: "Upload real photos: the outside of your building so people can find you, reception, treatment room, team and your logo. Add new photos regularly. Avoid stock images and heavily edited photos. If you share results, use only consented, genuine images and keep the same care you'd take on your website (" + cite(SRC.asaBeforeAfter, "CAP") + ").",
    },
    { type: "heading", text: "Step 7: How do you keep the profile active?" },
    {
      type: "paragraph",
      text: "Post updates regularly: a new treatment, a seasonal offer, a team introduction or an aftercare tip. Reply to every review, positive or negative, calmly and without sharing any health details. Answer questions people ask on the profile. Keep hours and services accurate as they change.",
    },
    { type: "heading", text: "Step 8: How do you get more reviews, within the rules?" },
    {
      type: "paragraph",
      text: "Ask happy clients for a review at the right moment, such as after a follow-up when they're pleased with their results, with a short direct link. Don't offer incentives for reviews, don't review yourself and don't ask staff or family to post reviews: Google's policies prohibit fake engagement (" + cite(SRC.googleContribution, "Google") + "). A steady flow of genuine reviews is worth far more than a sudden burst.",
    },
    {
      type: "table",
      caption: "Google Business Profile set-up summary",
      head: ["Setting", "Do", "Don't"],
      rows: [
        ["Name", "Real business name only", "Add keywords or locations"],
        ["Address", "Real address, or service area if mobile/home-based", "Virtual offices"],
        ["Categories", "Most specific accurate primary category", "Irrelevant extra categories"],
        ["Services", "Each treatment, matching your website", "Prescription-only medicine names"],
        ["Photos", "Real, regular, consented", "Stock or filtered images"],
        ["Reviews", "Ask genuine clients, reply to all", "Incentives or fake reviews"],
      ],
    },
    {
      type: "checklist",
      title: "Monthly Google Business Profile routine",
      items: [
        "Post at least one update",
        "Add new photos",
        "Reply to every new review",
        "Answer new questions",
        "Check hours, services and prices are still correct",
        "Compare profile details against your website",
      ],
    },
    { type: "heading", text: "How does your website support your profile?" },
    {
      type: "paragraph",
      text: "Your profile and your website reinforce each other. Matching details, treatment pages for each service and LocalBusiness structured data help Google confirm what you offer (" + cite(SRC.googleLocalBusinessSD, "Google Search Central") + "). Read " + POST("google-map-pack-aesthetic-clinic", "how to rank in the Google Map Pack") + " and " + POST("aesthetic-treatment-page-seo", "how to write treatment pages that rank") + ".",
    },
    { type: "heading", text: "How should you handle a negative review?" },
    {
      type: "paragraph",
      text: "Reply calmly, publicly and briefly. Thank them, acknowledge their experience without arguing, and invite them to contact you directly to resolve it. Never confirm that someone was a client or mention any treatment or health detail in your reply; that would disclose personal information. If a review breaks Google's policies, for example it's fake or abusive, you can flag it, but don't expect every critical review to be removed.",
    },
    { type: "heading", text: "What if you run more than one location?" },
    {
      type: "paragraph",
      text: "Each real location where you see clients can have its own profile, with its own hours, photos and booking link. Don't create profiles for places you don't operate from, and don't duplicate a profile for the same address. On your website, give each location its own section or page with matching details, so Google can connect each profile to the right page.",
    },
    { type: "heading", text: "A worked example: a monthly profile routine in 30 minutes" },
    {
      type: "ordered",
      items: [
        "**Minutes 0–5:** check hours, services and the booking link are still correct.",
        "**Minutes 5–10:** reply to new reviews and questions.",
        "**Minutes 10–20:** write one post about a treatment, offer or team update, and upload three new photos.",
        "**Minutes 20–30:** compare your profile against your website, and note anything to update on either.",
      ],
    },
    {
      type: "paragraph",
      text: "Small, regular updates are easier to sustain than occasional big overhauls, and they keep the profile accurate for the people who rely on it.",
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "We set up and manage profiles as part of our " + LINK.gbp + " service, included in " + LINK.seo + " packages, and build " + LINK.websites + " that back them up. See " + LINK.pricing + ".",
    },
    {
      type: "faq",
      items: [
        { q: "Is a Google Business Profile free?", a: "Yes. Creating and managing a profile is free from Google." },
        { q: "Can I have a profile if I work from home?", a: "Usually, yes, as a service-area business with your address hidden. Follow Google's guidelines for your situation." },
        { q: "Can I add “Leeds” or a treatment to my business name?", a: "No, unless it's genuinely part of your registered real-world name. Adding keywords breaks Google's guidelines." },
        { q: "How often should I post?", a: "Regularly, such as weekly or fortnightly. Consistency matters more than volume." },
        { q: "Can I pay for reviews?", a: "No. Incentivised or fake reviews breach Google's policies and can lead to reviews being removed or the profile being restricted." },
      ],
    },
    { type: "sources", items: [SRC.gbpRanking, SRC.gbpGuidelines, SRC.googleContribution, SRC.googleLocalBusinessSD, SRC.asaFineLine, SRC.asaBeforeAfter] },
    { type: "cta", title: "Want your profile checked?", text: "Get a free audit of your website and Google profile, or message us on WhatsApp." },
  ],
};
