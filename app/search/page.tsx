import Link from "next/link";
import { searchPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";
import { Search, ArrowLeft } from "lucide-react";

export const revalidate = 3600;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const posts = searchPosts(q);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 mb-6">
        <ArrowLeft size={13} /> Back to Home
      </Link>

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <h1 className="font-bold text-2xl text-slate-900 dark:text-white flex items-center gap-2">
          <Search size={22} className="text-emerald-600" /> Search Articles
        </h1>
        <form className="mt-4 flex gap-2">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search 80+ IPO reviews, valuations, tax guides..."
            className="flex-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm focus:outline-none focus:border-emerald-500"
          />
          <button type="submit" className="rounded-lg bg-emerald-600 text-white px-5 py-2 text-sm font-semibold hover:bg-emerald-700">
            Search
          </button>
        </form>
        {q && (
          <p className="text-xs text-slate-500 mt-2">
            Found {posts.length} articles matching &ldquo;{q}&rdquo;
          </p>
        )}
      </div>

      <div className="space-y-4">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/post/${p.slug}`}
            className="block rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-emerald-500/50 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold text-emerald-600">{p.category}</span>
              <span className="text-xs text-slate-400">· {p.readMins || 6} min read</span>
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white hover:text-emerald-600 leading-snug">
              {p.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
              {p.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
