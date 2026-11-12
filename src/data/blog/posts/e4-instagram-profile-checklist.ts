import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const instagramProfilePost: BlogPost = {
  slug: "instagram-profile-checklist-aesthetic-clinic",
  title: "Instagram profile checklist for aesthetic clinics: bio to bookings",
  seoTitle: "Instagram Bio & Profile Checklist for Clinics | Zyverra",
  metaDescription:
    "A checklist for your aesthetic clinic's Instagram profile: name, bio, booking link, highlights, grid and DMs, set up to turn profile visits into bookings.",
  excerpt:
    "Set up your clinic's Instagram profile so visitors become bookings: name field, bio wording, booking link, highlights, pinned posts, DMs and compliance.",
  date: "2026-11-12",
  updated: "2026-11-12",
  category: "Social media",
  targetKeyword: "Instagram bio aesthetic clinic",
  image: "/blog/instagram-profile-checklist-aesthetic-clinic/og",
  imageAlt: "An aesthetic clinic Instagram profile set up for bookings",
  servicePath: "/social-media-reels-for-clinics",
  body: [
    {
      type: "answer",
      text: "A clinic Instagram profile that turns visits into bookings says what you treat and where in the name and bio, shows who you are and your qualifications, has one clear booking link, uses highlights for prices, results, the team and FAQs, and pins three posts that answer “why you?”. It also follows UK advertising rules, because your profile counts as advertising.",
    },
    {
      type: "tldr",
      items: [
        "Name field: clinic name plus what you do and where, e.g. “Skin & Aesthetics · Bristol”.",
        "Bio: who treats, what you treat, one line of proof, one call to action.",
        "One booking link that goes straight to booking or a links page you control.",
        "Highlights and pinned posts answer the questions people would otherwise DM.",
      ],
    },
    {
      type: "paragraph",
      text: "This is the set-up guide. For what to post each week, read our " + POST("instagram-content-plan-aesthetic-clinic", "30-day Instagram content plan for clinics") + ".",
    },
    { type: "heading", text: "Why does your Instagram profile matter so much?" },
    {
      type: "paragraph",
      text: "Many people who see a reel or an ad tap through to your profile before they decide anything. In a few seconds they're asking: what do you do, where are you, can I trust you, and how do I book? If the profile doesn't answer those, good content and ad spend are wasted. Fixing the profile is free and takes an afternoon.",
    },
    { type: "heading", text: "What should go in the name field?" },
    {
      type: "paragraph",
      text: "The name field is searchable inside Instagram, so use it for what you do and where, not just your brand. For example: “[Clinic name] | Aesthetics Bristol”. Keep your @handle the same as, or close to, your clinic name and website, so people and search engines can connect them.",
    },
    { type: "heading", text: "How should a clinic Instagram bio be written?" },
    {
      type: "paragraph",
      text: "Use four short lines: who treats, what you treat, a line of proof, and one call to action. Write in plain English, avoid hashtags and emoji overload, and don't name or promote prescription-only medicines.",
    },
    {
      type: "table",
      caption: "Bio structure with example wording",
      head: ["Line", "Purpose", "Example"],
      rows: [
        ["1", "Who treats", "Nurse-led clinic · NMC registered"],
        ["2", "What you treat", "Skin, lines and wrinkles, lips · consultation first"],
        ["3", "Proof", "Clifton, Bristol · 5★ Google reviews"],
        ["4", "Call to action", "Book a consultation ↓"],
      ],
      note: "Only claim what's true: say “5★ Google reviews” only if your rating supports it.",
    },
    {
      type: "paragraph",
      text: "The CAP Code applies to your Instagram profile and posts because they promote your business (" + cite(SRC.capCode, "CAP Code") + "). That means no prescription-only medicine brand names, no guaranteed results and nothing aimed at under-18s (" + cite(SRC.asaCosmeticSR, "CAP") + ").",
    },
    { type: "heading", text: "Which link should go in your bio?" },
    {
      type: "paragraph",
      text: "Use the one link most likely to lead to a booking: your booking page, or a page on your own website with your treatments, prices and booking buttons. Links pages from third-party tools work, but a page on your own site keeps the visit, helps your SEO and can be updated in seconds if you have an " + LINK.dashboard + ".",
    },
    {
      type: "list",
      items: [
        "Check the link opens fast on a phone and goes straight to booking or prices",
        "Use a short, recognisable address on your own domain where possible",
        "Add your clinic address and contact buttons in your professional account settings",
      ],
    },
    { type: "heading", text: "Which story highlights should a clinic have?" },
    {
      type: "table",
      caption: "Suggested highlights",
      head: ["Highlight", "What to include"],
      rows: [
        ["Prices", "Treatment prices or “from” prices; consultation fees for prescription-only treatments"],
        ["Results", "Genuine, consented, unedited before-and-afters with captions"],
        ["Meet us", "Who treats, qualifications, the room"],
        ["Consultation", "What happens, how long, what it costs"],
        ["Reviews", "Screenshots of genuine reviews, with the client's permission or anonymised"],
        ["FAQs", "Aftercare, downtime, parking, how to book"],
      ],
    },
    {
      type: "paragraph",
      text: "Results highlights must follow the same rules as your website gallery: genuine, unedited and representative (" + cite(SRC.asaBeforeAfter, "CAP") + "). Our guide to " + POST("before-and-after-photos-consent-asa", "before-and-after photo rules") + " covers consent and captions.",
    },
    { type: "heading", text: "Which three posts should you pin?" },
    {
      type: "ordered",
      items: [
        "**Meet the practitioner:** a short reel of you introducing yourself and your background.",
        "**What a consultation looks like:** walking through the room and the process.",
        "**Your most-asked question, answered:** price, downtime or how long a treatment lasts.",
      ],
    },
    {
      type: "paragraph",
      text: "Pinned posts are what new visitors see first. Choose ones that build trust rather than your most-liked post. Our list of " + POST("reels-ideas-aesthetic-clinics", "reels ideas that stay within the rules") + " has more.",
    },
    { type: "heading", text: "What should your grid look like?" },
    {
      type: "paragraph",
      text: "Visitors scan the first nine to twelve posts. Aim for a mix of your face, your room, education and results, rather than a wall of quotes or stock images. Consistent lighting and a simple colour style help, but real and recent matters more than perfect.",
    },
    { type: "heading", text: "How should you handle DMs?" },
    {
      type: "list",
      items: [
        "Set up saved replies for prices, booking and aftercare, so you answer quickly",
        "Reply the same day; enquiries go cold fast",
        "Move clinical questions to a consultation, and don't ask for health details in DMs",
        "Only send marketing messages to people who've agreed to receive them (" + cite(SRC.icoDirectMarketing, "ICO") + ")",
      ],
    },
    {
      type: "paragraph",
      text: "Our guide to " + POST("clinic-enquiry-conversion", "turning enquiries into booked consultations") + " includes reply scripts.",
    },
    { type: "heading", text: "Profile checklist" },
    {
      type: "checklist",
      title: "Clinic Instagram profile checklist",
      items: [
        "Professional (business) account switched on",
        "Name field says what you do and where",
        "Handle matches your clinic name and website",
        "Profile photo: your logo or a clear photo of the practitioner",
        "Four-line bio: who, what, proof, call to action",
        "No prescription-only medicine names anywhere on the profile",
        "One booking link that opens fast on a phone",
        "Address and contact buttons added",
        "Highlights: prices, results, meet us, consultation, reviews, FAQs",
        "Three pinned posts that build trust",
        "Saved replies for common DMs",
      ],
    },
    { type: "heading", text: "What mistakes do clinic profiles often make?" },
    {
      type: "list",
      items: [
        "**A clever bio that says nothing:** slogans instead of what you treat and where",
        "**Five links in a links page:** too many choices, so people pick none",
        "**No face:** a grid of graphics with no photo of who will treat them",
        "**Out-of-date highlights:** old prices or treatments you no longer offer",
        "**Medicine names in the bio or highlights:** promoting prescription-only medicines breaks the CAP Code",
        "**Slow DMs:** a profile that converts visitors into messages, then leaves them waiting",
      ],
    },
    {
      type: "paragraph",
      text: "Most of these take minutes to fix. Go through the checklist below with your own profile open on your phone, as a new client would see it, rather than on a laptop.",
    },
    { type: "heading", text: "How do you know if your profile is working?" },
    {
      type: "paragraph",
      text: "Instagram's professional dashboard shows profile visits, link taps and contact button taps. Compare those with the bookings you can trace back to Instagram each month. If profile visits are high but link taps are low, the bio or link is the problem. If link taps are high but bookings are low, look at the page the link opens. Ask new clients how they found you, and record it, so you aren't relying on platform numbers alone.",
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "We plan and run Instagram for clinics through our " + LINK.social + " packages: Essentials £300 a month (8 posts and 4 reels) or Reels-led £550 a month (12 posts, 8 reels and weekly stories). We can also build the page your bio links to as part of our " + LINK.websites + ". See " + LINK.pricing + ".",
    },
    {
      type: "faq",
      items: [
        { q: "What should an aesthetic clinic put in its Instagram bio?", a: "Who treats, what you treat, a line of proof such as your location or reviews, and one call to action with a booking link." },
        { q: "Can I mention anti-wrinkle injections in my Instagram bio?", a: "Avoid naming or promoting prescription-only medicines. Describe the concern you treat and invite people to book a consultation." },
        { q: "Should my bio link go to Fresha or my website?", a: "Either can work. A page on your own website keeps the visit, helps your SEO and can show prices and several booking options at once." },
        { q: "How many highlights should a clinic have?", a: "Five or six is plenty: prices, results, meet us, consultation, reviews and FAQs." },
        { q: "Do I need a business account on Instagram?", a: "A professional account gives you contact buttons, insights and the option to run ads, so it's worth switching." },
      ],
    },
    { type: "sources", items: [SRC.capCode, SRC.asaCosmeticSR, SRC.asaBeforeAfter, SRC.icoDirectMarketing] },
    { type: "cta", title: "Want your profile set up for bookings?", text: "Get a free audit of your website and Instagram, or message us on WhatsApp." },
  ],
};
