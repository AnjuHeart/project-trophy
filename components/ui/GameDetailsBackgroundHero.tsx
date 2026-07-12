import MainBigPill from "./MainBigPill";

interface gameAndCategoryData {
    mainCategory: {
        label: string;
        emoji: string;
        bgGradient: string;
        hoverGradient: string;
    };
    title: string;
    genres: string[];
    logoUrl: string;
    backgroundUrl: string;
    totalAchievements: number;
    blindPlaythroughHours: number;
    minimumPlaythroughs: number;
    categoryContextDescription: string;
    difficultyRating: number;
}

interface GameDetailsBackgroundHeroProps {
    gameAndCategoryData: gameAndCategoryData;
    isAwarded : boolean;
}

export default function GameDetailsBackgroundHero({ gameAndCategoryData, isAwarded }: GameDetailsBackgroundHeroProps) {
    return (
        <div className={`relative h-[480px] md:h-[520px] w-full overflow-hidden border-b shrink-0
        ${isAwarded ? "border-taupe-900 bg-taupe-950" : "border-slate-900 bg-slate-950"}`}>
                <img
                    src={gameAndCategoryData.backgroundUrl}
                    alt=""
                    className="w-full h-full object-cover opacity-80 blur-none scale-102 select-none pointer-events-none" />
                {/* AWARDED GAMES TINT CHANGE */}
                <div className={`absolute inset-0 ${isAwarded ? 
                    "bg-gradient-to-t from-taupe-950 via-taupe-950/40 to-taupe-950/80" 
                    : "bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80"}`} />
                <div className={`absolute inset-0 ${isAwarded ?
                    "bg-gradient-to-r from-taupe-950 via-transparent to-taupe-950" 
                    : "bg-gradient-to-r from-slate-950 via-transparent to-slate-950"
                }`} />

                {/*HERO*/}
                <div className="absolute inset-0 max-w-7xl mx-auto px-6 pt-6 pb-10 flex flex-col justify-between z-20">

                    <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-10 w-full mt-auto">
                        <div className="lg:col-span-5 flex items-center justify-start h-full max-h-[220px]">
                            <img
                                src={gameAndCategoryData.logoUrl}
                                alt={`${gameAndCategoryData.title} Logo`}
                                className="max-h-[200px] w-auto object-contain select-none pointer-events-none drop-shadow-[1px_1px_0px_rgba(255,255,255,0.4)] drop-shadow-[-1px_-1px_0px_rgba(255,255,255,0.4)]" />
                        </div>

                        <div className="lg:col-span-7 w-full space-y-3">
                            <div className="space-y-0.5 pl-1">
                                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-md uppercase">
                                    {gameAndCategoryData.title}
                                </h1>
                                <p className="text-xs text-slate-400 font-semibold tracking-wide pt-0.5">
                                    {gameAndCategoryData.genres.join(' • ')}
                                </p>
                            </div>

                            {/* MAIN CATEGORY BOX */}
                            <MainBigPill mainAndGameData={{
                                name: gameAndCategoryData.mainCategory.label,
                                emoji: gameAndCategoryData.mainCategory.emoji,
                                bgGradient: gameAndCategoryData.mainCategory.bgGradient,
                                hoverGradient: gameAndCategoryData.mainCategory.hoverGradient,
                                difficulty: gameAndCategoryData.difficultyRating,
                                description: gameAndCategoryData.categoryContextDescription
                            }} />
                        </div>
                    </div>

                </div>
            </div>
    )
}