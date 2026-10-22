"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { navItems, type NavItem } from "@/lib/navigation";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const linkBase =
  "relative py-2 text-[0.78rem] font-medium uppercase tracking-[0.16em] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-luxe hover:after:origin-left hover:after:scale-x-100";

const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden lg:block">
      <ul className="flex items-center gap-8 xl:gap-11">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          return item.children ? (
            <MegaItem key={item.href} item={item} active={active} />
          ) : (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(linkBase, active && "after:scale-x-100")}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function MegaItem({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(0);
  const panelId = useId();
  const children = item.children ?? [];
  const current = children[preview];

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        className={cn(linkBase, "flex items-center gap-1.5", active && "after:scale-x-100")}
      >
        {item.label}
        <ChevronDown
          aria-hidden
          className={cn("size-3.5 transition-transform duration-500 ease-luxe", open && "rotate-180")}
        />
      </button>

      <AnimatePresence>
        {open && (
          <div key="panel" className="absolute left-1/2 top-full w-[min(60rem,92vw)] -translate-x-1/2 pt-5">
            <motion.div
              id={panelId}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease }}
              className="grid grid-cols-[1fr_18rem] border border-line bg-background text-foreground shadow-[0_30px_60px_-30px_rgb(43_33_22/0.35)]"
            >
              <ul className="grid grid-cols-2 gap-x-8 p-8">
                {children.map((child, i) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onMouseEnter={() => setPreview(i)}
                      onFocus={() => setPreview(i)}
                      onClick={() => setOpen(false)}
                      className="group block py-3"
                    >
                      <span className="flex items-center gap-2 font-display text-xl transition-colors duration-300 group-hover:text-primary">
                        {child.label}
                        <ArrowUpRight
                          aria-hidden
                          className="size-4 -translate-x-1 opacity-0 transition-all duration-500 ease-luxe group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </span>
                      {child.description && (
                        <span className="mt-1 block text-sm text-primary/80">{child.description}</span>
                      )}
                    </Link>
                  </li>
                ))}
                {item.overviewLabel && (
                  <li className="col-span-2 mt-4 border-t border-line pt-5">
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-eyebrow uppercase text-primary transition-colors hover:text-foreground"
                    >
                      {item.overviewLabel} →
                    </Link>
                  </li>
                )}
              </ul>

              <div className="relative overflow-hidden bg-surface">
                <AnimatePresence initial={false}>
                  {current?.image && (
                    <motion.div
                      key={current.image}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease }}
                    >
                      <Image src={current.image} alt="" fill sizes="18rem" className="object-cover" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </li>
  );
}