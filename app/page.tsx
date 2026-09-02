import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import ArticleCover from "@/components/ArticleCover";
import { siteConfig } from "@/lib/site-config";
import { TrendingUp, Sparkles, BookOpen, Clock, ArrowRight, Shield } from "lucide-react";

export const revalidate = 3600;

export default function HomePage() {
  const posts = getAllPosts();
  const heroPost = posts[0];
  const sidePosts = posts.slice(1, 4);
  const remainingPosts = posts.slice(4);
  const categories = getAllCategories();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      {/* Editorial Announcement Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-6 sm:p-8 text-white mb-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md mb-3">
            <Sparkles size={13} />
            <span>Independent Capital Market Intelligence</span>
          </div>
          <h1 className="font-bold text-2xl sm:text-4xl tracking-tight leading-tight">
            {siteConfig.name}
          </h1>
          <p className="text-emerald-100 text-sm sm:text-base mt-2 leading-relaxed">
            In-depth prospectus audits, unicorn IPO analyses, SEBI regulatory playbooks, and tax strategies authored by our research team.
          </p>
        </div>
      </div>

      {/* Featured Breaking Analysis Grid */}
      {heroPost && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Main Hero Card */}
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
        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen size={18} className="text-emerald-600" />
          <span>Latest Market Intelligence ({posts.length} In-Depth Articles)</span>
        </h3>
        <div className="flex flex-wrap gap-2 text-xs">
          {categories.slice(0, 5).map((cat) => (
            <Link
              key={cat}
              href={cat === "All" ? "/" : `/category/${encodeURIComponent(cat)}`}
              className="rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1 text-slate-600 dark:text-slate-300 hover:border-emerald-500"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {remainingPosts.map((post) => (
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
    </div>
  );
}
