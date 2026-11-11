import { LandingPage } from "@/components/marketing/LandingPage";
import { googleBusinessProfilePage as content } from "@/data/landing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Google Business Profile for Aesthetic Clinics | Zyverra",
  description:
    "Google Business Profile for aesthetic clinics: set-up, posts, photos and reviews to climb Google Maps. Included in Local SEO from £300/month. Book a call.",
  path: content.path,
});

export default function Page() {
  return <LandingPage content={content} />;
}
