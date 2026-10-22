"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { featuredProjects } from "@/lib/content/projects";
import { sectors } from "@/lib/content/sectors";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");
const sectorTitle = (slug: string) => sectors.find((s) => s.slug === slug)?.title ?? slug;

const cardWidth = "w-[78vw] sm:w-[55vw] lg:w-auto";
const frameHeight = "lg:h-[min(52svh,36rem)]";

export function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isLg = useMediaQuery("(min-width: 1024px)");
  const pinned = isLg && !reduce;

  const [distance, setDistance] = useState(0);
  const distanceMV = useMotionValue(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!pinned || !track) return;

    const measure = () => {
      const d = Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
      distanceMV.set(d);
      setDistance(d);
    };

    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned, distanceMV]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(() => -scrollYProgress.get() * distanceMV.get());

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div
        className={cn(
          "py-24 md:py-32",
          pinned && "sticky top-0 flex h-svh flex-col justify-center overflow-hidden py-0 md:py-0",
        )}
      >
        <div className="container-luxe flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading className="lg:grid-cols-1" eyebrow="Selected work" title="Recent projects across the UAE." />
          <Link
            href="/projects"
            className="group inline-flex shrink-0 items-center gap-3 text-eyebrow uppercase text-primary transition-colors hover:text-foreground"
          >
            View all projects
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform duration-500 ease-luxe group-hover:rotate-45"
            />
          </Link>
        </div>

        <div
          className={cn(
            "mt-12 md:mt-16",
            !pinned &&
              "scroll-px-gutter snap-x snap-mandatory overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          )}
        >
          <motion.ul
            ref={trackRef as React.Ref<HTMLUListElement>}
            style={pinned ? { x } : undefined}
            className="flex w-max items-start gap-5 px-gutter md:gap-8"
          >
            {featuredProjects.map((project, i) => (
              <li key={project.slug} className={cn("shrink-0 snap-start", cardWidth, i % 2 === 1 && "lg:mt-16")}>
                <Link href={`/projects/${project.slug}`} className="group block">
                  <div
                    className={cn(
                      "relative aspect-[4/5] overflow-hidden bg-surface lg:w-auto",
                      frameHeight,
                      i % 2 === 1 ? "lg:aspect-[5/4]" : "lg:aspect-[4/5]",
                    )}
                  >
                    <Image
                      src={project.cover}
                      alt={`${project.title}, ${project.location}`}
                      fill
                      sizes="(min-width: 1024px) 45vw, 78vw"
                      className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 bg-background/90 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em] backdrop-blur-sm">
                      {sectorTitle(project.sector)}
                    </span>
                  </div>

                  <div className="mt-5 flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-display text-2xl md:text-3xl">{project.title}</h3>
                      <p className="mt-1 text-sm text-primary">
                        {project.location} · {project.year}
                      </p>
                    </div>
                    <span aria-hidden className="pt-2 text-eyebrow text-primary">
                      {pad(i + 1)}
                    </span>
                  </div>
                </Link>
              </li>
            ))}

            {/* End card */}
            <li className={cn("shrink-0 snap-start", cardWidth)}>
              <Link
                href="/projects"
                className={cn(
                  "group flex aspect-[4/5] flex-col justify-between bg-foreground p-8 text-background lg:aspect-square lg:w-auto md:p-10",
                  frameHeight,
                )}
              >
                <span className="text-eyebrow uppercase text-tan">Portfolio</span>
                <span>
                  <span className="block font-display text-h3">Explore every project</span>
                  <span className="mt-6 flex size-14 items-center justify-center rounded-full border border-background/30 transition-colors duration-500 group-hover:bg-background group-hover:text-foreground">
                    <ArrowUpRight
                      aria-hidden
                      className="size-5 transition-transform duration-500 ease-luxe group-hover:rotate-45"
                    />
                  </span>
                </span>
              </Link>
            </li>
          </motion.ul>
        </div>

        {pinned && (
          <div className="container-luxe mt-10">
            <div className="h-px bg-line">
              <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-foreground" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}