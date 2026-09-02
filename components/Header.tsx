import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Newspaper, Search, ShieldCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-sm">
            {siteConfig.monogram}
          </div>
          <div>
            <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white block leading-tight">
              {siteConfig.name}
            </span>
            <span className="text-[10px] text-slate-500 uppercase font-medium tracking-wider block">
              Market &amp; Financial Desk
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <Link href="/category/IPO%20Review" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            IPO Reviews
          </Link>
          <Link href="/category/Guide" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Investor Guides
          </Link>
          <Link href="/about" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Quick Search Button */}
        <Link
          href="/search"
          className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-500 hover:border-emerald-500 transition-colors"
        >
          <Search size={14} />
          <span className="hidden sm:inline">Search articles...</span>
        </Link>
      </div>
    </header>
  );
}
