"use client"

import { LibraryStats } from "./page";

interface LibraryViewProps{
    stats: LibraryStats
}

export default function LibraryView({stats}: LibraryViewProps) {
    return (
        //DIV TO FIX HEADER OVERLAP
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-rose-500/30 selection:text-rose-200 flex flex-col">
            <main className="flex-1 max-w-7xl w-full mx-auto pt-22 px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">

                {/* STATS RIBBON PREELIMINAR DATA*/}
                <div className="space-y-4">
                    <h1 className="text-3xl font-black tracking-tight text-white uppercase">
                        Games Library
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 bg-slate-900/40 border border-slate-900 rounded-2xl p-4 text-xs font-bold text-slate-400">
                        <div>Total Games: <span className="text-white text-sm font-black">{stats.gamesCount}</span></div>
                        <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
                        <div>Awarded Games: <span className="text-rose-400 text-sm font-black">{stats.awardedCount}</span></div>
                        <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
                        <div>Guides Submitted: <span className="text-amber-400 text-sm font-black">{stats.guidesCount}</span></div>
                        <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
                        <div>Achievements Tracked: <span className="text-amber-400 text-sm font-black">{stats.achievementsCount}</span></div>
                        
                    </div>
                </div>



            </main>
        </div>

    );
}