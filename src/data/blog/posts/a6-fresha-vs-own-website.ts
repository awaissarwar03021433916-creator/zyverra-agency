import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const freshaVsWebsitePost: BlogPost = {
  slug: "fresha-treatwell-or-own-website",
  title: "Fresha, Treatwell or your own website: where should clients book?",
  seoTitle: "Fresha vs Own Website: Where Clients Should Book | Zyverra",
  metaDescription:
    "Fresha vs own website: compare marketplace booking with booking through your own clinic site on fees, ownership and branding, and how to combine both.",
  excerpt:
    "How booking marketplaces like Fresha and Treatwell compare with your own website, and how most clinics get the best of both.",
  date: "2026-11-11",
  updated: "2026-11-11",
  category: "Websites",
  targetKeyword: "Fresha vs own website",
  image: "/blog/fresha-treatwell-or-own-website/og",
  imageAlt: "Fresha, Treatwell or your own website for clinic bookings",
  servicePath: "/aesthetic-clinic-website-design",
  body: [
    {
      type: "answer",
      text: "Most clinics get the best results by using both: a booking platform such as Fresha or Treatwell to run the diary and take payments, and their own website as the front door that clients find, trust and book through. Marketplaces are good for discovery, but your own site is the only place you fully control your brand, prices, content and client relationship.",
    },
    {
      type: "tldr",
      items: [
        "Booking software and booking marketplaces are different things, even when one company offers both.",
        "Marketplace discovery can bring new clients, often with fees for those bookings; check current terms.",
        "Your own website builds your brand and search visibility, and sends bookings straight to your diary.",
        "Link or embed your booking system on every treatment page of your website.",
      ],
    },
    { type: "heading", text: "What's the difference between booking software and a booking marketplace?" },
    {
      type: "paragraph",
      text: "Booking software runs your diary: appointments, reminders, deposits and payments. A marketplace is a directory where new clients search for businesses and book. Some providers offer both. The distinction matters because the costs and the relationship with the client are often different depending on where the booking came from. Always read the provider's current terms; for example, see " + cite(SRC.fresha, "Fresha's pricing page") + " and " + cite(SRC.treatwell, "Treatwell's partner information") + ".",
    },
    { type: "heading", text: "What are the advantages of booking marketplaces?" },
    {
      type: "list",
      items: [
        "Discovery: people browsing the marketplace may find you who wouldn't otherwise",
        "Convenience: clients can book many businesses with one account",
        "Reviews collected inside the platform",
        "Quick to set up, with payments and reminders built in",
      ],
    },
    { type: "heading", text: "What are the drawbacks of relying only on a marketplace?" },
    {
      type: "list",
      items: [
        "Fees or commission may apply to bookings that come through the marketplace (check the current terms)",
        "Your profile sits next to competitors, often ranked by the platform's own rules",
        "Limited space to explain treatments, show your practitioner or build your brand",
        "Your search visibility builds up on their website, not yours",
        "If terms change, you have little control",
      ],
    },
    { type: "heading", text: "Is it worth paying for a website when you already use Fresha?" },
    {
      type: "paragraph",
      text: "Usually, yes. Fresha is excellent for running your diary and taking bookings, but your profile lives on their platform, next to other businesses and under their rules. Your own website is the part you control: it ranks for your treatments and town, builds trust with your story and results, then sends clients to Fresha to book.",
    },
    {
      type: "paragraph",
      text: "Your website is the one place you control completely: your treatment pages, prices, practitioner story, results and FAQs. It's what builds your own presence in Google and AI assistants over time, and it's where clients land from your Google Business Profile, Instagram and ads. Google's guidance is to create helpful, people-first content (" + cite(SRC.googleHelpful, "Google Search Central") + "), which is much easier on your own site than inside a marketplace profile.",
    },
    {
      type: "table",
      caption: "Marketplace vs your own website",
      head: ["", "Booking marketplace", "Your own website"],
      rows: [
        ["Finding new clients", "Marketplace browsing", "Google, Maps, AI assistants, social, ads"],
        ["Branding", "Limited, platform-styled", "Fully yours"],
        ["Treatment detail", "Short descriptions", "Full pages with prices, FAQs and results"],
        ["Fees", "Depends on the provider's current terms", "Hosting and domain"],
        ["Search visibility", "Builds the platform's", "Builds yours"],
        ["Client relationship", "Shared with the platform", "Direct"],
      ],
      note: "Fees and features vary by provider and change over time; check current terms.",
    },
    { type: "heading", text: "How do you combine them?" },
    {
      type: "ordered",
      items: [
        "Use your booking software to run the diary, deposits and reminders.",
        "Link or embed it on your website: a button in the header and on every treatment page.",
        "Point your Google Business Profile, Instagram bio and ads to your website, not the marketplace profile.",
        "Keep your marketplace profile accurate for discovery, with the same prices and details as your site.",
        "Encourage returning clients to rebook directly through your website or booking link.",
      ],
    },
    { type: "heading", text: "Should you link to your booking page or embed it?" },
    {
      type: "paragraph",
      text: "A link opens the booking system in a new page and keeps your website fast. An embed shows the booking widget inside your page, which feels seamless but can slow the page down. For most clinics, a clear button that links to the booking page for that specific treatment is the best balance. Test both on a phone.",
    },
    { type: "heading", text: "How do you move existing clients to book direct?" },
    {
      type: "paragraph",
      text: "Make direct booking the easiest option: put your booking link on aftercare cards, in confirmation messages and in your Instagram bio, and mention it at the end of each appointment. Many clients simply book wherever they first found you, so making your own link the most visible one matters.",
    },
    {
      type: "checklist",
      title: "Booking set-up checklist",
      items: [
        "Booking button in the website header",
        "Booking button on every treatment page, linked to that treatment where possible",
        "Same prices on your website, booking system and marketplace profile",
        "Google Business Profile booking link points to your website or direct booking page",
        "Instagram bio links to your website",
        "Deposit and cancellation policy explained on your website",
        "WhatsApp available for questions before booking",
      ],
    },
    { type: "heading", text: "What does booking look like from the client's side?" },
    {
      type: "paragraph",
      text: "Picture a client who finds you through Google. They tap your profile, visit your website, read the treatment page, check the price and press Book. Your booking system opens on that treatment, they pick a time, pay a deposit and get a confirmation. Every step happens under your name. Compare that with a client who finds you only inside a marketplace: they may never see your treatment pages, your practitioner story or your results, and the next clinic is one swipe away.",
    },
    {
      type: "paragraph",
      text: "Neither journey is wrong. The point is to make your own route as smooth as the marketplace's, so clients who already want you don't have a reason to book elsewhere.",
    },
    { type: "heading", text: "How do you keep prices and availability consistent?" },
    {
      type: "paragraph",
      text: "Clients notice when a price on your website doesn't match your booking system or your marketplace profile, and it erodes trust. Keep one master price list and update every channel from it on the same day. If your website has an " + LINK.dashboard + ", you can change website prices yourself the moment your booking system changes. Check your Google Business Profile services list too, since it's often forgotten.",
    },
    { type: "heading", text: "What about deposits and cancellations?" },
    {
      type: "paragraph",
      text: "Most booking systems let you take deposits and set cancellation rules. Explain them in plain English on your website, near the booking button and on a short policy page, so clients aren't surprised at checkout. Clear policies reduce no-shows without feeling unfriendly, and they're much easier to enforce when clients agreed to them before booking.",
    },
    { type: "heading", text: "Which option suits which clinic?" },
    {
      type: "table",
      caption: "Choosing a booking set-up",
      head: ["Your situation", "Suggested set-up"],
      rows: [
        ["New practitioner, few clients", "Booking software + a simple website; marketplace profile for discovery"],
        ["Busy salon or studio", "Booking software + website with booking on every page; keep marketplace profile accurate"],
        ["Established clinic, strong brand", "Website as the main front door; direct booking promoted everywhere"],
        ["Several locations", "Website with a location selector, each linking to the right booking page"],
      ],
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "We build " + LINK.websites + " and " + LINK.salon + " that link or embed Fresha, Treatwell, Timely, Phorest and other booking systems on every page. See " + LINK.pricing + ", and read " + POST("clinic-website-not-getting-bookings", "why your clinic website isn't getting bookings") + " and our " + POST("aesthetic-clinic-website-checklist", "aesthetic clinic website checklist") + ".",
    },
    {
      type: "faq",
      items: [
        { q: "Is Fresha free for clinics?", a: "Fresha's pricing has changed over time and depends on the features you use. Check its current pricing page for the latest terms before deciding." },
        { q: "Do I still need a website if I use Treatwell?", a: "A website isn't compulsory, but it's the only place you fully control your brand, content and search visibility. Most growing clinics use both." },
        { q: "Can my website connect to my booking system?", a: "Yes. Most booking systems provide a booking link or embed that can be added to every treatment page." },
        { q: "Should my Google profile link to my website or my booking page?", a: "Your website is usually best for the main link, with a direct booking link added where Google allows it." },
        { q: "Which booking systems do you work with?", a: "Fresha, Treatwell, Timely, Phorest and most other systems that provide a booking link or embed." },
      ],
    },
    { type: "sources", items: [SRC.fresha, SRC.treatwell, SRC.googleHelpful, SRC.gbpGuidelines] },
    { type: "cta", title: "Want more clients booking direct?", text: "Get a free audit of your website's booking journey, or message us on WhatsApp." },
  ],
};
