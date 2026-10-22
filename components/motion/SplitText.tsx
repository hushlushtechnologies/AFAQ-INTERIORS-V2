"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { ease, viewport } from "@/lib/motion";

const tags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
} as const;

type SplitTextProps = {
  text: string;
  as?: keyof typeof tags;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: "view" | "mount";
};

const word: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1, ease } },
};

export function SplitText({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.06,
  trigger = "view",
}: SplitTextProps) {
  const Tag = tags[as];
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  const triggerProps =
    trigger === "mount"
      ? { animate: "visible" }
      : { whileInView: "visible", viewport };

  return (
    <Tag
      aria-label={text}
      className={cn(className)}
      variants={container}
      initial="hidden"
      {...triggerProps}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span variants={word} className="inline-block">
            {w}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}