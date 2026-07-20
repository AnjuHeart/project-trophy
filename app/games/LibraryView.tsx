"use client"
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { LibraryStats } from "./page";
import { Game } from "@prisma/client";

import LibraryStatsRibbon from "@/components/ui/LibraryStatsRibbon";
import FilterSidebar from "@/components/ui/FilterSidebar";
import ControlBar from "@/components/ui/ControlBar";

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
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // GRID/LIST & MOBILE POPUP TOGGLE CONTROLLERS
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
    const [isListView, setIsListView] = useState(false);

    // ROUTER SETUP
    const updateURL = useCallback((key: string, value: string | null) => {
        // GET URL PARAMS
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        // FILTER CHANGE TRIGGER REDIRECT TO PAGE1
        if (key !== 'page') {
            params.set('page', '1');
        }

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, [pathname, router, searchParams]);

    const searchQuery = searchParams.get("search") || "";
    const sortBy = searchParams.get("sort") || "alphabetical";
    const activeCategories = searchParams.get("categories")?.split(",") || [];
    const activeAwardTypes = searchParams.get("awardType")?.split(",") || [];
    const activeMaxTime = searchParams.get("maxTime") ? Number(searchParams.get("maxTime")) : null;

    //URL HANDLING CATEGORYMAIN
    const handleCategoryToggle = (categoryName: string) => {
        const currentCategories = searchParams.get('categories')?.split(',') || [];

        let newCategories;
        if (currentCategories.includes(categoryName)) {
            newCategories = currentCategories.filter(c => c !== categoryName);
        } else {
            newCategories = [...currentCategories, categoryName];
        }
        updateURL('categories', newCategories.length > 0 ? newCategories.join(',') : null);
    };
    //URL HANDLING AWARDTYPE
    const handleAwardToggle = (type: string) => {
        const updated = activeAwardTypes.includes(type)
            ? activeAwardTypes.filter(item => item !== type)
            : [...activeAwardTypes, type];

        updateURL("awardType", updated.length > 0 ? updated.join(",") : null);
    };
    //URL HANDLING MAX TIME
    const handleMaxTimeChange = (time: number | null) => {
        updateURL("maxTime", time ? time.toString() : null);
    };

    //URL HANDLING PAGE CHANGE
    const handlePageChange = (newPage: number) => {
        updateURL("page", newPage.toString());
    };

    const ITEMS_PER_PAGE = 12;
    const startItem = Math.min((pagination.currentPage - 1) * ITEMS_PER_PAGE + 1, pagination.totalMatches);
    const endItem = Math.min(pagination.currentPage * ITEMS_PER_PAGE, pagination.totalMatches);

    return (
        //DIV TO FIX HEADER OVERLAP
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-rose-500/30 selection:text-rose-200 flex flex-col">
            <main className="flex-1 max-w-7xl w-full mx-auto pt-20 px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">

                {/* STATS RIBBON */}
                <LibraryStatsRibbon stats={stats}></LibraryStatsRibbon>

                {/* CORE GRID AND FILTERING */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start relative">

                    <FilterSidebar
                        isOpen={isMobileFiltersOpen}
                        onClose={() => setIsMobileFiltersOpen(false)}
                        activeCategories={activeCategories}
                        activeAwardTypes={activeAwardTypes}
                        activeMaxTime={activeMaxTime}
                        onCategoryToggle={handleCategoryToggle}
                        onAwardToggle={handleAwardToggle}
                        onMaxTimeChange={handleMaxTimeChange}
                    />

                    {/* RIGHT VIEWPORT DIRECTORY DISPLAY */}
                    <div className="lg:col-span-3 space-y-6">

                        <ControlBar
                            searchQuery={searchQuery}
                            onSearchChange={(query) => updateURL("search", query || null)}
                            sortBy={sortBy}
                            onSortChange={(value) => updateURL("sort", value)}
                            isListView={isListView}
                            onViewModeChange={setIsListView}
                            onOpenMobileFilters={() => setIsMobileFiltersOpen(true)}
                        />

                        {games.length === 0 ? (
                            <div className="text-center py-20 bg-slate-900/10 border border-dashed border-slate-900 rounded-2xl p-6">
                                <span className="text-3xl block mb-2">🔍</span>
                                <h3 className="text-sm font-black text-white uppercase tracking-wide">No Matches Found</h3>
                                <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 font-medium">
                                    Try resetting or loosening up your active criteria filters.
                                </p>
                            </div>
                        ) : (
                            <>
                                {/* GRID / LIST CONTAINER */}
                                <div className={isListView ? "flex flex-col gap-3" : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"}>
                                    {games.map((game) => {
                                        if (!isListView) {
                                            // GRID CARD VIEW
                                            return (
                                                <a
                                                    key={game.id}
                                                    href={`/games/${game.slug}`}
                                                    className="group flex flex-col bg-gradient-to-br from-slate-900 to-slate-950/40 border border-slate-900 hover:border-slate-800 rounded-2xl transition-all duration-300 overflow-hidden shadow-lg hover:-translate-y-0.5"
                                                >
                                                    <div className="h-40 w-full bg-slate-950 relative overflow-hidden">
                                                        <img
                                                            src={game.thumbnailUrl || "/placeholder-game.jpg"}
                                                            alt={game.title}
                                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500 block"
                                                        />
                                                        {game.genres.length > 0 && (
                                                            <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-black tracking-wider border border-slate-800 uppercase text-slate-400">
                                                                {game.genres[0]}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                                                        <div>
                                                            <h4 className="font-black text-white group-hover:text-rose-400 transition-colors text-sm truncate">
                                                                {game.title}
                                                            </h4>
                                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-wide">
                                                                Difficulty: {game.difficultyRating ?? "N/A"}/10
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center justify-between text-[11px] font-extrabold bg-slate-950/50 px-3 py-1.5 border border-slate-900/60 rounded-xl">
                                                            <span className="text-slate-500">100% Time:</span>
                                                            <span className="text-rose-400">{game.timeTo100PercentBase ?? "—"}h</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            );
                                        }

                                        // LIST ITEM VIEW
                                        return (
                                            <a
                                                key={game.id}
                                                href={`/games/${game.slug}`}
                                                className="group flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-950/20 border border-slate-900/80 hover:border-slate-800 rounded-xl px-4 py-3 transition-all shadow-sm"
                                            >
                                                <div className="flex items-center gap-4 min-w-0">
                                                    <div className="w-16 h-10 rounded-lg bg-slate-950 overflow-hidden shrink-0 border border-slate-900">
                                                        <img
                                                            src={game.thumbnailUrl || "/placeholder-game.jpg"}
                                                            alt={game.title}
                                                            className="w-full h-full object-cover opacity-60 block"
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h4 className="font-black text-sm text-white group-hover:text-rose-400 transition-colors truncate">
                                                            {game.title}
                                                        </h4>
                                                        <p className="text-[10px] font-bold text-slate-500 truncate">
                                                            {game.genres.join(" • ") || "Uncategorized"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4 shrink-0 ml-4">
                                                    <div className="text-right">
                                                        <span className="block text-[11px] font-black text-white">
                                                            {game.timeTo100PercentBase ?? "—"}h
                                                        </span>
                                                        <span className="block text-[8px] font-black uppercase text-slate-500 tracking-wider">
                                                            100% Route
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>

                                {/* PAGINATION CONTROLLER */}
                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/10 border border-slate-900/60 p-4 rounded-xl mt-6 text-xs font-bold text-slate-400">
                                    <div>
                                        Showing <span className="text-white">{startItem}</span>–
                                        <span className="text-white">{endItem}</span> of{" "}
                                        <span className="text-rose-400">{pagination.totalMatches}</span> games
                                    </div>

                                    <div className="flex items-center gap-1.5 select-none w-full sm:w-auto justify-between sm:justify-start">
                                        <button
                                            onClick={() => handlePageChange(Math.max(pagination.currentPage - 1, 1))}
                                            disabled={pagination.currentPage <= 1}
                                            className="px-3 py-2 sm:py-1.5 rounded-lg bg-slate-950 border border-slate-900 text-slate-400 hover:text-white hover:border-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
                                        >
                                            Previous
                                        </button>

                                        {/* DESKTOP PAGE NUMBERS */}
                                        <div className="hidden sm:flex items-center gap-1.5">
                                            {Array.from({ length: pagination.totalPages }, (_, idx) => {
                                                const pageNum = idx + 1;
                                                const isActive = pagination.currentPage === pageNum;
                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => handlePageChange(pageNum)}
                                                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-black transition-all ${isActive
                                                                ? 'bg-gradient-to-br from-rose-500/20 to-rose-600/10 border border-rose-500/40 text-rose-400 shadow-md shadow-rose-950/20'
                                                                : 'bg-slate-950/50 border border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-800'
                                                            }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* MOBILE PAGE LABEL */}
                                        <span className="sm:hidden text-white font-black text-xs">
                                            Page {pagination.currentPage} of {pagination.totalPages || 1}
                                        </span>

                                        <button
                                            onClick={() => handlePageChange(Math.min(pagination.currentPage + 1, pagination.totalPages))}
                                            disabled={pagination.currentPage >= pagination.totalPages}
                                            className="px-3 py-2 sm:py-1.5 rounded-lg bg-slate-950 border border-slate-900 text-slate-400 hover:text-white hover:border-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                    </div>

                </div>

            </main>
        </div>
    );
}