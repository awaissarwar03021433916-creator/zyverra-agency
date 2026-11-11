import PageShell from "@/components/marketing/pages/PageShell";
import CookiePolicyPage from "@/components/marketing/pages/CookiePolicyPage";
import { routes } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie Policy | Zyverra Labs",
  description:
    "The cookies on zyverralabs.com: strictly necessary storage, cookieless statistics you can opt out of, and marketing cookies that need your consent.",
  path: routes.cookies,
});

export default function Page() {
  return (
    <PageShell breadcrumbs={[{ name: "Cookie Policy", path: routes.cookies }]}>
      <CookiePolicyPage />
    </PageShell>
  );
}
