import PageShell from "@/components/marketing/pages/PageShell";
import { PageHero } from "@/components/marketing/pages/PageHero";
import { Section } from "@/components/marketing/blocks";
import { business } from "@/config/business";
import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Accessibility Statement | Zyverra Labs",
  description:
    "Our accessibility statement: we aim for WCAG 2.1 AA, what we've done so far, known limitations and how to report an accessibility problem to us.",
  path: routes.accessibility,
});

const STATEMENT_DATE = "11 November 2026";
const link = "font-semibold text-primary underline-offset-4 hover:underline";

export default function Page() {
  return (
    <PageShell breadcrumbs={[{ name: "Accessibility", path: routes.accessibility }]}>
      <PageHero
        eyebrow="Accessibility"
        title="Accessibility statement"
        description="We want everyone to be able to use our website, whatever device or assistive technology they use."
      />
      <Section narrow>
        <div className="prose-zyverra space-y-10 text-base text-muted-foreground">
          <section aria-labelledby="aim">
            <h2 id="aim" className="font-heading text-2xl font-bold text-foreground">Our aim</h2>
            <p className="mt-4">
              We aim to meet the{" "}
              <a href="https://www.w3.org/TR/WCAG21/" className={link} target="_blank" rel="noopener noreferrer">
                Web Content Accessibility Guidelines (WCAG) 2.1
              </a>{" "}
              at level AA across zyverralabs.com.
            </p>
          </section>

          <section aria-labelledby="done">
            <h2 id="done" className="font-heading text-2xl font-bold text-foreground">What we&apos;ve done</h2>
            <ul className="mt-4 ml-5 list-disc space-y-2">
              <li>A “Skip to content” link and one main heading per page, with headings in a logical order</li>
              <li>Text and buttons checked for colour contrast</li>
              <li>Menus, FAQs and the cookie banner usable with a keyboard, with visible focus</li>
              <li>Descriptive text for meaningful images; decorative images are hidden from screen readers</li>
              <li>Animation switched off for people who set their device to reduce motion</li>
              <li>Labelled form fields with clear error messages</li>
              <li>Comparison data presented in real tables with headers</li>
            </ul>
          </section>

          <section aria-labelledby="limits">
            <h2 id="limits" className="font-heading text-2xl font-bold text-foreground">Known limitations</h2>
            <p className="mt-4">
              Screenshots of client websites and admin dashboards are images, so text inside them isn&apos;t readable by
              screen readers; each has a description, and the key details are also written on the page. Some
              third-party services we link to, such as booking systems, have their own accessibility.
            </p>
            {/* TODO [CONFIRM]: commission or complete a formal WCAG 2.1 AA audit and update this section with the results. */}
          </section>

          <section aria-labelledby="report">
            <h2 id="report" className="font-heading text-2xl font-bold text-foreground">Report a problem</h2>
            <p className="mt-4">
              If you find something on our website difficult to use, please tell us. Email{" "}
              <a href={`mailto:${business.email}?subject=Accessibility`} className={link}>
                {business.email}
              </a>{" "}
              with the page address and a short description of the problem, and we&apos;ll do our best to fix it or
              provide the information in another format. You can also contact us via our{" "}
              <a href={routes.contact} className={link}>contact page</a>.
            </p>
          </section>

          <p className="text-sm">This statement was prepared on {STATEMENT_DATE}.</p>
        </div>
      </Section>
    </PageShell>
  );
}
