"use client";

import { motion } from "motion/react";
import { Check, Minus } from "lucide-react";
import { Counter } from "@/components/motion/Counter";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { comparisonRows, separateParties } from "@/lib/content/about";
import { ease, viewport } from "@/lib/motion";

const pad = (n: number) => String(n).padStart(2, "0");
const label = "text-[0.68rem] uppercase tracking-[0.16em]";

export function Comparison() {
  return (
    <section className="bg-surface/60 py-24 md:py-32 lg:py-40">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Why turnkey"
          title="One contract instead of five."
          intro="Most fit-outs involve a designer, a contractor and a chain of specialists, each with their own contract and schedule. We bring every discipline into one team."
        />

        {/* ---------- Two cards ---------- */}
        <div className="mt-16 grid gap-6 md:mt-24 lg:grid-cols-2">
          {/* The usual route */}
          <Reveal className="flex flex-col border border-line bg-background p-8 md:p-12">
            <p className="text-eyebrow uppercase text-primary">The usual route</p>
            <p className="mt-6 flex items-end gap-5">
              <span className="font-display text-display leading-none">
                <Counter value={separateParties.length} duration={1.4} />
              </span>
              <span className="max-w-[12rem] pb-3 text-primary">separate contracts for you to manage</span>
            </p>

            <ul className="mt-10 space-y-3">
              {separateParties.map((party, i) => (
                <motion.li
                  key={party}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.08 }}
                  className="flex items-center justify-between gap-4 border-b border-line pb-3"
                >
                  <span>{party}</span>
                  <span className={`${label} text-primary`}>Contract {pad(i + 1)}</span>
                </motion.li>
              ))}
            </ul>
          </Reveal>

          {/* With Afaq Al Manzel */}
          <Reveal delay={0.15} className="flex flex-col bg-foreground p-8 text-background md:p-12">
            <p className="text-eyebrow uppercase text-tan">With Afaq Al Manzel</p>
            <p className="mt-6 flex items-end gap-5">
              <span className="font-display text-display leading-none text-tan">1</span>
              <span className="max-w-[12rem] pb-3 text-background/80">contract, one team and one programme</span>
            </p>

            <div className="mt-10 border border-background/20 p-6 md:p-8">
              <p className={`${label} text-tan`}>All included</p>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {separateParties.map((party, i) => (
                  <motion.li
                    key={party}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={viewport}
                    transition={{ duration: 0.5, ease, delay: 0.5 + i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-tan text-foreground">
                      <Check aria-hidden className="size-3.5" />
                    </span>
                    {party}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* ---------- Comparison rows ---------- */}
        <div className="mt-16 md:mt-24">
          {/* Visual header (desktop only, hidden from screen readers) */}
          <div aria-hidden className="hidden border-b border-foreground/20 md:grid md:grid-cols-[1fr_2fr_2fr]">
            <p className={`${label} py-4 pr-6 text-primary`}>Aspect</p>
            <p className={`${label} py-4 pr-6 text-primary`}>The usual route</p>
            <p className={`${label} bg-foreground px-6 py-4 text-tan`}>Afaq Al Manzel</p>
          </div>

          <dl>
            {comparisonRows.map((row, i) => (
              <motion.div
                key={row.aspect}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.6, ease, delay: i * 0.06 }}
                className="grid gap-4 border-b border-line py-6 md:grid-cols-[1fr_2fr_2fr] md:gap-0 md:py-0"
              >
                <dt className="font-display text-xl md:py-7 md:pr-6">{row.aspect}</dt>

                <dd className="flex gap-3 text-primary md:py-7 md:pr-6">
                  <Minus aria-hidden className="mt-1 size-4 shrink-0 text-accent" />
                  <span>
                    <span className={`${label} mb-1 block md:sr-only`}>The usual route</span>
                    {row.usual}
                  </span>
                </dd>

                <dd className="flex gap-3 font-medium md:bg-foreground/[0.04] md:px-6 md:py-7">
                  <Check aria-hidden className="mt-1 size-4 shrink-0 text-primary" />
                  <span>
                    <span className={`${label} mb-1 block font-normal text-primary md:sr-only`}>
                      With Afaq Al Manzel
                    </span>
                    {row.turnkey}
                  </span>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>

        <Reveal className="mt-14 flex justify-center md:mt-20">
          <Button href="/contact" arrow>
            Talk to Us About Your Project
          </Button>
        </Reveal>
      </div>
    </section>
  );
}