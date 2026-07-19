interface LibraryStats {
    gamesCount: number;
    awardedCount: number;
    guidesCount: number;
    achievementsCount: number;
}

interface LibraryStatsRibbonProps {
    stats: LibraryStats
}

export default function LibraryStatsRibbon({ stats }: LibraryStatsRibbonProps) {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                Games Library
            </h1>

            <div className="grid grid-cols-2 md:flex md:flex-row md:items-center gap-4 md:gap-6 bg-slate-900/40 border border-slate-900 rounded-2xl p-4 text-xs font-bold text-slate-400">
                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                    <span>Total Games:</span>
                    <span className="text-rose-400 text-sm sm:text-base font-black">{stats.gamesCount}</span>
                </div>
                <div className="hidden md:block h-4 w-[1px] bg-slate-800" />
                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                    <span>Awarded Games:</span>
                    <span className="text-amber-400 text-sm sm:text-base font-black">{stats.awardedCount}</span>
                </div>
                <div className="hidden md:block h-4 w-[1px] bg-slate-800" />
                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                    <span>Guides Submitted:</span>
                    <span className="text-white text-sm sm:text-base font-black">{stats.guidesCount}</span>
                </div>
                <div className="hidden md:block h-4 w-[1px] bg-slate-800" />
                <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                    <span>Achievements Tracked:</span>
                    <span className="text-white text-sm sm:text-base font-black">{stats.achievementsCount}</span>
                </div>
            </div>
        </div>
    );
}