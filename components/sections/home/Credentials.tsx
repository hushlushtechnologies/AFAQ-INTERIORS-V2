import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stats } from "@/lib/content/stats";

export function Credentials() {
  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Why Afaq Al Manzel"
          title="Design and delivery, under one roof."
          intro="Most projects pass between a designer, a contractor and a string of subcontractors. We keep every stage within one team, so decisions stay consistent and nothing is lost between handovers."
        />

        <dl className="mt-16 grid grid-cols-2 gap-px border border-line bg-line md:mt-24 lg:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={(i % 3) * 0.1}
              className="flex flex-col bg-background p-6 transition-colors duration-500 ease-luxe hover:bg-surface md:p-10 lg:p-12"
            >
              <dt className="mt-6 text-eyebrow uppercase text-primary md:mt-8">{stat.label}</dt>
              <dd className="order-first font-display text-h1 text-foreground">
                <Counter
                  value={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </dd>
              <dd className="mt-3 max-w-xs text-sm leading-relaxed text-primary/85">{stat.detail}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}