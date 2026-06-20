// Single source of truth for the business NAP (Name, Address, Phone). Used by
// the LocalBusiness schema, location metadata, and on-page contact details so
// everything stays consistent with the Google Business Profile listing.
//
// IMPORTANT: phone and street are intentionally empty — no contact details are
// fabricated. Fill these with verified values before claiming the Google
// Business Profile (NAP must match the GBP listing exactly).
export const business = {
  name: "Zyverra Labs",
  email: "hello.zyverralabs@gmail.com",
  phone: "", // e.g. "+92XXXXXXXXXX" (E.164) once a verified business line exists
  address: {
    street: "", // add a verified office street address when available
    city: "Lahore",
    region: "Punjab",
    postalCode: "",
    country: "PK",
    countryName: "Pakistan",
  },
  // Lahore city-level coordinates. Replace with the exact office location for GBP.
  geo: { latitude: 31.5204, longitude: 74.3587 },
  areaServed: ["Pakistan", "Worldwide"],
} as const;

export const businessLocality = `${business.address.city}, ${business.address.countryName}`;
