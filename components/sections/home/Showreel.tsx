"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Play, X } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { useScrollLock } from "@/lib/hooks/useScrollLock";
import { siteConfig } from "@/lib/siteConfig";
import { ease } from "@/lib/motion";

export function Showreel() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const reduce = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.25 });
  const [open, setOpen] = useState(false);

  useScrollLock(open);

  /* ---------- scroll expansion ---------- */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });
  const inset = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const clip = useMotionTemplate`inset(${inset}% ${inset}% ${inset}% ${inset}% round ${radius}px)`;
  const scale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);

  /* ---------- background video: play only when visible ---------- */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && !reduce && !open) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView, reduce, open]);

  /* ---------- lightbox: focus + Escape ---------- */
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  };

  return (
    <section ref={sectionRef} className="relative py-12 md:py-20">
      <motion.div
        style={reduce ? undefined : { clipPath: clip }}
        className="relative h-[75svh] min-h-[28rem] overflow-hidden bg-foreground text-background md:h-svh"
      >
        <motion.video
          ref={videoRef}
          style={reduce ? undefined : { scale }}
          className="absolute inset-0 h-full w-full object-cover"
          src="/videos/showreel.mp4"
          poster="/images/showreel-poster.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
        <div aria-hidden className="absolute inset-0 bg-foreground/45" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          <p className="mb-6 flex items-center gap-4 text-eyebrow uppercase text-tan">
            <span aria-hidden className="h-px w-10 bg-tan" />
            Our story
            <span aria-hidden className="h-px w-10 bg-tan" />
          </p>
          <h2 className="max-w-4xl font-display text-h1">Crafted in Dubai, delivered by one team.</h2>

          <Magnetic strength={0.35} className="mt-12">
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              className="group flex size-28 flex-col items-center justify-center gap-2 rounded-full border border-background/40 backdrop-blur-sm transition-colors duration-500 ease-luxe hover:bg-background hover:text-foreground md:size-32"
            >
              <Play aria-hidden className="size-6 translate-x-0.5 fill-current" />
              <span className="text-[0.65rem] uppercase tracking-[0.2em]">Play film</span>
            </button>
          </Magnetic>
        </div>
      </motion.div>

      {/* ---------- Lightbox ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${siteConfig.name} showreel`}
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            onClick={close}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/95 p-4 md:p-10"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close video"
              className="absolute right-4 top-4 flex size-12 items-center justify-center rounded-full border border-background/30 text-background transition-colors hover:bg-background hover:text-foreground md:right-8 md:top-8"
            >
              <X aria-hidden className="size-5" />
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease }}
              onClick={(e) => e.stopPropagation()}
              className="relative aspect-video w-full max-w-6xl bg-black"
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${siteConfig.showreelYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={`${siteConfig.name} showreel`}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}