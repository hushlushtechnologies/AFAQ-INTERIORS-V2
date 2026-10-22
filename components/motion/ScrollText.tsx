"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

type ScrollTextProps = {
  text: string;
  className?: string;
};

export function ScrollText({ text, className }: ScrollTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          still={!!reduce}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

type WordProps = {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  still: boolean;
};

function Word({ children, progress, range, still }: WordProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <>
      <motion.span style={still ? undefined : { opacity }}>{children}</motion.span>{" "}
    </>
  );
}