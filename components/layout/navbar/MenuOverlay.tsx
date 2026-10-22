"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";
import { navItems, secondaryLinks } from "@/lib/navigation";
import { services } from "@/lib/content/services";
import { siteConfig } from "@/lib/siteConfig";
import { ease } from "@/lib/motion";

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.35 } },
};
const rise: Variants = {
  hidden: { y: "105%" },
  visible: { y: "0%", transition: { duration: 0.9, ease } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: 0.6 } },
};

type MenuOverlayProps = { open: boolean; onClose: () => void };

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    lenis?.stop();
    html.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      lenis?.start();
      html.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="site-menu"
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-lenis-prevent
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease }}
          className="fixed inset-0 z-[60] overflow-y-auto bg-foreground text-background"
        >
          <div className="container-luxe flex min-h-full flex-col py-6">
            <div className="flex h-14 items-center justify-between">
              <span className="text-eyebrow uppercase text-tan">Menu</span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex size-11 items-center justify-center rounded-full border border-background/25 transition-colors duration-300 hover:bg-background hover:text-foreground"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>

            <div className="grid flex-1 gap-16 py-12 lg:grid-cols-[1.5fr_1fr] lg:items-end">
              <motion.ul variants={list} initial="hidden" animate="visible" className="space-y-1">
                {navItems.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.div variants={rise}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-baseline gap-5 font-display text-h1 transition-colors duration-300 hover:text-tan"
                      >
                        <span className="font-body text-eyebrow text-tan">{String(i + 1).padStart(2, "0")}</span>
                        {item.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </motion.ul>

              <motion.div variants={fade} initial="hidden" animate="visible" className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <p className="mb-4 text-eyebrow uppercase text-tan">Services</p>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {services.map((s) => (
                      <li key={s.slug}>
                        <Link href={`/services/${s.slug}`} onClick={onClose} className="opacity-80 transition-opacity hover:opacity-100">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2 text-sm">
                  <p className="mb-4 text-eyebrow uppercase text-tan">Get in touch</p>
                  <a href={siteConfig.phone.href} className="block opacity-80 hover:opacity-100">{siteConfig.phone.display}</a>
                  <a href={`mailto:${siteConfig.email}`} className="block opacity-80 hover:opacity-100">{siteConfig.email}</a>
                  <p className="opacity-60">{siteConfig.address}</p>
                </div>

                <ul className="flex flex-wrap gap-6 text-eyebrow uppercase">
                  {secondaryLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} onClick={onClose} className="opacity-70 hover:opacity-100">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}