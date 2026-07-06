"use client";

import React from "react";

export default function AboutPage() {
  return (
    /* We match your exact layout width (max-w-5xl) and padding (pt-28) from the FAQ page */
    <div className="w-full max-w-5xl mx-auto px-6 pt-28 pb-20 selection:bg-rose-500/20 selection:text-rose-300">
      
      {/* Page Header */}
      <div className="mb-12 border-b border-slate-900 pb-6">
        <h1 className="text-3xl font-black uppercase tracking-tight text-slate-100">
          About
        </h1>
        <p className="text-sm font-medium text-slate-400 mt-3">
          Are you perhaps looking for the main page? You can always click on the{" "}
          <span className="text-rose-400 font-bold">TrophyDB</span> logo in the top left corner to get back there.
        </p>
      </div>

      {/* ================= CORE FEATURES (MAL PILLAR STYLE) ================= */}
      <div className="mb-14">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6 border-b border-slate-900/60 pb-1.5">
          Track Your Completion Journey
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pillar 1 */}
          <div className="p-6 bg-slate-900/10 hover:bg-slate-900/20 border border-slate-900/60 rounded-xl transition-all duration-200">
            <h3 className="text-sm font-black text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <span>📋</span> Organize Your Library
            </h3>
            <p className="mt-3 text-[12px] font-medium text-slate-400 leading-relaxed pl-6">
              Create your personalized games list from our growing database. Track exactly what you have 100% completed, your current progress, what you plan to hunt next, and your absolute milestones.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-6 bg-slate-900/10 hover:bg-slate-900/20 border border-slate-900/60 rounded-xl transition-all duration-200">
            <h3 className="text-sm font-black text-slate-200 uppercase tracking-wider flex items-center gap-2">
              <span>📊</span> Analyze the Grind
            </h3>
            <p className="mt-3 text-[12px] font-medium text-slate-400 leading-relaxed pl-6">
              No more guessing games. View clear completion time parameters and difficulty ratings curated to give you an accurate roadmap before you ever start downloading a title.
            </p>
          </div>
        </div>
      </div>

      {/* ================= DATA SOURCES SECTION ================= */}
      <div className="mb-14">
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-5 border-b border-slate-900/60 pb-1.5">
          Data Sources & Assets
        </h2>
        
        <div className="p-6 bg-slate-900/10 border border-slate-900/60 rounded-xl space-y-4">
          <div className="text-[12px] font-medium text-slate-400 leading-relaxed">
            <strong className="text-slate-300 block mb-1">🎮 Game Metadata & Statistics</strong>
            This site utilizes the Steam API to track live achievement data and general application specifications. Steam and the Steam logo are trademarks and/or registered trademarks of Valve Corporation.
          </div>
          
          <div className="h-[1px] bg-slate-900/60" />
          
          <div className="text-[12px] font-medium text-slate-400 leading-relaxed">
            <strong className="text-slate-300 block mb-1">📐 Iconography</strong>
            The structural UI icons deployed across our application layouts are provided by the excellent Lucide React asset package.
          </div>
        </div>
      </div>

      {/* ================= TECHNICAL STACK & JOKE ================= */}
      <div>
        <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-5 border-b border-slate-900/60 pb-1.5">
          Technical Stack
        </h2>
        
        <div className="p-6 bg-slate-900/10 border border-slate-900/60 rounded-xl">
          <p className="text-[12px] font-medium text-slate-400 leading-relaxed">
            Our frontend framework layout and routing architecture are built entirely using{" "}
            <strong className="text-slate-200">Next.js</strong> and{" "}
            <strong className="text-slate-200">React</strong>, styled with{" "}
            <strong className="text-slate-200">Tailwind CSS</strong>.
          </p>

          {/* Punchy Punchline Blockquote */}
          <div className="mt-6 border-l-2 border-amber-500/40 bg-amber-500/[0.02] p-4 rounded-r-xl">
            <p className="text-[11px] font-bold uppercase tracking-wider text-amber-400/90">
              Tech Note
            </p>
            <p className="text-[12px] font-medium text-slate-400 italic mt-1">
              Achieving a 100% complete, bug-free codebase takes longer than getting the Platinum trophy in a brutal 10/10 difficulty roguelike.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}