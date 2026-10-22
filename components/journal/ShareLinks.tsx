"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const pill =
  "inline-flex rounded-full border border-line px-4 py-2 text-[0.7rem] uppercase tracking-[0.16em] transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background";

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${enc(`${title} ${url}`)}`, external: true },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, external: true },
    { label: "Email", href: `mailto:?subject=${enc(title)}&body=${enc(url)}`, external: false },
  ];

  return (
    <div>
      <p className="text-eyebrow uppercase text-primary">Share this article</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={pill}
            >
              {link.label}
              {link.external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </li>
        ))}
        <li>
          <button type="button" onClick={copy} className={cn(pill, copied && "border-foreground bg-foreground text-background")}>
            {copied ? "Link copied" : "Copy link"}
          </button>
        </li>
      </ul>
      <span aria-live="polite" className="sr-only">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}