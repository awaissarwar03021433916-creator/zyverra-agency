// Single source of truth for the founder's identity and public profiles.
// Everything that renders a social link — the founder section, the footer
// dictionaries' Connect column, and the Person/Organization JSON-LD — reads
// from here, so a profile URL is only ever changed in one place.

import { business } from "./business";

export const founder = {
  name: "Muhammad Awais",
  role: "Founder & CEO",
  company: "Zyverra Labs",
  email: business.email,
  location: `${business.address.city}, ${business.address.countryName}`,
  // Portrait lives in public/portfolio/. Dimensions are intrinsic to the file
  // and are passed to next/image to reserve layout space.
  image: "/portfolio/awais.jpg",
  imageAlt: "Muhammad Awais, Founder and CEO of Zyverra Labs",
} as const;

export const founderSocials = {
  linkedin: "https://www.linkedin.com/in/awaissarwar898/",
  github: "https://github.com/awaissarwar03021433916-creator",
  instagram: "https://www.instagram.com/zyverralabs/",
  facebook: "https://www.facebook.com/profile.php?id=100072383062556",
} as const;

// Ordered list used by the footer and the founder section. Kept in one array so
// the order stays consistent wherever the profiles are displayed.
export const founderSocialLinks = [
  { key: "linkedin", label: "LinkedIn", href: founderSocials.linkedin },
  { key: "github", label: "GitHub", href: founderSocials.github },
  { key: "instagram", label: "Instagram", href: founderSocials.instagram },
  { key: "facebook", label: "Facebook", href: founderSocials.facebook },
] as const;

// Footer "Connect" column. Platform names are brand nouns, so the same list is
// used for every locale — importing it keeps all six dictionaries in sync with
// the URLs above instead of repeating them.
export const socialNavLinks: { label: string; href: string }[] = founderSocialLinks.map(
  ({ label, href }) => ({ label, href })
);

// Profile URLs for schema.org `sameAs`, which is how search engines connect the
// site to the same entity's other public profiles.
export const sameAsProfiles: string[] = founderSocialLinks.map((link) => link.href);
