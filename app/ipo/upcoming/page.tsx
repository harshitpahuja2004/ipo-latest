import type { Metadata } from "next";
import Link from "next/link";
import { fetchLiveIpos } from "@/lib/api";
import IpoCard from "@/components/IpoCard";
import { Calendar, ArrowLeft, ShieldCheck } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Upcoming IPOs in India (2026) — Complete Schedule, Dates & Price Bands",
  description: "Complete list of upcoming Mainboard and SME IPOs in India for 2026. Check expected open dates, issue size, price bands, and Draft Red Herring Prospectus (DRHP) reviews.",
  keywords: [
    "upcoming ipo",
    "upcoming ipo 2026",
    "upcoming ipos in india",
    "upcoming sme ipo",
    "upcoming ipo calendar",
    "nse upcoming ipo",
    "upcoming ipo issue size"
  ],
};

export default async function UpcomingIpoPage() {
  const { ipos } = await fetchLiveIpos({ status: "upcoming", limit: 60 });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 mb-6">
        <ArrowLeft size={13} /> Back to Home
      </Link>

      <div className="rounded-2xl bg-gradient-to-r from-sky-600 via-indigo-700 to-slate-900 p-6 sm:p-8 text-white mb-8 shadow-lg">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md mb-3">
            <Calendar size={14} />
            <span>Primary Market Schedule (2026)</span>
          </div>
          <h1 className="font-bold text-2xl sm:text-4xl tracking-tight leading-tight">
            Upcoming IPOs in India
          </h1>
          <p className="text-sky-100 text-xs sm:text-base mt-2.5 leading-relaxed">
            Stay ahead with official Draft Red Herring Prospectus (DRHP) filings, expected open dates, and issue sizes for upcoming Mainboard &amp; SME public issues.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {ipos.map((ipo) => (
          <IpoCard key={ipo.slug} ipo={ipo} />
        ))}
      </div>
    </div>
  );
}
