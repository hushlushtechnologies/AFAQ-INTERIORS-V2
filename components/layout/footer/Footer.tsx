import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/layout/navbar/Logo";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/content/services";
import { companyLinks, legalLinks } from "@/lib/navigation";
import { siteConfig } from "@/lib/siteConfig";
import { BackToTop } from "./BackToTop";
import { Wordmark } from "./Wordmark";

const link = "text-background/75 transition-colors duration-300 hover:text-background";
const heading = "mb-6 text-eyebrow uppercase text-tan";

async function getYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await getYear();

  return (
    <footer className="relative overflow-hidden bg-foreground text-background">
      {/* ---------- Closing CTA ---------- */}
      <div className="container-luxe border-b border-background/15 py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Reveal y={16}>
              <p className="mb-6 flex items-center gap-4 text-eyebrow uppercase text-tan">
                <span aria-hidden className="h-px w-10 bg-tan" />
                Start a project
              </p>
            </Reveal>
            <SplitText
              as="h2"
              text="Let’s create a space that feels like yours."
              className="max-w-4xl font-display text-h1"
            />
          </div>

          <Reveal delay={0.2} className="lg:justify-self-end">
            <p className="max-w-md text-lead text-background/80">
              Tell us about your project and one of our design consultants will get back to you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/contact" on="dark" arrow>
                Book a Consultation
              </Button>
              <Button href={`https://wa.me/${siteConfig.whatsapp}`} on="dark" variant="outline">
                WhatsApp Us
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ---------- Link columns ---------- */}
      <div className="container-luxe grid gap-14 py-20 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
        <div className="max-w-sm">
          <Logo onDark />
          <p className="mt-6 text-background/75">
            Interior design and turnkey fit-out for residential, commercial and hospitality spaces across Dubai and
            the UAE.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            {siteConfig.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group inline-flex items-center gap-1 ${link}`}
                >
                  {social.label}
                  <ArrowUpRight
                    aria-hidden
                    className="size-3.5 transition-transform duration-500 ease-luxe group-hover:rotate-45"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Services">
          <h2 className={heading}>Services</h2>
          <ul className="space-y-3">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className={link}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className={heading}>Company</h2>
          <ul className="space-y-3">
            {companyLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={link}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>Visit us</h2>
          <address className="space-y-3 not-italic">
            <p className="text-background/75">{siteConfig.address}</p>
            <p>
              <a href={siteConfig.phone.href} className={link}>
                {siteConfig.phone.display}
              </a>
            </p>
            <p>
              <a href={`mailto:${siteConfig.email}`} className={link}>
                {siteConfig.email}
              </a>
            </p>
            <p className="text-sm text-background/60">{siteConfig.hours}</p>
          </address>

          <p className="mt-8 text-sm leading-relaxed text-background/60">
            Serving {siteConfig.serviceAreas.join(", ")}.
          </p>
        </div>
      </div>

      {/* ---------- Wordmark ---------- */}
      <Wordmark text={siteConfig.shortName} />

      {/* ---------- Bottom bar ---------- */}
      <div className="container-luxe flex flex-col gap-6 border-t border-background/15 py-8 text-sm text-background/60 md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {siteConfig.name}. All rights reserved.
        </p>
        <ul className="flex flex-wrap gap-6">
          {legalLinks.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition-colors hover:text-background">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <BackToTop />
      </div>
    </footer>
  );
}