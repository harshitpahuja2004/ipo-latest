import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { renderMarkdown, extractToc } from "@/lib/markdown";
import ArticleCover from "@/components/ArticleCover";
import { siteConfig } from "@/lib/site-config";
import { Clock, ShieldCheck, ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Article Not Found", robots: { index: false } };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      url: `${siteConfig.url}/post/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author || siteConfig.editorialAuthor],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const toc = extractToc(post.content);
  const related = getRelatedPosts(slug, 3);
  const renderedContent = renderMarkdown(post.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author || siteConfig.editorialAuthor,
      jobTitle: siteConfig.editorialRole,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-xs text-slate-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-600 flex items-center gap-1">
          <ArrowLeft size={12} /> Home
        </Link>
        <span>/</span>
        <Link href={`/category/${encodeURIComponent(post.category)}`} className="hover:text-emerald-600">
          {post.category}
        </Link>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 truncate max-w-xs">{post.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-10">
        <article className="min-w-0">
          {/* Header */}
          <header className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                {post.category}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock size={12} /> {post.readMins || 8} min read
              </span>
            </div>

            <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white tracking-tight leading-[1.2]">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-4 leading-relaxed font-normal">
                {post.excerpt}
              </p>
            )}

            {/* Author Byline Card */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  HP
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-900 dark:text-white">
                      {post.author || siteConfig.editorialAuthor}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium">
                      Primary Market Desk
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Published on {post.publishedAt} · Verified Analysis
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
                <ShieldCheck size={14} />
                <span>SEBI Regulatory &amp; RHP Audited</span>
              </div>
            </div>
          </header>

          {/* Visual Header Banner */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 mb-8 h-56 sm:h-72">
            <ArticleCover title={post.title} category={post.category} className="h-full w-full object-cover" />
          </div>

          {/* Quick Highlights Callout */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 mb-8">
            <h3 className="font-bold text-sm text-emerald-800 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Editorial Key Takeaways</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              This analysis is based on official Draft Red Herring Prospectus (DRHP) filings, historical peer valuation multiples, and exchange data. Figures are audited for institutional accuracy.
            </p>
          </div>

          {/* Table of Contents */}
          {toc.length > 2 && (
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-5 mb-8">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <BookOpen size={14} /> In This Article
              </h4>
              <ol className="space-y-2 text-xs sm:text-sm">
                {toc.map((item, i) => (
                  <li key={item.id} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">{i + 1}.</span>
                    <a href={`#${item.id}`} className="text-slate-700 dark:text-slate-300 hover:text-emerald-600 hover:underline">
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Main Article Body */}
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200">
            {renderedContent}
          </div>

          {/* Author Bio Box */}
          <div className="mt-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col sm:flex-row gap-5 items-start">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
              HP
            </div>
            <div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                About {post.author || siteConfig.editorialAuthor}
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Primary Market Analyst &amp; Senior Financial Journalist · {siteConfig.name}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2.5 leading-relaxed">
                Harshit specializes in reading SEBI Red Herring Prospectuses, institutional anchor allocations, and forensic balance sheet audits. Every report follows rigorous E-E-A-T research standards without promoter sponsorship.
              </p>
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <span>Related Analyses</span>
            </h3>
            <div className="space-y-4">
              {related.map((r) => (
                <Link key={r.slug} href={`/post/${r.slug}`} className="group block border-b border-slate-100 dark:border-slate-800 pb-3 last:border-0 last:pb-0">
                  <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wide block mb-1">
                    {r.category}
                  </span>
                  <h4 className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 leading-snug line-clamp-2">
                    {r.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">{r.readMins || 6} min read</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-800 p-5 text-center bg-slate-50 dark:bg-slate-900/40">
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Got Feedback or Correction?</p>
            <p className="text-[11px] text-slate-400 mt-1">We review every reader correction within 24 hours.</p>
            <Link href="/contact" className="mt-3 inline-block rounded-lg bg-emerald-600 text-white px-4 py-1.5 text-xs font-semibold">
              Contact Desk
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
