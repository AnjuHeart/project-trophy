interface MainCategory {
    name: string;
    emoji: string;
    bgGradient: string;
    hoverGradient: string;
    difficulty: number;
    description: string;
}

interface MainPillProps {
    mainCategory: MainCategory;
}

export default function MainPill({ mainCategory }: MainPillProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="relative group/tooltip inline-block self-start overflow-visible z-30 cursor-help">
                <div className={`p-[1px] rounded-lg bg-gradient-to-br ${mainCategory.bgGradient} ${mainCategory.hoverGradient} shadow-lg shadow-black/40 transition-all duration-300 hover:scale-[1.01]`}>
                    <div className="bg-slate-950/75 group-hover/tooltip:bg-slate-950/40 transition-colors duration-300 rounded-[7px] px-3 py-1.5 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white">
                        <span className="text-sm drop-shadow">{mainCategory.emoji}</span>
                        <span className="drop-shadow-md">{mainCategory.name}</span>
                    </div>
                </div>

                {/* TOOLTIP*/}
                <div className="absolute bottom-full left-0 mb-2.5 w-64 bg-slate-950 border border-slate-800 p-3 rounded-lg text-[11px] font-medium text-slate-400 normal-case tracking-normal shadow-2xl opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-200 leading-normal z-50">
                    <span className="block text-amber-400 text-[9px] font-extrabold uppercase mb-1">
                        Difficulty: {mainCategory.difficulty}/10
                    </span>
                    {mainCategory.description}
                </div>
            </div>
        </div>
    );
}