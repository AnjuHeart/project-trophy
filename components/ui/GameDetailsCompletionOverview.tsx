import MainBigPill from "./MainBigPill";

interface gameAndCategoryData {
    completionOverview: string;
}

interface GameDetailsCompletionOverviewProps {
    gameAndCategoryData: gameAndCategoryData;
}

export default function GameDetailsCompletionOverview({ gameAndCategoryData }: GameDetailsCompletionOverviewProps) {
    return (
        <div className="space-y-4">
            <div className="border-b border-slate-900 pb-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
                    About Completion
                </h3>
            </div>

            <div className="bg-slate-900/20 border border-slate-900 p-5 rounded-xl space-y-5">
                <div className="space-y-3">
                    <h4 className="text-xs font-black text-slate-200 uppercase tracking-wider">
                        Platinum Run Overview
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium whitespace-pre-line">
                        {gameAndCategoryData.completionOverview}
                    </p>
                </div>
            </div>
        </div>
    )
}