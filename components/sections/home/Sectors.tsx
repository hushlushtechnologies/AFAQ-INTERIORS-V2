 import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { sectors } from "@/lib/content/sectors";

export function Sectors() {
  return (
    <section className="bg-surface/60 py-24 md:py-32 lg:py-40">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Sectors"
          title="Three sectors. One standard of care."
          intro="Whether it is a family villa, a working office or a restaurant that seats two hundred, every project runs through the same coordinated process."
        />

        <div className="mt-16 flex flex-col gap-4 md:mt-24 lg:h-[clamp(32rem,72vh,44rem)] lg:flex-row">
          {sectors.map((sector, i) => (
            <ClipReveal
              key={sector.slug}
              delay={i * 0.15}
              className="group relative min-h-[28rem] lg:min-h-0 lg:flex-1 lg:transition-[flex-grow] lg:duration-700 lg:ease-luxe lg:hover:flex-[2.2] lg:focus-within:flex-[2.2]"
            >
              <Link
                href={`/projects?sector=${sector.slug}`}
                className="absolute inset-0 block overflow-hidden bg-foreground text-background"
              >
                <Image
                  src={sector.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-105"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-foreground/90 via-foreground/40 to-transparent"
                />

                {/* Arrow — pinned top-right, independent of the title */}
                <span
                  aria-hidden
                  className="absolute right-6 top-6 flex size-11 items-center justify-center rounded-full border border-background/30 transition-colors duration-500 group-hover:bg-background group-hover:text-foreground md:right-8 md:top-8"
                >
                  <ArrowUpRight className="size-4 transition-transform duration-500 ease-luxe group-hover:rotate-45" />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 lg:p-10">
                  <div className="min-w-0">
                    <span className="text-eyebrow text-tan">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-3 font-display text-[clamp(2rem,1.2rem+2vw,3.25rem)] leading-none">
                      {sector.title}
                    </h3>
                  </div>

                  <div className="grid grid-rows-[1fr] transition-[grid-template-rows,opacity] duration-700 ease-luxe lg:can-hover:grid-rows-[0fr] lg:can-hover:opacity-0 lg:can-hover:group-hover:grid-rows-[1fr] lg:can-hover:group-hover:opacity-100 lg:can-hover:group-focus-within:grid-rows-[1fr] lg:can-hover:group-focus-within:opacity-100">
                    <div className="overflow-hidden">
                      <p className="mt-5 max-w-md text-background/85">{sector.summary}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {sector.scope.map((item) => (
                          <li
                            key={item}
                            className="border border-background/25 px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.16em]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <span className="sr-only">View {sector.title.toLowerCase()} projects</span>
              </Link>
            </ClipReveal>
          ))}
        </div>
      </div>
    </section>
  );
}