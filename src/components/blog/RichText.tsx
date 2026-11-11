import Link from "next/link";
import type { ReactNode } from "react";

import { whatsappHref } from "@/config/business";

// Renders the blog's tiny inline markup — **bold**, *italic*, `code`,
// [label](href) — to React nodes. No HTML is ever injected.
const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

export function RichText({ text }: { text: string }): ReactNode {
  const parts = text.split(TOKEN).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      const [, label, href] = link;
      if (href === "whatsapp:") {
        return (
          <a key={i} href={whatsappHref()} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        );
      }
      if (/^https?:\/\//.test(href)) {
        return (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>
        );
      }
      return (
        <Link key={i} href={href}>
          {label}
        </Link>
      );
    }
    return part;
  });
}
