"use client"

import React, { useEffect, useState } from 'react'

interface ControlBarProps {
    searchQuery: string
    onSearchChange: (query: string) => void
    sortBy: string
    onSortChange: (value: string) => void
    isListView: boolean
    onViewModeChange: (isList: boolean) => void
    onOpenMobileFilters: () => void
}

export default function ControlBar({
    searchQuery,
    onSearchChange,
    sortBy,
    onSortChange,
    isListView,
    onViewModeChange,
    onOpenMobileFilters
}: ControlBarProps) {
    // Local scratch state to avoid flickering network requests on every single keypress
    const [localSearch, setLocalSearch] = useState(searchQuery)

    // Sync back if parent search state changes externally
    useEffect(() => {
        setLocalSearch(searchQuery)
    }, [searchQuery])

    // Debounce effect: Wait 350ms after user stops typing before rewriting URL
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearchChange(localSearch)
        }, 350)
        return () => clearTimeout(timer)
    }, [localSearch, onSearchChange])

    return (
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-slate-900/20 border border-slate-900/60 p-3 rounded-xl shadow-inner">

            {/* SEARCH INPUT & MOBILE FILTER TOGGLE CONTAINER */}
            <div className="flex w-full sm:w-72 gap-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search title, genre or keys..."
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-900 focus:border-slate-800 rounded-xl px-3.5 py-2 sm:py-1.5 text-xs text-white placeholder-slate-500 font-medium focus:outline-none focus:ring-0 transition-all"
                    />
                </div>

                {/* MOBILE FILTER TRIGGER BUTTON */}
                <button
                    onClick={onOpenMobileFilters}
                    className="lg:hidden flex items-center justify-center px-4 bg-slate-950 border border-slate-900 rounded-xl text-slate-400 hover:text-white transition-colors"
                >
                    <span className="text-xs font-black uppercase tracking-wider">Filters</span>
                </button>
            </div>

            {/* SORT CONTROLS AND LAYOUT TOGGLE BUTTONS */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <select
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="flex-1 sm:flex-none bg-slate-950 border border-slate-900 focus:border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-2 sm:py-1.5 font-bold focus:outline-none cursor-pointer transition-all"
                >
                    <option value="alphabetical">Sort: Alphabetical</option>
                    <option value="recent">Sort: Recently Added</option>
                    <option value="difficulty">Sort: Max Difficulty</option>
                    <option value="time">Sort: Completion Length</option>
                    <option value="achievements">Sort: Achievements Count</option>
                </select>

                <div className="h-5 w-[1px] bg-slate-900 hidden sm:block" />

                {/* LAYOUT DISPLAY VIEW TOGGLES */}
                <div className="flex shrink-0 bg-slate-950 border border-slate-900 p-0.5 rounded-lg">
                    <button
                        onClick={() => onViewModeChange(false)}
                        className={`px-2 py-1.5 sm:py-1 rounded text-xs transition-colors ${!isListView ? 'bg-slate-900 text-white font-black' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        Grid
                    </button>
                    <button
                        onClick={() => onViewModeChange(true)}
                        className={`px-2 py-1.5 sm:py-1 rounded text-xs transition-colors ${isListView ? 'bg-slate-900 text-white font-black' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                        List
                    </button>
                </div>
            </div>

        </div>
    )
}