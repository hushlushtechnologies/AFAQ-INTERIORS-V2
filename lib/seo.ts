import { siteConfig } from "@/lib/siteConfig";
import type { Post } from "@/lib/content/posts";

export type Crumb = { name: string; path: string };

export const absoluteUrl = (path: string) => new URL(path, siteConfig.url).toString();

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.name,
    url: siteConfig.url,
    image: absoluteUrl("/images/about/hero.jpg"),
    telephone: siteConfig.phone.href.replace("tel:", ""),
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.addressParts.street,
      addressLocality: siteConfig.addressParts.locality,
      addressCountry: siteConfig.addressParts.country,
    },
    areaServed: siteConfig.serviceAreas.map((name) => ({ "@type": "AdministrativeArea", name })),
    openingHours: siteConfig.openingHours,
    sameAs: siteConfig.socials.map((s) => s.href),
  };
}


export function articleJsonLd(post: Post) {
  const url = absoluteUrl(`/journal/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [absoluteUrl(post.image)],
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/brand/logo.svg") },
    },
    mainEntityOfPage: url,
  };
}