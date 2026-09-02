import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { ShieldCheck, Award, BookOpen, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider block mb-1">
          E-E-A-T Editorial Standards &amp; Principles
        </span>
        <h1 className="font-bold text-3xl text-slate-900 dark:text-white">
          About {siteConfig.name}
        </h1>
        <p className="text-slate-500 text-base mt-2">
          Independent financial journalism, Red Herring Prospectus audits, and data-driven market intelligence.
        </p>
      </div>

      <div className="space-y-6">
        <section>
          <h2 className="font-bold text-xl text-slate-900 dark:text-white mb-3">Our Mission</h2>
          <p>
            <strong>{siteConfig.name} ({siteConfig.domain})</strong> was established to provide retail and institutional market participants with transparent, data-driven, and mathematically rigorous research on Indian primary and secondary capital markets.
          </p>
        </section>

        {/* Editorial Desk Profile */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col sm:flex-row gap-5 items-start shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md">
            ED
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Editorial Research Desk</h3>
            <p className="text-xs text-slate-500">{siteConfig.editorialRole}</p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Our research team specializes in analyzing SEBI Draft Red Herring Prospectuses (DRHP), institutional anchor allocations, promoter shareholding patterns, and corporate financial balance sheets. Every report follows strict E-E-A-T research standards without promoter sponsorship.
            </p>
            <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1">
              <Mail size={12} /> Direct Contact: {siteConfig.contactEmail}
            </p>
          </div>
        </div>

        <section>
          <h2 className="font-bold text-xl text-slate-900 dark:text-white mb-3">Our 5-Point Research Methodology</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Official Regulatory Filings:</strong> All financial statements, price bands, and issue details are sourced directly from SEBI RHP filings, BSE, and NSE official disclosures.</li>
            <li><strong>Objective Valuation Metrics:</strong> We evaluate EV/EBITDA, P/E, and ROCE against listed industry peer cohorts.</li>
            <li><strong>Zero Promoter Sponsorship:</strong> We do not accept paid reviews or promotional sponsorship to alter our neutral ratings.</li>
            <li><strong>Forensic Accounting Checks:</strong> We evaluate free cash flow conversion ratios, working capital cycles, and related-party transactions (RPTs).</li>
            <li><strong>Explicit Risk Disclaimers:</strong> Every article clearly highlights downside risks, debt obligations, and non-advisory nature.</li>
          </ul>
        </section>

        <section className="border-t border-slate-200 dark:border-slate-800 pt-6">
          <h2 className="font-bold text-xl text-slate-900 dark:text-white mb-2">Non-Advisory Disclaimer</h2>
          <p className="text-xs text-slate-500">
            {siteConfig.name} is an informational publication and is not registered as a SEBI Research Analyst or Investment Adviser. All content is for educational use. Consult a licensed financial adviser before making investment decisions.
          </p>
        </section>
      </div>
    </div>
  );
}
