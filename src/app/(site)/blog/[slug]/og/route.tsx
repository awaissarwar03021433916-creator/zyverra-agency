import { ImageResponse } from "next/og";

import { blogSlugs, getPost, listingTitle } from "@/data/blog";

// Per-post Open Graph image (1200×630) at a stable URL: /blog/<slug>/og.
// A route handler (rather than the opengraph-image file convention, which
// appends a build hash) so the same URL can be used in og:image, twitter:image
// and the BlogPosting JSON-LD.
const size = { width: 1200, height: 630 };

export const dynamic = "force-static";

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post ? listingTitle(post) : "Zyverra Labs blog";
  const category = post?.category ?? "Guides";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #062746 0%, #0a5aa0 55%, #007acc 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.15)",
              fontSize: 26,
              fontWeight: 600,
            }}
          >
            {category}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: title.length > 70 ? 54 : 64, fontWeight: 700, lineHeight: 1.12, maxWidth: "1000px" }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
          <div style={{ display: "flex", fontWeight: 700 }}>Zyverra Labs</div>
          <div style={{ display: "flex", opacity: 0.85 }}>Websites & marketing for UK aesthetics clinics</div>
        </div>
      </div>
    ),
    size
  );
}
