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

                        {/* DYNAMIC GAME CARDS PIPELINE GRID WILL UNFOLD HERE */}
                        <div className="text-slate-500 text-xs italic p-4 border border-dashed border-slate-900 rounded-xl">
                            Control bar integrated. Layout mode set to: {isListView ? "List View" : "Grid View"}. Ready to design game layouts...
                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
}