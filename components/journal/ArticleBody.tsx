import Image from "next/image";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import type { ArticleBlock } from "@/lib/content/posts";
import { cn, slugify } from "@/lib/utils";

const dropCap =
  "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.5rem] first-letter:leading-[0.8] first-letter:text-primary";

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="max-w-2xl">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={i}
                className={cn(
                  "mt-6 text-lg leading-[1.85] text-foreground/85 first:mt-0",
                  i === 0 && cn("text-xl", dropCap),
                )}
              >
                {block.text}
              </p>
            );

          case "heading":
            return (
              <h2 key={i} id={slugify(block.text)} className="mt-16 scroll-mt-32 font-display text-h3">
                {block.text}
              </h2>
            );

          case "list":
            return (
              <ul key={i} className="mt-6 space-y-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-4 text-lg leading-relaxed text-foreground/85">
                    <span aria-hidden className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "quote":
            return (
              <Reveal key={i}>
                <blockquote className="my-14 border-l-2 border-accent pl-6 font-display text-h3 leading-snug md:pl-10">
                  <p>“{block.text}”</p>
                </blockquote>
              </Reveal>
            );

          case "image":
            return (
              <figure key={i} className="my-14">
                <ClipReveal className="relative aspect-[3/2] overflow-hidden bg-surface">
                  <Image src={block.src} alt={block.alt} fill sizes="(min-width: 1024px) 42rem, 100vw" className="object-cover" />
                </ClipReveal>
                {block.caption && <figcaption className="mt-4 text-sm text-primary">{block.caption}</figcaption>}
              </figure>
            );
        }
      })}
    </div>
  );
}