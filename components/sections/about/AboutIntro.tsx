import Image from "next/image";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { aboutIntro } from "@/lib/content/about";

export function AboutIntro() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="container-luxe">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal y={16}>
              <p className="mb-6 flex items-center gap-4 text-eyebrow uppercase text-primary">
                <span aria-hidden className="h-px w-10 bg-accent" />
                Welcome to Afaq Al Manzel
              </p>
            </Reveal>
            <SplitText
              as="h2"
              text="Interiors that balance beauty, function, comfort and character."
              className="font-display text-h2"
            />
          </div>

          <div className="space-y-8">
            {aboutIntro.map((paragraph, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className={i === 0 ? "font-display text-h3 leading-snug" : "text-lead text-primary"}>
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <ClipReveal className="relative mt-24 aspect-[16/10] overflow-hidden bg-surface md:mt-32 md:aspect-[21/9]">
          <Parallax className="absolute inset-0">
            <Image
              src="/images/about/intro-wide.jpg"
              alt="Open-plan living and dining space with warm timber and stone finishes"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </Parallax>
        </ClipReveal>
      </div>
    </section>
  );
}