export type HeroSlide = {
  eyebrow: string;
  title: string[]; // one entry per visual line
  description: string;
  image: string;
  alt: string;
};

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: "Residential Interiors",
    title: ["Homes shaped around", "how you live."],
    description:
      "Villas, apartments and penthouses across Dubai, designed, built and furnished by one coordinated team.",
    image: "/images/hero/residential.jpg",
    alt: "Warm contemporary living room with timber slat walls and soft lighting",
  },
  {
    eyebrow: "Commercial Spaces",
    title: ["Workplaces built", "to perform."],
    description:
      "Offices and retail fit-outs planned for flow, built to specification and handed over on schedule.",
    image: "/images/hero/commercial.jpg",
    alt: "Modern office reception with stone counter and pendant lights",
  },
  {
    eyebrow: "Hospitality",
    title: ["Spaces guests", "remember."],
    description:
      "Restaurants, lounges and hotel interiors with character, comfort and durability built in.",
    image: "/images/hero/hospitality.jpg",
    alt: "Elegant restaurant interior with banquette seating and warm ambient light",
  },
  {
    eyebrow: "Turnkey Delivery",
    title: ["One team.", "Concept to keys."],
    description:
      "Design, technical drawings, MEP, fit-out and furnishing, managed end to end so you deal with one partner.",
    image: "/images/hero/turnkey.jpg",
    alt: "Completed luxury villa interior ready for handover",
  },
];