import React from "react";

const THEMES = [
  { bg: "from-slate-900 via-emerald-950 to-slate-900", accent: "#10b981", glow: "bg-emerald-500/20" },
  { bg: "from-slate-900 via-sky-950 to-slate-900", accent: "#0ea5e9", glow: "bg-sky-500/20" },
  { bg: "from-slate-900 via-indigo-950 to-slate-900", accent: "#6366f1", glow: "bg-indigo-500/20" },
  { bg: "from-slate-900 via-amber-950 to-slate-900", accent: "#f59e0b", glow: "bg-amber-500/20" },
];

function pickTheme(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return THEMES[h % THEMES.length]!;
}

export default function ArticleCover({
  title,
  category,
  className = "",
  compact = false,
}: {
  title: string;
  category?: string;
  className?: string;
  compact?: boolean;
}) {
  const theme = pickTheme(title);
  const initial = title.trim().charAt(0).toUpperCase() || "L";

  if (compact) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${theme.bg} ${className}`}>
        <span className="font-bold text-white text-lg">{initial}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${theme.bg} flex items-center justify-center select-none ${className}`}>
      <div className={`absolute -right-8 -top-8 h-48 w-48 rounded-full ${theme.glow} blur-3xl`} />
      <div className="absolute -left-8 -bottom-8 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Grid Pattern */}
      <svg className="absolute inset-0 h-full w-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`grid-art-${initial}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-art-${initial})`} />
      </svg>

      {/* Financial Curve Graphic */}
      <svg viewBox="0 0 400 160" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-2/3 w-full opacity-30">
        <path d="M 0 130 Q 80 110 140 85 T 260 60 T 340 25 L 400 10 L 400 160 L 0 160 Z" fill={theme.accent} fillOpacity="0.2" />
        <path d="M 0 130 Q 80 110 140 85 T 260 60 T 340 25 L 400 10" fill="none" stroke={theme.accent} strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      <div className="relative z-10 flex flex-col items-center gap-1.5 opacity-90">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-inner">
          <span className="text-xl font-bold text-white tracking-tight">{initial}</span>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/60">
          Latest Updates Daily
        </span>
      </div>
    </div>
  );
}
