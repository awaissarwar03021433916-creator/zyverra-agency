// Single source of truth for the founder's identity and public profiles.
// The about page (#founder), blog author box, footer social links and the
// Person/Organization JSON-LD all read from here, so a name or profile URL is
// only ever changed in one place.

import { business } from "./business";

export const founder = {
  // TODO [CONFIRM]: final public name — "Muhammad Awais" or "Muhammad Awais Sarwar".
  name: "Muhammad Awais",
  role: "Founder & CEO",
  company: "Zyverra Labs",
  email: business.email,
  // 560×560 portrait, a circular crop on a square canvas — always framed as a circle.
  image: "/awais.jpg",
  imageAlt: "Muhammad Awais, founder of Zyverra Labs",
  profilePath: "/about#founder",
} as const;

export const founderSocials = {
  linkedin: "https://www.linkedin.com/in/awaissarwar898/",
  github: "https://github.com/awaissarwar03021433916-creator",
  instagram: "https://www.instagram.com/zyverralabs/",
  // TODO [CONFIRM]: a Facebook *Page* URL. The only known link is a personal
  // profile (profile.php?id=100072383062556), so Facebook is left out of the
  // footer and schema until a business Page exists.
} as const;

// Ordered list used by the footer and the founder section.
export const founderSocialLinks = [
  { key: "linkedin", label: "LinkedIn", href: founderSocials.linkedin },
  { key: "instagram", label: "Instagram", href: founderSocials.instagram },
  { key: "github", label: "GitHub", href: founderSocials.github },
] as const;

// Profile URLs for schema.org `sameAs`. TODO [CONFIRM]: add the Facebook Page,
// Clutch, GoodFirms and DesignRush URLs here once those profiles exist.
export const sameAsProfiles: string[] = founderSocialLinks.map((link) => link.href);
