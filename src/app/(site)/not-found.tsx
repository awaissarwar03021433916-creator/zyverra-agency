import type { Metadata } from "next";

import PageShell from "@/components/marketing/pages/PageShell";
import { NotFoundContent } from "@/components/marketing/pages/NotFoundContent";

export const metadata: Metadata = {
  title: { absolute: "Page not found | Zyverra Labs" },
  robots: { index: false, follow: true },
};

// Rendered when a page inside the site calls notFound() (e.g. an unknown blog slug).
export default function NotFound() {
  return (
    <PageShell>
      <NotFoundContent />
    </PageShell>
  );
}
