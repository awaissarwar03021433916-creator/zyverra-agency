import { prisma } from "@/lib/prisma";

/**
 * Knowledge Base retrieval (Phase 6) — simple, reliable keyword search.
 *
 * Finds the articles most relevant to the user's latest message and returns a
 * compact context block to inject ahead of the conversation, so the chatbot
 * prefers authoritative company knowledge over general AI knowledge. Returns
 * null when nothing relevant matches, so the bot falls back to normal behavior.
 *
 * Deliberately keyword-based (no embeddings) for reliability and zero extra API
 * cost; the schema is ready to upgrade to vector search later.
 */

const STOPWORDS = new Set([
  "the", "a", "an", "and", "or", "but", "for", "to", "of", "in", "on", "at",
  "is", "are", "was", "do", "does", "did", "i", "you", "we", "my", "our", "your",
  "with", "can", "could", "how", "what", "when", "where", "why", "it", "this",
  "that", "need", "want", "have", "get", "me", "us", "about", "please", "would",
]);

const MAX_ARTICLES = 3;
const MAX_CHARS_PER_ARTICLE = 700;
const CANDIDATE_LIMIT = 20;

function keywords(query: string): string[] {
  return Array.from(
    new Set(
      query
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length >= 3 && !STOPWORDS.has(w))
    )
  ).slice(0, 12);
}

function clip(text: string, max: number): string {
  const t = text.trim();
  return t.length <= max ? t : `${t.slice(0, max - 1).trimEnd()}…`;
}

/**
 * Search the knowledge base for the user's query. Returns a system-message
 * context block, or null if there is nothing relevant. Never throws.
 */
export async function searchKnowledge(query: string): Promise<string | null> {
  const words = keywords(query);
  if (words.length === 0) return null;

  try {
    const candidates = await prisma.knowledgeArticle.findMany({
      where: {
        // Only PUBLISHED articles ground the chatbot — drafts are never used.
        status: "PUBLISHED",
        OR: words.flatMap((w) => [
          { title: { contains: w, mode: "insensitive" as const } },
          { content: { contains: w, mode: "insensitive" as const } },
          { category: { contains: w, mode: "insensitive" as const } },
        ]),
      },
      take: CANDIDATE_LIMIT,
      orderBy: { updatedAt: "desc" },
    });

    if (candidates.length === 0) return null;

    // Rank by weighted keyword hits: title > category > content.
    const scored = candidates
      .map((a) => {
        const title = a.title.toLowerCase();
        const category = (a.category ?? "").toLowerCase();
        const content = a.content.toLowerCase();
        let score = 0;
        for (const w of words) {
          if (title.includes(w)) score += 3;
          if (category.includes(w)) score += 2;
          if (content.includes(w)) score += 1;
        }
        return { article: a, score };
      })
      .filter((x) => x.score > 0)
      .sort((x, y) => y.score - x.score)
      .slice(0, MAX_ARTICLES);

    if (scored.length === 0) return null;

    const blocks = scored.map(({ article }) => {
      const heading = article.category ? `${article.title} (${article.category})` : article.title;
      return `# ${heading}\n${clip(article.content, MAX_CHARS_PER_ARTICLE)}`;
    });

    return [
      "ZYVERRA KNOWLEDGE BASE — authoritative company information. Prefer this over general knowledge when it is relevant, and never contradict it. If it does not cover the question, answer normally without inventing specifics:",
      ...blocks,
    ].join("\n\n");
  } catch (err) {
    console.error("knowledge_search_error", err);
    return null;
  }
}
