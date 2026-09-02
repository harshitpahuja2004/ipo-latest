import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Search, Flame, Calendar, Clock, BookOpen, ShieldCheck, Activity } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      {/* Top Micro Ticker Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 border-b border-slate-800 hidden sm:block">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400 uppercase tracking-wider text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE PRIMARY MARKET TERMINAL
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 font-mono">3 Issues Open</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 font-mono">7 Upcoming</span>
            <span className="text-slate-500">·</span>
            <span className="text-emerald-400 font-mono font-semibold">Avg GMP: +24.6%</span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-[10px]">
            <span>Cross-checked: Hourly Dealer Desk</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-semibold">SEBI RHP Verified</span>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-9 sm:h-9 sm:w-10 items-center justify-center rounded-lg bg-emerald-600 text-white font-extrabold text-xs tracking-tight shadow-sm">
            {siteConfig.monogram}
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white block leading-none">
              {siteConfig.name}
            </span>
            <span className="text-[10px] text-slate-500 font-mono uppercase font-semibold tracking-wider block mt-0.5">
              Live GMP &amp; Prospectus Intelligence
            </span>
          </div>
        </Link>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <Link href="/ipo/gmp" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <Flame size={14} /> Live GMP Tracker
          </Link>
          <Link href="/ipo/upcoming" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
            <Calendar size={14} /> Upcoming IPOs
          </Link>
          <Link href="/ipo/open" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
            <Clock size={14} /> Open IPOs
          </Link>
          <Link href="/category/IPO%20Review" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Prospectus Reviews
          </Link>
          <Link href="/category/Guide" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Guides
          </Link>
        </nav>

        {/* Quick Search */}
        <Link
          href="/search"
          className="flex items-center gap-2 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-500 hover:border-slate-400 dark:hover:border-slate-600 transition-colors font-mono"
        >
          <Search size={13} />
          <span className="hidden sm:inline">Search 80+ IPO reviews</span>
          <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-slate-200 dark:bg-slate-800 rounded font-sans text-slate-400">⌘K</kbd>
        </Link>
      </div>
    </header>
  );
}
