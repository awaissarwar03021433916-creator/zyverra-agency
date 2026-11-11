import { LandingPage } from "@/components/marketing/LandingPage";
import { nurseWebsitesPage as content } from "@/data/landing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Website for Aesthetic Nurses & Practitioners | Zyverra",
  description:
    "A website for aesthetic nurses and nurse prescribers: treatments, prices, booking and a dashboard to update it. From £300, live in 7–10 days. Get a quote.",
  path: content.path,
});

export default function Page() {
  return <LandingPage content={content} />;
}
