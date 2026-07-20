"use client"

import React, { useState, useEffect } from 'react';

// PRELIMINAR MAIN CATEGORIES
const MAIN_CATEGORY_REGISTRY: Record<string, { label: string; emoji: string; bgGradient: string }> = {
    "piece-of-cake": { label: "Piece of Cake", emoji: "🍰", bgGradient: "from-rose-700 via-fuchsia-600 to-pink-500 text-white" },
    "casual-friendly": { label: "Casual Friendly", emoji: "☕", bgGradient: "from-emerald-700 via-emerald-600 to-teal-600 text-white" },
    "farming-focused": { label: "Farming Focused", emoji: "🌾", bgGradient: "from-rose-700 via-amber-600 to-yellow-500 text-white" },
};

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    // SEARCHPARAMS STATES
    activeCategories: string[];
    activeAwardTypes: string[];
    activeMaxTime: number | null;
    // HANDLING FUNCTIONS FOR THIS SIDEBAR
    onCategoryToggle: (id: string) => void;
    onAwardToggle: (type: string) => void;
    onMaxTimeChange: (time: number | null) => void;
}

export default function FilterSidebar({
    isOpen,
    onClose,
    activeCategories,
    activeAwardTypes,
    activeMaxTime,
    onCategoryToggle,
    onAwardToggle,
    onMaxTimeChange
}: FilterSidebarProps) {

    // LOCAL STATE FOR SMOOTH SLIDING
    const [localTime, setLocalTime] = useState(activeMaxTime || 150);

    // SLIDER SMOOTH USAGE HELPER EFFECT
    useEffect(() => {
        setLocalTime(activeMaxTime || 150);
    }, [activeMaxTime]);

    useEffect(() => {
        const timer = setTimeout(() => {
            const targetTime = localTime >= 150 ? null : localTime;
            // ONLY CHANGE URL AFTER CHANGE
            if (targetTime !== activeMaxTime) {
                onMaxTimeChange(targetTime);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [localTime, activeMaxTime, onMaxTimeChange]);

    return (
        <>
            {/* MOBILE OVERLAY BACKGROUND */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* SIDEBAR FILTERS CONTROL */}
            <aside className={`
                fixed inset-y-0 left-0 z-[100] w-[85vw] max-w-sm h-screen overflow-y-auto transform transition-transform duration-300 ease-in-out p-5 shadow-2xl
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                bg-gradient-to-br from-slate-950 to-slate-900 border-r border-slate-900
                lg:translate-x-0 lg:static lg:h-auto lg:w-auto lg:block lg:sticky lg:top-24 lg:bg-gradient-to-br lg:from-slate-900 lg:to-slate-950/40 lg:border lg:border-slate-900/80 lg:rounded-2xl lg:shadow-xl
            `}>

                {/* MOBILE HEADER */}
                <div className="flex items-center justify-between lg:hidden mb-6 pb-4 border-b border-slate-900">
                    <h2 className="text-sm font-black text-white uppercase tracking-wider">Filters & Criteria</h2>
                    <button
                        onClick={onClose}
                        className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white bg-slate-950 border border-slate-900 rounded-lg text-xs font-bold transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* MAIN CATEGORIES */}
                <div className="space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Filter By Category</h3>
                    <div className="flex flex-col gap-1.5">
                        {Object.entries(MAIN_CATEGORY_REGISTRY).map(([id, config]) => {
                            const isSelected = activeCategories.includes(id);

                            return (
                                <button
                                    key={id}
                                    onClick={() => onCategoryToggle(id)}
                                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 ${isSelected
                                        ? `bg-gradient-to-br ${config.bgGradient} text-white shadow-sm font-black`
                                        : 'bg-slate-950/40 text-slate-400 hover:text-slate-200 hover:bg-slate-950/80'
                                        }`}
                                >
                                    <span className="text-sm shrink-0">{config.emoji}</span>
                                    <span className="truncate">{config.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="h-[1px] bg-slate-900/80 w-full my-5" />

                {/* HOF CATEGORIES */}
                <div className="space-y-3">
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Recognition Tier</h3>
                    <div className="flex flex-col gap-1.5">
                        {([
                            { id: 'famously-difficult', label: 'Famously Difficult' },
                            { id: 'monumental-effort', label: 'Monumental Effort' }
                        ]).map((award) => {
                            const isSelected = activeAwardTypes.includes(award.id);
                            return (
                                <button
                                    key={award.id}
                                    onClick={() => onAwardToggle(award.id)}
                                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all border ${isSelected
                                        ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 font-black shadow-sm'
                                        : 'bg-slate-950/40 border-transparent text-slate-400 hover:text-white hover:bg-slate-950/80'
                                        }`}
                                >
                                    {award.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="h-[1px] bg-slate-900/80 w-full my-5" />

                {/* SECTION 3: RANGE TIMELINE SLIDER */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Max Length Filter</h3>
                        <span className="text-[10px] font-black text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                            {localTime < 150 ? `${localTime}h` : 'Any Time'}
                        </span>
                    </div>

                    <input
                        type="range"
                        min="5"
                        max="150"
                        step="5"
                        value={localTime}
                        onChange={(e) => setLocalTime(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-rose-500 border border-slate-900"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-1">
                        <span>5 Hours</span>
                        <span>Uncapped</span>
                    </div>
                </div>

            </aside>
        </>
    )
}