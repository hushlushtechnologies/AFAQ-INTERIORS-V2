"use client";

import { motion } from "motion/react";
import { ease, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

type DrawLineProps = { className?: string; delay?: number };

export function DrawLine({ className, delay = 0 }: DrawLineProps) {
  return (
    <motion.span
      aria-hidden
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewport}
      transition={{ duration: 1.2, ease, delay }}
      className={cn("block h-px origin-left bg-foreground", className)}
    />
  );
}