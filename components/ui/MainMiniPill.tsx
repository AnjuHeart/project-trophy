interface mainAndGameData {
    name: string;
    emoji: string;
    bgGradient: string;
    hoverGradient: string;
    difficulty: number;
    description: string;
}

interface MainMiniPillProps {
    mainAndGameData: mainAndGameData;
}

export default function MainMiniPill({ mainAndGameData }: MainMiniPillProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <div className="relative group/miniCategory self-start">
                <div className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded bg-gradient-to-br ${mainAndGameData.bgGradient} ${mainAndGameData.hoverGradient} shadow-sm flex items-center gap-1.5 transition-all duration-300 group-hover/miniCategory:scale-[1.03]`}>
                    <span>{mainAndGameData.emoji}</span>
                    <span>{mainAndGameData.name}</span>
                </div>
            </div>
        </div>
    );
}