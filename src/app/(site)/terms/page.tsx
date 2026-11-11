import PageShell from "@/components/marketing/pages/PageShell";
import TermsPage from "@/components/marketing/pages/TermsPage";
import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms & Conditions | Zyverra Labs",
  description:
    "The terms that apply when you use zyverralabs.com or work with Zyverra Labs: services, payments, intellectual property, liability and governing law.",
  path: routes.terms,
});

export default function Page() {
  return (
    <PageShell breadcrumbs={[{ name: "Terms & Conditions", path: routes.terms }]}>
      <TermsPage />
    </PageShell>
  );
}
