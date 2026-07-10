interface MainCategory {
    name: string;
    emoji: string;
    bgGradient: string;
    hoverGradient: string;
    difficulty: number;
    description: string;
}

interface BigPillProps {
    mainCategory: MainCategory;
}

export default function BigPill({ mainCategory }: BigPillProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className={`p-[1px] rounded-xl bg-gradient-to-br ${mainCategory.bgGradient} ${mainCategory.hoverGradient} shadow-2xl transition-all duration-300 hover:scale-[1.005] group/card w-full`}>
                <div className="bg-slate-950/80 group-hover/card:bg-slate-950/70 transition-colors duration-300 rounded-[11px] p-5 space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="text-xl filter drop-shadow">{mainCategory.emoji}</span>
                        <h2 className="text-sm md:text-base font-black uppercase tracking-wider text-white drop-shadow-md">
                            {mainCategory.name}
                        </h2>
                    </div>

                    <div className="space-y-2">
                        <div className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                            <span>🎯</span> Difficulty Rating: {mainCategory.difficulty}/10
                        </div>
                        <p className="text-xs font-medium text-slate-300 leading-relaxed">
                            {mainCategory.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}