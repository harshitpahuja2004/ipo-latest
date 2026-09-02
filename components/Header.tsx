import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Search, Flame, Calendar, Clock, BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-xs tracking-tight shadow-sm">
            {siteConfig.monogram}
          </div>
          <div>
            <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white block leading-tight">
              {siteConfig.name}
            </span>
            <span className="text-[10px] text-slate-500 uppercase font-medium tracking-wider block">
              Live GMP &amp; Prospectus Intelligence
            </span>
          </div>
        </Link>

        {/* Live Market Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <Link href="/ipo/gmp" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <Flame size={14} /> Live GMP Today
          </Link>
          <Link href="/ipo/upcoming" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
            <Calendar size={14} /> Upcoming IPOs
          </Link>
          <Link href="/ipo/open" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
            <Clock size={14} /> Open IPOs
          </Link>
          <Link href="/category/IPO%20Review" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            IPO Reviews
          </Link>
          <Link href="/category/Guide" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Guides
          </Link>
        </nav>

        {/* Search Link */}
        <Link
          href="/search"
          className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-500 hover:border-emerald-500 transition-colors"
        >
          <Search size={14} />
          <span className="hidden sm:inline">Search GMP &amp; IPOs...</span>
        </Link>
      </div>
    </header>
  );
}
