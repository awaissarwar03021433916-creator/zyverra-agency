// Shared FAQ content so the visible FAQ and the FAQPage JSON-LD stay identical
// (Google requires the structured data to match the on-page text).

export type Faq = { q: string; a: string };

export const howWeDeliverFaqs: Faq[] = [
  {
    q: "How quickly can we start?",
    a: "Because we keep our project list short, we can usually begin a discovery within one to two weeks. We will always tell you our honest availability up front.",
  },
  {
    q: "Who actually builds the product?",
    a: "The same engineer who designs and plans it. There is no handoff to a junior bench, you work directly with the founder writing the code.",
  },
  {
    q: "What if the scope changes mid-project?",
    a: "Scope changes are normal. We flag the impact on time and cost early and decide together, so there are no surprises at the end.",
  },
  {
    q: "Do you work after launch?",
    a: "Yes. We offer ongoing support and improvement, and we hand over clean code and documentation either way, so you are never locked in.",
  },
];

export const whyUsFaqs: Faq[] = [
  {
    q: "Are you not too small for a serious project?",
    a: "Small and senior is a feature, not a risk. A founder-led setup has less coordination overhead and more accountability, which is exactly why we can out-deliver much larger groups on the work that matters.",
  },
  {
    q: "How do I know the quality will hold up?",
    a: "We build on proven, typed architecture with security and testing treated as features. You see working software every week, so quality is something you can watch, not just take on trust.",
  },
  {
    q: "What if we need to scale the product later?",
    a: "We design for growth from the start, clean data models, secure APIs, and maintainable code, so scaling is an extension of what exists, not a rewrite.",
  },
];
