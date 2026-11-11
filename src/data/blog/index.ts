import type { BlogBlock, BlogPost } from "./types";
import { websiteCostPost } from "./posts/aesthetic-clinic-website-cost-uk";
import { advertisingRulesPost } from "./posts/botox-advertising-rules-clinic-website";
import { aiSearchPost } from "./posts/get-clinic-recommended-by-chatgpt";
import { softwarePosts } from "./posts/software";

export type { BlogBlock, BlogPost, BlogCategory } from "./types";

// Clinic guides first; posts 4–16 of the content plan live in
// content/blog/_planned.md and get no placeholder pages.
export const blogPosts: BlogPost[] = [
  websiteCostPost,
  advertisingRulesPost,
  aiSearchPost,
  ...softwarePosts,
];

export function getAllPosts(): BlogPost[] {
  // Newest first; ties keep their declared order (clinic guides lead).
  return blogPosts
    .map((post, index) => ({ post, index }))
    .sort((a, b) => b.post.date.localeCompare(a.post.date) || a.index - b.index)
    .map(({ post }) => post);
}

/** The title to show when the post is listed anywhere other than its own page. */
export function listingTitle(post: BlogPost): string {
  return post.listingTitle ?? post.title;
}

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export const blogSlugs = blogPosts.map((p) => p.slug);

/** "11 November 2026" — UK date style. */
export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

function blockText(block: BlogBlock): string {
  switch (block.type) {
    case "list":
    case "ordered":
    case "checklist":
      return block.items.join(" ");
    case "cta":
      return `${block.title} ${block.text}`;
    default:
      return block.text;
  }
}

/** Reading time at ~220 words per minute, minimum one minute. */
export function readingMinutes(post: BlogPost): number {
  const words = post.body
    .map(blockText)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Stable, URL-safe id for a heading (used by the table of contents). */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[“”"'’‘]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function tableOfContents(post: BlogPost): { id: string; text: string }[] {
  return post.body
    .filter((b): b is Extract<BlogBlock, { type: "heading" }> => b.type === "heading")
    .map((b) => ({ id: headingId(b.text), text: b.text }));
}

/** Three related posts: same category first, then the most recent others. */
export function relatedPosts(post: BlogPost, count = 3): BlogPost[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const same = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...same, ...rest].slice(0, count);
}
