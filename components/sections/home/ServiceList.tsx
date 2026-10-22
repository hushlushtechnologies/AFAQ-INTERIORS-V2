"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/lib/content/services";
import { ease } from "@/lib/motion";

const follow = { stiffness: 150, damping: 20, mass: 0.6 };

export function ServiceList() {
  const listRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, follow);
  const sy = useSpring(my, follow);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !listRef.current) return;
    const r = listRef.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  return (
    <div
      ref={listRef}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setActive(null)}
      className="relative mt-16 border-t border-line md:mt-24"
    >
      <ul>
        {services.map((service, i) => (
          <li key={service.slug}>
            <Reveal delay={Math.min(i, 4) * 0.06} y={24}>
              <Link
                href={`/services/${service.slug}`}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                data-dim={active !== null && active !== i}
                className="group grid grid-cols-[1fr_auto] items-center gap-6 border-b border-line py-6 transition-opacity duration-500 ease-luxe data-[dim=true]:opacity-35 md:grid-cols-[4rem_1.1fr_1fr_auto] md:py-9"
              >
                <span className="hidden text-eyebrow text-primary md:block">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="flex min-w-0 items-center gap-4">
                  <span className="relative size-14 shrink-0 overflow-hidden bg-surface can-hover:hidden">
                    <Image src={service.image} alt="" fill sizes="3.5rem" className="object-cover" />
                  </span>
                  <span className="font-display text-h3 transition-transform duration-500 ease-luxe can-hover:group-hover:translate-x-3">
                    {service.title}
                  </span>
                </span>

                <span className="hidden max-w-sm text-primary md:block">{service.summary}</span>

                <span
                  aria-hidden
                  className="flex size-11 items-center justify-center rounded-full border border-line transition-colors duration-500 ease-luxe group-hover:border-foreground group-hover:bg-foreground group-hover:text-background"
                >
                  <ArrowUpRight className="size-4 transition-transform duration-500 ease-luxe group-hover:rotate-45" />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* Cursor-following preview (mouse devices only) */}
      <motion.div
        aria-hidden
        style={reduce ? { x: mx, y: my } : { x: sx, y: sy }}
        className="pointer-events-none absolute left-0 top-0 z-10 hidden can-hover:block"
      >
        <motion.div
          initial={false}
          animate={{ scale: active === null ? 0 : 1, opacity: active === null ? 0 : 1 }}
          transition={{ duration: 0.5, ease }}
          className="relative h-80 w-64 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-surface shadow-[0_30px_60px_-25px_rgb(43_33_22/0.45)]"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={false}
              animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.15 }}
              transition={{ duration: 0.6, ease }}
              className="absolute inset-0"
            >
              <Image src={service.image} alt="" fill sizes="16rem" className="object-cover" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}