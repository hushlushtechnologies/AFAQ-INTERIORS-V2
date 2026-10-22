import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

type LogoProps = { onDark?: boolean; className?: string };

export function Logo({ onDark = false, className }: LogoProps) {
  const img = "object-contain object-left transition-opacity duration-500 ease-luxe";
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name}, home`}
      className={cn("relative block h-11 w-40 shrink-0 lg:h-12 lg:w-44", className)}
    >
      <Image src="/images/logo.svg" alt="" fill priority sizes="11rem" className={cn(img, onDark ? "opacity-100" : "opacity-0")} />
      <Image src="/images/logo.svg" alt="" fill priority sizes="11rem" className={cn(img, onDark ? "opacity-0" : "opacity-100")} />
    </Link>
  );
}