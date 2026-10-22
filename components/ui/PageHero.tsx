 "use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { SplitText } from "@/components/motion/SplitText";
import type { Crumb } from "@/lib/seo";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  alt?: string;
  crumbs: Crumb[];
  compact?: boolean;
};

export function PageHero({ eyebrow, title, intro, image, alt = "", crumbs, compact = false }: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className={cn(
        "relative flex items-end overflow-hidden bg-foreground text-background",
        compact ? "h-[70svh] min-h-[32rem]" : "h-[85svh] min-h-[36rem]",
      )}
    >
      {/* Image: outer = scroll parallax, inner = load zoom */}
      <motion.div style={reduce ? undefined : { y: imageY }} className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease }}
          className="absolute inset-0"
        >
          <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      </motion.div>

      <div aria-hidden className="absolute inset-0 bg-linear-to-t from-foreground/85 via-foreground/30 to-foreground/40" />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="container-luxe relative z-10 pb-16 md:pb-24"
      >
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <ol className="flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-background/70">
            {crumbs.map((crumb, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {last ? (
                    <span aria-current="page" className="text-tan">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link href={crumb.path} className="transition-colors hover:text-background">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </motion.nav>

        <motion.p
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.35 }}
          className={cn(
            "mb-6 flex items-center gap-4 text-eyebrow uppercase text-tan",
            compact ? "mt-8" : "mt-10",
          )}
        >
          <span aria-hidden className="h-px w-10 bg-tan" />
          {eyebrow}
        </motion.p>

        <SplitText as="h1" trigger="mount" delay={0.45} text={title} className="max-w-5xl font-display text-h1" />

        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1 }}
            className="mt-8 max-w-xl text-lead text-background/85"
          >
            {intro}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}