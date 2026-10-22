import type { Metadata } from "next";
import { FeaturedPost } from "@/components/journal/FeaturedPost";
import { JournalGrid } from "@/components/journal/JournalGrid";
import { SplitText } from "@/components/motion/SplitText";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { posts } from "@/lib/content/posts";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";

const description =
  "Practical advice on planning, designing and building interiors in Dubai, from the Afaq Al Manzel design team.";

export const metadata: Metadata = {
  title: "Journal",
  description,
  alternates: { canonical: "/journal" },
  openGraph: { title: "Journal | Afaq Al Manzel Interiors", description, url: "/journal", images: ["/images/journal/hero.jpg"] },
};

const crumbs: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Journal", path: "/journal" },
];

export default function JournalPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <PageHero
        compact
        crumbs={crumbs}
        eyebrow="Journal"
        title="Ideas, guides and insights."
        intro="Practical advice on planning, designing and building interiors in Dubai, from the team that does it every day."
        image="/images/journal/hero.jpg"
      />

      <section className="py-24 md:py-32">
        <div className="container-luxe">
          <FeaturedPost post={featured} />
        </div>
      </section>

      {rest.length > 0 && (
        <section className="border-t border-line py-24 md:py-32 lg:pb-40">
          <div className="container-luxe">
            <SplitText as="h2" text="More articles" className="mb-12 font-display text-h2" />
            <JournalGrid posts={rest} />
          </div>
        </section>
      )}
    </>
  );
}