import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchAllPosts, getAllCategories } from "@/lib/posts";
import Pagination from "@/components/Pagination";
import { siteConfig } from "@/lib/site-config";
import { Clock, ArrowLeft } from "lucide-react";

export const revalidate = 300;
export const dynamicParams = true;

const ITEMS_PER_PAGE = 12;

export async function generateStaticParams() {
  const cats = getAllCategories();
  return cats.map((c) => ({ category: c }));
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category: rawCategory } = await params;
  const { page = "1" } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);
  const category = decodeURIComponent(rawCategory);

  const allPosts = await fetchAllPosts();
  const posts =
    category.toLowerCase() === "all"
      ? allPosts
      : allPosts.filter((p) => p.category.toLowerCase() === category.toLowerCase());

  if (posts.length === 0) notFound();

  const totalPosts = posts.length;
  const totalPages = Math.ceil(totalPosts / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedPosts = posts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 mb-6">
        <ArrowLeft size={13} /> Back to Home
      </Link>

      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider block mb-1">
          Category Archive
        </span>
        <h1 className="font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
          {category}
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
          Showing Page {currentPage} of {totalPages} ({totalPosts} articles in this category)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/post/${post.slug}`}
            className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-emerald-500/50 hover:shadow-lg transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  {post.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock size={12} /> {post.readMins || 6}m
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 leading-snug line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>
            <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>{post.author || siteConfig.editorialAuthor}</span>
              <span className="font-semibold text-emerald-600">Read Analysis →</span>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/category/${encodeURIComponent(category)}`}
      />
    </div>
  );
}

