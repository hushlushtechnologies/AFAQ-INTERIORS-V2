import { services } from "@/lib/content/services";
import { siteConfig } from "@/lib/siteConfig";

export type NavChild = {
  label: string;
  href: string;
  description?: string;
  image?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
  overviewLabel?: string;
  /** Kept in code but excluded from rendering. Flip to false to enable. */
  hidden?: boolean;
};

const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

const allNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "What We Do",
    href: "/services",
    overviewLabel: "View all services",
    children: services.map((s) => ({
      label: s.title,
      href: `/services/${s.slug}`,
      description: s.summary,
      image: s.image,
    })),
  },
  {
    label: "Products",
    href: "/products",
    hidden: true,
    overviewLabel: "View all products",
    children: ["Kitchens", "Wardrobes", "Bedrooms", "Living Rooms", "Dining Rooms", "Office Interiors"].map(
      (label) => ({ label, href: `/products/${slugify(label)}` }),
    ),
  },
  { label: "Projects", href: "/projects" },
  {
    label: "Locations",
    href: "/locations",
    hidden: true,
    overviewLabel: "View all locations",
    children: siteConfig.serviceAreas.map((area) => ({
      label: area,
      href: `/locations/${slugify(area)}`,
    })),
  },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export const navItems = allNavItems.filter((item) => !item.hidden);

export const secondaryLinks: NavChild[] = [
  { label: "FAQ", href: "/faq" },
  { label: "Careers", href: "/careers" },
  { label: "Privacy Policy", href: "/privacy" },
];


export const companyLinks: NavChild[] = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Journal", href: "/journal" },
  { label: "FAQ", href: "/faq" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const legalLinks: NavChild[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];