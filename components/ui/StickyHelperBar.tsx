import MainMiniPill from "@/components/ui/MainMiniPill";

interface gameAndCategoryData {
    mainCategory: {
        label: string;
        emoji: string;
        bgGradient: string;
        hoverGradient: string;
    };
    title: string;
    logoUrl: string;
    totalAchievements: number;
    blindPlaythroughHours: number;
    minimumPlaythroughs: number;
    timeTo100PercentBase: number;
    categoryContextDescription: string;
    difficultyRating: number;
}

interface StickyHelperBarProps {
    gameAndCategoryData: gameAndCategoryData;
    
    isVisible: boolean;
    scrollToTop: () => void;
}

export default function StickyHelperBar({ gameAndCategoryData, isVisible, scrollToTop }: StickyHelperBarProps) {
    return (
        <div
            className={`fixed top-0 left-0 right-0 h-24 bg-slate-950/95 backdrop-blur-md border-b border-slate-900/80 z-50 transition-all duration-300 transform grid items-center px-6 ${isVisible ? "translate-y-0 opacity-100 shadow-2xl" : "-translate-y-full opacity-0 pointer-events-none"}`}
        >
            <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-6">
                <div className="flex items-center gap-4 min-w-0">
                    <div
                        onClick={scrollToTop}
                        className="cursor-pointer hover:scale-[1.03] active:scale-95 transition-transform duration-200"
                        title="Scroll to top"
                    >
                        <img
                            src={gameAndCategoryData.logoUrl}
                            alt={`${gameAndCategoryData.title} logo`}
                            className="h-12 w-auto object-contain select-none drop-shadow-[1px_1px_0px_rgba(255,255,255,0.4)] drop-shadow-[-1px_-1px_0px_rgba(255,255,255,0.4)]"
                        />
                    </div>

                    <div className="flex flex-col min-w-0 space-y-0.5">
                        <h4 className="text-sm font-black text-white uppercase truncate tracking-tight">
                            {gameAndCategoryData.title}
                        </h4>

                        <MainMiniPill mainAndGameData={{
                            name: gameAndCategoryData.mainCategory.label,
                            emoji: gameAndCategoryData.mainCategory.emoji,
                            bgGradient: gameAndCategoryData.mainCategory.bgGradient,
                            hoverGradient: gameAndCategoryData.mainCategory.hoverGradient,
                        }} />

                    </div>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                    <div className="hidden md:flex items-center gap-3 border-l border-slate-900 pl-6">
                        <div className="text-right">
                            <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Achievements</span>
                            <span className="text-sm font-black text-slate-300">{gameAndCategoryData.totalAchievements} Total</span>
                        </div>
                        <div className="h-8 w-[1px] bg-slate-900 mx-2" />
                        <div className="text-right">
                            <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Blind Run</span>
                            <span className="text-sm font-black text-slate-300">{gameAndCategoryData.blindPlaythroughHours}h</span>
                        </div>
                        <div className="h-8 w-[1px] bg-slate-900 mx-2" />
                        <div className="text-right">
                            <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Min runs</span>
                            <span className="text-sm font-black text-slate-300">{gameAndCategoryData.minimumPlaythroughs}x</span>
                        </div>
                        <div className="h-8 w-[1px] bg-slate-900 mx-2" />
                        <div className="text-right">
                            <span className="block text-[9px] font-black text-rose-500 uppercase tracking-widest">Average 100%</span>
                            <span className="text-sm font-black text-rose-400">{gameAndCategoryData.timeTo100PercentBase}h</span>
                        </div>
                    </div>

                    {/* Re-engineered Width Expansion Button */}
                    <button
                        onClick={scrollToTop}
                        className="group/topBtn flex items-center justify-start h-10 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white font-black transition-all duration-300 shadow-md active:scale-95 overflow-hidden w-10 hover:w-36"
                    >
                        <span className="text-sm w-10 h-10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/topBtn:-translate-y-0.5">
                            ↑
                        </span>
                        <span className="text-[10px] tracking-wider uppercase opacity-0 group-hover/topBtn:opacity-100 transition-opacity duration-200 delay-75 whitespace-nowrap font-bold text-slate-300 -ml-1 pr-4">
                            Navigate to top
                        </span>
                    </button>
                </div>

            </div>
        </div>
    )
}