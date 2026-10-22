"use client";

import { motion, type Variants } from "motion/react";
import { ease } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const letter: Variants = {
  hidden: { y: "105%" },
  visible: { y: "0%", transition: { duration: 1.1, ease } },
};

export function Wordmark({ text }: { text: string }) {
  return (
    <motion.p
      aria-hidden
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={container}
      className="container-luxe flex select-none justify-center whitespace-nowrap font-display text-[clamp(2.75rem,11.5vw,11rem)] leading-[0.9] text-tan"
    >
      {Array.from(text).map((char, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em]">
          <motion.span variants={letter} className="inline-block">
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}