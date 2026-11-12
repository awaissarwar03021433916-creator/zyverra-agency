import type { BlogPost } from "../types";
import { LINK, POST, SRC, cite } from "../sources";

export const leavingNhsPost: BlogPost = {
  slug: "leaving-nhs-start-aesthetics-business-online",
  title: "Leaving the NHS to start an aesthetics business: what you need online",
  seoTitle: "Leaving the NHS for Aesthetics: What You Need Online",
  metaDescription:
    "Leaving the NHS to start an aesthetics business? What you need online to get clients: website, Google profile, Instagram, booking and a launch checklist.",
  excerpt:
    "The online set-up a nurse, doctor or dentist needs when leaving the NHS for aesthetics: website, Google profile, Instagram, booking, and a launch checklist.",
  date: "2026-11-12",
  updated: "2026-11-12",
  category: "Clinic growth",
  targetKeyword: "leaving NHS aesthetics business",
  image: "/blog/leaving-nhs-start-aesthetics-business-online/og",
  imageAlt: "A practitioner setting up an aesthetics business online after leaving the NHS",
  servicePath: "/website-for-aesthetic-nurses",
  body: [
    {
      type: "answer",
      text: "When you leave the NHS to start an aesthetics business, you need four things online to get clients: a simple website with a page and price for each treatment, a Google Business Profile, an Instagram account that shows you and your clinical background, and an easy way to book. Add a privacy notice and keep injectable wording within UK advertising rules.",
    },
    {
      type: "tldr",
      items: [
        "Your NHS experience is your biggest advantage online; make your qualifications easy to verify.",
        "Start lean: a focused website, a Google profile, Instagram and a booking link.",
        "Your first clients usually come from people who already know you; make it easy for them to share you.",
        "Get the business basics right first: HMRC registration, insurance, ICO fee if it applies.",
      ],
    },
    { type: "heading", text: "What should you sort out before you go online?" },
    {
      type: "paragraph",
      text: "Before you advertise, get the business itself set up properly. GOV.UK explains the options for setting up as a sole trader or limited company (" + cite(SRC.govSetUpBusiness, "GOV.UK") + "), and if you're self-employed you'll need to register for Self Assessment with HMRC (" + cite(SRC.govSelfAssessment, "GOV.UK") + "). Check you have suitable indemnity insurance for the treatments you'll offer, and that your training covers them.",
    },
    {
      type: "paragraph",
      text: "If you'll hold client records, which almost every clinic does, check whether you need to pay the ICO data protection fee (" + cite(SRC.icoFee, "ICO") + "). And if you're a nurse, the NMC Code still applies to your private practice, including how you describe yourself and your skills (" + cite(SRC.nmcCode, "NMC") + ").",
    },
    { type: "heading", text: "What do you need online to get your first clients?" },
    {
      type: "table",
      caption: "Your online launch kit",
      head: ["What", "Why it matters", "Can it wait?"],
      rows: [
        ["Website with treatment pages and prices", "Google can find you; clients see you're established", "No"],
        ["Google Business Profile", "Puts you on Google Maps for local searches", "No"],
        ["Instagram business account", "Where many clients discover and check practitioners", "No"],
        ["Booking link or enquiry form", "Turns interest into appointments", "No"],
        ["Privacy notice and cookie banner", "Required if your site collects personal data", "No"],
        ["Blog and guides", "Builds search visibility over time", "Yes, start after launch"],
        ["Paid ads", "Brings new people faster once the basics work", "Yes, usually month 3+"],
      ],
    },
    {
      type: "paragraph",
      text: "Our guide to a " + POST("aesthetic-nurse-website-starting-out", "first website for an aesthetic nurse") + " covers the pages in detail.",
    },
    { type: "heading", text: "What's the cheapest way to look professional as a new aesthetic practitioner?" },
    {
      type: "paragraph",
      text: "Spend on the few things clients notice and keep everything else simple. Good photos of you and your room, a clean website with clear prices, a consistent name and logo, and fast, friendly replies make you look established. You can do this for a few hundred pounds; you don't need a big brand agency or a fancy fit-out.",
    },
    {
      type: "list",
      items: [
        "**Photos:** one session with a local photographer, or natural light and a modern phone, for portraits and room shots",
        "**A simple logo:** your name in a clean typeface is enough to start",
        "**A custom website:** a focused site with a page per treatment; ours costs £300, or £400 with an admin dashboard",
        "**A business email and number:** keep personal and clinic messages separate",
        "**Your registration on show:** state your profession and make it easy to check the public register (" + cite(SRC.nmcRegister, "NMC register") + ")",
      ],
    },
    {
      type: "paragraph",
      text: "Avoid stock photos of models, borrowed before-and-after images and supplier brochure text. Clients and regulators both notice.",
    },
    { type: "heading", text: "How should you talk about your NHS background?" },
    {
      type: "paragraph",
      text: "Your clinical experience is the reason many clients will choose you over a non-medical injector, so say it plainly. Explain your profession, how long you've practised and what that means for the client: assessment, safety, and knowing when not to treat. Keep it factual and verifiable; don't imply NHS endorsement of your private business.",
    },
    {
      type: "paragraph",
      text: "A good about page answers: who you are, what you're registered as, where you trained in aesthetics, where you practise and what a first appointment is like. Add a real photo of you, not a logo.",
    },
    { type: "heading", text: "How do you get your first 50 clients for your aesthetics business?" },
    {
      type: "paragraph",
      text: "Your first 50 clients usually come from people who already know or trust you: friends, former colleagues, their friends, and people who find you locally on Google and Instagram. Make it easy for each happy client to recommend you, ask every one for a review, and post consistently so new people can see your work and personality.",
    },
    {
      type: "ordered",
      items: [
        "**Tell your network.** Let former colleagues, friends and family know you've launched, with your booking link.",
        "**Make referrals easy.** Give each client a card or message they can forward; don't offer prohibited incentives for injectable treatments.",
        "**Ask for a Google review** after every appointment, with a direct link.",
        "**Post three times a week** on Instagram: education, you at work, and how to book.",
        "**Partner locally.** Hair salons, gyms and bridal shops can share each other's details.",
        "**Follow up.** Message clients when a review or top-up is due, with consent for marketing.",
      ],
    },
    {
      type: "paragraph",
      text: "Marketing messages need consent under PECR, so collect it clearly at booking (" + cite(SRC.icoEmailMarketing, "ICO") + "). Once these basics are working, paid ads can speed things up; our " + POST("facebook-ads-aesthetic-clinics-uk-playbook", "compliant Facebook ads playbook") + " explains how.",
    },
    { type: "heading", text: "How do the advertising rules affect a new practice?" },
    {
      type: "paragraph",
      text: "The same rules apply to a new practitioner as to an established clinic. Prescription-only medicines can't be advertised to the public, so injectable anti-wrinkle work is presented as a consultation, without naming or pricing the medicine (" + cite(SRC.asaPomWebsites, "CAP") + "). Before-and-after photos must be genuine and representative (" + cite(SRC.asaBeforeAfter, "CAP") + "). Our guide to " + POST("botox-advertising-rules-clinic-website", "the UK advertising rules") + " covers the wording.",
    },
    { type: "heading", text: "What's on a checklist for launching an aesthetics clinic in the UK?" },
    {
      type: "paragraph",
      text: "A launch checklist covers four areas: the business (HMRC registration, insurance, bank account), compliance (training, ICO fee, privacy notice, advertising wording), your online presence (website, Google profile, Instagram, booking) and your first marketing (network, reviews, regular posts). Work through it in order and you'll launch with fewer surprises.",
    },
    {
      type: "checklist",
      title: "Aesthetics clinic launch checklist",
      items: [
        "Choose sole trader or limited company and register with HMRC",
        "Arrange indemnity insurance that covers every treatment you offer",
        "Check your training and prescribing arrangements are in place",
        "Pay the ICO data protection fee if it applies",
        "Set up a business bank account, email and phone number",
        "Choose your booking system and set deposit and cancellation rules",
        "Launch your website with treatment pages, prices, about page and privacy notice",
        "Create and verify your Google Business Profile",
        "Set up an Instagram business account with your booking link in the bio",
        "Write consultation-led wording for injectable treatments",
        "Tell your network and ask every client for a review",
      ],
    },
    {
      type: "note",
      text: "This is general guidance, not legal or regulatory advice. Rules differ across England, Scotland, Wales and Northern Ireland; check what applies where you practise.",
    },
    { type: "heading", text: "How Zyverra helps" },
    {
      type: "paragraph",
      text: "We build " + LINK.nurse + " and small clinics for £300, or £400 with an admin dashboard so you can update treatments and prices yourself as you grow. Sites go live in 7–10 working days, hosting is free, and you can pay 50/50 or in three instalments. We can also set up your " + LINK.gbp + ". See " + LINK.pricing + ".",
    },
    {
      type: "faq",
      items: [
        { q: "Can I keep working for the NHS while I start an aesthetics business?", a: "Many practitioners start part-time. Check your NHS contract for any rules on secondary employment and declare it if required." },
        { q: "Do I need a website if I'm only working one day a week?", a: "A simple website still helps. It makes you findable on Google and gives Instagram followers somewhere to see prices and book." },
        { q: "How much does it cost to get online as a new practitioner?", a: "A focused website from us costs £300, or £400 with an admin dashboard. A Google Business Profile and Instagram account are free. A domain is about £10–£20 a year." },
        { q: "Can I mention that I'm an NHS nurse on my website?", a: "You can state your profession and experience factually. Don't imply that the NHS endorses or provides your private service." },
        { q: "How quickly can I start getting clients?", a: "Often within weeks from people you know. Search visibility usually builds over a few months, which is why it's worth launching your website early." },
      ],
    },
    { type: "sources", items: [SRC.govSetUpBusiness, SRC.govSelfAssessment, SRC.icoFee, SRC.nmcCode, SRC.nmcRegister, SRC.asaPomWebsites, SRC.icoEmailMarketing] },
    { type: "cta", title: "Launching your aesthetics business?", text: "Get a free review of your launch plan and online presence, or message us on WhatsApp." },
  ],
};
