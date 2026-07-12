interface informationData{
    labelText: string;
    dataText: string;
}

interface HelpbarInfoBoxProps {
    informationData: informationData;
    isAwarded: boolean;
}

export default function HelpbarInfoBox({ informationData, isAwarded }: HelpbarInfoBoxProps) {
    return(
        <div className="text-right">
            <span className={`block text-[9px] font-black ${isAwarded ? "text-stone-400" : "text-slate-500"} uppercase tracking-widest`}>{informationData.labelText}</span>
            <span className={`text-sm font-black ${isAwarded ? "text-stone-100" : "text-slate-300"}`}>{informationData.dataText}</span>
        </div>
    );
}