import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  queryParamName?: string;
  otherParams?: Record<string, string>;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  queryParamName = "page",
  otherParams = {},
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(otherParams).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    if (page > 1) {
      params.set(queryParamName, String(page));
    } else {
      params.delete(queryParamName);
    }
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  // Generate visible page numbers
  const pages: (number | string)[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav aria-label="Pagination Navigation" className="flex items-center justify-center gap-1.5 mt-10">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={buildUrl(currentPage - 1)}
          className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
          rel="prev"
        >
          <ChevronLeft size={14} /> Previous
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold text-slate-400 cursor-not-allowed">
          <ChevronLeft size={14} /> Previous
        </span>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {pages.map((p, idx) => {
          if (p === "...") {
            return (
              <span key={`ellipsis-${idx}`} className="px-2 py-1 text-xs text-slate-400 select-none">
                ...
              </span>
            );
          }
          const isCurrent = p === currentPage;
          return isCurrent ? (
            <span
              key={p}
              aria-current="page"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white text-xs font-bold shadow-sm"
            >
              {p}
            </span>
          ) : (
            <Link
              key={p}
              href={buildUrl(Number(p))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
            >
              {p}
            </Link>
          );
        })}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={buildUrl(currentPage + 1)}
          className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-600 transition-colors"
          rel="next"
        >
          Next <ChevronRight size={14} />
        </Link>
      ) : (
        <span className="flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-xs font-semibold text-slate-400 cursor-not-allowed">
          Next <ChevronRight size={14} />
        </span>
      )}
    </nav>
  );
}
