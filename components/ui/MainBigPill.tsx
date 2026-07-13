'use client'
import React, { useState, useEffect, useRef } from 'react';

interface mainAndGameData {
    name: string;
    emoji: string;
    bgGradient: string;
    hoverGradient: string;
    difficulty: number;
    description: string;
}

interface MainBigPillProps {
    mainAndGameData: mainAndGameData;
}

export default function MainBigPill({ mainAndGameData }: MainBigPillProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const checkTruncation = () => {
            if (textRef.current) {
                const element = textRef.current;
                // Compares total scrollable height against visible client height
                const hasOverflow = element.scrollHeight > element.clientHeight;
                setIsTruncated(hasOverflow);
            }
        };
        checkTruncation();
        window.addEventListener('resize', checkTruncation);
        return () => window.removeEventListener('resize', checkTruncation);
    }, [mainAndGameData.description]);

    return (
        <div className="flex flex-col gap-1.5 w-full">
            <div className={`p-[1px] rounded-xl bg-gradient-to-br ${mainAndGameData.bgGradient} ${mainAndGameData.hoverGradient} shadow-2xl transition-all duration-300 hover:scale-[1.005] group/card w-full`}>
                <div className="bg-slate-950/85 group-hover/card:bg-slate-950/70 transition-colors duration-300 rounded-[11px] p-4 md:p-5 space-y-2 md:space-y-4">
                    
                    <div className="flex items-center gap-2 md:gap-3">
                        <span className="text-lg md:text-xl filter drop-shadow">{mainAndGameData.emoji}</span>
                        <h2 className="text-xs md:text-base font-black uppercase tracking-wider text-white drop-shadow-md">
                            {mainAndGameData.name}
                        </h2>
                    </div>

                    <div className="space-y-1.5 md:space-y-2">
                        <div className="text-[10px] md:text-[11px] font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                            Difficulty Rating: {mainAndGameData.difficulty}/10
                        </div>
                        
                        <div 
                            onClick={() => isTruncated || isExpanded ? setIsExpanded(!isExpanded) : null} 
                            className={`relative select-none ${isTruncated || isExpanded ? "cursor-pointer" : "cursor-default"}`}
                        >
                            <p 
                                ref={textRef}
                                className={`text-[11px] md:text-xs font-medium text-slate-300 leading-relaxed pr-4 md:pr-0
                                    ${isExpanded ? "line-clamp-none" : "line-clamp-2 md:line-clamp-none"}
                                `}
                            >
                                {mainAndGameData.description}
                                
                                {/* Up Indicator */}
                                {isExpanded && (
                                    <span className="inline-block md:hidden text-slate-400 font-bold ml-1.5">
                                        ↑
                                    </span>
                                )}
                            </p>
                            
                            {/* ONLY rendered if the text overflows */}
                            {isTruncated && !isExpanded && (
                                <div className="absolute bottom-0 right-0 left-0 h-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-end justify-end md:hidden pointer-events-none">
                                    <span className="text-[10px] font-bold text-slate-400 bg-slate-950 pl-2">
                                        ↓
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}