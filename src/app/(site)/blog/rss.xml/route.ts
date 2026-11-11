import { routes } from "@/config/site";
import { founder } from "@/config/founder";
import { getAllPosts, listingTitle } from "@/data/blog";
import { siteOrigin } from "@/lib/schema";

// RSS 2.0 feed for the blog, generated at build time.
export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const rfc822 = (iso: string) => new Date(`${iso}T09:00:00Z`).toUTCString();

export function GET() {
  const origin = siteOrigin();
  const posts = getAllPosts();

  const items = posts
    .map((p) => {
      const url = `${origin}${routes.blog}/${p.slug}`;
      return `    <item>
      <title>${escapeXml(listingTitle(p))}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(p.excerpt)}</description>
      <category>${escapeXml(p.category)}</category>
      <dc:creator>${escapeXml(founder.name)}</dc:creator>
      <pubDate>${rfc822(p.date)}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Zyverra Labs blog</title>
    <link>${origin}${routes.blog}</link>
    <description>Practical guides for UK aesthetics clinic owners on websites, local SEO, AI search, Meta ads and advertising compliance.</description>
    <language>en-GB</language>
    <atom:link href="${origin}${routes.blog}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${posts[0] ? rfc822(posts[0].updated) : new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
