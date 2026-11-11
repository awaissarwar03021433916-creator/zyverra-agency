// Software, AI and web-platform projects shown on /custom-software-ai-chatbots.
// Clinic case studies live separately in src/data/work.ts.

export type ProjectCategory = "client" | "systems" | "ai" | "innovation";

export type Project = {
  id: string;
  name: string;
  category: ProjectCategory;
  categoryLabel: string;
  image: string;
  alt: string;
  /** Live deployment. Empty when the project has no public URL. */
  url?: string;
  /** Static case-study page under /case-studies. */
  caseStudy?: string;
  problem: string;
  solution: string;
  tech: string[];
  outcome: string;
  status: "live" | "rnd";
};

export const projects: Project[] = [
  {
    id: "ai-sales-engineer",
    name: "AI Sales Engineer",
    category: "ai",
    categoryLabel: "AI Product",
    image: "/portfolio/chatbot.PNG",
    alt: "AI Sales Engineer chatbot built by Zyverra Labs",
    caseStudy: "/case-studies/ai-sales-engineer",
    problem:
      "Businesses lose leads because website visitors leave without ever speaking to a salesperson.",
    solution:
      "An AI-powered sales assistant that engages visitors, qualifies leads, answers questions, captures contact details, and stores every conversation automatically.",
    tech: ["AI Agents", "RAG Retrieval", "Lead Scoring", "Conversation Memory"],
    outcome:
      "Converts website visitors into qualified leads while reducing manual sales effort.",
    status: "live",
  },
  {
    id: "aura",
    name: "Aura Manufacturers",
    category: "client",
    categoryLabel: "Client Platform",
    image: "/portfolio/aura.PNG",
    alt: "Aura Manufacturers website built by Zyverra Labs",
    url: "https://www.auramanufacturers.com/",
    caseStudy: "/case-studies/aura-manufacturers",
    problem:
      "An established manufacturer was invisible to modern B2B buyers — no credible digital presence to win supplier research.",
    solution:
      "A fast, conversion-focused web platform that presents Aura's capabilities and turns research into enquiries.",
    tech: ["Next.js", "Performance", "Technical SEO", "Lead Capture"],
    outcome:
      "A credible digital front door that competes with larger players and generates inbound enquiries.",
    status: "live",
  },
  {
    id: "vareza",
    name: "VAREZA",
    category: "client",
    categoryLabel: "Client Platform",
    image: "/portfolio/vareza.PNG",
    alt: "VAREZA e-commerce store built by Zyverra Labs",
    url: "https://vareza.pk/",
    caseStudy: "/case-studies/vareza",
    problem:
      "An online store risked losing customers to slow pages, a clunky checkout, and a generic look.",
    solution:
      "A performance-engineered, premium storefront with a short, friction-free path to purchase.",
    tech: ["E-commerce", "Mobile-first UI", "Checkout UX", "Core Web Vitals"],
    outcome: "A smoother browse-to-buy journey that reduces drop-off and elevates the brand.",
    status: "live",
  },
  {
    id: "crm",
    name: "Employee Management CRM",
    category: "systems",
    categoryLabel: "Business System",
    image: "/portfolio/crms.PNG",
    alt: "Employee Management CRM dashboard built by Zyverra Labs",
    url: "https://crms-tan.vercel.app/",
    caseStudy: "/case-studies/employee-management-crm",
    problem:
      "Employee records and operations were managed manually across scattered files — slow, risky, no access control.",
    solution:
      "A custom CRM that centralises employee data, enforces role-based access, and tracks operations.",
    tech: ["Role-based Access", "Admin Dashboards", "Data Modelling", "Audit Trails"],
    outcome:
      "Centralised operations, secured data, and faster, more reliable day-to-day administration.",
    status: "live",
  },
  {
    id: "ai-proposal",
    name: "AI Proposal Generator",
    category: "ai",
    categoryLabel: "AI Product",
    image: "/portfolio/proposal-generator.PNG",
    alt: "AI Proposal Generator app built by Zyverra Labs",
    url: "https://ai-proposal-generator-eta-three.vercel.app/",
    caseStudy: "/case-studies/ai-proposal-generator",
    problem:
      "Writing tailored proposals by hand was slow, inconsistent, and a bottleneck on closing deals.",
    solution:
      "An AI product that drafts customised, professional proposals in seconds from a few inputs.",
    tech: ["LLM Generation", "Prompt Engineering", "Templating", "Structured Output"],
    outcome:
      "Proposals from hours to seconds, standardised quality, and faster responses to opportunities.",
    status: "live",
  },
  {
    id: "pdf-merger",
    name: "PDF Merger",
    category: "systems",
    categoryLabel: "Business System",
    image: "/portfolio/mergepdf.PNG",
    alt: "PDF Merger web app built by Zyverra Labs",
    url: "https://pdf-merger-liard.vercel.app/",
    caseStudy: "/case-studies/pdf-merger",
    problem:
      "Merging PDFs meant clunky installs, paywalls, or uploading sensitive files to unknown servers.",
    solution: "A fast, zero-install web tool that merges PDFs privately, right in the browser.",
    tech: ["Client-side Processing", "Privacy by Design", "Zero-install", "Web APIs"],
    outcome:
      "A recurring chore reduced to a fast, private, free task — practical, privacy-first engineering.",
    status: "live",
  },
];

// Innovation / R&D work, presented separately from delivered client projects.
export const featuredProject = {
  id: "landchain",
  name: "LandChain",
  category: "innovation" as const,
  categoryLabel: "Innovation & R&D",
  image: "/portfolio/landchain.PNG",
  alt: "LandChain blockchain land-record system built by Zyverra Labs",
  documentation: "/case-studies/LandChain_Client_Documentation.pdf",
  problem:
    "Land records are paper-based and centrally controlled — vulnerable to tampering, fraud, and slow disputes.",
  solution:
    "A blockchain land-record system with on-chain ownership and smart-contract-enforced transfers.",
  tech: ["Blockchain", "Smart Contracts", "Web3", "Distributed Ledger"],
  outcome:
    "Property records that are transparent, tamper-resistant, and verifiable in seconds — not days.",
};
