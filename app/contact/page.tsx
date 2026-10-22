import type { Metadata } from "next";
import { ContactDetails } from "@/components/sections/contact/ContactDetails";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactMap } from "@/components/sections/contact/ContactMap";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { breadcrumbJsonLd, businessJsonLd, type Crumb } from "@/lib/seo";

const description =
  "Contact Afaq Al Manzel Interiors in Dubai. Call, WhatsApp or send us an enquiry about your residential, commercial or hospitality interior project.";

export const metadata: Metadata = {
  title: "Contact Us",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Afaq Al Manzel Interiors",
    description,
    url: "/contact",
    images: ["/images/contact/hero.jpg"],
  },
};

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={businessJsonLd()} />

      <PageHero
        compact
        crumbs={crumbs}
        eyebrow="Contact"
        title="Let’s talk about your space."
        intro="Tell us about your project or reach us directly. A design consultant will get back to you."
        image="/images/contact/hero.jpg"
      />

      <section className="py-24 md:py-32 lg:py-40">
        <div className="container-luxe grid gap-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <ContactDetails />

          <div>
            <Reveal y={16}>
              <p className="mb-6 flex items-center gap-4 text-eyebrow uppercase text-primary">
                <span aria-hidden className="h-px w-10 bg-accent" />
                Project enquiry
              </p>
            </Reveal>
            <SplitText as="h2" text="Send us an enquiry." className="font-display text-h2" />
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-lg text-lead text-primary">
                Share a few details and we&apos;ll arrange a consultation at your space or our studio.
              </p>
            </Reveal>
            <ContactForm />
          </div>
        </div>
      </section>

      <ContactMap />
    </>
  );
}