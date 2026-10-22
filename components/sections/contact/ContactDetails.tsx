import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import { DrawLine } from "@/components/motion/DrawLine";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { siteConfig } from "@/lib/siteConfig";

const methods = [
  { icon: Phone, label: "Call us", value: siteConfig.phone.display, href: siteConfig.phone.href, external: false },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with a design consultant",
    href: `https://wa.me/${siteConfig.whatsapp}`,
    external: true,
  },
  { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}`, external: false },
];

export function ContactDetails() {
  return (
    <div className="lg:sticky lg:top-32 lg:self-start">
      <Reveal y={16}>
        <p className="mb-6 flex items-center gap-4 text-eyebrow uppercase text-primary">
          <span aria-hidden className="h-px w-10 bg-accent" />
          Talk to us directly
        </p>
      </Reveal>
      <SplitText as="h2" text="Prefer a conversation?" className="font-display text-h2" />

      <ul className="mt-12">
        {methods.map((method, i) => {
          const Icon = method.icon;
          return (
            <li key={method.label}>
              <DrawLine delay={i * 0.12} className="bg-line" />
              <Reveal delay={0.15 + i * 0.12}>
                <a
                  href={method.href}
                  {...(method.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-5 py-6"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface text-primary transition-colors duration-500 group-hover:bg-foreground group-hover:text-background">
                    <Icon aria-hidden className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-eyebrow uppercase text-primary">{method.label}</span>
                    <span className="mt-1 block truncate font-display text-xl md:text-2xl">{method.value}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 shrink-0 text-primary transition-transform duration-500 ease-luxe group-hover:rotate-45"
                  />
                  {method.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <DrawLine delay={0.36} className="bg-line" />
      <Reveal delay={0.5} className="pt-8">
        <p className="text-eyebrow uppercase text-primary">Visit the studio</p>
        <address className="mt-3 not-italic">
          <p className="text-lead">{siteConfig.address}</p>
          <p className="mt-2 text-sm text-primary">{siteConfig.hours}</p>
        </address>
      </Reveal>
    </div>
  );
}