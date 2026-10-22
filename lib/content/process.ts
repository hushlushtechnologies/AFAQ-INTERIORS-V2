import type { LucideIcon } from "lucide-react";
import { ClipboardCheck, HardHat, KeyRound, MessagesSquare, PencilRuler, Sofa } from "lucide-react";

export type ProcessStep = {
  title: string;
  description: string;
  deliverables: string[];
  icon: LucideIcon;
};

export const processSteps: ProcessStep[] = [
  {
    title: "Consultation & Brief",
    description:
      "We meet on site or at our studio to understand how you use the space, your timeline and your budget.",
    deliverables: ["Site visit", "Requirement brief", "Budget range"],
    icon: MessagesSquare,
  },
  {
    title: "Concept & Space Planning",
    description:
      "Layouts, mood boards and 3D visuals that show exactly how the finished space will look and flow.",
    deliverables: ["Space plans", "Mood boards", "3D renders"],
    icon: PencilRuler,
  },
  {
    title: "Technical Design & Approvals",
    description:
      "Detailed drawings, material specifications and authority approvals, prepared before any work begins on site.",
    deliverables: ["Working drawings", "Specifications", "Authority approvals"],
    icon: ClipboardCheck,
  },
  {
    title: "Fit-Out & MEP",
    description:
      "Our site teams handle civil works, joinery, finishes and MEP, coordinated under a single programme.",
    deliverables: ["Civil & joinery", "MEP works", "Weekly progress reports"],
    icon: HardHat,
  },
  {
    title: "Furnishing & Styling",
    description:
      "Furniture, lighting, curtains and accessories sourced, delivered and placed to complete the design.",
    deliverables: ["Loose furniture", "Lighting", "Soft furnishings"],
    icon: Sofa,
  },
  {
    title: "Handover & Aftercare",
    description:
      "A full snagging walk-through, handover documents and continued support after you move in.",
    deliverables: ["Snagging", "Handover pack", "Warranty support"],
    icon: KeyRound,
  },
];