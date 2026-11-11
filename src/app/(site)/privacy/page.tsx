import PageShell from "@/components/marketing/pages/PageShell";
import PrivacyPolicyPage from "@/components/marketing/pages/PrivacyPolicyPage";
import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy | Zyverra Labs",
  description:
    "How Zyverra Labs collects, uses and protects personal data under UK GDPR: what we collect, why, who processes it, your rights and how to complain.",
  path: routes.privacy,
});

export default function Page() {
  return (
    <PageShell breadcrumbs={[{ name: "Privacy Policy", path: routes.privacy }]}>
      <PrivacyPolicyPage />
    </PageShell>
  );
}
