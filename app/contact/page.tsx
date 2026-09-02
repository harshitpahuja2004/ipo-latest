import { siteConfig } from "@/lib/site-config";
import { Mail, Clock, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-12">
      <div className="text-center border-b border-slate-200 dark:border-slate-800 pb-6 mb-8">
        <h1 className="font-bold text-3xl text-slate-900 dark:text-white">Contact Us</h1>
        <p className="text-slate-500 text-sm mt-2">
          Have a correction, feedback, or media inquiry? We respond to every reader message within 24 hours.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <Mail size={22} />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Email the Editorial Desk</h3>
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-emerald-600 font-semibold text-sm hover:underline">
              {siteConfig.contactEmail}
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <Clock size={22} />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Response Time</h3>
            <p className="text-xs text-slate-500">Typical reply within 12–24 hours (Monday to Friday, 9:00 AM – 6:00 PM IST).</p>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
          <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">Data Correction Requests</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            If you notice a typo, outdated valuation metric, or revised price band in any of our articles, please send the article URL along with the official exchange source. We update articles promptly.
          </p>
        </div>
      </div>
    </div>
  );
}
