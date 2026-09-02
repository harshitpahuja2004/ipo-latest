import type { Metadata } from "next";
import Link from "next/link";
import { fetchLiveIpos } from "@/lib/api";
import IpoCard from "@/components/IpoCard";
import { Flame, ArrowLeft } from "lucide-react";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Live Open IPOs Today — Bidding Status, GMP & Subscription (2026)",
  description: "List of currently open IPOs available for bidding on BSE and NSE today. Track live subscription status, cut-off price, lot size limits, and closing timers.",
  keywords: [
    "open ipo today",
    "current ipo open for subscription",
    "latest ipos to apply",
    "open sme ipo today",
    "live ipo bidding",
    "ipo open dates today"
  ],
};

export default async function OpenIpoPage() {
  const { ipos } = await fetchLiveIpos({ status: "open", limit: 60 });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-600 mb-6">
        <ArrowLeft size={13} /> Back to Home
      </Link>

      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-800 p-6 sm:p-8 text-white mb-8 shadow-lg">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md mb-3">
            <Flame size={14} className="text-amber-300" />
            <span>Open for Subscription Right Now</span>
          </div>
          <h1 className="font-bold text-2xl sm:text-4xl tracking-tight leading-tight">
            Live Open IPOs Today
          </h1>
          <p className="text-emerald-100 text-xs sm:text-base mt-2.5 leading-relaxed">
            Currently active public offerings accepting bids via ASBA and UPI. Check live subscription multiples and GMP trends.
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
