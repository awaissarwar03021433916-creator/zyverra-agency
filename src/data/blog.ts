// Blog content for Zyverra Labs. Authored in English; slugs are stable and used
// for static generation and clean URLs (/{lang}/blog/{slug}).

export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  date: string; // ISO date
  readingMinutes: number;
  tag: string;
  image: string;
  imageAlt: string;
  body: BlogBlock[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "production-ready-software-weeks-not-months",
    title: "How We Ship Production-Ready Software in Weeks, Not Months",
    excerpt:
      "Speed and quality are not a trade-off when the process is right. Here is how a senior-led team compresses delivery without cutting the corners that matter.",
    metaDescription:
      "How Zyverra Labs ships production-ready AI and SaaS software in weeks: scoping tightly, building on proven architecture, and shipping in vertical slices.",
    date: "2026-05-28",
    readingMinutes: 6,
    tag: "Delivery",
    image: "/industries/saas.jpg",
    imageAlt: "Team shipping software on a dashboard",
    body: [
      {
        type: "paragraph",
        text: "Most software projects don't run late because the work is hard. They run late because the scope is fuzzy, decisions stall, and the first time anyone sees something real is two months in. A focused, senior-led team removes those failure modes deliberately, and the result is software that is live and earning while a bigger team is still in planning.",
      },
      { type: "heading", text: "1. Scope the outcome, not the feature list" },
      {
        type: "paragraph",
        text: "We start every engagement by getting clear on the business outcome and the single most important user journey. A tight, honest scope is the highest-leverage decision in the whole project. We would rather ship one journey that works end to end than ten half-built features.",
      },
      { type: "heading", text: "2. Build on proven architecture" },
      {
        type: "paragraph",
        text: "We don't reinvent the foundation on every project. A reliable, secure stack, typed end to end, with auth, data, and deployment patterns we trust, means we spend our time on your business logic, not on plumbing that has been solved a thousand times.",
      },
      { type: "heading", text: "3. Ship in vertical slices" },
      {
        type: "paragraph",
        text: "Instead of building all the back end, then all the front end, we ship thin vertical slices that work end to end from day one. You see real, clickable software early and often, which means feedback arrives while it is still cheap to act on.",
      },
      {
        type: "list",
        items: [
          "A working slice in the first week, not a status report",
          "Weekly demos against the real product, not mockups",
          "Decisions made in days, not held for a monthly review",
          "Security and performance treated as features, not afterthoughts",
        ],
      },
      { type: "heading", text: "4. Treat quality as part of speed" },
      {
        type: "paragraph",
        text: "Cutting quality to go faster is a loan with brutal interest. Validated inputs, sensible defaults, and clean data models are what let us keep moving quickly in week six as confidently as in week one. Speed that survives contact with production is the only speed that counts.",
      },
      { type: "heading", text: "The takeaway" },
      {
        type: "paragraph",
        text: "Shipping in weeks is not about heroics or cutting corners. It is about a tight scope, a foundation you trust, and a rhythm of shipping real software continuously. That is how we work on every project.",
      },
    ],
  },
  {
    slug: "ai-agents-vs-automation",
    title: "AI Agents vs. AI Automation: What Your Business Actually Needs",
    excerpt:
      "The two get used interchangeably, but they solve different problems. A clear, practical breakdown to help you choose the right tool, and avoid overbuilding.",
    metaDescription:
      "AI agents vs. AI automation explained: the difference, when to use each, and how to choose the right approach for your business without overengineering.",
    date: "2026-05-12",
    readingMinutes: 7,
    tag: "AI",
    image: "/industries/fintech.jpg",
    imageAlt: "AI and automation concept on screens",
    body: [
      {
        type: "paragraph",
        text: "\"We need AI\" is where most conversations start, and it is the wrong place to start. The useful question is what decision or task you want to take off a person's plate. Answer that, and the choice between automation and an agent usually makes itself.",
      },
      { type: "heading", text: "AI automation: predictable work, done reliably" },
      {
        type: "paragraph",
        text: "Automation shines when the steps are known. A trigger fires, data moves between systems, a rule decides what happens next. It is fast, cheap to run, and easy to trust because it does the same thing every time. If you can describe the workflow as a flowchart, automation is almost always the right answer.",
      },
      {
        type: "list",
        items: [
          "Routing leads and syncing them to your CRM",
          "Generating and sending documents on a trigger",
          "Moving and transforming data between tools",
          "Notifying the right person when something needs attention",
        ],
      },
      { type: "heading", text: "AI agents: judgment over open-ended tasks" },
      {
        type: "paragraph",
        text: "An agent earns its keep when the path is not fixed. It reasons about a goal, chooses which tools to use, and adapts to messy, open-ended input. That flexibility is powerful, but it needs guardrails: clear boundaries, human-in-the-loop checks on consequential actions, and logging you can audit.",
      },
      {
        type: "list",
        items: [
          "Handling support conversations that branch unpredictably",
          "Researching and summarizing across many sources",
          "Qualifying and responding to inbound enquiries",
          "Operating across several tools to complete a goal",
        ],
      },
      { type: "heading", text: "How to choose without overbuilding" },
      {
        type: "paragraph",
        text: "Start with the simplest thing that solves the problem. If a rule-based workflow covers 90% of cases, ship that and let an agent handle the long tail later. The expensive mistake is reaching for an autonomous agent when a five-step automation would have done the job more cheaply and more reliably.",
      },
      { type: "heading", text: "The takeaway" },
      {
        type: "paragraph",
        text: "Automation for predictable work, agents for judgment, and the simplest option that works. Most businesses need a thoughtful mix of both, and a partner honest enough to tell you when you don't need AI at all.",
      },
    ],
  },
  {
    slug: "secure-saas-mvp-guide",
    title: "A Practical Guide to Shipping a Secure SaaS MVP",
    excerpt:
      "An MVP is your first impression and your first attack surface. The security fundamentals that are cheap to add early and painful to retrofit later.",
    metaDescription:
      "A practical guide to building a secure SaaS MVP: authentication, tenant isolation, input validation, secrets, and the security basics to get right from day one.",
    date: "2026-04-22",
    readingMinutes: 8,
    tag: "SaaS",
    image: "/industries/ecommerce.jpg",
    imageAlt: "Secure SaaS application interface",
    body: [
      {
        type: "paragraph",
        text: "Security is not a phase you bolt on before launch. The decisions that determine whether your SaaS is safe are made in the first week, in how you model tenants, handle auth, and treat untrusted input. The good news: the fundamentals are cheap to get right early and expensive to retrofit, so a little discipline now pays off for years.",
      },
      { type: "heading", text: "Get authentication and sessions right" },
      {
        type: "paragraph",
        text: "Use a proven authentication approach rather than rolling your own. Sign and verify sessions, set sensible cookie flags, and never store secrets where they can leak. Auth is the front door, it is the last place to be clever for the sake of it.",
      },
      { type: "heading", text: "Isolate tenants from day one" },
      {
        type: "paragraph",
        text: "In multi-tenant SaaS, the worst bug is one customer seeing another's data. Enforce tenant scoping at the data layer, not just in the UI, so a missing filter can never leak records. Designing this in early is straightforward; adding it after you have real customers is a migration nightmare.",
      },
      {
        type: "list",
        items: [
          "Scope every query to the current tenant at the data layer",
          "Validate and type all input at the boundary",
          "Keep secrets in environment configuration, never in the repo",
          "Apply least-privilege access for services and admins",
          "Log security-relevant events so you can audit them later",
        ],
      },
      { type: "heading", text: "Validate input like you mean it" },
      {
        type: "paragraph",
        text: "Every request from a browser is untrusted. Validate the shape and content of input at the boundary with a schema, and reject anything that doesn't fit. This single habit closes off a whole category of bugs and makes the rest of your code simpler to reason about.",
      },
      { type: "heading", text: "Don't gold-plate the MVP" },
      {
        type: "paragraph",
        text: "Security maturity is a journey. An MVP needs solid fundamentals, not a SOC 2 binder. Get auth, tenant isolation, input validation, and secrets right, ship, and layer on additional controls as you grow and as real risk demands.",
      },
      { type: "heading", text: "The takeaway" },
      {
        type: "paragraph",
        text: "A secure MVP is mostly about getting a handful of fundamentals right from the start. Do that, and you launch with confidence, and without the painful rewrite that catches teams who treated security as a later problem.",
      },
    ],
  },
  {
    slug: "senior-led-vs-agency-model",
    title: "Why Senior-Led Engineering Beats the Big-Agency Model",
    excerpt:
      "More people does not mean more progress. Why a small, senior team often out-delivers a large agency, and how to tell which one you're really hiring.",
    metaDescription:
      "Why senior-led engineering often beats the big-agency model: less coordination overhead, direct access to builders, and accountability that doesn't get diluted.",
    date: "2026-04-03",
    readingMinutes: 5,
    tag: "Engineering",
    image: "/industries/education.jpg",
    imageAlt: "Senior engineers collaborating",
    body: [
      {
        type: "paragraph",
        text: "There is a comforting assumption that a bigger team means a safer project. In software, the opposite is often true. Every extra person adds communication overhead, and beyond a point that overhead grows faster than the output. A small, senior team can move faster precisely because there is less to coordinate.",
      },
      { type: "heading", text: "You talk to the people doing the work" },
      {
        type: "paragraph",
        text: "In the agency model your project is often sold by one team, planned by another, and built by whoever is available, frequently the most junior people on the bench. Senior-led delivery means the people designing your product are the people building it. Context is not lost in a handoff because there is no handoff.",
      },
      { type: "heading", text: "Less coordination, more building" },
      {
        type: "paragraph",
        text: "Large teams spend a surprising share of their time keeping themselves aligned: status meetings, handovers, and documents written for other team members rather than for your product. A focused team spends that time building, and the difference compounds week over week.",
      },
      {
        type: "list",
        items: [
          "Direct access to the engineers, not an account manager",
          "Decisions made by people with full context",
          "Accountability that isn't diluted across a large org",
          "A short project list, so yours gets real attention",
        ],
      },
      { type: "heading", text: "How to tell what you're hiring" },
      {
        type: "paragraph",
        text: "Ask one question: who, specifically, will build this, and will I talk to them directly? If the answer is vague, you are likely buying coordination overhead. If you can name the people and reach them, you are buying focus.",
      },
      { type: "heading", text: "The takeaway" },
      {
        type: "paragraph",
        text: "Senior-led isn't about being small for its own sake. It is about keeping the people, the context, and the accountability in one place, which is exactly how good software gets built.",
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export const blogSlugs = blogPosts.map((p) => p.slug);

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
