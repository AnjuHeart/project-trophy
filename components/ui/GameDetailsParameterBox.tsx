interface informationData {
    labelText: string;
    dataText: string;
}

interface ParameterBoxProps {
    informationData: informationData;
    isAwarded: boolean;
    isHighContrast: boolean;
    isFullWidthOnMobile?: boolean;
}

export default function ParameterBox({ informationData, isAwarded, isHighContrast, isFullWidthOnMobile = false }: ParameterBoxProps) {
    return (
        <div className={`border p-3 md:p-4 rounded-xl flex flex-col justify-between relative group/metric transition-all
        ${isFullWidthOnMobile ? "col-span-2 sm:col-span-1 lg:col-span-1" : "col-span-1"}
        ${isAwarded ? "bg-taupe-900/30 border-taupe-900" : "bg-slate-900/30 border-slate-900"}`}>
            <div>
                <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-widest
                        ${isHighContrast
                            ? (isAwarded ? "text-amber-500" : "text-rose-500")
                            : (isAwarded ? "text-stone-400" : "text-slate-500")
                        }`}>
                        {informationData.labelText}</span>
                </div>
                <span className={`text-2xl font-black block mt-1
                ${isHighContrast
                        ? (isAwarded ? "text-amber-400" : "text-rose-400")
                        : (isAwarded ? "text-stone-100" : "text-slate-300")
                    }`}>
                    {informationData.dataText}
                </span>
            </div>
        </div>
    );
}