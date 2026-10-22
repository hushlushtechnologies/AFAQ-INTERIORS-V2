import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceList } from "./ServiceList";

export function Services() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="What we do"
          title="Every discipline your space needs."
          intro="Design, technical, build and furnishing services that can be taken on their own or combined into a single turnkey project."
        />

        <ServiceList />

        <Reveal className="mt-14 flex justify-center md:mt-20">
          <Button href="/contact" arrow>
            Talk to a Design Consultant
          </Button>
        </Reveal>
      </div>
    </section>
  );
}