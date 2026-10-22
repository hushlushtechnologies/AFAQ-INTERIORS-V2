import type { Metadata } from "next";
import { Credentials } from "@/components/sections/home/Credentials";
// import { Process } from "@/components/sections/home/Process";
import { AboutIntro } from "@/components/sections/about/AboutIntro";
import { Values } from "@/components/sections/about/Values";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { SplitFeature } from "@/components/ui/SplitFeature";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
 import { OneCompany } from "@/components/sections/about/OneCompany";
import { Comparison } from "@/components/sections/about/Comparison";

const description =
  "Afaq Al Manzel Interiors is a Dubai-based interior design and turnkey company creating residential, commercial and hospitality spaces, managed by one coordinated team from concept to handover.";

export const metadata: Metadata = {
  title: "About Us",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Afaq Al Manzel Interiors",
    description,
    url: "/about",
    images: ["/images/about/hero.jpg"],
  },
};

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <PageHero
        crumbs={crumbs}
        eyebrow="About us"
        title="One team, from first sketch to final handover."
        intro="A Dubai-based interior design and turnkey studio creating residential, commercial and hospitality spaces across the UAE."
        image="/images/about/hero.jpg"
        alt="Refined living room interior by Afaq Al Manzel"
      />

      <AboutIntro />
      <Values />

      {/* Across the UAE — image left */}
      <section className="py-24 md:py-32 lg:py-40">
        <div className="container-luxe">
          <SplitFeature
            eyebrow="Across the UAE"
            title="An interior design company built around Dubai living."
            body={[
              "We work with homeowners, developers, business owners and operators across Dubai and the wider UAE, from apartments and family villas to offices, showrooms, restaurants and hotels.",
              "Our team understands the realities of building here: the climate, the approval process, community and developer requirements, and the pace clients expect. That local knowledge shapes every design and keeps projects moving.",
            ]}
            image="/images/about/dubai-living.jpg"
            alt="Open kitchen and dining space with timber wall cladding and pendant lighting"
            imageSide="left"
            points={[
              "Residential, commercial & hospitality",
              "Apartments to full villas",
              "Authority & community approvals",
              "Projects across the UAE",
            ]}
            cta={{ label: "Discuss Your Requirements", href: "/contact" }}
          />
        </div>
      </section>

      <Credentials />
         <OneCompany />
 <Comparison />
      {/* Our approach — image right */}
      <section className="py-24 md:py-32 lg:py-40">
        <div className="container-luxe">
          <SplitFeature
            eyebrow="Our approach"
            title="Design decisions made with delivery in mind."
            body={[
              "Because the people who draw the plans also build them, every concept is tested against cost, programme and buildability before it reaches you.",
              "That means fewer surprises on site, fewer variations and a finished space that matches the design you approved.",
            ]}
            image="/images/about/approach.jpg"
            alt="Designer and site manager reviewing technical drawings together"
            imageSide="right"
            points={["Itemised quotations", "Single project programme", "Weekly progress updates", "Snagging & aftercare"]}
            cta={{ label: "Book a Consultation", href: "/contact" }}
          />
        </div>
      </section>

   
    </>
  );
}