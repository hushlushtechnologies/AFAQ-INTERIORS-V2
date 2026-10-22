import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export function TopBar() {
  const areas = [...siteConfig.serviceAreas, ...siteConfig.serviceAreas];

  return (
    <div className="border-b border-current/15">
      <div className="container-luxe flex h-10 items-center gap-8 text-[0.7rem] uppercase tracking-[0.2em]">
        <span className="shrink-0 opacity-70">Serving the UAE</span>

        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max animate-marquee motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex shrink-0 items-center gap-10 pr-10">
                {areas.map((area, i) => (
                  <li key={`${area}-${i}`} className="flex items-center gap-10">
                    <span>{area}</span>
                    <span aria-hidden className="size-1 rounded-full bg-current opacity-50" />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <a href={siteConfig.phone.href} className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-70">
          <Phone aria-hidden className="size-3.5" />
          {siteConfig.phone.display}
        </a>
      </div>
    </div>
  );
}