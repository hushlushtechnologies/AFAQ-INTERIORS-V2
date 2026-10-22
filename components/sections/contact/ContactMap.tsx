import { ArrowUpRight } from "lucide-react";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import { siteConfig } from "@/lib/siteConfig";

export function ContactMap() {
  return (
    <section className="pb-24 md:pb-32 lg:pb-40">
      <div className="container-luxe">
        <ClipReveal className="relative aspect-[4/5] overflow-hidden bg-surface sm:aspect-[16/9] lg:aspect-[21/9]">
          <iframe
            src={siteConfig.map.embed}
            title={`Map showing the ${siteConfig.name} studio`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 h-full w-full [filter:grayscale(0.85)_sepia(0.2)_contrast(1.05)]"
          />

          <Reveal
            delay={0.6}
            className="absolute bottom-4 left-4 right-4 bg-background p-6 shadow-[0_30px_60px_-30px_rgb(43_33_22/0.4)] sm:right-auto sm:max-w-xs md:bottom-8 md:left-8 md:p-8"
          >
            <p className="text-eyebrow uppercase text-primary">Our studio</p>
            <p className="mt-3 font-display text-xl">{siteConfig.address}</p>
            <p className="mt-2 text-sm text-primary">{siteConfig.hours}</p>
            <a
              href={siteConfig.map.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 text-eyebrow uppercase text-foreground"
            >
              Get directions
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform duration-500 ease-luxe group-hover:rotate-45"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Reveal>
        </ClipReveal>
      </div>
    </section>
  );
}