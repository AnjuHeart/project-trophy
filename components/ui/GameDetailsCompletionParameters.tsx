import ParameterBox from "./GameDetailsParameterBox";

interface gameAndCategoryData {
    totalAchievements: number;
    blindPlaythroughHours: number;
    minimumPlaythroughs: number;
    timeTo100PercentPerfect: number;
    timeTo100PercentBase: number;
}

interface GameDetailsCompletionParametersProps {
    gameAndCategoryData: gameAndCategoryData;
    isAwarded : boolean;
}

export default function GameDetailsCompletionParameters({ gameAndCategoryData, isAwarded }: GameDetailsCompletionParametersProps) {
    return (
        <section className="space-y-4">
            <div className={`border-b pb-2 ${isAwarded ? "border-taupe-900" : "border-slate-900"}`}>
                <h3 className={`text-xs font-black uppercase tracking-widest ${isAwarded ? "text-taupe-400" : "text-slate-400"}`}>
                    Completion Parameters
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <ParameterBox 
                informationData={{labelText: "Achievements", dataText : gameAndCategoryData.totalAchievements + " Total"}} 
                isAwarded = {isAwarded} 
                isHighContrast = {false}
                />
                <ParameterBox 
                informationData={{labelText: "Blind Playthrough", dataText : gameAndCategoryData.blindPlaythroughHours + " Hours"}} 
                isAwarded = {isAwarded} 
                isHighContrast = {false}
                />
                <ParameterBox 
                informationData={{labelText: "Minimum Runs", dataText : gameAndCategoryData.minimumPlaythroughs + "x Runs"}} 
                isAwarded = {isAwarded} 
                isHighContrast = {false}
                />
                <ParameterBox 
                informationData={{labelText: "Perfect Run", dataText : gameAndCategoryData.timeTo100PercentPerfect + " Hours"}} 
                isAwarded = {isAwarded} 
                isHighContrast = {true}
                />
                <ParameterBox 
                informationData={{labelText: "Average Completion Time", dataText : gameAndCategoryData.timeTo100PercentBase + "h Average"}} 
                isAwarded = {isAwarded} 
                isHighContrast = {false}
                />
            </div>
        </section>
    )
}