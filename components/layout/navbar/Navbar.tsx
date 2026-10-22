"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MenuOverlay } from "./MenuOverlay";
import { TopBar } from "./TopBar";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 200);
  });

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus({ preventScroll: true });
  }, []);

  const onDark = !scrolled;

  return (
    <>
      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.7, ease }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,color,border-color] duration-500 ease-luxe",
          onDark
            ? "border-transparent text-background"
            : "border-line bg-background/85 text-foreground backdrop-blur-md",
        )}
      >
        {onDark && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-44 bg-linear-to-b from-foreground/55 to-transparent"
          />
        )}

        <AnimatePresence initial={false}>
          {!scrolled && (
            <motion.div
              key="topbar"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease }}
              className="hidden overflow-hidden md:block"
            >
              <TopBar />
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={cn(
            "container-luxe flex items-center justify-between gap-8 transition-[height] duration-500 ease-luxe",
            scrolled ? "h-18" : "h-20 lg:h-24",
          )}
        >
          <Logo onDark={onDark} />
          <DesktopNav />

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                "hidden border px-6 py-3 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors duration-500 ease-luxe md:inline-flex",
                onDark
                  ? "border-background/40 hover:bg-background hover:text-foreground"
                  : "border-primary bg-primary text-background hover:border-foreground hover:bg-foreground",
              )}
            >
              Book a Consultation
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="site-menu"
              className="group flex size-11 flex-col items-end justify-center gap-1.5"
            >
              <span className="h-px w-7 bg-current transition-[width] duration-500 ease-luxe group-hover:w-5" />
              <span className="h-px w-5 bg-current transition-[width] duration-500 ease-luxe group-hover:w-7" />
            </button>
          </div>
        </div>
      </motion.header>

      <MenuOverlay open={menuOpen} onClose={closeMenu} />
    </>
  );
}