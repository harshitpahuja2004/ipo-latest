import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { ShieldCheck, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-8 items-center justify-center rounded-md bg-emerald-600 text-white font-extrabold text-xs">
                {siteConfig.monogram}
              </div>
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              {siteConfig.description}
            </p>
            <p className="text-[11px] text-slate-400 font-mono">
              E-E-A-T Verified Financial Journalism Desk
            </p>
          </div>

          {/* Col 2: Live Market Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Live Primary Market
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/ipo/gmp" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                  Live IPO GMP Today <ArrowUpRight size={11} />
                </Link>
              </li>
              <li>
                <Link href="/ipo/upcoming" className="hover:text-emerald-600 transition-colors">
                  Upcoming IPOs 2026
                </Link>
              </li>
              <li>
                <Link href="/ipo/open" className="hover:text-emerald-600 transition-colors">
                  Open For Bidding Today
                </Link>
              </li>
              <li>
                <Link href="/category/IPO%20Review" className="hover:text-emerald-600 transition-colors">
                  Red Herring Prospectus Audits
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Research Guides */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Investor Playbooks
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/post/what-is-gmp" className="hover:text-emerald-600 transition-colors">
                  What is Grey Market Premium?
                </Link>
              </li>
              <li>
                <Link href="/post/how-ipo-allotment-works" className="hover:text-emerald-600 transition-colors">
                  How Allotment Lottery Works
                </Link>
              </li>
              <li>
                <Link href="/post/sme-ipo-vs-mainboard-ipo" className="hover:text-emerald-600 transition-colors">
                  SME vs Mainboard IPO Differences
                </Link>
              </li>
              <li>
                <Link href="/category/Guide" className="hover:text-emerald-600 transition-colors">
                  All 80+ Guides &amp; Analyses
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate & Legal */}
          <div className="space-y-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
              Editorial &amp; Compliance
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/about" className="hover:text-emerald-600 transition-colors">
                  About Editorial Desk
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-600 transition-colors">
                  Contact &amp; Feedback
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-emerald-600 transition-colors">
                  Non-Advisory Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <p className="text-[11px] text-slate-500 leading-relaxed">
            * <strong>Disclaimer:</strong> {siteConfig.name} is a financial market research and news publication. We are NOT a SEBI-registered investment adviser or research analyst. Grey market premium (GMP) quotes are unofficial OTC sentiment indicators and do not guarantee listing prices. Consult a licensed financial advisor before investing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>© {new Date().getFullYear()} {siteConfig.name} ({siteConfig.domain}). All rights reserved.</span>
            <span>Crafted with rigorous financial data standards.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
