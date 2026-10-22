"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type CounterProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

function format(n: number, decimals: number, prefix: string, suffix: string) {
  const num = n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${num}${suffix}`;
}

export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2.2,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const final = format(value, decimals, prefix, suffix);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    if (reduce) {
      el.textContent = format(value, decimals, prefix, suffix);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = format(v, decimals, prefix, suffix);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, decimals, prefix, suffix, duration]);

  return (
    <span className={cn("inline-grid tabular-nums", className)}>
      <span className="sr-only">{final}</span>
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {final}
      </span>
      <span ref={ref} aria-hidden className="col-start-1 row-start-1">
        {format(0, decimals, prefix, suffix)}
      </span>
    </span>
  );
}