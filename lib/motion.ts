import type { Transition, Variants } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const;

export const duration = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
} as const;

export const viewport = {
  once: true,
  margin: "0px 0px -15% 0px",
} as const;

export const baseTransition: Transition = {
  duration: duration.base,
  ease,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});