export type Service = {
  slug: string;
  title: string;
  summary: string;
  image: string;
};

export const services: Service[] = [
  { slug: "interior-design", title: "Interior Design", summary: "Concepts shaped around how you live and work.", image: "/images/services/interior-design.jpg" },
  { slug: "space-planning", title: "Space Planning", summary: "Layouts that make every square metre count.", image: "/images/services/space-planning.jpg" },
  { slug: "technical-design", title: "Technical Design", summary: "Detailed drawings, specifications and approvals.", image: "/images/services/technical-design.jpg" },
  { slug: "renovation", title: "Renovation", summary: "Existing spaces reworked with minimal disruption.", image: "/images/services/renovation.jpg" },
  { slug: "fit-out", title: "Fit-Out", summary: "Joinery, finishes and build, executed in-house.", image: "/images/services/fit-out.jpg" },
  { slug: "mep", title: "MEP Works", summary: "Mechanical, electrical and plumbing, fully coordinated.", image: "/images/services/mep.jpg" },
  { slug: "furnishing", title: "Furnishing & Styling", summary: "Furniture, lighting and soft furnishings, sourced and placed.", image: "/images/services/furnishing.jpg" },
  { slug: "turnkey", title: "Turnkey Solutions", summary: "Concept to handover, managed by one team.", image: "/images/services/turnkey.jpg" },
];