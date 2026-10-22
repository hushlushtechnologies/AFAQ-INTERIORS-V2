import Image from "next/image";
import Link from "next/link";
import { ClipReveal } from "@/components/motion/ClipReveal";
import { Reveal } from "@/components/motion/Reveal";
import type { Post } from "@/lib/content/posts";
import { formatDate } from "@/lib/format";

export const titleLinkClass =
  "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-luxe after:absolute after:inset-0 group-hover:bg-[length:100%_1px] focus-visible:bg-[length:100%_1px]";

type PostCardProps = {
  post: Post;
  index?: number;
  headingLevel?: "h2" | "h3";
};

export function PostCard({ post, index = 0, headingLevel: Heading = "h3" }: PostCardProps) {
  const delay = (index % 3) * 0.12;

  return (
    <article className="group relative">
      <ClipReveal delay={delay} className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Image
          src={post.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1400ms] ease-luxe group-hover:scale-105"
        />
      </ClipReveal>

      <Reveal delay={0.2 + delay}>
        <div className="mt-6 flex items-center gap-3 text-eyebrow uppercase text-primary">
          <span>{post.category}</span>
          <span aria-hidden className="size-1 rounded-full bg-accent" />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>

        <Heading className="mt-4 font-display text-2xl leading-snug md:text-[1.75rem]">
          <Link href={`/journal/${post.slug}`} className={titleLinkClass}>
            {post.title}
          </Link>
        </Heading>

        <p className="mt-3 line-clamp-2 text-primary">{post.excerpt}</p>
        <p className="mt-5 text-sm">{post.readTime} min read</p>
      </Reveal>
    </article>
  );
}