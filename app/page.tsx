import Link from "next/link";
import { fetchLiveIpos, fetchLivePosts } from "@/lib/api";
import { getAllCategories } from "@/lib/posts";
import ArticleCover from "@/components/ArticleCover";
import GmpTable from "@/components/GmpTable";
import Pagination from "@/components/Pagination";
import { siteConfig } from "@/lib/site-config";
import { TrendingUp, BookOpen, Clock, ArrowRight, Flame, Calendar, ArrowUpRight } from "lucide-react";

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
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />

      {/* 4 Quick Market Action Pills at the Very Top */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <Link
          href="/ipo/gmp"
          className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 hover:border-emerald-500/60 hover:shadow-sm transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
              Live GMP Today
            </span>
            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-0.5 block">
              Grey Market Rates →
            </span>
          </div>
          <Flame size={16} className="text-emerald-600 group-hover:scale-110 transition-transform" />
        </Link>

        <Link
          href="/ipo/upcoming"
          className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 hover:border-sky-500/60 hover:shadow-sm transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider block">
              Upcoming Issues
            </span>
            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-0.5 block">
              2026 Calendar →
            </span>
          </div>
          <Calendar size={16} className="text-sky-600 group-hover:scale-110 transition-transform" />
        </Link>

        <Link
          href="/ipo/open"
          className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 hover:border-amber-500/60 hover:shadow-sm transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block">
              Open For Bidding
            </span>
            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-0.5 block">
              Active IPOs Today →
            </span>
          </div>
          <Clock size={16} className="text-amber-600 group-hover:scale-110 transition-transform" />
        </Link>

        <Link
          href="/category/IPO%20Review"
          className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 hover:border-purple-500/60 hover:shadow-sm transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">
              Prospectus Audits
            </span>
            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mt-0.5 block">
              80+ In-Depth Reviews →
            </span>
          </div>
          <BookOpen size={16} className="text-purple-600 group-hover:scale-110 transition-transform" />
        </Link>
      </div>

      {/* High-Density Live GMP Data Table (Top of the Homepage) */}
      {isFirstPage && (
        <section className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-1.5">
                <Flame size={16} className="text-emerald-600" />
                <span>Live IPO GMP &amp; Active Issues (Mainboard &amp; SME)</span>
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Hourly cross-checked rates with live price bands, lot size &amp; estimated listing gains
              </p>
            </div>
            <Link
              href="/ipo/gmp"
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-0.5"
            >
              Full Screen Table <ArrowUpRight size={13} />
            </Link>
          </div>

          <GmpTable ipos={allIpos} />
        </section>
      )}

      {/* Featured Breaking Research */}
      {heroPost && (
        <section className="mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Main Featured Hero Card */}
            <Link
              href={`/post/${heroPost.slug}`}
              className="lg:col-span-2 group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative h-48 sm:h-64 w-full">
                <ArticleCover title={heroPost.title} category={heroPost.category} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600 text-white shadow-sm uppercase tracking-wider">
                    {heroPost.category}
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-snug">
                    {heroPost.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-3">
                    {heroPost.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>By {heroPost.author || siteConfig.editorialAuthor} · {heroPost.readMins || 8} min read</span>
                  <span className="font-semibold text-emerald-600 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Read Full Review <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </Link>

            {/* Side Trending Stack */}
            <div className="flex flex-col gap-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <TrendingUp size={14} className="text-emerald-600" />
                <span>Trending Research</span>
              </h3>
              {sidePosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/post/${p.slug}`}
                  className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 hover:border-emerald-500/50 hover:shadow-sm transition-all flex-1 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mb-1.5 uppercase">
                      {p.category}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors line-clamp-2 leading-snug">
                      {p.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {p.excerpt}
                    </p>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                    <span>{p.readMins || 6} min read</span>
                    <span className="text-emerald-600 font-semibold">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Articles Stream Header */}
      <section>
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3.5">
          <div>
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-1.5">
              <BookOpen size={16} className="text-emerald-600" />
              <span>In-Depth Prospectus Audits &amp; Playbooks</span>
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Page {currentPage} of {totalPages} · {totalPosts} published articles
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 text-xs">
            {categories.map((cat) => {
              const isActive = category === cat;
              return (
                <Link
                  key={cat}
                  href={cat === "All" ? "/" : `/?category=${encodeURIComponent(cat)}`}
                  className={`rounded-lg px-2.5 py-1 font-semibold text-xs transition-all ${
                    isActive
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:border-emerald-500"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>

        {/* 3-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gridPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/post/${post.slug}`}
              className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 hover:border-emerald-500/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
                    {post.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                    <Clock size={11} /> {post.readMins || 6}m
                  </span>
                </div>
                <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>{post.author || siteConfig.editorialAuthor}</span>
                <span className="font-semibold text-emerald-600 group-hover:translate-x-0.5 transition-transform">
                  Read Analysis →
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
