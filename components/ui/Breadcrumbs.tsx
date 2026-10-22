import Link from "next/link";
import type { Crumb } from "@/lib/seo";
import { cn } from "@/lib/utils";

export function Breadcrumbs({ crumbs, className }: { crumbs: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.18em] text-background/70">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {last ? (
                <span aria-current="page" className={cn("text-tan", "line-clamp-1 max-w-[40ch]")}>
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="transition-colors hover:text-background">
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}