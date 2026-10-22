import { DrawLine } from "@/components/motion/DrawLine";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { values } from "@/lib/content/about";

export function Values() {
  return (
    <section className="bg-surface/60 py-24 md:py-32 lg:py-40">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="What we stand for"
          title="Four principles behind every space."
          intro="They guide every decision, from the first sketch to the last cushion."
        />

        <ol className="mt-16 grid gap-12 sm:grid-cols-2 md:mt-24 lg:grid-cols-4 lg:gap-8">
          {values.map((value, i) => (
            <li key={value.title}>
              <DrawLine delay={i * 0.15} />
              <Reveal delay={0.2 + i * 0.15} className="pt-8">
                <span className="text-eyebrow text-primary">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 font-display text-h2">{value.title}</h3>
                <p className="mt-4 max-w-xs text-primary">{value.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}