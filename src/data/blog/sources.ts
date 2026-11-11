// Verified external sources (each URL checked on 11 November 2026). Posts cite
// from this registry only, so every link points to a real, credible page.

import type { Source } from "./types";

const s = (label: string, url: string): Source => ({ label, url });

export const SRC = {
  // Advertising regulation
  asaFineLine: s("ASA — A fine line: dos and don'ts of advertising prescription-only injectables", "https://www.asa.org.uk/news/a-fine-line-the-dos-and-don-ts-of-advertising-botox.html"),
  asaPomWebsites: s("CAP — Prescription-only medicines on websites", "https://asa.org.uk/advice-online/health-prescription-only-medicines-websites.html"),
  asaBotulinum: s("CAP — Botulinum toxin products", "https://www.asa.org.uk/advice-online/beauty-and-cosmetics-botulinum-toxin-products.html"),
  asaCosmetic: s("CAP — Cosmetic interventions", "https://www.asa.org.uk/advice-online/cosmetic-interventions.html"),
  asaCosmeticSR: s("CAP — Cosmetic interventions: social responsibility", "https://www.asa.org.uk/advice-online/cosmetic-interventions-social-responsibility.html"),
  asaBeforeAfter: s("CAP — Before and after photos", "https://asa.org.uk/advice-online/before-and-after-photos.html"),
  asaBodyImage: s("CAP — Social responsibility: body image", "https://asa.org.uk/advice-online/social-responsibility-body-image.html"),
  asaEnforcement: s("ASA Enforcement Notice — advertising botulinum toxin injections (PDF)", "https://www.asa.org.uk/static/a8fa05da-b3ee-4528-82095e7bba2a3e5c/Enforcement-Notice-Advertising-Botox-and-other-botulinum-toxin-injecti.pdf"),
  capCode: s("The CAP Code (UK non-broadcast advertising code)", "https://www.asa.org.uk/codes-and-rulings/advertising-codes/non-broadcast-code.html"),
  mhra: s("Medicines and Healthcare products Regulatory Agency (MHRA)", "https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency"),

  // Data protection
  icoSpecialCategory: s("ICO — Special category data", "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/special-category-data/"),
  icoCookies: s("ICO — Cookies and similar technologies (PECR)", "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/"),
  icoFee: s("ICO — The data protection fee", "https://ico.org.uk/for-organisations/data-protection-fee/"),
  icoInformed: s("ICO — Right to be informed", "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/right-to-be-informed/"),
  govDataProtection: s("GOV.UK — Data protection", "https://www.gov.uk/data-protection"),
  icoEmailMarketing: s("ICO — Electronic mail marketing (PECR)", "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/electronic-and-telephone-marketing/electronic-mail-marketing/"),
  icoDirectMarketing: s("ICO — Direct marketing guidance", "https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/direct-marketing-guidance/"),

  // Healthcare regulation
  cqcSurgical: s("CQC — Scope of registration: surgical procedures", "https://www.cqc.org.uk/guidance-regulation/providers/registration/scope-registration/regulated-activities/surgical-procedures"),
  cqcDisplayRatings: s("Health and Social Care Act 2008 (Regulated Activities) Regulations 2014, regulation 20A — display of ratings", "https://www.legislation.gov.uk/uksi/2014/2936/regulation/20A"),
  govLicensing: s("GOV.UK — Licensing of non-surgical cosmetic procedures in England: consultation response", "https://www.gov.uk/government/consultations/licensing-of-non-surgical-cosmetic-procedures/outcome/the-licensing-of-non-surgical-cosmetic-procedures-in-england-consultation-response"),
  nmcCode: s("NMC — The Code", "https://www.nmc.org.uk/standards/code/"),
  nmcRegister: s("NMC — Search the register", "https://www.nmc.org.uk/registration/search-the-register/"),
  jccp: s("Joint Council for Cosmetic Practitioners (JCCP)", "https://www.jccp.org.uk/"),
  saveFace: s("Save Face — accredited practitioner register", "https://www.saveface.co.uk/"),
  nhsNonSurgical: s("NHS — Non-surgical cosmetic procedures", "https://www.nhs.uk/conditions/cosmetic-procedures/non-surgical-cosmetic-procedures/"),

  // Google
  googleStarter: s("Google Search Central — SEO starter guide", "https://developers.google.com/search/docs/fundamentals/seo-starter-guide"),
  googleHelpful: s("Google Search Central — Creating helpful, reliable, people-first content", "https://developers.google.com/search/docs/fundamentals/creating-helpful-content"),
  googleAiFeatures: s("Google Search Central — AI features and your website", "https://developers.google.com/search/docs/appearance/ai-features"),
  googleSiteMove: s("Google Search Central — Site moves with URL changes", "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes"),
  googleLocalBusinessSD: s("Google Search Central — LocalBusiness structured data", "https://developers.google.com/search/docs/appearance/structured-data/local-business"),
  gbpRanking: s("Google Business Profile Help — How to improve your local ranking", "https://support.google.com/business/answer/7091"),
  gbpGuidelines: s("Google Business Profile Help — Guidelines for representing your business", "https://support.google.com/business/answer/3038177"),
  googleContribution: s("Google — Maps user-contributed content policy (fake engagement)", "https://support.google.com/contributionpolicy/answer/7400114"),
  googleAdsHealthcare: s("Google Ads policy — Healthcare and medicines", "https://support.google.com/adspolicy/answer/176031"),
  searchConsole: s("Google Search Console", "https://search.google.com/search-console/about"),
  webVitals: s("web.dev — Core Web Vitals", "https://web.dev/articles/vitals"),
  pageSpeed: s("PageSpeed Insights", "https://pagespeed.web.dev/"),

  // Other search / AI
  bingWebmaster: s("Bing Webmaster Tools", "https://www.bing.com/webmasters/about"),
  indexNow: s("IndexNow", "https://www.indexnow.org/"),
  openaiSearch: s("OpenAI — Introducing ChatGPT search", "https://openai.com/index/introducing-chatgpt-search/"),
  ahrefsAio: s("Ahrefs — brand mentions and AI Overview visibility study", "https://ahrefs.com/blog/ai-overview-brand-correlation/"),

  // Meta
  metaCosmetic: s("Meta Advertising Standards — Cosmetic procedures and wellness", "https://transparency.meta.com/policies/ad-standards/content-specific-restrictions/cosmetic-procedures-and-wellness"),
  metaHealth: s("Meta Advertising Standards — Health and wellness", "https://transparency.meta.com/en-gb/policies/ad-standards/restricted-goods-services/health-wellness"),
  metaStandards: s("Meta Advertising Standards", "https://transparency.meta.com/policies/ad-standards/"),

  // Platforms
  fresha: s("Fresha — Pricing", "https://www.fresha.com/pricing"),
  treatwell: s("Treatwell — For partners", "https://www.treatwell.co.uk/partners/"),
  wix: s("Wix — Plans", "https://www.wix.com/plans"),
  squarespace: s("Squarespace — Pricing", "https://www.squarespace.com/pricing"),
} as const;

