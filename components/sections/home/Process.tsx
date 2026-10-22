"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/lib/content/process";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const total = processSteps.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(total - 1, Math.max(0, Math.floor(v * total))));
  });

  return (
    <section ref={sectionRef} className="relative bg-foreground text-background lg:h-[380vh]">
      <div className="container-luxe py-24 md:py-32 lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center lg:py-0">
        <div className="grid w-full gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-24">
          {/* Left: heading + rolling counter */}
          <div className="flex flex-col justify-between gap-12">
            <SectionHeading
              tone="dark"
              className="lg:grid-cols-1"
              eyebrow="How we work"
              title="From first meeting to final handover."
              intro="Six stages, one team, one programme. You always know what is happening, what comes next and who is responsible."
            />

            <div aria-hidden className="hidden items-end gap-4 lg:flex">
              <span className="relative block h-[1em] overflow-hidden font-display text-[clamp(5rem,9vw,9rem)] leading-none text-tan">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={active}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.7, ease }}
                    className="block"
                  >
                    {pad(active + 1)}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="pb-3 text-sm text-background/60">/ {pad(total)}</span>
            </div>
          </div>

          {/* Right: steps with scroll-filled line */}
          <ol className="relative">
            <span aria-hidden className="absolute bottom-6 left-5 top-6 w-px -translate-x-1/2 bg-background/15" />
            <motion.span
              aria-hidden
              style={{ scaleY: scrollYProgress }}
              className="absolute bottom-6 left-5 top-6 w-px -translate-x-1/2 origin-top bg-tan"
            />

            {processSteps.map((step, i) => {
              const Icon = step.icon;
              const reached = i <= active;

              return (
                <li
                  key={step.title}
                  data-active={i === active}
                  className="group relative grid grid-cols-[2.5rem_1fr] gap-6 py-5 lg:py-3"
                >
                  <span
                    className={cn(
                      "relative z-10 flex size-10 items-center justify-center rounded-full border transition-colors duration-500 ease-luxe",
                      reached
                        ? "border-tan bg-tan text-foreground"
                        : "border-background/25 bg-foreground text-background/70",
                    )}
                  >
                    <Icon aria-hidden className="size-4" />
                  </span>

                  <div className="transition-opacity duration-500 ease-luxe lg:group-data-[active=false]:opacity-40">
                    <p className="text-eyebrow uppercase text-tan">Step {pad(i + 1)}</p>
                    <h3 className="mt-2 font-display text-h3">{step.title}</h3>

                    <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-luxe lg:group-data-[active=false]:grid-rows-[0fr]">
                      <div className="overflow-hidden">
                        <p className="mt-4 max-w-md text-background/80">{step.description}</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {step.deliverables.map((d) => (
                            <li
                              key={d}
                              className="border border-background/20 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] text-background/85"
                            >
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}