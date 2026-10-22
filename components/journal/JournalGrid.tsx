"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Post } from "@/lib/content/posts";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { PostCard } from "./PostCard";

export function JournalGrid({ posts }: { posts: Post[] }) {
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  const [active, setActive] = useState("All");
  const visible = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter articles by category" className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const selected = category === active;
          return (
            <button
              key={category}
              type="button"
              aria-pressed={selected}
              onClick={() => setActive(category)}
              className={cn(
                "relative rounded-full border px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-500",
                selected ? "border-foreground text-background" : "border-line hover:border-primary/50",
              )}
            >
              {selected && (
                <motion.span
                  layoutId="journal-filter"
                  transition={{ duration: 0.5, ease }}
                  className="absolute inset-0 rounded-full bg-foreground"
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {visible.length} {visible.length === 1 ? "article" : "articles"} shown
      </p>

      <ul className="mt-12 grid gap-14 md:mt-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((post, i) => (
            <motion.li
              key={post.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease }}
            >
              <PostCard post={post} index={i} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}