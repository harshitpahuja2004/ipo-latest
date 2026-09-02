import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Search, Flame, Calendar, Clock, BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white font-extrabold text-xs shadow-sm">
            {siteConfig.monogram}
          </div>
          <div>
            <span className="font-bold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white block leading-tight">
              {siteConfig.name}
            </span>
            <span className="text-[9px] text-slate-500 uppercase font-medium tracking-wider block">
              Live GMP &amp; Prospectus Intelligence
            </span>
          </div>
        </Link>

        {/* Navigation Links (Compact text-xs) */}
        <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-700 dark:text-slate-300">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <Link href="/ipo/gmp" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <Flame size={13} /> Live GMP Today
          </Link>
          <Link href="/ipo/upcoming" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
            <Calendar size={13} /> Upcoming IPOs
          </Link>
          <Link href="/ipo/open" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
            <Clock size={13} /> Open IPOs
          </Link>
          <Link href="/category/IPO%20Review" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            IPO Reviews
          </Link>
          <Link href="/category/Guide" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Guides
          </Link>
        </nav>

        {/* Quick Search Button */}
        <Link
          href="/search"
          className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-2.5 py-1 text-xs text-slate-500 hover:border-emerald-500 transition-colors"
        >
          <Search size={13} />
          <span className="hidden sm:inline text-[11px]">Search reviews...</span>
        </Link>
      </div>
    </header>
  );
}
