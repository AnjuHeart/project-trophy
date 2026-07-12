import MainBigPill from "./MainBigPill";

interface gameAndCategoryData {
    totalAchievements: number;
    blindPlaythroughHours: number;
    minimumPlaythroughs: number;
    timeTo100PercentPerfect: number;
    timeTo100PercentBase: number;
}

interface GameDetailsCompletionParametersProps {
    gameAndCategoryData: gameAndCategoryData;
}

export default function GameDetailsCompletionParameters({ gameAndCategoryData }: GameDetailsCompletionParametersProps) {
    return (
        <section className="space-y-4">
            <div className="border-b border-slate-900 pb-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Completion Parameters
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-slate-900/30 border border-slate-900 p-4 rounded-xl flex flex-col justify-between relative group/metric">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Achievements</span>
                        </div>
                        <span className="text-2xl font-black text-slate-100 block mt-1">
                            {gameAndCategoryData.totalAchievements} Total
                        </span>
                    </div>
                </div>

                <div className="bg-slate-900/30 border border-slate-900 p-4 rounded-xl flex flex-col justify-between relative group/metric">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Blind Playthrough</span>
                        </div>
                        <span className="text-2xl font-black text-slate-100 block mt-1">
                            {gameAndCategoryData.blindPlaythroughHours} Hours
                        </span>
                    </div>
                </div>

                <div className="bg-slate-900/30 border border-slate-900 p-4 rounded-xl flex flex-col justify-between relative group/metric">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Minimum Runs</span>
                        </div>
                        <span className="text-2xl font-black text-slate-100 block mt-1">
                            {gameAndCategoryData.minimumPlaythroughs}x Campaign
                        </span>
                    </div>
                </div>

                <div className="bg-slate-900/30 border border-slate-900 p-4 rounded-xl flex flex-col justify-between relative group/metric">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Target Path</span>
                        </div>
                        <span className="text-2xl font-black text-rose-400 block mt-1">
                            {gameAndCategoryData.timeTo100PercentPerfect} Hours
                        </span>
                    </div>
                </div>

                <div className="bg-slate-900/30 border border-slate-900 p-4 rounded-xl flex flex-col justify-between relative group/metric">
                    <div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Average Path</span>
                        </div>
                        <span className="text-2xl font-black text-slate-300 block mt-1">
                            {gameAndCategoryData.timeTo100PercentBase} Hours
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}