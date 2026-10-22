import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/journal/ArticleBody";
import { ArticleProgress } from "@/components/journal/ArticleProgress";
import { PostCard } from "@/components/journal/PostCard";
import { ShareLinks } from "@/components/journal/ShareLinks";
import { TableOfContents } from "@/components/journal/TableOfContents";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { author, getPost, headingsOf, posts, relatedPosts } from "@/lib/content/posts";
import { formatDate } from "@/lib/format";
import { absoluteUrl, articleJsonLd, breadcrumbJsonLd, type Crumb } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

  

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const path = `/journal/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: path,
      publishedTime: post.date,
      images: [post.image],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const crumbs: Crumb[] = [
    { name: "Home", path: "/" },
    { name: "Journal", path: "/journal" },
    { name: post.title, path: `/journal/${post.slug}` },
  ];
  const headings = headingsOf(post);
  const related = relatedPosts(post.slug, 3);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={articleJsonLd(post)} />

      <article>
        {/* ---------- Header ---------- */}
        <header className="bg-foreground pb-36 pt-36 text-background md:pb-52 md:pt-44">
          <div className="container-luxe">
            <Reveal y={12}>
              <Breadcrumbs crumbs={crumbs} />
            </Reveal>

            <Reveal y={12} delay={0.1}>
              <p className="mt-10 flex flex-wrap items-center gap-3 text-eyebrow uppercase text-tan">
                <span>{post.category}</span>
                <span aria-hidden className="size-1 rounded-full bg-tan" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </p>
            </Reveal>

            <SplitText
              as="h1"
              trigger="mount"
              delay={0.2}
              text={post.title}
              className="mt-6 max-w-5xl font-display text-h1"
            />

            <Reveal delay={0.6}>
              <p className="mt-8 max-w-2xl text-lead text-background/80">{post.excerpt}</p>
            </Reveal>
            <Reveal delay={0.7}>
              <p className="mt-10 text-sm text-background/60">
                By {author} · {post.readTime} min read
              </p>
            </Reveal>
          </div>
        </header>

        {/* ---------- Cover (overlaps header) ---------- */}
        <div className="container-luxe -mt-24 md:-mt-36">
          <div className="relative aspect-[4/3] overflow-hidden bg-surface md:aspect-[21/9]">
            <Parallax className="absolute inset-0">
              <Image src={post.image} alt="" fill priority sizes="100vw" className="object-cover" />
            </Parallax>
          </div>
        </div>

        {/* ---------- Body ---------- */}
        <ArticleProgress>
          <div className="container-luxe grid gap-16 py-20 md:py-28 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-24">
            <aside className="order-last lg:order-first">
              <div className="space-y-12 lg:sticky lg:top-32">
                {headings.length > 0 && <TableOfContents headings={headings} className="hidden lg:block" />}
                <ShareLinks url={absoluteUrl(`/journal/${post.slug}`)} title={post.title} />
              </div>
            </aside>

            <ArticleBody blocks={post.body} />
          </div>
        </ArticleProgress>
      </article>

      {/* ---------- Keep reading ---------- */}
      {related.length > 0 && (
        <section className="border-t border-line py-24 md:py-32">
          <div className="container-luxe">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <SplitText as="h2" text="Keep reading" className="font-display text-h2" />
              <Reveal>
                <Button href="/journal" variant="outline" arrow>
                  All articles
                </Button>
              </Reveal>
            </div>

            <ul className="mt-14 grid gap-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {related.map((item, i) => (
                <li key={item.slug}>
                  <PostCard post={item} index={i} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}