"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { heroSlides } from "@/lib/content/hero";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const SLIDE_MS = 7000;
const WIPE_S = 1.4;

/* ---------- media variants ---------- */
const media: Variants = {
  active: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: WIPE_S, ease } },
  previous: { clipPath: "inset(0% 0% 0% 0%)" },
  idle: { clipPath: "inset(0% 0% 0% 100%)", transition: { duration: 0 } },
};

const kenBurns: Variants = {
  active: { scale: 1, transition: { duration: SLIDE_MS / 1000 + WIPE_S, ease: "linear" } },
  previous: { scale: 1, transition: { duration: WIPE_S, ease: "linear" } },
  idle: { scale: 1.12, transition: { duration: 0 } },
};

/* ---------- text variants ---------- */
const group: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  exit: { transition: { staggerChildren: 0.04 } },
};
const eyebrow: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};
const line: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1.1, ease } },
  exit: { y: "-110%", transition: { duration: 0.6, ease } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.7 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.2 });

  const total = heroSlides.length;
  const [{ index, prev }, setSlide] = useState({ index: 0, prev: -1 });
  const [userPaused, setUserPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  const playing = !userPaused && !reduce && total > 1;
  const autoplay = playing && pageVisible && inView;

  const goTo = useCallback(
    (next: number) =>
      setSlide((s) => {
        const target = (next + total) % total;
        return target === s.index ? s : { index: target, prev: s.index };
      }),
    [total],
  );

  // Autoplay: one timer per slide, cleared on any change.
  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => goTo(index + 1), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [autoplay, index, goTo]);

  // Pause when the tab is hidden.
  useEffect(() => {
    const onVisibility = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  /* ---------- scroll-linked exit ---------- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const inset = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const radius = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const frame = useMotionTemplate`inset(${inset}% ${inset}% 0% ${inset}% round ${radius}px)`;
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const slide = heroSlides[index];

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Featured work"
      className="relative h-svh min-h-[40rem] overflow-hidden bg-background"
    >
      {/* ---------- Media ---------- */}
      <motion.div
        style={reduce ? undefined : { clipPath: frame }}
        className="absolute inset-0 overflow-hidden bg-foreground"
      >
        <motion.div style={reduce ? undefined : { y: mediaY }} className="absolute inset-0">
          {heroSlides.map((s, i) => {
            const state = i === index ? "active" : i === prev ? "previous" : "idle";
            return (
              <motion.div
                key={s.image}
                variants={media}
                initial={false}
                animate={state}
                style={{ zIndex: i === index ? 2 : i === prev ? 1 : 0 }}
                className="absolute inset-0 overflow-hidden"
                aria-hidden={i !== index}
              >
                <motion.div
                  variants={kenBurns}
                  initial={i === 0 ? { scale: 1.12 } : false}
                  className="absolute inset-0"
                >
                  <Image
                    src={s.image}
                    alt={i === index ? s.alt : ""}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Legibility scrims */}
        <div aria-hidden className="absolute inset-0 z-10 bg-linear-to-t from-foreground/85 via-foreground/20 to-foreground/35" />
        <div aria-hidden className="absolute inset-0 z-10 bg-linear-to-r from-foreground/60 via-foreground/10 to-transparent" />
      </motion.div>

      {/* ---------- Content ---------- */}
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-20 flex h-full flex-col text-background"
      >
        <div className="container-luxe flex flex-1 flex-col justify-end pb-36 md:pb-44">
          <h1 className="sr-only">
            Afaq Al Manzel Interiors: interior design and turnkey fit-out in Dubai
          </h1>

          <div aria-live={autoplay ? "off" : "polite"} aria-atomic="true" className="max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${total}`}
                variants={group}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.p
                  variants={eyebrow}
                  className="mb-6 flex items-center gap-4 text-eyebrow uppercase text-tan"
                >
                  <span aria-hidden className="h-px w-10 bg-tan" />
                  {slide.eyebrow}
                </motion.p>

                <p className="font-display text-h1">
                  {slide.title.map((text) => (
                    <span key={text} className="block overflow-hidden pb-[0.06em]">
                      <motion.span variants={line} className="block">
                        {text}
                      </motion.span>
                    </span>
                  ))}
                </p>

                <motion.p variants={fadeUp} className="mt-7 max-w-xl text-lead text-background/85">
                  {slide.description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.1 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button href="/contact" on="dark" arrow>Start Your Project</Button>
<Button href="/projects" on="dark" variant="outline">View Projects</Button>
          </motion.div>
        </div>

        {/* ---------- Controls ---------- */}
        <div className="container-luxe absolute inset-x-0 bottom-0 flex items-end justify-between gap-8 pb-6 md:pb-10">
          <div className="flex items-end gap-6 md:gap-10">
            {/* Rolling counter */}
            <div aria-hidden className="flex items-baseline gap-2 font-display">
              <span className="relative block h-[1.1em] overflow-hidden text-4xl md:text-5xl">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={index}
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.8, ease }}
                    className="block leading-[1.1]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="text-sm text-background/60">/ {String(total).padStart(2, "0")}</span>
            </div>

            {/* Progress tabs */}
            <div className="grid w-[min(40rem,52vw)] grid-cols-4 gap-3 md:gap-6">
              {heroSlides.map((s, i) => (
                <button
                  key={s.image}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show slide ${i + 1}: ${s.eyebrow}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group py-4 text-left"
                >
                  <span className="relative block h-px overflow-hidden bg-background/25">
                    {i === index && (
                      <motion.span
                        key={`${index}-${autoplay}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={
                          autoplay ? { duration: SLIDE_MS / 1000, ease: "linear" } : { duration: 0.5, ease }
                        }
                        className="absolute inset-0 origin-left bg-background"
                      />
                    )}
                  </span>
                  <span
                    className={cn(
                      "mt-3 hidden text-[0.68rem] uppercase tracking-[0.18em] transition-opacity duration-500 md:block",
                      i === index ? "opacity-100" : "opacity-50 group-hover:opacity-80",
                    )}
                  >
                    {s.eyebrow}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {!reduce && total > 1 && (
              <button
                type="button"
                onClick={() => setUserPaused((p) => !p)}
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                className="flex size-10 items-center justify-center rounded-full border border-background/30 transition-colors duration-300 hover:bg-background hover:text-foreground"
              >
                {playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
              </button>
            )}

            {/* Scroll cue (decorative) */}
            <div aria-hidden className="hidden items-center gap-3 md:flex">
              <span className="text-[0.68rem] uppercase tracking-[0.2em] [writing-mode:vertical-rl]">Scroll</span>
              <span className="relative h-14 w-px overflow-hidden bg-background/25">
                <motion.span
                  className="absolute inset-x-0 top-0 h-1/2 bg-background"
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease }}
                />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}