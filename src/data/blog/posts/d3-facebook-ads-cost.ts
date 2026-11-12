import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const facebookAdsCostPost: BlogPost = {
  slug: "facebook-ads-cost-aesthetic-clinic-uk",
  title: "How much do Facebook ads cost for an aesthetic clinic? (UK)",
  seoTitle: "Facebook Ads Cost for Aesthetic Clinics (UK) | Zyverra",
  metaDescription:
    "What Facebook and Instagram ads cost a UK aesthetic clinic: ad spend, management fees, creative and landing pages, and how to judge cost per booking.",
  excerpt:
    "A clear breakdown of what Facebook and Instagram ads cost a UK aesthetics clinic, from ad spend and management fees to creative, plus how to work out cost per booking.",
  date: "2026-11-12",
  updated: "2026-11-12",
  category: "Ads",
  targetKeyword: "Facebook ads cost aesthetic clinic",
  image: "/blog/facebook-ads-cost-aesthetic-clinic-uk/og",
  imageAlt: "Breaking down the cost of Facebook ads for an aesthetics clinic",
  servicePath: "/meta-ads-for-aesthetic-clinics",
  body: [
    {
      type: "answer",
      text: "Facebook and Instagram ads for a UK aesthetic clinic cost two things: the ad spend you pay Meta, which you set yourself, and the cost of running the ads, whether that's your own time or a management fee. Our management costs £350 or £550 a month, with ad spend paid directly to Meta. What matters most is the cost per booked consultation, not the cost per click.",
    },
    {
      type: "tldr",
      items: [
        "Ad spend: you choose a daily or lifetime budget; Meta charges against it.",
        "Running costs: your own time, a freelancer or an agency fee, plus creative and a landing page.",
        "Judge results on cost per booked consultation and the value of that client over time.",
        "Start with a test budget you can afford to learn from, then scale what brings bookings.",
      ],
    },
    {
      type: "paragraph",
      text: "This guide covers the money. For how to run compliant campaigns, read our " + POST("facebook-ads-aesthetic-clinics-uk-playbook", "Facebook and Instagram ads playbook for clinics") + ".",
    },
    { type: "heading", text: "What are you actually paying for?" },
    {
      type: "table",
      caption: "The cost parts of a clinic ad campaign",
      head: ["Cost", "Who you pay", "Notes"],
      rows: [
        ["Ad spend", "Meta, directly", "You set the budget; you can pause at any time"],
        ["Management", "Yourself, a freelancer or an agency", "Strategy, set-up, monitoring, reporting"],
        ["Creative", "Photographer, editor or included in management", "Photos and short videos from your own clinic work best"],
        ["Landing page", "Your web designer, or included", "One page per campaign, with price and booking"],
        ["Your time", "You", "Replying to enquiries quickly is part of the cost of ads working"],
      ],
    },
    { type: "heading", text: "How does Meta charge for ads?" },
    {
      type: "paragraph",
      text: "You set a budget for a campaign or ad set, either per day or for the whole campaign, and Meta spends it showing your ads through an auction. Over the schedule, total spend stays within the budget you set. The price of each impression or click varies with your audience, competition, time of year and how relevant your ad is to the people who see it.",
    },
    {
      type: "paragraph",
      text: "That's why nobody can honestly quote a fixed cost per enquiry in advance. Two clinics in the same city with the same budget can get very different results depending on their offer, creative, landing page and how quickly they reply.",
    },
    { type: "heading", text: "How much should a clinic spend on ad budget?" },
    {
      type: "paragraph",
      text: "There's no single right figure. A sensible approach is to set a test budget you're comfortable spending for four to six weeks, run one consultation-led campaign, and measure booked consultations. As an illustration, a single-site clinic might test with £300–£600 a month in ad spend, then increase what works.",
    },
    {
      type: "table",
      caption: "Illustrative monthly budgets for a single-site clinic",
      head: ["Stage", "Example ad spend", "Goal"],
      rows: [
        ["Test", "£300–£600", "Find one treatment and message that brings bookings"],
        ["Steady", "Hold the budget that works", "Keep the diary full; refresh creative monthly"],
        ["Scale", "Increase gradually", "Add a second treatment or audience once the first is profitable"],
      ],
      note: "Illustrative planning figures, not benchmarks or predicted results. Costs vary by area, treatment, season and offer.",
    },
    { type: "heading", text: "What do UK agencies charge to manage clinic ads?" },
    {
      type: "paragraph",
      text: "UK freelancers and agencies charge in different ways: a flat monthly fee, a percentage of ad spend, or a set-up fee plus a monthly fee. Flat fees are easiest to budget. Whatever the model, check what's included: number of campaigns, creative, landing pages, reporting and how often they optimise.",
    },
    {
      type: "table",
      caption: "Common pricing models for ad management",
      head: ["Model", "How it works", "Watch out for"],
      rows: [
        ["Flat monthly fee", "Same fee each month", "What's included, and the minimum term"],
        ["Percentage of spend", "Fee rises with your budget", "An incentive to spend more rather than better"],
        ["Set-up plus monthly", "One-off fee, then a lower monthly fee", "Who owns the ad account and pixel afterwards"],
      ],
    },
    {
      type: "paragraph",
      text: "Our " + LINK.metaAds + " packages are flat monthly fees: Starter £350 a month (one campaign, four creatives, landing page, monthly report) and Growth £550 a month (up to three campaigns, eight creatives, retargeting with consent, fortnightly reports). Ad spend is always paid directly to Meta, from your own account.",
    },
    { type: "heading", text: "What does creative and a landing page cost?" },
    {
      type: "paragraph",
      text: "Real photos and short videos from your own clinic are more convincing to clients than stock imagery, and safer under the advertising rules. You can film on a modern phone; the cost is mostly time. A landing page is a one-off cost if your designer builds it, or included in some management packages. With an " + LINK.dashboard + ", you can create and update campaign pages yourself.",
    },
    { type: "heading", text: "How do you work out cost per booking?" },
    {
      type: "paragraph",
      text: "Divide everything you spent in a month, ad spend plus management, by the number of consultations booked from the ads. Then compare that figure with what a new client is worth to you over a year, not just their first appointment.",
    },
    {
      type: "table",
      caption: "Worked example (illustrative numbers)",
      head: ["Item", "Example"],
      rows: [
        ["Ad spend", "£400"],
        ["Management", "£350"],
        ["Total cost", "£750"],
        ["Consultations booked from ads", "15"],
        ["Cost per booked consultation", "£50"],
      ],
      note: "Made-up numbers to show the calculation, not a forecast. Track your own figures for a few months before judging.",
    },
    {
      type: "paragraph",
      text: "If a client typically returns several times a year, a cost per consultation that looks high on one visit may be good value overall. Our guide to " + POST("aesthetic-clinic-patient-retention", "patient retention") + " explains how to increase that lifetime value.",
    },
    { type: "heading", text: "What wastes ad budget?" },
    {
      type: "list",
      items: [
        "**Boosting posts** instead of running a campaign with a clear goal and landing page",
        "**Sending people to your Instagram profile** rather than a page where they can book",
        "**Ads that get rejected** for breaking Meta's advertising standards (" + cite(SRC.metaStandards, "Meta") + ") or its cosmetic procedure rules (" + cite(SRC.metaCosmetic, "Meta") + ")",
        "**Promoting prescription-only medicines**, which isn't allowed in UK advertising (" + cite(SRC.asaBotulinum, "CAP") + ")",
        "**Slow replies:** an enquiry left until tomorrow is often an enquiry lost",
        "**Tracking without consent:** the Meta Pixel needs cookie consent first (" + cite(SRC.icoCookies, "ICO") + ")",
      ],
    },
    { type: "heading", text: "Are Facebook ads cheaper than Google Ads for clinics?" },
    {
      type: "paragraph",
      text: "They work differently, so cost alone isn't a fair comparison. Google Ads reach people already searching for a treatment; Facebook and Instagram ads create demand among local people who weren't searching yet. Our comparison of " + POST("google-ads-vs-meta-ads-clinics", "Google Ads and Meta ads for clinics") + " explains which to start with.",
    },
    { type: "heading", text: "How do you set a budget you won't regret?" },
    {
      type: "paragraph",
      text: "Work backwards from what you can handle. If you can comfortably take ten extra consultations a month, there's no point paying for fifty enquiries you can't answer quickly. Decide how many new clients you want, how many hours you can give to replies, and the most you're willing to spend to win one client. That gives you a ceiling for your test budget before you spend anything.",
    },
    {
      type: "list",
      items: [
        "**Pick one treatment** with a clear price or consultation fee and room in your diary",
        "**Set a four to six week test** at a budget you could lose without worrying",
        "**Agree what success looks like** before you start, in booked consultations",
        "**Review every two weeks:** keep what brings bookings, change what doesn't",
        "**Only scale** once you've seen a few weeks of steady cost per booking",
      ],
    },
    {
      type: "paragraph",
      text: "Keep a simple monthly record of ad spend, management, enquiries, consultations booked and treatments sold. After three months you'll know your own cost per client far better than any industry average could tell you, and you'll be able to decide calmly whether to spend more, change treatment or pause.",
    },
    { type: "heading", text: "What should a monthly ads report show you?" },
    {
      type: "paragraph",
      text: "A useful report fits on one page: what was spent, how many people enquired, how many booked a consultation, cost per booked consultation, which ad and treatment did best, and what will change next month. Likes, reach and clicks can sit underneath, but they shouldn't be the headline. If a report doesn't tell you what each booking cost, ask for one that does.",
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "We run " + LINK.metaAds + " for UK clinics from £350 a month, with landing pages on your own website and reports on booked consultations. If your website isn't ready for ads, our " + LINK.websites + " cost £300, or £400 with an admin dashboard, and go live in 7–10 working days. See " + LINK.pricing + ".",
    },
    {
      type: "faq",
      items: [
        { q: "What's the minimum budget for Facebook ads?", a: "Meta lets you start with a small daily budget. For a clinic, a test budget you can sustain for four to six weeks gives you enough data to judge results." },
        { q: "Do I pay Meta or the agency for ad spend?", a: "With us, you pay ad spend directly to Meta from your own ad account. Our management fee is separate." },
        { q: "Why are my ads expensive?", a: "Common causes are broad targeting, generic creative, sending people to a profile instead of a landing page, and slow replies that turn clicks into lost enquiries." },
        { q: "How long before Facebook ads bring bookings?", a: "Campaigns often need a few weeks of testing before you know which treatment and message work. Judge results over at least a month." },
        { q: "Can I advertise injectable treatments on Facebook?", a: "You can advertise a consultation for a concern, but you can't promote prescription-only medicines. Meta also has its own cosmetic procedure rules." },
      ],
    },
    { type: "sources", items: [SRC.metaStandards, SRC.metaCosmetic, SRC.asaBotulinum, SRC.icoCookies] },
    { type: "cta", title: "Want a clear ads budget?", text: "Get a free audit of your website and ad readiness, or message us on WhatsApp." },
  ],
};
