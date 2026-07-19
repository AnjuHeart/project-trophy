"use client"

import { LibraryStats } from "./page";
import { Game } from "@prisma/client";

import LibraryStatsRibbon from "@/components/ui/LibraryStatsRibbon";

interface Pagination {
    currentPage: number;
    totalPages: number;
    totalMatches: number;
}

interface LibraryViewProps {
    stats: LibraryStats
    games: Game[]
    pagination: Pagination
}



export default function LibraryView({ stats, games, pagination }: LibraryViewProps) {
    return (
        //DIV TO FIX HEADER OVERLAP
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-rose-500/30 selection:text-rose-200 flex flex-col">
            <main className="flex-1 max-w-7xl w-full mx-auto pt-20 px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">

                {/* STATS RIBBON PRELIMINAR DATA */}
                <LibraryStatsRibbon stats={stats}></LibraryStatsRibbon>
                
            </main>
        </div>
    );
}