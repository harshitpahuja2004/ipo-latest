import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { ShieldCheck, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
        <div className="md:col-span-2 space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white font-bold text-xs">
              {siteConfig.monogram}
            </div>
            <span className="font-bold text-sm text-slate-900 dark:text-white">
              {siteConfig.name}
            </span>
          </div>
          <p className="text-slate-500 max-w-md leading-relaxed">
            {siteConfig.description}
          </p>
          <p className="text-[11px] text-slate-400">
            Official Contact: <a href={`mailto:${siteConfig.contactEmail}`} className="text-emerald-600 hover:underline">{siteConfig.contactEmail}</a>
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Categories</h4>
          <ul className="space-y-2">
            <li><Link href="/category/IPO%20Review" className="hover:underline">IPO Reviews</Link></li>
            <li><Link href="/category/Guide" className="hover:underline">Trading &amp; Tax Guides</Link></li>
            <li><Link href="/category/SME%20IPO" className="hover:underline">SME Platforms</Link></li>
            <li><Link href="/category/Market%20Analysis" className="hover:underline">Market Analysis</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-sm">Legal &amp; Trust</h4>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:underline">About Editorial Desk</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact &amp; Corrections</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
            <li><Link href="/disclaimer" className="hover:underline">Financial Disclaimer</Link></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 border-t border-slate-200/60 dark:border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p>© {new Date().getFullYear()} {siteConfig.name} ({siteConfig.domain}). All rights reserved.</p>
        <p className="text-[11px] text-slate-500 italic">
          * Information is purely for educational purposes. We are not SEBI-registered advisers.
        </p>
      </div>
    </footer>
  );
}
