import { LandingPage } from "@/components/marketing/LandingPage";
import { redesignPage as content } from "@/data/landing";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Clinic Website Redesign UK | Zyverra Labs",
  description:
    "Clinic website redesign UK: move from Wix or an old site to a fast custom website without losing Google rankings. From £300, live in 7–10 days. Ask us.",
  path: content.path,
});

export default function Page() {
  return <LandingPage content={content} />;
}
