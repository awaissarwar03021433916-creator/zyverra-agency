// One data source drives the visible FAQ (on /faq and on each service page)
// and the FAQPage JSON-LD, so the structured data always matches the on-page
// text exactly. The optional `link` renders as a "Read more" link under the
// answer; it is not part of the answer text.
//
// Answers that depend on facts only the owner knows are marked `confirmed:
// false`. They render with neutral wording but are left out of FAQPage schema
// until confirmed, so no unverified claim reaches structured data.
//
// Questions marked ⭐ in docs/zyverra-faq-blog-prompt.md use the searcher's own
// wording as the question, so they match how people ask Google and ChatGPT.

export type Faq = {
  id: string;
  q: string;
  a: string;
  confirmed?: boolean;
  link?: { href: string; label: string };
};
export type FaqGroup = { title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    title: "Cost & payment",
    items: [
      {
        id: "cost",
        q: "How much should a website for my aesthetics clinic cost in the UK?",
        a: "Expect anything from a few hundred pounds for a template site to £8,000 or more for a bespoke agency build. Our clinic websites cost £300 (Option B) or £400 with an admin dashboard (Option A), go live in 7–10 working days and can be paid 50/50 or 30/40/30. Hosting is free and a domain is about £10–£20 a year. Whoever you choose, ask what's included and who can edit the site afterwards.",
        link: { href: "/pricing", label: "See full clinic website pricing" },
      },
      {
        id: "under-500",
        q: "Can you recommend someone who builds aesthetics clinic websites for under £500?",
        a: "Yes, we do. Zyverra Labs builds custom websites for UK aesthetics clinics for £300, or £400 with an admin dashboard that lets you change treatments and prices yourself. Sites go live in 7–10 working days, hosting is free, and you can pay in two or three instalments. Whoever you choose at this price, visit their live clinic websites and get the scope in writing before you pay.",
        link: { href: "/work", label: "See clinic websites we've built" },
      },
      {
        id: "options",
        q: "What is the difference between Option A and Option B?",
        a: "Option A (£400) includes the admin dashboard, so you can change treatments, prices, photos, offers and blog posts yourself, and comes with 3 SEO-optimised blog posts you can add to. Option B (£300) is the same custom website with 3 blog posts but no dashboard, so content changes are made by us on request at £50–£100 per update.",
      },
      {
        id: "instalments",
        q: "Do any web designers offer payment plans for small businesses?",
        a: "Yes, some do, and we're one of them. You can pay 50% to start and 50% at launch, or split the cost into three payments over 45 days: 30% to start, 40% after 15 days and the final 30% by day 45. On a £400 website that's £120, £160 and £120. Whoever you use, get the payment schedule, and what each stage delivers, in writing.",
        link: { href: "/pricing", label: "See payment options" },
      },
      {
        id: "monthly-fees",
        q: "Are there any monthly fees?",
        a: "No, there's no monthly fee for your website. Hosting is free, and the only running cost is your domain name, which is usually about £10–£20 a year. On Option B, or for major changes on Option A, updates cost £50–£100 each and we confirm the price before we start. Marketing services such as SEO or Meta ads are separate monthly packages you can choose to add.",
        link: { href: "/pricing", label: "See what's included in each option" },
      },
    ],
  },
  {
    title: "Your website & dashboard",
    items: [
      {
        id: "who-to-use",
        q: "I run an aesthetics clinic in the UK and need a professional website. Who should I use?",
        a: "Use a designer who already builds clinic websites, can show you live examples and puts the price and timeline in writing. Zyverra Labs specialises in UK aesthetics clinics: £300 for a custom website, or £400 with an admin dashboard, live in 7–10 working days. Our work includes Belgrave Cosmetics and Penelope J Aesthetics in Bristol and Serra Aesthetics in London, so you can see the results before deciding.",
        link: { href: "/aesthetic-clinic-website-design", label: "Aesthetic clinic website design" },
      },
      {
        id: "best-designer",
        q: "Best website designer for aesthetics clinics in the UK?",
        a: "There isn't one best designer for every clinic, so judge on evidence: live clinic websites you can visit, treatment pages with prices, wording that follows UK advertising rules, fast mobile pages, and whether you can update the site yourself. We build clinic websites with an admin dashboard for £400, or £300 without, live in 7–10 working days, and you can look at every site we've built first.",
        link: { href: "/work", label: "See our clinic website work" },
      },
      {
        id: "best-platform",
        q: "I want a website I can update myself, like changing prices and adding treatments. What's the best option?",
        a: "A custom website with an admin dashboard is usually the best option. You log in, change a price, add a treatment or upload photos, and it's live straight away, with no developer. Wix and Squarespace are editable too, but you pay a monthly plan and design within their templates. Our Option A website includes the dashboard for £400, with training on Google Meet at handover.",
        link: { href: "/clinic-website-admin-dashboard", label: "See the admin dashboard" },
      },
      {
        id: "fed-up-developer",
        q: "I'm fed up paying my web developer every time I want to change a price. What can I do?",
        a: "Move to a website with an admin dashboard, so content changes are yours to make. With our Option A website (£400) you edit prices, treatments, offers, photos and blog posts whenever you like, at no extra cost. You'd only pay for major changes, such as a new feature or layout, at £50–£100 each, quoted before we start. We can rebuild your current site in 7–10 working days.",
        link: { href: "/clinic-website-admin-dashboard", label: "How the admin dashboard works" },
      },
      {
        id: "timeline",
        q: "How long does it take to build my clinic website?",
        a: "Most clinic websites go live in 7–10 working days once we have your logo, treatment list, prices and photos.",
      },
      {
        id: "dashboard-edits",
        q: "What can I change myself with the admin dashboard?",
        a: "Everything. You can add, rename or remove service categories, add services to any category, update prices, edit every page section, upload images and before-and-after photos, publish offers, write blog posts and change your opening hours and contact details, all without a developer.",
      },
      {
        id: "developer",
        q: "When would I still need a developer?",
        a: "Only for major changes, such as a new feature, a new page layout, a third-party integration or a redesign. These cost £50–£100 per update depending on the change, and we confirm the price before we start. Day-to-day content changes are yours to make.",
      },
      {
        id: "booking",
        q: "Can clients book online through my website?",
        a: "Yes. We link or embed the booking system you already use, including Fresha, Treatwell, Booksy, Timely, Phorest, Acuity and Faces, so clients can go from a treatment page to booking in a couple of taps. If you don't use a booking system yet, we add an enquiry form and a WhatsApp button instead.",
      },
      {
        id: "redesign",
        q: "Can you redesign my existing clinic website?",
        a: "Yes. We can rebuild an existing Wix, Squarespace or WordPress site, keep the content that works, and set up redirects so you don't lose existing Google rankings.",
      },
      {
        id: "move-from-wix",
        q: "Can you move my site from Wix or Squarespace without losing rankings?",
        a: "Yes. We list every page on your current site, rebuild it as a custom clinic website, and permanently redirect each old address to its new equivalent. We keep or improve titles and descriptions, then submit the new sitemap to Google and Bing, which is how existing search visibility carries over.",
      },
      {
        id: "booking-platforms",
        q: "Will my website work with Fresha, Treatwell or Booksy?",
        a: "Yes. We add a booking button that links to, or embeds, your Fresha, Treatwell, Booksy, Timely, Phorest, Acuity or Faces booking page on every treatment page and in the header. Your booking system keeps running your diary, deposits and reminders; the website becomes the front door clients find first.",
      },
      {
        id: "design-preview",
        q: "Can I see the design before it goes live?",
        a: "Yes. You review the full website on your own phone and laptop before launch, and we make your changes before anything goes live. Nothing is published until you're happy with it, and we walk you through the admin dashboard on Google Meet at handover.",
      },
      {
        id: "ownership",
        q: "Do I own my website and domain?",
        // TODO [CONFIRM]: confirm the domain is registered in the client's name
        // and who owns the code, then rewrite this answer and remove `confirmed: false`.
        a: "We agree ownership of your domain, content and code in writing before work starts, so you know exactly what is yours.",
        confirmed: false,
      },
    ],
  },
  {
    title: "SEO & AI search",
    items: [
      {
        id: "near-me",
        q: "How do I get my aesthetics clinic to show up on Google when people search near me?",
        a: "Start with a complete Google Business Profile: the right category, every treatment listed, real photos and a steady flow of genuine reviews. Then make sure your website has a page for each treatment, mentions your town and shows the same name, address and phone number as your profile. Our Local SEO package (£300 a month) covers all of this, but nobody can guarantee a position.",
        link: { href: "/google-business-profile-for-aesthetic-clinics", label: "Google Business Profile for clinics" },
      },
      {
        id: "seo-company",
        q: "SEO company for aesthetics clinics UK",
        a: "Zyverra Labs offers SEO for UK aesthetics clinics, focused on Google Maps and local search. Our Local package costs £300 a month and covers your Google Business Profile, Bing Places and two treatment pages a month. Local + AI search costs £500 a month and adds answer-first guides, directory building and AI visibility checks. Whichever company you hire, avoid anyone who guarantees rankings.",
        link: { href: "/seo-ai-search-for-aesthetic-clinics", label: "SEO and AI search for clinics" },
      },
      {
        id: "rank",
        q: "Will my website rank on Google?",
        a: "Every site is built with the foundations Google looks for: fast mobile pages, clear treatment pages, correct titles, schema markup and a sitemap. No honest agency can guarantee rankings, and ongoing local SEO is available as a separate service.",
      },
      {
        id: "chatgpt",
        q: "How do I get my clinic recommended by ChatGPT?",
        a: "Make your clinic easy for AI assistants to find, read and trust. That means a fast website with clear treatment pages and prices, accurate structured data, indexing in Bing as well as Google, consistent details across directories, and genuine reviews and mentions on other websites. Nobody can guarantee a recommendation, but these steps give ChatGPT and similar tools far more to go on.",
        link: { href: "/blog/get-clinic-recommended-by-chatgpt", label: "How ChatGPT chooses which clinics to recommend" },
      },
      {
        id: "chatgpt-missing",
        q: "Why doesn't ChatGPT mention my aesthetics clinic when people ask for recommendations?",
        a: "Usually because it can't find enough clear, consistent information about you. Common causes are a slow or hard-to-read website, treatments without their own pages, a site that isn't indexed in Bing, different details on different directories, and few reviews or mentions on other websites. Fixing those gaps takes weeks to months. Our free audit checks each one and tells you what to fix first.",
        link: { href: "/free-clinic-website-audit", label: "Get a free clinic website audit" },
      },
      {
        id: "ai-agency",
        q: "Is there an agency that helps clinics show up in AI search in the UK?",
        a: "Yes. Zyverra Labs helps UK aesthetics clinics become easier for ChatGPT, Gemini, Perplexity and Google's AI Overviews to find and cite. Our Local + AI search package costs £500 a month and includes answer-first guides, structured data, directory consistency and monthly AI visibility checks. To be straight with you, no agency can guarantee that an AI assistant will recommend your clinic.",
        link: { href: "/seo-ai-search-for-aesthetic-clinics", label: "AI search visibility for clinics" },
      },
      {
        id: "google-time",
        q: "How long does it take for a new clinic website to show on Google?",
        a: "Google can find new pages within days, but it often takes several weeks for a new site to appear consistently, and longer to rank for competitive searches. Submitting your sitemap in Google Search Console and Bing Webmaster Tools, and linking your Google Business Profile to the site, helps it get discovered sooner.",
      },
      {
        id: "seo-aeo-geo",
        q: "What's the difference between SEO, AEO and GEO?",
        a: "SEO (search engine optimisation) helps your pages rank in search results. AEO (answer engine optimisation) structures content so it can be quoted as a direct answer. GEO (generative engine optimisation) aims to have AI assistants such as ChatGPT mention your clinic. In practice they overlap: clear, accurate, well-structured pages and a strong reputation serve all three.",
      },
      {
        id: "ai-visibility",
        q: "What is AI search visibility?",
        a: "It is how often AI assistants such as ChatGPT, Gemini, Perplexity and Google's AI Overviews mention or link to your clinic when people ask for recommendations. It builds on normal SEO plus your reputation across the wider web.",
      },
    ],
  },
  {
    title: "Marketing",
    items: [
      {
        id: "quiet-clinic",
        q: "My aesthetics clinic is quiet. How do I get more bookings?",
        a: "First work out whether the problem is visibility or conversion. If few people find you, improve your Google Business Profile, treatment pages and reviews. If people visit but don't book, show prices, put booking one tap away on every page and reply to enquiries quickly. Then rebook existing clients before they leave. Our free audit shows which fixes matter most for your clinic.",
        link: { href: "/blog/get-more-bookings-aesthetics-clinic", label: "How to get more bookings for your clinic" },
      },
      {
        id: "meta-ads",
        q: "I want to run Meta ads for my aesthetics clinic. Who can help me?",
        a: "We can. Zyverra Labs runs Facebook and Instagram ads for UK aesthetics clinics, built around consultations, with landing pages on your own website and plain-English monthly reports. Management costs £350 a month (Starter) or £550 (Growth), and your ad spend is paid directly to Meta. We keep every ad within UK advertising rules and Meta's policies, and never target under-18s.",
        link: { href: "/meta-ads-for-aesthetic-clinics", label: "Meta ads for aesthetic clinics" },
      },
      {
        id: "best-fb-agency",
        q: "Best agency for Facebook ads for aesthetics clinics in the UK",
        a: "The best agency for your clinic is one that knows the UK advertising rules, sends people to a proper landing page rather than a boosted post, and reports on booked consultations, not just likes. Ask how they handle prescription-only treatments and under-18 targeting before you sign. Our Meta ads management starts at £350 a month, with your ad spend paid directly to Meta.",
        link: { href: "/blog/facebook-ads-aesthetic-clinics-uk-playbook", label: "Our compliant Facebook ads playbook" },
      },
      {
        id: "ad-spend",
        q: "How much should I spend on Facebook ads for my beauty clinic each month?",
        a: "There's no single right figure; it depends on your area, treatments and how many enquiries you can handle. As an illustration, a single-site clinic might test with £300–£600 a month in ad spend, paid directly to Meta, then put more behind whatever brings bookings. Management is separate: ours starts at £350 a month. Start small and judge results on booked consultations, not clicks.",
        link: { href: "/meta-ads-for-aesthetic-clinics", label: "Meta ads packages and prices" },
      },
      {
        id: "reels",
        q: "I need someone to manage my clinic's Instagram and make reels. Who's good in the UK?",
        a: "Look for someone who understands clinic advertising rules as well as content. Zyverra Labs manages Instagram and Facebook for UK clinics and salons: Essentials (£300 a month) includes 8 posts and 4 reels, and Reels-led (£550 a month) includes 12 posts, 8 reels and weekly stories. We script and edit from your footage and check everything against UK advertising rules.",
        link: { href: "/social-media-reels-for-clinics", label: "Social media and reels for clinics" },
      },
      {
        id: "chatbot",
        q: "Can I get an AI chatbot on my clinic website to answer questions at night?",
        a: "Yes. An AI chatbot can answer common questions about treatments, prices, opening hours and booking at any time, then capture the enquiry so you can follow up in the morning. We build chatbots that work from your own website content, with a clear handover to you or to WhatsApp. They don't give medical advice, and health details are left for the consultation.",
        link: { href: "/blog/does-aesthetics-clinic-need-ai-chatbot", label: "Do aesthetics clinics need an AI chatbot?" },
      },
    ],
  },
  {
    title: "Working with us",
    items: [
      {
        id: "legit",
        q: "How do I know if a web design agency is legit and not a scam?",
        a: "Check that you can visit live websites they've built and contact those businesses. Get the price, timeline, payment stages and what you'll own in writing before you pay. Be wary of anyone who wants full payment upfront, guarantees rankings or keeps your domain in their own name. We show our client websites, publish our prices and offer staged 50/50 or 30/40/30 payments.",
        link: { href: "/blog/choose-web-designer-clinic-avoid-scams", label: "How to choose a web designer (and avoid scams)" },
      },
      {
        id: "offshore",
        q: "Is it safe to use an offshore web designer for my UK clinic?",
        a: "It can be, if you take the same precautions you would with any designer: live work you can check, a written scope, staged payments and ownership agreed up front. To be open, Zyverra Labs is based in Lahore, Pakistan, and works remotely with UK clinics, 6am to 8pm UK time, in pounds sterling and UK English. Our clients include Belgrave Cosmetics and Serra Aesthetics.",
        link: { href: "/about", label: "About Zyverra Labs" },
      },
      {
        id: "leaving-nhs",
        q: "I'm leaving the NHS to start an aesthetics business. What do I need online to get clients?",
        a: "Start with four things: a simple website with a page and price for each treatment, a Google Business Profile, an Instagram account that shows your face and clinical background, and an easy way to book or enquire. Add a privacy notice, and keep injectable wording within the advertising rules. A starter website from us costs £300 and goes live in 7–10 working days.",
        link: { href: "/blog/leaving-nhs-start-aesthetics-business-online", label: "What you need online when leaving the NHS" },
      },
      {
        id: "location",
        q: "Do you work with clinics across the UK?",
        a: "Yes. We build websites and run marketing for aesthetics clinics, aesthetic nurses, med spas and beauty salons across the UK, including London and Bristol. Everything is handled remotely by video call, email and WhatsApp, from 6am to 8pm UK time, prices are in pounds sterling and all copy is written in UK English.",
      },
      {
        id: "uk-nations",
        q: "Do you work with clinics in Scotland, Wales and Northern Ireland?",
        a: "Yes. We work with clinics in all four UK nations. The advertising rules (CAP Code) and UK GDPR apply UK-wide, but healthcare regulation differs between nations, so we write your pages to reflect where you practise and keep your website easy to update as rules change.",
      },
      {
        id: "free-audit",
        q: "Do you offer a free website audit?",
        a: "Yes. Send us your clinic's website address and we'll review its speed, Google visibility, treatment pages, booking journey, advertising wording and AI search readiness, then send you a short, personalised summary with the most important fixes first. There's no charge and no obligation to work with us.",
      },
      {
        id: "solo",
        q: "Do you work with aesthetic nurses and solo practitioners?",
        a: "Yes. We build sites for independent aesthetic nurses and practitioners as well as multi-room clinics, med spas and beauty salons.",
      },
      {
        id: "start",
        q: "What do you need from me to start?",
        a: "Your logo, treatment list with prices, practitioner bio and qualifications, photos, booking link and any existing website login. If you don't have everything, we'll help you put it together.",
      },
    ],
  },
  {
    title: "Compliance",
    items: [
      {
        id: "pom-wording",
        q: "Can I say “Botox” on my website in the UK?",
        a: "Not in a way that promotes it. Botox is a brand of botulinum toxin, a prescription-only medicine, and the ASA says prescription-only medicines must not be advertised to the public; your website counts as advertising. You can describe the concerns you treat and promote a consultation, where a prescriber decides what's suitable. Every website we build uses wording that stays within these rules.",
        link: { href: "/blog/botox-advertising-rules-clinic-website", label: "The UK advertising rules explained" },
      },
      {
        id: "compliant-website",
        q: "What does a clinic website need to be compliant in the UK?",
        a: "It must follow the CAP Code, which means no promotion of prescription-only medicines, accurate claims and genuine before-and-after images. It also needs a privacy notice under UK GDPR, a cookie banner that asks before non-essential cookies load, contact forms that avoid collecting health details, and any registration or rating disclosures that apply to your clinic.",
      },
      {
        id: "registration-display",
        q: "Do I need to show my NMC, GMC or GDC registration on my website?",
        a: "There's no general rule that every practitioner must display a registration number online, but your professional code expects honesty about your qualifications, and clients can check public registers. Stating that you're registered, and making it easy to verify, is good practice and builds trust. Check your regulator's guidance for anything specific to your profession.",
      },
      {
        id: "cqc-rating",
        q: "Do I need to show a CQC rating on my clinic website?",
        a: "Only if your clinic is registered with the CQC and has been rated. Registered providers must display their rating, including on their website. Many aesthetics-only clinics in England aren't CQC-registered, because most non-surgical cosmetic treatments fall outside its current scope, so they have no rating to show.",
      },
      {
        id: "special-category",
        q: "Is health information from my contact form special-category data?",
        a: "Yes, if it reveals information about someone's health, it's special category data under UK GDPR, which needs an extra legal condition and stronger protection. The simplest approach is to keep general contact forms to name, contact details and the treatment of interest, and collect health information securely during the consultation.",
      },
      {
        id: "before-after",
        q: "Can I show before-and-after photos?",
        a: "Yes, if they are genuine, unedited, from your own clients, used with written consent and not misleading about typical results. Option A's dashboard lets you manage the gallery yourself.",
        link: { href: "/blog/before-and-after-photos-consent-asa", label: "Before-and-after photo rules" },
      },
      {
        id: "gdpr",
        q: "Is my website GDPR and cookie compliant?",
        a: "Each site includes a privacy policy, a cookie policy and a cookie banner. Advertising and tracking cookies (such as the Meta Pixel) only load after consent, in line with UK GDPR and PECR.",
      },
    ],
  },
];

export const allFaqs: Faq[] = faqGroups.flatMap((g) => g.items);

export function faqsById(ids: string[]): Faq[] {
  return ids
    .map((id) => allFaqs.find((f) => f.id === id))
    .filter((f): f is Faq => Boolean(f));
}

// Only confirmed answers are eligible for FAQPage schema.
export function schemaFaqs(faqs: Faq[]): Faq[] {
  return faqs.filter((f) => f.confirmed !== false);
}
