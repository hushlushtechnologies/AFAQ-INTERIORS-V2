export type Stat = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
};

// PLACEHOLDER — confirm every figure with the client before launch.
export const stats: Stat[] = [
  { value: 12, suffix: "+", label: "Years of practice", detail: "Designing and delivering interiors across the UAE." },
  { value: 450, suffix: "+", label: "Projects delivered", detail: "Residential, commercial and hospitality spaces." },
  { value: 1.2, decimals: 1, suffix: "M", label: "Sq ft completed", detail: "From single apartments to full-floor offices." },
  { value: 8, label: "In-house disciplines", detail: "Design, technical, MEP, joinery, fit-out and more." },
  { value: 5, suffix: "-Year", label: "Workmanship warranty", detail: "Backed by the team that built it." },
  { value: 1, label: "Point of contact", detail: "One coordinated team from concept to handover." },
];