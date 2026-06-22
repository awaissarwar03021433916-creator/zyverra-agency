// The shape every locale dictionary must satisfy. `en` is the source of truth;
// all other locales are typed against this so missing keys fail at build time.

export type NavLink = { label: string; href: string };

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    links: NavLink[];
    contact: string;
    languageLabel: string;
  };
  hero: {
    badge: string;
    headingPrefix: string;
    headingSuffix: string;
    offerings: { label: string; description: string }[];
    paragraph: string;
    ctaPrimary: string;
    ctaSecondary: string;
    trust: string[];
    panelNote: string;
    capabilities: string;
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    learnMore: string;
    items: { title: string; description: string; points: string[] }[];
  };
  industries: {
    eyebrow: string;
    title: string;
    items: string[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    tags: string[];
    panelTitle: string;
    principles: { title: string; description: string }[];
  };
  why: {
    eyebrow: string;
    title: string;
    description: string;
    items: { title: string; description: string }[];
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    stepLabel: string;
    steps: { title: string; description: string }[];
  };
  portfolio: {
    eyebrow: string;
    title: string;
    description: string;
    filters: { all: string; client: string; systems: string; ai: string; innovation: string };
    card: { problem: string; solution: string; features: string; outcome: string };
    visit: string;
    caseStudy: string;
    statusLive: string;
    statusRnd: string;
    metrics: { value: string; label: string }[];
    process: { label: string; caption: string }[];
    featured: { tag: string; discuss: string; documentation: string };
    futureSlot: { title: string; caption: string; cta: string };
    closing: { text: string; cta: string };
  };
  proof: {
    eyebrow: string;
    title: string;
    body: string;
    tryAgent: string;
    viewWork: string;
  };
  callCta: {
    title: string;
    description: string;
    button: string;
    formTitle: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    bullets: string[];
    formTitle: string;
    formDescription: string;
  };
  contactForm: {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    nameRequired: string;
    nameTooLong: string;
    emailInvalid: string;
    emailTooLong: string;
    messageRequired: string;
    messageTooLong: string;
    success: string;
    errorGeneric: string;
    errorRate: string;
    errorNetwork: string;
  };
  footer: {
    description: string;
    columns: { company: string; services: string; connect: string };
    companyLinks: NavLink[];
    servicesLinks: NavLink[];
    socialLinks: NavLink[];
    startProject: string;
    rights: string;
    tagline: string;
  };
};
