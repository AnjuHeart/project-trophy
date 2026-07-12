interface informationData {
    labelText: string;
    dataText: string;
}

interface HelpbarInfoBoxProps {
    informationData: informationData;
    isAwarded: boolean;
    isHighContrast: boolean;
}

export default function HelpbarInfoBox({ informationData, isAwarded, isHighContrast }: HelpbarInfoBoxProps) {
    return (
        <div className="text-right">
            <span className={`block text-[9px] font-black ${isHighContrast
                    ? (isAwarded ? "text-amber-500" : "text-rose-500")
                    : (isAwarded ? "text-stone-400" : "text-slate-500")
                } uppercase tracking-widest`}>{informationData.labelText}</span>
            <span className={`text-sm font-black ${isHighContrast
                    ? (isAwarded ? "text-amber-400" : "text-rose-400")
                    : (isAwarded ? "text-stone-100" : "text-slate-300")
                }`}>{informationData.dataText}</span>
        </div>
    );
}