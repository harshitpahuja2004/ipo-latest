import { siteConfig } from "@/lib/site-config";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
      <h1 className="font-bold text-3xl text-slate-900 dark:text-white mb-6">Terms of Service</h1>
      <p className="text-xs text-slate-400 mb-6">Last Updated: September 2, 2026</p>

      <div className="space-y-4">
        <p>Welcome to {siteConfig.name}. By accessing or using this website, you agree to be bound by these Terms of Service.</p>
        <h2 className="font-bold text-lg text-slate-900 dark:text-white pt-2">1. Educational &amp; Informational Purpose</h2>
        <p>All content published on {siteConfig.name} is intended solely for educational, journalistic, and informational purposes. None of the content constitutes financial advice or an offer to buy/sell securities.</p>
        <h2 className="font-bold text-lg text-slate-900 dark:text-white pt-2">2. Intellectual Property</h2>
        <p>All original articles, analyses, and layout designs are protected by copyright laws. Reproduction without written consent is prohibited.</p>
      </div>
    </div>
  );
}
