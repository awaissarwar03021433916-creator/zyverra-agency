import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const instagramPlanPost: BlogPost = {
  slug: "instagram-content-plan-aesthetic-clinic",
  title: "Instagram marketing for aesthetic clinics: a 30-day content plan",
  seoTitle: "Instagram Content Plan for Aesthetic Clinics | Zyverra",
  metaDescription:
    "A 30-day Instagram content plan for aesthetic clinics: post types, a weekly rhythm, captions and compliance checks, ready to copy into your calendar.",
  excerpt:
    "A ready-to-use 30-day Instagram plan for UK aesthetics clinics, with weekly themes, post ideas and the compliance checks to run before you post.",
  date: "2026-11-11",
  updated: "2026-11-11",
  category: "Social media",
  targetKeyword: "Instagram content plan aesthetic clinic",
  image: "/blog/instagram-content-plan-aesthetic-clinic/og",
  imageAlt: "30-day Instagram content plan for aesthetic clinics",
  servicePath: "/social-media-reels-for-clinics",
  body: [
    {
      type: "answer",
      text: "A good Instagram plan for an aesthetics clinic mixes four kinds of content each week: education about treatments and skin, behind-the-scenes posts about your clinic and team, proof such as reviews and consented results, and clear invitations to book. Post a few times a week consistently, use reels for reach, and check every post against UK advertising rules before it goes live.",
    },
    {
      type: "tldr",
      items: [
        "Rotate four content types: educate, show, prove, invite.",
        "Consistency beats volume; plan a realistic rhythm you can keep.",
        "Instagram content is advertising: no prescription-only medicine promotion.",
        "Every post should lead somewhere: your website, a treatment page or booking.",
      ],
    },
    { type: "heading", text: "Why does an aesthetics clinic need an Instagram plan?" },
    {
      type: "paragraph",
      text: "Without a plan, clinic accounts tend to swing between bursts of posting and long silences, or between endless promotions and nothing useful. A simple plan keeps you visible, builds trust over time and saves you deciding what to post every morning. It also gives you a moment to check posts for compliance before they go out.",
    },
    { type: "heading", text: "What should you post? The four content types" },
    {
      type: "table",
      caption: "Four content types for clinic Instagram",
      head: ["Type", "Purpose", "Examples"],
      rows: [
        ["Educate", "Answer questions, build expertise", "What a skin booster course involves; aftercare tips; myth vs fact"],
        ["Show", "Make your clinic feel familiar", "Meet the practitioner; a tour of the room; how you prepare for a treatment"],
        ["Prove", "Build trust", "Real reviews; consented, unedited results; qualifications"],
        ["Invite", "Turn interest into bookings", "Consultation availability; a seasonal offer on an eligible treatment"],
      ],
    },
    { type: "heading", text: "What does a 30-day plan look like?" },
    {
      type: "paragraph",
      text: "Here's an example plan built around three posts a week and daily stories. Swap in your own treatments and keep the rhythm.",
    },
    {
      type: "table",
      caption: "Example 30-day Instagram plan for an aesthetics clinic",
      head: ["Week", "Post 1 (educate)", "Post 2 (show / prove)", "Post 3 (invite)"],
      rows: [
        ["1", "Reel: “3 things to know before your first skin treatment”", "Carousel: meet the practitioner — training and registration", "Post: consultation availability and how to book"],
        ["2", "Carousel: aftercare for your most popular treatment", "Reel: a day in the clinic", "Post: a genuine review with the client's permission"],
        ["3", "Reel: myth vs fact about a common treatment", "Carousel: consented results with “results vary”", "Post: seasonal offer on an eligible, non-POM treatment"],
        ["4", "Carousel: “What happens at a consultation?”", "Reel: preparing the treatment room (hygiene and safety)", "Post: FAQs answered, with a link to the treatment page"],
      ],
      note: "Example plan; adapt the treatments and timing to your clinic.",
    },
    { type: "heading", text: "How often should a clinic post?" },
    {
      type: "paragraph",
      text: "Choose a rhythm you can keep for months, not one that burns out in two weeks. For many small clinics, three feed posts a week plus a few stories is realistic. Reels tend to reach people who don't follow you yet, so include at least one a week; see " + POST("reels-ideas-aesthetic-clinics", "reels ideas that stay within the rules") + ".",
    },
    { type: "heading", text: "What are the compliance rules for clinic Instagram?" },
    {
      type: "paragraph",
      text: "Your Instagram posts are advertising, so UK rules apply to them just as they do to paid ads. The ASA has issued an Enforcement Notice specifically about social media posts promoting botulinum toxin products (" + cite(SRC.asaEnforcement, "ASA") + "). The key points:",
    },
    {
      type: "list",
      items: [
        "Don't promote prescription-only medicines, including through names, nicknames, emojis or hashtags (" + cite(SRC.asaFineLine, "ASA") + ")",
        "Keep before-and-afters genuine, unedited and representative, with consent (" + cite(SRC.asaBeforeAfter, "CAP") + ")",
        "Avoid content that plays on insecurity or body image (" + cite(SRC.asaBodyImage, "CAP") + ")",
        "Don't direct cosmetic intervention content at under-18s (" + cite(SRC.asaCosmeticSR, "CAP") + ")",
        "No time pressure on injectable treatments",
      ],
    },
    { type: "heading", text: "How should captions and bio work?" },
    {
      type: "list",
      items: [
        "Open captions with the useful point, not the hashtag block",
        "Write in UK English and your own voice",
        "End with one clear action: book via the link in bio, or message us",
        "Keep your bio specific: what you treat, where, and a link to your website",
        "Use your website link, not only a booking marketplace link",
      ],
    },
    { type: "heading", text: "Why does your Instagram have followers but no bookings?" },
    {
      type: "paragraph",
      text: "Usually because nothing turns interest into action. Common causes are no booking link in your bio, posts that never mention prices or how to book, slow replies to DMs, and content that entertains but doesn't explain what you treat. Followers become clients when every post makes the next step obvious and booking takes a couple of taps.",
    },
    {
      type: "paragraph",
      text: "Instagram builds interest; your website and booking system close it. Link your bio to your website, point posts to specific treatment pages, and reply to DMs quickly with a link to book. Read " + POST("clinic-enquiry-conversion", "how to turn more enquiries into booked consultations") + ".",
    },
    {
      type: "checklist",
      title: "Pre-post compliance check",
      items: [
        "No prescription-only medicine names, nicknames or emojis",
        "No promotional prices for prescription-only treatments",
        "Images genuine, unedited and consented",
        "No body-shaming or pressure language",
        "Clear, accurate description of what's offered",
        "Link points to the right treatment page or booking",
      ],
    },
    { type: "heading", text: "How do you batch-create a month of content?" },
    {
      type: "ordered",
      items: [
        "**Plan (1 hour):** fill in the 30-day table with your treatments and dates.",
        "**Film (2 hours):** record several reels and take photos in one session, in good light.",
        "**Write (1 hour):** draft all captions, then check each against the compliance list.",
        "**Schedule (30 minutes):** schedule posts, leaving space for stories and timely updates.",
      ],
    },
    {
      type: "paragraph",
      text: "Batching turns Instagram from a daily worry into a monthly task, and leaves time to reply to comments and messages, which is where bookings actually happen.",
    },
    { type: "heading", text: "How do you measure whether Instagram is working?" },
    {
      type: "list",
      items: [
        "Profile visits and link taps, not just likes",
        "DMs and enquiries that mention Instagram",
        "Bookings from people who found you on Instagram (ask at booking)",
        "Which posts lead to the most link taps and messages",
      ],
    },
    {
      type: "paragraph",
      text: "Do more of what leads to enquiries, even if other posts get more likes. A modest account that brings consistent bookings is worth more than a large one that doesn't.",
    },
    { type: "heading", text: "Should you work with influencers?" },
    {
      type: "paragraph",
      text: "Influencer posts about your clinic are advertising when there's a commercial relationship, so they must be clearly labelled as ads, and the same rules apply: no prescription-only medicine promotion, no misleading results, no targeting of under-18s. Choose partners whose audience is adult and local, and agree content in advance.",
    },
    { type: "heading", text: "How should you reply to comments and DMs?" },
    {
      type: "paragraph",
      text: "Reply to comments the same day where you can; it keeps conversations going and shows you're responsive. Move anything personal, especially health questions, out of public comments and into a private message or consultation. In DMs, answer the actual question, then share a direct booking link. Our guide to " + POST("clinic-enquiry-conversion", "turning enquiries into booked consultations") + " includes reply templates.",
    },
    { type: "heading", text: "How much does social media management for a beauty salon cost in the UK?" },
    {
      type: "paragraph",
      text: "Prices vary widely. UK freelancers and agencies commonly charge from a few hundred pounds to well over £1,000 a month, depending on how many posts and reels are included and whether filming is part of it. Our packages cost £300 a month (8 posts and 4 reels) or £550 a month (12 posts, 8 reels and weekly stories).",
    },
    {
      type: "paragraph",
      text: "Compare quotes on what you actually get: number of posts and reels, who films, who writes captions, whether stories and replies are included, and how results are reported. A cheap package that posts generic stock images rarely brings bookings. See " + LINK.social + " for what ours include.",
    },
    { type: "heading", text: "Social media is taking up all your time. Should you outsource it?" },
    {
      type: "paragraph",
      text: "If social media is eating into treatment time, outsourcing the planning, editing and scheduling usually makes sense, while you keep the parts only you can do: filming short clips, answering clinical questions and replying to DMs. A good manager works from your footage, follows UK advertising rules and sends you a calendar to approve each month.",
    },
    {
      type: "list",
      items: [
        "**Keep in-house:** clinical answers, DMs about suitability, filming in your room",
        "**Outsource:** the content calendar, editing, captions, scheduling and reporting",
        "**Agree up front:** who approves posts, how fast replies happen, and what's off-limits under the CAP Code ([CAP](" + SRC.capCode.url + "))",
      ],
    },
    { type: "heading", text: "What reels should an aesthetics clinic post?" },
    {
      type: "paragraph",
      text: "Post reels that educate, build trust and show the experience: answers to common questions, what happens at a consultation, behind-the-scenes clinic prep, aftercare tips and genuine consented results with context. Avoid reels that promote prescription-only medicines, put time pressure on injectables or edit results. A steady weekly rhythm beats daily posting you can't keep up.",
    },
    {
      type: "paragraph",
      text: "We've written " + POST("reels-ideas-aesthetic-clinics", "a full list of reels ideas that stay within the rules") + ", with a scripted example.",
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "Our " + LINK.social + " packages, from £300 a month, plan, write, edit and schedule posts and reels, checked against UK advertising rules, and link them to " + LINK.websites + ". See " + LINK.pricing + ".",
    },
    {
      type: "faq",
      items: [
        { q: "How often should an aesthetics clinic post on Instagram?", a: "As often as you can sustain. Three posts a week plus regular stories is realistic for many small clinics." },
        { q: "What should a clinic post on Instagram?", a: "A mix of education, behind-the-scenes, proof such as reviews and consented results, and clear invitations to book." },
        { q: "Can I post before-and-after photos on Instagram?", a: "Yes, if they're genuine, unedited, representative and consented, and not used to promote prescription-only medicines." },
        { q: "Can I use hashtags for injectable brands?", a: "Avoid them. Brand names and nicknames for prescription-only medicines can count as advertising them." },
        { q: "Should my Instagram bio link to Fresha or my website?", a: "Your website is usually best, with booking one tap away from there." },
      ],
    },
    { type: "sources", items: [SRC.asaEnforcement, SRC.asaFineLine, SRC.asaBeforeAfter, SRC.asaBodyImage, SRC.asaCosmeticSR] },
    { type: "cta", title: "Want Instagram that brings bookings?", text: "Get a free audit of your website and booking journey, or message us on WhatsApp." },
  ],
};
