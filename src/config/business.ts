// Single source of truth for the business NAP (Name, Address, Phone) and the
// commercial facts the site repeats everywhere (prices, timeline, payment
// plans). Schema, metadata, llms.txt, the footer and page copy all read from
// here so the details never drift apart.
//
// No UK street address is listed on purpose: the business operates from
// Lahore and serves UK clinics remotely. Never add a virtual UK address.

export const business = {
  name: "Zyverra Labs",
  email: "hello@zyverralabs.com",
  // E.164 for schema/tel: links, and a human-readable form for display.
  phone: "+923024258017",
  phoneDisplay: "+92 302 4258017",
  whatsappNumber: "923024258017",
  address: {
    street: "",
    city: "Lahore",
    region: "Punjab",
    postalCode: "",
    country: "PK",
    countryName: "Pakistan",
  },
  geo: { latitude: 31.5204, longitude: 74.3587 },
  areaServed: "United Kingdom",
} as const;

export const businessLocality = `${business.address.city}, ${business.address.countryName}`;

// Commercial facts. Change a price here and every page, table, FAQ answer and
// JSON-LD Offer updates with it.
export const pricing = {
  optionA: {
    name: "Option A",
    label: "Website with admin dashboard",
    price: 400,
  },
  optionB: {
    name: "Option B",
    label: "Website without admin dashboard",
    price: 300,
  },
  // TODO [CONFIRM]: "from receipt of content" — the timeline is stated as
  // working days once the clinic's logo, treatment list, prices and photos arrive.
  timeline: "7–10 working days",
  paymentPlans: ["50/50", "30/40/30"],
} as const;

export const whatsappMessage =
  "Hi Zyverra Labs, I run a clinic in the UK and I'd like to talk about a new website/marketing. My clinic is: ";

export function whatsappHref(message: string = whatsappMessage): string {
  return `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
