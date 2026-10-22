export type Sector = {
  slug: string;
  title: string;
  summary: string;
  scope: string[];
  image: string;
};

export const sectors: Sector[] = [
  {
    slug: "residential",
    title: "Residential",
    summary:
      "Villas, apartments and penthouses designed around the way you live, from first sketch to furnished handover.",
    scope: ["Villas", "Apartments", "Penthouses"],
    image: "/images/sectors/residential.jpg",
  },
  {
    slug: "commercial",
    title: "Commercial",
    summary:
      "Offices, showrooms and retail spaces planned for flow, built to specification and delivered on schedule.",
    scope: ["Offices", "Retail", "Showrooms"],
    image: "/images/sectors/commercial.jpg",
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    summary:
      "Restaurants, cafés, lounges and hotel interiors with character, comfort and durability built in.",
    scope: ["Restaurants", "Cafés", "Hotels"],
    image: "/images/sectors/hospitality.jpg",
  },
];