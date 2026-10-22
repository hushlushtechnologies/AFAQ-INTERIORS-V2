import Image from "next/image";
import { Check } from "lucide-react";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type SplitFeatureProps = {
  eyebrow: string;
  title: string;
  body: string[];
  image: string;
  alt: string;
  imageSide?: "left" | "right";
  badge?: { value: string; label: string };
  points?: string[];
  cta?: { label: string; href: string; variant?: "solid" | "outline" };
};

export function SplitFeature({
  eyebrow,
  title,
  body,
  image,
  alt,
  imageSide = "right",
  badge,
  points,
  cta,
}: SplitFeatureProps) {
  const right = imageSide === "right";

  return (
    <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-28">
      {/* Visual */}
      <div className={cn("relative", right && "lg:order-last")}>
        <ClipReveal className="relative aspect-[4/5] overflow-hidden bg-surface">
          <Parallax className="absolute inset-0">
            <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </Parallax>
        </ClipReveal>

        {badge && (
          <Reveal
            delay={0.5}
            className={cn(
              "absolute -bottom-8 bg-foreground px-6 py-5 text-background md:px-8 md:py-7",
              right ? "left-4 lg:-left-10" : "right-4 lg:-right-10",
            )}
          >
            <p className="font-display text-h2 leading-none text-tan">{badge.value}</p>
            <p className="mt-3 text-eyebrow uppercase">{badge.label}</p>
          </Reveal>
        )}
      </div>

      {/* Copy */}
      <div className="max-w-xl">
        <Reveal y={16}>
          <p className="mb-6 flex items-center gap-4 text-eyebrow uppercase text-primary">
            <span aria-hidden className="h-px w-10 bg-accent" />
            {eyebrow}
          </p>
        </Reveal>

        <SplitText as="h2" text={title} className="font-display text-h2" />

        <div className="mt-8 space-y-5">
          {body.map((paragraph, i) => (
            <Reveal key={i} delay={0.15 + i * 0.1}>
              <p className="text-lead text-primary">{paragraph}</p>
            </Reveal>
          ))}
        </div>

        {points && (
          <Reveal delay={0.35}>
            <ul className="mt-10 grid gap-x-8 gap-y-4 border-t border-line pt-8 sm:grid-cols-2">
              {points.map((point) => (
                <li key={point} className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-surface">
                    <Check aria-hidden className="size-3.5 text-primary" />
                  </span>
                  <span className="text-sm font-medium">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {cta && (
          <Reveal delay={0.45} className="mt-10">
            <Button href={cta.href} variant={cta.variant} arrow>
              {cta.label}
            </Button>
          </Reveal>
        )}
      </div>
    </div>
  );
}