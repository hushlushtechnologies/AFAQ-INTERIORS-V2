export type Project = {
  slug: string;
  title: string;
  sector: "residential" | "commercial" | "hospitality";
  location: string;
  year: number;
  summary: string;
  cover: string;
};

// ⚠️ PLACEHOLDER — replace with the client's real completed projects, photos and details.
export const projects: Project[] = [
  {
    slug: "emirates-hills-villa",
    title: "Emirates Hills Villa",
    sector: "residential",
    location: "Emirates Hills",
    year: 2025,
    summary: "Full interior design, MEP upgrade and furnishing of a six-bedroom family villa.",
    cover: "/images/projects/emirates-hills-villa.jpg",
  },
  {
    slug: "business-bay-headquarters",
    title: "Business Bay Headquarters",
    sector: "commercial",
    location: "Business Bay",
    year: 2025,
    summary: "A 1,200 sq m full-floor office fit-out planned around collaborative teamwork.",
    cover: "/images/projects/business-bay-headquarters.jpg",
  },
  {
    slug: "jumeirah-bistro",
    title: "Jumeirah Bistro",
    sector: "hospitality",
    location: "Jumeirah",
    year: 2024,
    summary: "A warm, all-day dining room with custom joinery, banquette seating and layered lighting.",
    cover: "/images/projects/jumeirah-bistro.jpg",
  },
  {
    slug: "marina-penthouse",
    title: "Dubai Marina Penthouse",
    sector: "residential",
    location: "Dubai Marina",
    year: 2024,
    summary: "A complete renovation opening the plan to the view, with bespoke wardrobes and kitchen.",
    cover: "/images/projects/marina-penthouse.jpg",
  },
  {
    slug: "difc-showroom",
    title: "DIFC Showroom",
    sector: "commercial",
    location: "DIFC",
    year: 2024,
    summary: "A gallery-style retail showroom with feature ceilings and integrated display lighting.",
    cover: "/images/projects/difc-showroom.jpg",
  },
];

export const featuredProjects = projects.slice(0, 5);