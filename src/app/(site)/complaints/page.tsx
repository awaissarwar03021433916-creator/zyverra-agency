import PageShell from "@/components/marketing/pages/PageShell";
import { PageHero } from "@/components/marketing/pages/PageHero";
import { Section } from "@/components/marketing/blocks";
import { business } from "@/config/business";
import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

const PATH = routes.complaints;

export const metadata = pageMetadata({
  title: "Complaints | Zyverra Labs",
  description:
    "How to raise a data-protection complaint with Zyverra Labs, what happens next and how long it takes, and how to complain to the ICO.",
  path: PATH,
});

const link = "font-semibold text-primary underline-offset-4 hover:underline";

export default function Page() {
  return (
    <PageShell breadcrumbs={[{ name: "Complaints", path: PATH }]}>
      <PageHero
        eyebrow="Legal"
        title="Complaints"
        description="How to raise a data-protection complaint with us, and what happens next."
      />

      <Section narrow>
        <div className="prose-zyverra space-y-10 text-base text-muted-foreground">
          <section aria-labelledby="how">
            <h2 id="how" className="font-heading text-2xl font-bold tracking-tight text-foreground">
              How to complain to us
            </h2>
            <p className="mt-4">
              If you are unhappy with how Zyverra Labs has collected, used or protected your personal data, email{" "}
              <a href={`mailto:${business.email}?subject=Data%20protection%20complaint`} className={link}>
                {business.email}
              </a>{" "}
              with the subject line &ldquo;Data protection complaint&rdquo;. Please include:
            </p>
            <ul className="mt-3 ml-5 list-disc space-y-2">
              <li>your name and the email address or phone number you used with us;</li>
              <li>what happened, and roughly when;</li>
              <li>what you would like us to do to put it right.</li>
            </ul>
          </section>

          <section aria-labelledby="next">
            <h2 id="next" className="font-heading text-2xl font-bold tracking-tight text-foreground">
              What happens next
            </h2>
            <ol className="mt-4 ml-5 list-decimal space-y-2">
              <li>We acknowledge your complaint within 30 days of receiving it.</li>
              <li>We look into it, and may ask you for more information to confirm your identity or the details.</li>
              <li>
                We tell you the outcome and any action we have taken, without undue delay. If it will take longer,
                we will tell you why and keep you updated.
              </li>
            </ol>
            {/* TODO [CONFIRM]: these timescales match the Data (Use and Access) Act 2025 complaints duty (acknowledge within 30 days). Confirm you can meet them. */}
          </section>

          <section aria-labelledby="ico">
            <h2 id="ico" className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Complaining to the ICO
            </h2>
            <p className="mt-4">
              You also have the right to complain to the UK Information Commissioner&rsquo;s Office (ICO), the
              regulator for data protection. The ICO normally expects you to raise the issue with us first. You can
              contact the ICO at{" "}
              <a href="https://ico.org.uk/make-a-complaint/" target="_blank" rel="noopener noreferrer" className={link}>
                ico.org.uk/make-a-complaint
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="more">
            <h2 id="more" className="font-heading text-2xl font-bold tracking-tight text-foreground">
              More information
            </h2>
            <p className="mt-4">
              Our <a href={routes.privacy} className={link}>Privacy Policy</a> explains what we collect and your
              rights, and our <a href={routes.cookies} className={link}>Cookie Policy</a> explains the cookies on
              this site. For anything else, see our <a href={routes.contact} className={link}>contact page</a>.
            </p>
          </section>
        </div>
      </Section>
    </PageShell>
  );
}
