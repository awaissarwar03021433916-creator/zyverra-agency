# Off-site SEO and AI-visibility checklist (for the owner)

These actions happen outside the codebase. They build the "prominence" and
brand mentions that Google, Bing and AI assistants use to judge which
businesses to show and cite. Tick them off and add the profile URLs to
`sameAsProfiles` in `src/config/founder.ts` as they go live.

Use the **same description** everywhere:

> Zyverra Labs builds websites with a built-in admin dashboard, local SEO, AI
> search visibility and Meta ads for UK aesthetics clinics, aesthetic nurses,
> med spas and beauty salons.

and the same prices: websites £300 (Option A with dashboard £400), live in
7–10 working days; Meta ads from £350/month; SEO from £300/month; social
from £300/month.

## 1. Directory and agency profiles

- [ ] **Clutch** (clutch.co) — company profile, services, £ pricing, portfolio
      (Belgrave Cosmetics, Penelope J Aesthetics, Serra Aesthetics).
- [ ] **GoodFirms** (goodfirms.co)
- [ ] **DesignRush** (designrush.com)
- [ ] **Sortlist** (sortlist.co.uk)
- [ ] **Facebook Page** for the business (not a personal profile).
- [ ] Add each live URL to `sameAsProfiles` in `src/config/founder.ts`.

## 2. Client sites

- [ ] Ask each client to keep a footer credit "Website by Zyverra Labs" linking
      to https://www.zyverralabs.com/aesthetic-clinic-website-design
      (Belgrave and Serra already credit Zyverra Labs; check the link target).
- [ ] Ask each client for a Google review and a Clutch review. Never offer an
      incentive. Once you have **written permission** to quote a client, send
      the exact wording and we'll add a /testimonials page.
- [ ] Fix on belgravecosmetics.co.uk: remove "Botox" from public homepage copy;
      correct "Banbury" to Bristol on the contact page.

## 3. Content distribution

- [ ] Share every new blog post on LinkedIn (personal + company page) with a
      2–3 line summary and the link.
- [ ] Record 2 short YouTube videos:
  - [ ] Admin dashboard walkthrough ("Changing a treatment price in 30 seconds")
  - [ ] "How much does a clinic website cost in the UK?"
  - [ ] Send the video URLs so they can be embedded on
        /clinic-website-admin-dashboard and /pricing with VideoObject schema.
- [ ] Pitch guest articles or expert quotes to UK aesthetics trade publications
      (e.g. on ASA-safe websites, AI search for clinics). Only claim what you
      can show.

## 4. Search engines

- [ ] Verify the site in Google Search Console and Bing Webmaster Tools; add the
      tokens as `NEXT_PUBLIC_GSC_VERIFICATION` and `NEXT_PUBLIC_BING_VERIFICATION`
      in Vercel.
- [ ] Submit `https://www.zyverralabs.com/sitemap.xml` in both.
- [ ] Set `APP_URL=https://www.zyverralabs.com` in Vercel and enable Vercel Web
      Analytics.

## 5. Don't

- Don't create a Google Business Profile with a fake or virtual UK address.
- Don't buy reviews, swap reviews or post reviews from staff or family.
- Don't publish testimonials without written permission.
- Don't pay for spammy "best agencies" listicles.
