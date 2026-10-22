import { ScrollText } from "@/components/motion/ScrollText";
import { Reveal } from "@/components/motion/Reveal";
import { SplitFeature } from "@/components/ui/SplitFeature";

export function Studio() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="container-luxe">
        <Reveal y={16}>
          <p className="mb-8 flex items-center gap-4 text-eyebrow uppercase text-primary">
            <span aria-hidden className="h-px w-10 bg-accent" />
            The studio
          </p>
        </Reveal>

        <ScrollText
          className="max-w-6xl font-display text-h2"
          text="We design and build interiors for homes, workplaces and hospitality venues across the UAE, guiding every project from the first conversation to the day the keys change hands."
        />

        <div className="mt-24 space-y-32 md:mt-36 md:space-y-44">
          <SplitFeature
            eyebrow="Who we are"
            title="Interior designers and fit-out contractors in Dubai."
            body={[
              "Afaq Al Manzel Interiors is a Dubai-based interior design and turnkey solutions company. We create refined residential, commercial and hospitality spaces through thoughtful design, technical expertise and complete execution.",
              "Our work spans concept, space planning and technical design through to renovation, fit-out, MEP, furnishing and final handover, delivering spaces that balance beauty, function, comfort and character.",
            ]}
            image="/images/about/studio.jpg"
            alt="Designers reviewing material samples and drawings in the Afaq Al Manzel studio"
            imageSide="right"
            badge={{ value: "12+", label: "Years in the UAE" }} // PLACEHOLDER — match stats.ts
            cta={{ label: "About the Studio", href: "/about", variant: "outline" }}
          />

          <SplitFeature
            eyebrow="Turnkey delivery"
            title="One coordinated team, start to finish."
            body={[
              "Designers, engineers, site managers and craftsmen work from the same drawings and the same programme. There are no gaps between consultants and contractors, and no one passing responsibility down the line.",
              "You get a single point of contact, a clear schedule and a space finished exactly as it was designed.",
            ]}
            image="/images/about/team.jpg"
            alt="Afaq Al Manzel site team reviewing plans inside a project under construction"
            imageSide="left"
            points={["Design studio", "Technical & MEP", "Joinery & fit-out", "Procurement & styling"]}
            cta={{ label: "Book a Free Consultation", href: "/contact" }}
          />
        </div>
      </div>
    </section>
  );
}