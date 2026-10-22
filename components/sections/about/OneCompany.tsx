"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { DrawLine } from "@/components/motion/DrawLine";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { oneCompanyClosing, pillars } from "@/lib/content/about";
import { ease, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

export function OneCompany() {
  const id = useId();
  const total = pillars.length;
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number) => {
    setActive(i);
    tabsRef.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = {
      ArrowRight: (active + 1) % total,
      ArrowLeft: (active - 1 + total) % total,
      Home: 0,
      End: total - 1,
    };
    if (e.key in keys) {
      e.preventDefault();
      select(keys[e.key]);
    }
  };

  const current = pillars[active];

  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="container-luxe">
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <Reveal y={16}>
            <p className="mb-6 flex items-center justify-center gap-4 text-eyebrow uppercase text-primary">
              <span aria-hidden className="h-px w-10 bg-accent" />
              One company
              <span aria-hidden className="h-px w-10 bg-accent" />
            </p>
          </Reveal>
          <SplitText
            as="h2"
            text="Design, technical delivery and execution under one roof."
            className="font-display text-h2"
          />
        </div>

        {/* Tree + tabs */}
        <div className="relative mx-auto mt-16 max-w-6xl md:mt-24">
          <DrawLine className="absolute left-[10%] right-[10%] top-0 hidden bg-line md:block" />

          <div
            role="tablist"
            aria-label="How we deliver every project"
            onKeyDown={onKeyDown}
            className="-mx-5 flex gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:px-0 md:pb-0"
          >
            {pillars.map((pillar, i) => {
              const selected = i === active;

              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.8, ease, delay: 0.3 + i * 0.08 }}
                  className="flex shrink-0 flex-col items-center"
                >
                  {/* Vertical drop from the connector */}
                  <motion.span
                    aria-hidden
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={viewport}
                    transition={{ duration: 0.7, ease, delay: 0.8 + i * 0.08 }}
                    className={cn(
                      "hidden h-16 w-px origin-top transition-colors duration-500 md:block",
                      selected ? "bg-primary" : "bg-line",
                    )}
                  />

                  <button
                    ref={(el) => {
                      tabsRef.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`${id}-tab-${i}`}
                    aria-selected={selected}
                    aria-controls={`${id}-panel`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    className={cn(
                      "relative flex items-center justify-center whitespace-nowrap rounded-full border px-5 py-3 text-sm font-medium transition-colors duration-500 ease-luxe md:size-32 md:whitespace-normal md:p-4 md:text-center lg:size-44 lg:text-base xl:size-48",
                      selected ? "border-primary text-background" : "border-line hover:border-primary/50",
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId={`${id}-fill`}
                        transition={{ duration: 0.6, ease }}
                        className="absolute inset-0 rounded-full bg-primary"
                      />
                    )}
                    <span className="relative z-10">{pillar.title}</span>
                  </button>

                  {/* Pointer arrow slot */}
                  <span aria-hidden className="mt-3 hidden h-6 md:block">
                    {selected && (
                      <motion.span
                        layoutId={`${id}-arrow`}
                        transition={{ duration: 0.6, ease }}
                        className="block text-primary"
                      >
                        <ChevronDown className="size-5" />
                      </motion.span>
                    )}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Panel */}
          <div className="mx-auto mt-8 max-w-2xl md:mt-4">
            <div
              role="tabpanel"
              id={`${id}-panel`}
              aria-labelledby={`${id}-tab-${active}`}
              tabIndex={0}
              className="min-h-[17rem] border border-line bg-surface/50 p-8 md:p-12"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease }}
                >
                  <p className="text-eyebrow uppercase text-primary">
                    Stage {pad(active + 1)} / {pad(total)}
                  </p>
                  <h3 className="mt-4 font-display text-h3">{current.title}</h3>
                  <p className="mt-4 text-lead text-primary">{current.text}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {current.includes.map((item) => (
                      <li
                        key={item}
                        className="border border-line px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Closing line */}
        <Reveal className="mx-auto mt-16 max-w-3xl text-center md:mt-24">
          <p className="text-lead text-primary">{oneCompanyClosing}</p>
        </Reveal>
      </div>
    </section>
  );
}