// Internal links used across posts (descriptive anchors only).
export const LINK = {
  pricing: "[clinic website pricing](/pricing)",
  websites: "[aesthetic clinic website design](/aesthetic-clinic-website-design)",
  dashboard: "[clinic website admin dashboard](/clinic-website-admin-dashboard)",
  seo: "[SEO for aesthetic clinics](/seo-ai-search-for-aesthetic-clinics)",
  gbp: "[Google Business Profile for aesthetic clinics](/google-business-profile-for-aesthetic-clinics)",
  metaAds: "[Facebook and Instagram ads for aesthetic clinics](/meta-ads-for-aesthetic-clinics)",
  social: "[social media management for aesthetic clinics](/social-media-reels-for-clinics)",
  nurse: "[website for aesthetic nurses](/website-for-aesthetic-nurses)",
  redesign: "[clinic website redesign](/clinic-website-redesign)",
  salon: "[beauty salon website design](/beauty-salon-website-design)",
  treatmentPages: "[treatment pages that rank](/treatment-pages)",
  audit: "[free clinic website audit](/free-clinic-website-audit)",
  chatbot: "[AI chatbot for aesthetic clinics](/custom-software-ai-chatbots)",
  work: "[clinic websites we've built](/work)",
} as const;

export const POST = (slug: string, label: string) => `[${label}](/blog/${slug})`;

/** Inline citation built from the verified registry: [label](url). */
export const cite = (source: Source, label: string = source.label) => `[${label}](${source.url})`;
