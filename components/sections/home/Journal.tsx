import { PostCard } from "@/components/journal/PostCard";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { latestPosts } from "@/lib/content/posts";

export function Journal() {
  const posts = latestPosts(3);

  return (
    <section className="py-24 md:py-32 lg:py-40">
      <div className="container-luxe">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading className="lg:grid-cols-1" eyebrow="Journal" title="Ideas, guides and insights." />
          <Reveal>
            <Button href="/journal" variant="outline" arrow>
              View all articles
            </Button>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-14 md:mt-24 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <PostCard post={post} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}