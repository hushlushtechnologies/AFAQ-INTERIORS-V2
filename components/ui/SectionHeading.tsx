import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({ eyebrow, title, intro, tone = "light", className }: SectionHeadingProps) {
  const dark = tone === "dark";

  return (
    <div className={cn("grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16", className)}>
      <div>
        <Reveal y={16}>
          <p
            className={cn(
              "mb-6 flex items-center gap-4 text-eyebrow uppercase",
              dark ? "text-tan" : "text-primary",
            )}
          >
            <span aria-hidden className={cn("h-px w-10", dark ? "bg-tan" : "bg-accent")} />
            {eyebrow}
          </p>
        </Reveal>
        <SplitText as="h2" text={title} className="max-w-3xl font-display text-h2" />
      </div>

      {intro && (
        <Reveal delay={0.2} className="lg:justify-self-end">
          <p className={cn("max-w-lg text-lead", dark ? "text-background/80" : "text-primary")}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}