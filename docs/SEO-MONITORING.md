# SEO and AI-visibility monitoring — monthly routine

Do this on the first working day of each month. It takes about an hour.
Record results in a spreadsheet (one row per month) so trends are visible.

## 1. Google Search Console (20 minutes)

https://search.google.com/search-console — property: `https://www.zyverralabs.com`

1. **Performance → Search results**, last 28 days vs previous period:
   - Total clicks, impressions, average position.
   - **Queries** tab: top 20 queries. Note new queries containing
     "aesthetic", "clinic", "salon", "nurse", "website", "SEO", "Meta ads".
   - **Pages** tab: top 20 pages. Note pages gaining or losing impressions.
2. **Indexing → Pages**: any new "Not indexed" reasons? Fix 404s and
   "Crawled – currently not indexed" on important pages.
3. **Sitemaps**: `sitemap.xml` status "Success" and discovered URL count
   matches the site.
4. **Experience → Core Web Vitals** (mobile): LCP ≤ 2.5s, INP ≤ 200ms,
   CLS ≤ 0.1. Note any "Poor" or "Needs improvement" URL groups.
5. **Enhancements**: Breadcrumbs, FAQ and other structured-data reports —
   0 errors.

## 2. Bing Webmaster Tools (10 minutes)

https://www.bing.com/webmasters — same property.

1. Search performance: clicks, impressions, top queries and pages.
2. Sitemaps: processed without errors.
3. URL inspection on any new page published this month.
4. IndexNow: confirm submissions appear (the GitHub workflow
   `.github/workflows/indexnow.yml` pings after every production deploy;
   run `npm run indexnow` manually after publishing a post if needed).

## 3. PageSpeed Insights spot check (5 minutes)

https://pagespeed.web.dev — test mobile for: `/`, `/pricing`,
`/aesthetic-clinic-website-design`, and the newest blog post. Use the
**field data** (top of the report) where available; that's what Google uses.

## 4. AI assistant visibility (25 minutes)

Test each prompt below in **ChatGPT (with search)**, **Perplexity**,
**Gemini** and **Google AI Mode / AI Overviews**. Use a logged-out or
private session where possible, and set location to the UK.

For each prompt × assistant, record:
- Mentioned? (Y/N)
- Position in the answer (1st, 2nd, … or "sources only")
- Which zyverralabs.com URL was cited (if any)
- Which competitors / sources were cited instead

### The 15 fixed prompts

1. website designer for aesthetics clinic UK
2. who builds aesthetics clinic websites I can update myself
3. best agency for aesthetic clinic websites UK
4. how much does an aesthetic clinic website cost UK
5. aesthetic clinic website with admin dashboard
6. website for an aesthetic nurse UK
7. beauty salon website design UK
8. how do I get my aesthetics clinic recommended by ChatGPT
9. SEO for aesthetic clinics UK
10. Facebook ads agency for aesthetic clinics UK
11. what should an aesthetic clinic website include
12. Wix or custom website for an aesthetics clinic
13. aesthetic clinic website design London
14. aesthetic clinic website design Bristol
15. can I say Botox on my clinic website UK

Do not change the prompts month to month; consistency is what makes the
results comparable. Add new prompts at the end only if needed.

## 5. Actions (from the findings)

- A query with high impressions and low clicks → improve that page's title
  and meta description.
- A prompt where competitors are cited but Zyverra isn't → check what the
  cited pages have that ours don't (direct answer, table, sources, reviews).
- A page losing impressions → refresh content, update "Updated" date only
  when the content genuinely changes.
- Any structured-data errors → fix and validate at https://validator.schema.org
  and https://search.google.com/test/rich-results.

## Analytics events (consent-aware)

Defined in `src/lib/analytics.ts` and fired via `track()`:

| Event | Where |
|---|---|
| `whatsapp_click` | Floating and inline WhatsApp buttons |
| `audit_form_submit` | /free-clinic-website-audit form |
| `quote_form_submit` | /contact enquiry form |
| `pricing_view` (param `option`: A/B) | /pricing option cards |
| `book_call_click`, `email_click` | /contact cards |

Statistics (Vercel Web Analytics) run unless the visitor opts out; GA4 and the
Meta Pixel only load after "Accept".
