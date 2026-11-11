#!/usr/bin/env node
// IndexNow submitter (Section G8). Tells Bing (and other IndexNow engines)
// about new or changed URLs so they are re-crawled quickly.
//
// Usage (after a deploy or a new blog post):
//   npm run indexnow                          # submits every URL in the live sitemap
//   npm run indexnow -- /pricing /blog/slug   # submits only these paths
//
// The key is served at https://www.zyverralabs.com/<key>.txt from /public.

const KEY = "a9b54336c146d11a54d12d9121ca08dc";
const ORIGIN = (process.env.APP_URL || "https://www.zyverralabs.com").replace(/\/$/, "");
const HOST = new URL(ORIGIN).host;

async function urlsFromSitemap() {
  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`Could not fetch sitemap: HTTP ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  const args = process.argv.slice(2);
  const urlList = args.length ? args.map((p) => (p.startsWith("http") ? p : `${ORIGIN}${p}`)) : await urlsFromSitemap();

  if (urlList.length === 0) {
    console.log("No URLs to submit.");
    return;
  }

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
  });

  // 200 = submitted, 202 = accepted (key validation pending).
  console.log(`IndexNow: HTTP ${res.status} for ${urlList.length} URL(s).`);
  if (res.status >= 400) {
    console.error(await res.text());
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
