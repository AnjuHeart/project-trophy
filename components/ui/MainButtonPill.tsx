interface mainAndGameData {
    name: string;
    emoji: string;
    bgGradient: string;
    hoverGradient: string;
    difficulty: number;
    description: string;
}

interface MainButtonPillProps {
    mainAndGameData: mainAndGameData;
}

export default function MainButtonPill({ mainAndGameData }: MainButtonPillProps) {
    return (
        <div className="relative group/emoji-tooltip overflow-visible">
            <div className={`p-[1px] rounded-lg bg-gradient-to-br ${mainAndGameData.bgGradient} ${mainAndGameData.hoverGradient} shadow-md transition-all duration-300 hover:scale-105`}>
                <span className="text-xl px-2.5 py-1.5 rounded-[7px] bg-slate-950/70 group-hover/emoji-tooltip:bg-slate-950/30 block cursor-help text-center transition-colors duration-300">
                    {mainAndGameData.emoji}
                </span>
            </div>

            <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-slate-900 text-slate-300 rounded-xl border border-slate-800 shadow-2xl opacity-0 pointer-events-none group-hover/emoji-tooltip:opacity-100 transition-opacity duration-200 text-xs text-right leading-normal z-50">
                <span className="block font-black text-rose-400 text-[10px] uppercase tracking-wider mb-1">{mainAndGameData.name}</span>
                {mainAndGameData.description}
            </div>
        </div>
    );
}