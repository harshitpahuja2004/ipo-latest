import Link from "next/link";
import { fetchLiveIpos, fetchLivePosts } from "@/lib/api";
import { getAllCategories } from "@/lib/posts";
import ArticleCover from "@/components/ArticleCover";
import IpoCard from "@/components/IpoCard";
import Pagination from "@/components/Pagination";
import { siteConfig } from "@/lib/site-config";
import { TrendingUp, Sparkles, BookOpen, Clock, ArrowRight, Flame, Calendar, ShieldCheck } from "lucide-react";

export const revalidate = 60;

const ITEMS_PER_PAGE = 12;

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { page = "1", category = "All" } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  // Parallel fetch: Live IPOs from API + All Blog Posts
  const [{ ipos: liveIpos }, allPosts] = await Promise.all([
    fetchLiveIpos({ limit: 6 }),
    fetchLivePosts(),
  ]);

  const categories = getAllCategories();

  // Filter by category if specified
  const filteredPosts =
    category === "All"
      ? allPosts
      : allPosts.filter((p) => p.category.toLowerCase() === category.toLowerCase());

  // Pagination Math
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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* Editorial Announcement Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-700 to-slate-900 p-6 sm:p-8 text-white mb-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md mb-3">
            <Sparkles size={13} />
            <span>Daily Primary Market Research &amp; Live GMP Accuracy</span>
          </div>
          <h1 className="font-bold text-2xl sm:text-4xl tracking-tight leading-tight">
            {siteConfig.name}
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base mt-2 leading-relaxed">
            Live IPO Grey Market Premium (GMP Today), upcoming IPO schedules, RHP prospectus analysis, and institutional anchor audits.
          </p>
        </div>
      </div>

      {/* Live Market Quick Navigation Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        <Link
          href="/ipo/gmp"
          className="group rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 hover:bg-emerald-500/10 transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">
              Live GMP Today
            </span>
            <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-0.5 block">
              Grey Market Rates →
            </span>
          </div>
          <Flame size={20} className="text-emerald-600 group-hover:scale-110 transition-transform" />
        </Link>

        <Link
          href="/ipo/upcoming"
          className="group rounded-xl border border-sky-500/30 bg-sky-500/5 p-4 hover:bg-sky-500/10 transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider block">
              Upcoming Issues
            </span>
            <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-0.5 block">
              2026 Calendar →
            </span>
          </div>
          <Calendar size={20} className="text-sky-600 group-hover:scale-110 transition-transform" />
        </Link>

        <Link
          href="/ipo/open"
          className="group rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 hover:bg-amber-500/10 transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
              Open For Bidding
            </span>
            <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-0.5 block">
              Active IPOs Today →
            </span>
          </div>
          <Clock size={20} className="text-amber-600 group-hover:scale-110 transition-transform" />
        </Link>

        <Link
          href="/category/IPO%20Review"
          className="group rounded-xl border border-purple-500/30 bg-purple-500/5 p-4 hover:bg-purple-500/10 transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block">
              Prospectus Audits
            </span>
            <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-0.5 block">
              80+ In-Depth Reviews →
            </span>
          </div>
          <BookOpen size={20} className="text-purple-600 group-hover:scale-110 transition-transform" />
        </Link>
      </div>

      {/* Live Featured IPOs Section (Fetched Live from API) */}
      {liveIpos.length > 0 && isFirstPage && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
              <Flame size={18} className="text-emerald-600" />
              <span>Live IPO GMP &amp; Active Issues (Updated Live from API)</span>
            </h2>
            <Link href="/ipo/gmp" className="text-xs font-semibold text-emerald-600 hover:underline">
              View All Live GMP →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveIpos.slice(0, 3).map((ipo) => (
              <IpoCard key={ipo.slug} ipo={ipo} />
            ))}
          </div>
        </div>
      )}

      {/* Featured Breaking Analysis Grid */}
      {heroPost && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Main Hero Highlight */}
          <Link
            href={`/post/${heroPost.slug}`}
            className="lg:col-span-2 group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:border-emerald-500/50 hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="relative h-56 sm:h-72 w-full">
              <ArticleCover title={heroPost.title} category={heroPost.category} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-600 text-white shadow-md">
                  {heroPost.category}
                </span>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="font-bold text-xl sm:text-2xl text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                  {heroPost.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-3 leading-relaxed line-clamp-3">
                  {heroPost.excerpt}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>By {heroPost.author || siteConfig.editorialAuthor} · {heroPost.readMins || 8} min read</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Full Review <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </Link>

          {/* Side Trending Stack */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-600" />
              <span>Trending Research</span>
            </h3>
            {sidePosts.map((p) => (
              <Link
                key={p.slug}
                href={`/post/${p.slug}`}
                className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-emerald-500/50 hover:shadow-md transition-all flex-1 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-2">
                    {p.category}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                    {p.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {p.excerpt}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>{p.readMins || 6} min read</span>
                  <span className="text-emerald-600 font-medium">Read →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Main Articles Stream */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen size={18} className="text-emerald-600" />
            <span>In-Depth Prospectus Audits &amp; Playbooks</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing Page {currentPage} of {totalPages} ({totalPosts} total published guides &amp; reviews)
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs">
          {categories.map((cat) => {
            const isActive = category === cat;
            return (
              <Link
                key={cat}
                href={cat === "All" ? "/" : `/?category=${encodeURIComponent(cat)}`}
                className={`rounded-full px-3 py-1 font-medium transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm font-semibold"
                    : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-emerald-500"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gridPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/post/${post.slug}`}
            className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-emerald-500/50 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {post.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock size={12} /> {post.readMins || 6}m
                </span>
              </div>
              <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
                {post.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
            <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>{post.author || siteConfig.editorialAuthor}</span>
              <span className="font-semibold text-emerald-600 group-hover:translate-x-0.5 transition-transform">
                Read Analysis →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* SSR Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/"
        otherParams={category !== "All" ? { category } : {}}
      />
    </div>
  );
}
