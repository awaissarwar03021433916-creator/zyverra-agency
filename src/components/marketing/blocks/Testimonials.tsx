import { ArrowUpRight } from "lucide-react";

import { Section, SectionHeading } from "@/components/marketing/blocks";
import { ExpandableQuote } from "@/components/marketing/blocks/ExpandableQuote";
import { TestimonialDeck } from "@/components/marketing/blocks/TestimonialDeck";
import type { Testimonial } from "@/data/testimonials";

function Stars() {
  return (
    <span role="img" aria-label="5 out of 5 stars" className="stars-shimmer relative inline-flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} aria-hidden viewBox="0 0 20 20" className="h-[18px] w-[18px] fill-current">
          <path d="M10 1.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.8l-5.2 2.7 1-5.8L1.6 7.6l5.8-.8L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl motion-reduce:hover:translate-y-0 max-md:shadow-md sm:p-7">
      <Stars />
      <ExpandableQuote id={`testimonial-${t.id}`}>
        <blockquote className="mt-4 space-y-3 text-[0.9375rem] leading-[1.7] text-foreground/90">
          {t.text.split("\n\n").map((p, j) => (
            <p key={j}>{p}</p>
          ))}
        </blockquote>
      </ExpandableQuote>
      <div aria-hidden className="min-h-5 flex-1" />
      <figcaption className="flex flex-wrap items-end justify-between gap-x-3 gap-y-2 border-t border-border pt-4">
        <span className="text-sm">
          <span className="block font-heading font-semibold text-foreground">{t.name}</span>
          <span className="text-muted-foreground">{t.clinic}</span>
        </span>
        <a
          href={t.website}
          target="_blank"
          rel="noopener"
          className="group/link inline-flex shrink-0 items-center gap-1 rounded-md text-xs font-semibold text-primary hover:underline"
        >
          View their website
          <span className="sr-only"> (opens in a new tab)</span>
          <ArrowUpRight
            aria-hidden
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          />
        </a>
      </figcaption>
    </figure>
  );
}

export function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <Section id="testimonials" tone="tint">
      <SectionHeading
        eyebrow="Testimonials"
        title="What our clients say"
        description="Real words from real UK clinics we've worked with."
      />
      <TestimonialDeck
        cards={items.map((t) => (
          <Card key={t.id} t={t} />
        ))}
        labels={items.map((t) => t.name)}
      />
    </Section>
  );
}
