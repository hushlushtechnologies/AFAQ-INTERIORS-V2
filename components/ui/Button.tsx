 import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { cn } from "@/lib/utils";

const base =
  "group inline-flex items-center justify-center gap-3 px-7 py-4 text-[0.75rem] font-medium uppercase tracking-[0.16em] transition-colors duration-500 ease-luxe disabled:pointer-events-none disabled:opacity-60";

const styles = {
  solid: {
    light: "bg-primary text-background hover:bg-foreground",
    dark: "bg-background text-foreground hover:bg-tan",
  },
  outline: {
    light: "border border-primary/40 text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
    dark: "border border-background/40 text-background hover:bg-background hover:text-foreground",
  },
} as const;

type ButtonProps = {
  children: ReactNode;
  variant?: keyof typeof styles;
  on?: "light" | "dark";
  arrow?: boolean;
  magnetic?: boolean;
  href?: string;
  className?: string;
} & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({
  children,
  variant = "solid",
  on = "light",
  arrow = false,
  magnetic = true,
  href,
  className,
  type = "button",
  ...buttonProps
}: ButtonProps) {
  const classes = cn(base, styles[variant][on], className);
  const isExternal = href?.startsWith("http");

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1"
        />
      )}
      {isExternal && <span className="sr-only">(opens in a new tab)</span>}
    </>
  );

  const element = href ? (
    isExternal ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  ) : (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );

  return magnetic ? <Magnetic>{element}</Magnetic> : element;
}