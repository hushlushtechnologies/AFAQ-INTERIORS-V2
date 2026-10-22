import { siteConfig } from "@/lib/siteConfig";

export const projectTypes = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "hospitality", label: "Hospitality" },
  { value: "other", label: "Something else" },
] as const;

export const budgets = [
  "Under AED 100k",
  "AED 100k – 300k",
  "AED 300k – 750k",
  "AED 750k – 1.5M",
  "Above AED 1.5M",
  "Not sure yet",
];

export const locations = [...siteConfig.serviceAreas, "Outside the UAE"];