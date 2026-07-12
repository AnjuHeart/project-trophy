import MainBigPill from "./MainBigPill";

interface gameAndCategoryData {
    completionOverview: string;
}

interface GameDetailsCompletionOverviewProps {
    gameAndCategoryData: gameAndCategoryData;
    isAwarded : boolean;
}

export default function GameDetailsCompletionOverview({ gameAndCategoryData, isAwarded }: GameDetailsCompletionOverviewProps) {
    return (
        <div className="space-y-4">
            <div className={`border-b ${isAwarded ? "border-taupe-900" : "border-slate-900"} pb-2`}>
                <h3 className={`text-xs font-black uppercase tracking-widest ${isAwarded ? "text-taupe-400" : "text-slate-400"}`}>
                    About Completion
                </h3>
            </div>

            <div className={`border ${isAwarded ? "bg-taupe-900/20 border-taupe-900" : "bg-slate-900/20 border-slate-900"} p-5 rounded-xl space-y-5`}>
                <div className="space-y-3">
                    <h4 className={`text-xs font-black ${isAwarded ? "text-taupe-200" : "text-slate-200"} uppercase tracking-wider`}>
                        Platinum Run Overview
                    </h4>
                    <p className={`text-xs ${isAwarded ? "text-taupe-400" : "text-slate-400"} leading-relaxed font-medium whitespace-pre-line`}>
                        {gameAndCategoryData.completionOverview}
                    </p>
                </div>
            </div>
        </div>
    )
}