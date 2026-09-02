import type { MetadataRoute } from "next";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const cats = getAllCategories();
  const now = new Date();

  const staticRoutes = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/disclaimer",
    "/search",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
  }));

  const categoryRoutes = cats.map((c) => ({
    url: `${siteConfig.url}/category/${encodeURIComponent(c)}`,
    lastModified: now,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${siteConfig.url}/post/${p.slug}`,
    lastModified: p.publishedAt ? new Date(p.publishedAt) : now,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
