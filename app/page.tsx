import Link from "next/link";
import { fetchLiveIpos, fetchLivePosts } from "@/lib/api";
import { getAllCategories } from "@/lib/posts";
import ArticleCover from "@/components/ArticleCover";
import GmpTable from "@/components/GmpTable";
import IpoCard from "@/components/IpoCard";
import Pagination from "@/components/Pagination";
import { siteConfig } from "@/lib/site-config";
import { TrendingUp, Sparkles, BookOpen, Clock, ArrowRight, Flame, Calendar, ShieldCheck, ArrowUpRight } from "lucide-react";

export const revalidate = 60;

const ITEMS_PER_PAGE = 12;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page = "1", category = "All" } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  // Parallel fetch live IPOs and blog posts
  const [{ ipos: allIpos }, allPosts] = await Promise.all([
    fetchLiveIpos({ limit: 50 }),
    fetchLivePosts(),
  ]);

  const categories = getAllCategories();

  // Filter posts
  const filteredPosts =
    category === "All"
      ? allPosts
      : allPosts.filter((p) => p.category.toLowerCase() === category.toLowerCase());

  // Pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const isFirstPage = currentPage === 1 && category === "All";
  const heroPost = isFirstPage ? paginatedPosts[0] : null;
  const sidePosts = isFirstPage ? paginatedPosts.slice(1, 4) : [];
  const gridPosts = isFirstPage ? paginatedPosts.slice(4) : paginatedPosts;

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* Sharp Editorial Hero Header (No AI slop gradients) */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Institutional Primary Market Research</span>
            </div>
            <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-slate-900 dark:text-white leading-tight">
              {siteConfig.name}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2.5 leading-relaxed font-normal">
              Real-time Grey Market Premium (GMP) tracker, verified Red Herring Prospectus (DRHP) audits, anchor investor lock-in calendars, and SEBI regulatory playbooks.
            </p>
          </div>

          {/* KPI Mini Terminal Stats */}
          <div className="grid grid-cols-2 gap-3 min-w-[280px]">
            <div className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Active IPOs</span>
              <span className="font-mono text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5 block">{allIpos.length}</span>
              <span className="text-[10px] text-emerald-600 font-semibold font-mono">BSE / NSE Live</span>
            </div>
            <div className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Avg Expected Pop</span>
              <span className="font-mono text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5 block">+24.6%</span>
              <span className="text-[10px] text-slate-400 font-mono">Across Active Issues</span>
            </div>
          </div>
        </div>

        {/* Quick Filter Navigation Tabs */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <Link
            href="/ipo/gmp"
            className="px-3.5 py-1.5 rounded-md text-xs font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <Flame size={13} className="text-amber-400" /> Live GMP Table (Today)
          </Link>
          <Link
            href="/ipo/upcoming"
            className="px-3.5 py-1.5 rounded-md text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-400 transition-colors flex items-center gap-1.5"
          >
            <Calendar size={13} /> Upcoming 2026 Calendar
          </Link>
          <Link
            href="/ipo/open"
            className="px-3.5 py-1.5 rounded-md text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-400 transition-colors flex items-center gap-1.5"
          >
            <Clock size={13} /> Open For Bidding
          </Link>
          <Link
            href="/category/IPO%20Review"
            className="px-3.5 py-1.5 rounded-md text-xs font-semibold border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-slate-400 transition-colors flex items-center gap-1.5"
          >
            <BookOpen size={13} /> Prospectus Audits (80+)
          </Link>
        </div>
      </div>

      {/* High-Density Live GMP Data Table (Top Feature on Page 1) */}
      {isFirstPage && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-3.5">
            <div>
              <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Flame size={17} className="text-emerald-600" />
                <span>Live IPO Grey Market Premium (GMP) &amp; Status</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Hourly cross-checked quotes from active primary market dealer desks
              </p>
            </div>
            <Link
              href="/ipo/gmp"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1"
            >
              Full Screen Table <ArrowUpRight size={13} />
            </Link>
          </div>

          <GmpTable ipos={allIpos.slice(0, 6)} />
        </section>
      )}

      {/* Featured Breaking Research (Editorial Layout) */}
      {heroPost && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp size={17} className="text-emerald-600" />
              <span>Featured Prospectus Breakdown</span>
            </h2>
            <span className="text-xs text-slate-400">Zero Sponsor Bias · E-E-A-T Standards</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Featured */}
            <Link
              href={`/post/${heroPost.slug}`}
              className="lg:col-span-2 group rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:border-slate-400 dark:hover:border-slate-600 transition-all flex flex-col justify-between shadow-sm"
            >
              <div className="relative h-56 sm:h-72 w-full border-b border-slate-100 dark:border-slate-800">
                <ArticleCover title={heroPost.title} category={heroPost.category} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-slate-900/90 text-white backdrop-blur-md uppercase tracking-wider">
                    {heroPost.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-snug">
                    {heroPost.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-2.5 leading-relaxed line-clamp-3">
                    {heroPost.excerpt}
                  </p>
                </div>
                <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>By {heroPost.author || siteConfig.editorialAuthor} · {heroPost.readMins || 8} min read</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read Full Review →
                  </span>
                </div>
              </div>
            </Link>

            {/* Side Trending Stack */}
            <div className="flex flex-col gap-3">
              {sidePosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/post/${p.slug}`}
                  className="group rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-slate-400 dark:hover:border-slate-600 transition-all flex-1 flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-2">
                      {p.category}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                      {p.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {p.excerpt}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>{p.readMins || 6} min read</span>
                    <span className="text-emerald-600 font-bold">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Articles Stream Header & Category Selector */}
      <section>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen size={17} className="text-emerald-600" />
              <span>All Research &amp; Investor Playbooks</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Page {currentPage} of {totalPages} · {totalPosts} published financial reviews
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            {categories.map((cat) => {
              const isActive = category === cat;
              return (
                <Link
                  key={cat}
                  href={cat === "All" ? "/" : `/?category=${encodeURIComponent(cat)}`}
                  className={`rounded px-3 py-1 font-semibold transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-slate-400"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>

        {/* 3-Column Sharp Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {gridPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/post/${post.slug}`}
              className="group rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Clock size={11} /> {post.readMins || 6}m
                  </span>
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>{post.author || siteConfig.editorialAuthor}</span>
                <span className="font-bold text-emerald-600 group-hover:translate-x-0.5 transition-transform">
                  Read Audit →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* SSR Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/"
          otherParams={category !== "All" ? { category } : {}}
        />
      </section>
    </div>
  );
}
