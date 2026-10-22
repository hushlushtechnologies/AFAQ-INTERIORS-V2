"use client";

import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const lenis = useLenis();

  const toTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.6 });
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      className="group inline-flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.16em] text-background/80 transition-colors hover:text-background"
    >
      Back to top
      <span className="flex size-10 items-center justify-center rounded-full border border-background/25 transition-colors duration-500 group-hover:bg-background group-hover:text-foreground">
        <ArrowUp aria-hidden className="size-4 transition-transform duration-500 ease-luxe group-hover:-translate-y-0.5" />
      </span>
    </button>
  );
}