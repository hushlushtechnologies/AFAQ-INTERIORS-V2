"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/content/testimonials";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

const quoteVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
  exit: (dir: number) => ({ opacity: 0, x: dir * -40, transition: { duration: 0.35, ease } }),
};

const navButton =
  "flex size-12 items-center justify-center rounded-full border border-line transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background";

export function Testimonials() {
  const total = testimonials.length;
  const [[index, direction], setState] = useState<[number, number]>([0, 1]);

  const go = (dir: 1 | -1) => setState(([i]) => [(i + dir + total) % total, dir]);
  const goTo = (target: number) =>
    setState(([i]) => (target === i ? [i, 1] : [target, target > i ? 1 : -1]));

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  };

  const current = testimonials[index];

  return (
    <section className="bg-surface/60 py-24 md:py-32 lg:py-40">
      <div className="container-luxe">
        <SectionHeading eyebrow="Client stories" title="Spaces our clients love living and working in." />

        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className="mt-16 grid items-center gap-12 focus-visible:outline-offset-8 md:mt-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24"
        >
          {/* Project image */}
          <ClipReveal className="relative aspect-[4/5] overflow-hidden bg-surface">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{ opacity: i === index ? 1 : 0, scale: i === index ? 1 : 1.08 }}
                transition={{ duration: 0.9, ease }}
                className="absolute inset-0"
                aria-hidden={i !== index}
              >
                <Image
                  src={item.image}
                  alt={`${item.project} in ${item.location}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
            <span
              aria-hidden
              className="absolute left-6 top-6 flex size-14 items-center justify-center rounded-full bg-background text-primary"
            >
              <Quote className="size-5" />
            </span>
          </ClipReveal>

          {/* Quote + controls */}
          <div>
            <div aria-live="polite" className="relative min-h-[20rem] md:min-h-[17rem]">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.figure
                  key={index}
                  custom={direction}
                  variants={quoteVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) go(1);
                    else if (info.offset.x > 60) go(-1);
                  }}
                  className="cursor-grab touch-pan-y active:cursor-grabbing"
                >
                  <blockquote className="font-display text-h3 leading-snug">“{current.quote}”</blockquote>
                  <figcaption className="mt-10 flex items-center gap-4">
                    <span aria-hidden className="h-px w-10 bg-accent" />
                    <span>
                      <span className="block font-medium">{current.name}</span>
                      <span className="block text-sm text-primary">
                        {current.project} · {current.location}
                      </span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-12 flex items-center gap-6 border-t border-line pt-8 md:gap-10">
              <p aria-hidden className="shrink-0 font-display text-2xl">
                {pad(index + 1)} <span className="text-base text-primary">/ {pad(total)}</span>
              </p>

              <div className="hidden flex-1 gap-2 sm:flex">
                {testimonials.map((item, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Show testimonial ${i + 1}: ${item.project}`}
                    aria-current={i === index ? "true" : undefined}
                    className="group flex-1 py-3"
                  >
                    <span
                      className={cn(
                        "block h-px transition-colors duration-500 ease-luxe",
                        i === index ? "bg-foreground" : "bg-line group-hover:bg-primary/50",
                      )}
                    />
                  </button>
                ))}
              </div>

              <div className="ml-auto flex gap-3">
                <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className={navButton}>
                  <ArrowLeft aria-hidden className="size-4" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className={navButton}>
                  <ArrowRight aria-hidden className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}