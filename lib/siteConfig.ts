export const siteConfig = {
  name: "Afaq Al Manzel Interiors",
    url: "https://www.afaqalmanzel.com", // PLACEHOLDER — confirm the real domain
  shortName: "Afaq Al Manzel",
  phone: { display: "+971 4 000 0000", href: "tel:+97140000000" }, // PLACEHOLDER
  whatsapp: "971500000000", // PLACEHOLDER — digits only, no +
  email: "info@afaqalmanzel.com", // PLACEHOLDER
  address: "Business Bay, Dubai, United Arab Emirates", // PLACEHOLDER
  serviceAreas: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"],
   showreelYoutubeId: "FvNC2ch7u0E",
     hours: "Monday – Saturday, 9:00 – 18:00", // PLACEHOLDER
  socials: [
    { label: "Instagram", href: "https://instagram.com/" }, // PLACEHOLDER URLs
    { label: "LinkedIn", href: "https://linkedin.com/company/" },
    { label: "Facebook", href: "https://facebook.com/" },
    { label: "Pinterest", href: "https://pinterest.com/" },
  ],
    addressParts: {
    street: "Office 000, Business Bay", // PLACEHOLDER
    locality: "Dubai",
    country: "AE",
  },
  map: {
    // PLACEHOLDER — in Google Maps: Share → Embed a map → copy the src URL
    embed: "https://www.google.com/maps?q=Business+Bay,+Dubai&output=embed",
    directions: "https://www.google.com/maps/dir/?api=1&destination=Business+Bay,+Dubai",
  },
  openingHours: ["Mo-Sa 09:00-18:00"], // schema.org format, matches `hours`
} as const;