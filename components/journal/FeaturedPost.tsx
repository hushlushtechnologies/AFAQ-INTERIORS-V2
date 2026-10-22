import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import type { Post } from "@/lib/content/posts";
import { formatDate } from "@/lib/format";
import { titleLinkClass } from "./PostCard";

export function FeaturedPost({ post }: { post: Post }) {
  return (
    <article className="group relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
      <ClipReveal className="relative aspect-[4/3] overflow-hidden bg-surface lg:aspect-[16/11]">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-105"
        />
      </ClipReveal>

      <Reveal delay={0.2}>
        <p className="flex items-center gap-3 text-eyebrow uppercase text-primary">
          <span className="bg-foreground px-2.5 py-1 text-background">Latest</span>
          {post.category}
        </p>

        <h2 className="mt-6 font-display text-h2">
          <Link href={`/journal/${post.slug}`} className={titleLinkClass}>
            {post.title}
          </Link>
        </h2>

        <p className="mt-6 text-lead text-primary">{post.excerpt}</p>

        <p className="mt-8 flex items-center gap-3 text-sm">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden className="size-1 rounded-full bg-accent" />
          {post.readTime} min read
        </p>

        <span aria-hidden className="mt-10 inline-flex items-center gap-3 text-eyebrow uppercase">
          Read article
          <ArrowRight className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" />
        </span>
      </Reveal>
    </article>
  );
}