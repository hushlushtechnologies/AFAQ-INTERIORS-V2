"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { ease, viewport } from "@/lib/motion";

type ClipRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function ClipReveal({ children, className, delay = 0 }: ClipRevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={viewport}
      transition={{ duration: 1.2, ease, delay }}
    >
      {children}
    </motion.div>
  );
}