"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockGames } from '../../../data/mockGame';
import { MAIN_CATEGORY_REGISTRY } from '../../../types/schema';

const EXPERIENCE_TAG_DETAILS: Record<string, { name: string; description: string }> = {
    'low-error-margin': {
        name: 'Low Error Margin',
        description: 'Requires high mechanical execution or perfect planning. Mistakes can void specific trophies or ruin long playthroughs.'
    },
    'true-ending-content': {
        name: 'True Ending Content',
        description: 'Demands full completion of optional narratives, deep secret tracking, and hidden post-game milestones to see the true final conclusion.'
    },
    'satisfying-progression': {
        name: 'Satisfying Progression',
        description: 'Features an incredibly well-paced achievement track where rewards flow naturally alongside skill mastery and story exploration.'
    },
    'creative-playstyle': {
        name: 'Creative Playstyle',
        description: 'Tasks the player with utilizing unusual mechanics, solving puzzles non-linearly, or experimenting with sandbox limits.'
    }
};

export default function GameDetailPage() {
    const params = useParams();
    const router = useRouter();
    const gameId = params.id as string;
    const game = mockGames.find((g) => g.id === gameId);

    const [activeTagId, setActiveTagId] = useState<string | null>(null);

    const [showStickyHeader, setShowStickyHeader] = useState(false);
    const headerSentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const sentinel = headerSentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowStickyHeader(!entry.isIntersecting);
            },
            { threshold: 0, rootMargin: "-100px 0px 0px 0px" }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, []);

    if (!game) {
        return (
            <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
                <h1 className="text-xl font-black text-rose-500 tracking-tight">🎯 GAME NOT FOUND</h1>
                <p className="text-xs text-slate-400 mt-2">The game "{gameId}" doesn't exist in our list.</p>
                <a href="/" className="mt-6 text-xs font-bold text-slate-500 hover:text-white border border-slate-900 bg-slate-950 px-4 py-2 rounded-lg transition-all">
                    ← Return Home
                </a>
            </div>
        );
    }

    const categoryConfig = MAIN_CATEGORY_REGISTRY[game.mainCompletionCategory.label];

    // Extract unique tags from achievements for filtering
    const uniqueTagsMap = new Map<string, { id: string; name: string; tailwindClasses?: string }>();
    game.achievements?.forEach((ach) => {
        ach.tags?.forEach((tag) => {
            if (!uniqueTagsMap.has(tag.id)) {
                uniqueTagsMap.set(tag.id, { id: tag.id, name: tag.name, tailwindClasses: tag.tailwindClasses });
            }
        });
    });
    const allTags = Array.from(uniqueTagsMap.values()).sort((a, b) => a.name.localeCompare(b.name));

    // Filtered achievements list
    const filteredAchievements = (game.achievements || [])
        .filter((ach) => !activeTagId || ach.tags?.some((t) => t.id === activeTagId))
        .sort((a, b) => a.title.localeCompare(b.title));

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col select-none relative">

            {/* ================= STICKY SUPPORTING HELPBAR ================= */}
            <div
                className={`fixed top-0 left-0 right-0 h-24 bg-slate-950/95 backdrop-blur-md border-b border-slate-900/80 z-50 transition-all duration-300 transform grid items-center px-6 ${showStickyHeader ? "translate-y-0 opacity-100 shadow-2xl" : "-translate-y-full opacity-0 pointer-events-none"
                    }`}
            >
                <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-6">

                    {/* Left Block: Game identity details */}
                    <div className="flex items-center gap-4 min-w-0">

                        {/* Wrapped image in a click box, added pointer cursor, and hover scaling */}
                        <div
                            onClick={scrollToTop}
                            className="cursor-pointer hover:scale-[1.03] active:scale-95 transition-transform duration-200"
                            title="Scroll to top"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={game.assets.transparentLogoUrl}
                                alt={`${game.title} logo`}
                                /* REMOVED pointer-events-none so it registers human click interaction */
                                className="h-12 w-auto object-contain select-none"
                            />
                        </div>

                        <div className="flex flex-col min-w-0 space-y-0.5">
                            <h4 className="text-sm font-black text-white uppercase truncate tracking-tight">
                                {game.title}
                            </h4>

                            {/* Mini Main Category pill - Fixed resting states & hover upgrade */}
                            {categoryConfig && (
                                <div className="relative group/miniCategory self-start cursor-help">
                                    <div className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-wider rounded bg-gradient-to-br ${categoryConfig.bgGradient} ${categoryConfig.hoverGradient} text-white shadow-sm flex items-center gap-1.5 transition-all duration-300 group-hover/miniCategory:scale-[1.03]`}>
                                        <span>{categoryConfig.emoji}</span>
                                        <span>{game.mainCompletionCategory.label}</span>
                                    </div>

                                    {/* Hover dropdown definition */}
                                    <div className="absolute left-0 top-full mt-2.5 w-64 bg-slate-950 border border-slate-800 p-3 rounded-lg text-[11px] font-medium text-slate-400 normal-case tracking-normal shadow-2xl opacity-0 pointer-events-none group-hover/miniCategory:opacity-100 transition-opacity duration-200 leading-normal z-50">
                                        <span className="block font-black text-white text-[10px] uppercase tracking-wider mb-1">
                                            {categoryConfig.emoji} {game.mainCompletionCategory.label}
                                        </span>
                                        <span className="block text-amber-400 text-[9px] font-extrabold uppercase mb-1">
                                            Difficulty: {game.mainCompletionCategory.numericDifficultyCode ?? "0"}/10
                                        </span>
                                        {game.mainCompletionCategory.description}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Block: Sized up Parameter Badges + Re-engineered Navigation Button */}
                    <div className="flex items-center gap-6 shrink-0">
                        <div className="hidden md:flex items-center gap-3 border-l border-slate-900 pl-6">
                            <div className="text-right">
                                <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Achievements</span>
                                <span className="text-sm font-black text-slate-300">{game.totalAchievements} Total</span>
                            </div>
                            <div className="h-8 w-[1px] bg-slate-900 mx-2" />
                            <div className="text-right">
                                <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Blind Run</span>
                                <span className="text-sm font-black text-slate-300">{game.blindPlaythroughHours}h</span>
                            </div>
                            <div className="h-8 w-[1px] bg-slate-900 mx-2" />
                            <div className="text-right">
                                <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest">Min runs</span>
                                <span className="text-sm font-black text-slate-300">{game.minimumPlaythroughs}x</span>
                            </div>
                            <div className="h-8 w-[1px] bg-slate-900 mx-2" />
                            <div className="text-right">
                                <span className="block text-[9px] font-black text-rose-500 uppercase tracking-widest">Target 100%</span>
                                <span className="text-sm font-black text-rose-400">{game.timeTo100PercentPerfect}h</span>
                            </div>
                        </div>

                        {/* Re-engineered Width Expansion Button */}
                        <button
                            onClick={scrollToTop}
                            className="group/topBtn flex items-center justify-start h-10 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white font-black transition-all duration-300 shadow-md active:scale-95 overflow-hidden w-10 hover:w-36"
                        >
                            <span className="text-sm w-10 h-10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover/topBtn:-translate-y-0.5">
                                ↑
                            </span>
                            <span className="text-[10px] tracking-wider uppercase opacity-0 group-hover/topBtn:opacity-100 transition-opacity duration-200 delay-75 whitespace-nowrap font-bold text-slate-300 -ml-1 pr-4">
                                Navigate to top
                            </span>
                        </button>
                    </div>

                </div>
            </div>


            {/* ================= HERO BACKGROUND BANNER ================= */}
            <div className="relative h-[480px] md:h-[520px] w-full overflow-hidden border-b border-slate-900 bg-slate-950 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={game.assets.cleanWallpaperUrl}
                    alt=""
                    className="w-full h-full object-cover opacity-80 blur-none scale-102 select-none pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950" />

                {/* HERO CONTAINER */}
                <div className="absolute inset-0 max-w-7xl mx-auto px-6 pt-6 pb-10 flex flex-col justify-between z-20">

                    {/* LOWER HEADER HERO BLOCK */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-end gap-10 w-full mt-auto">
                        <div className="lg:col-span-5 flex items-center justify-start h-full max-h-[220px]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={game.assets.transparentLogoUrl}
                                alt={`${game.title} Logo`}
                                className="max-h-[200px] w-auto object-contain select-none pointer-events-none" />
                        </div>

                        <div className="lg:col-span-7 w-full space-y-3">
                            <div className="space-y-0.5 pl-1">
                                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-md uppercase">
                                    {game.title}
                                </h1>
                                <p className="text-xs text-slate-400 font-semibold tracking-wide pt-0.5">
                                    {game.genres.join(' • ')}
                                </p>
                            </div>

                            {/* MAIN CATEGORY BOX */}
                            {categoryConfig && (
                                <div className={`p-[1px] rounded-xl bg-gradient-to-br ${categoryConfig.bgGradient} ${categoryConfig.hoverGradient} shadow-2xl transition-all duration-300 hover:scale-[1.005] group/card`}>
                                    <div className="bg-slate-950/80 group-hover/card:bg-slate-950/70 transition-colors duration-300 rounded-[11px] p-5 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl filter drop-shadow">{categoryConfig.emoji}</span>
                                            <h2 className="text-sm md:text-base font-black uppercase tracking-wider text-white drop-shadow-md">
                                                {game.mainCompletionCategory.label}
                                            </h2>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                                                <span>🎯</span> Difficulty Rating: {game.mainCompletionCategory.numericDifficultyCode ?? "0"}/10
                                            </div>
                                            <p className="text-xs font-medium text-slate-300 leading-relaxed">
                                                {game.mainCompletionCategory.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>


            {/* ================= LOWER BODY CONTENT ================= */}
            <main className="max-w-7xl w-full mx-auto px-6 py-10 flex-1 space-y-12">

                {/* SECTION: COMPLETION PARAMETERS */}
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
                                    {game.totalAchievements} Total
                                </span>
                            </div>
                        </div>

                        <div className="bg-slate-900/30 border border-slate-900 p-4 rounded-xl flex flex-col justify-between relative group/metric">
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Blind Playthrough</span>
                                </div>
                                <span className="text-2xl font-black text-slate-100 block mt-1">
                                    {game.blindPlaythroughHours} Hours
                                </span>
                            </div>
                        </div>

                        <div className="bg-slate-900/30 border border-slate-900 p-4 rounded-xl flex flex-col justify-between relative group/metric">
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Minimum Runs</span>
                                </div>
                                <span className="text-2xl font-black text-slate-100 block mt-1">
                                    {game.minimumPlaythroughs}x Campaign
                                </span>
                            </div>
                        </div>

                        <div className="bg-slate-900/30 border border-slate-900 p-4 rounded-xl flex flex-col justify-between relative group/metric">
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-rose-500">Target Path</span>
                                </div>
                                <span className="text-2xl font-black text-rose-400 block mt-1">
                                    {game.timeTo100PercentPerfect} Hours
                                </span>
                            </div>
                        </div>

                        <div className="bg-slate-900/30 border border-slate-900 p-4 rounded-xl flex flex-col justify-between relative group/metric">
                            <div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Average Path</span>
                                </div>
                                <span className="text-2xl font-black text-slate-300 block mt-1">
                                    {game.timeTo100PercentBase} Hours
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Intersection Sentinel Element */}
                <div ref={headerSentinelRef} className="w-full h-[1px] -mt-6 invisible" />

                {/* WORKSPACE CONTENT SPLIT */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT MAIN WORKSPACE COLUMN */}
                    <div className="lg:col-span-8 space-y-10">

                        {/* ACHIEVEMENT GROUP INTERACTION BLOCK */}
                        <section className="space-y-6">
                            <div className="space-y-3">
                                <div className="border-b border-slate-900 pb-2">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
                                        Filter Achievements by Group
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setActiveTagId(null)}
                                        className={`px-3 py-1.5 text-[10px] font-black tracking-wider uppercase rounded-md border transition-all ${activeTagId === null
                                            ? "bg-rose-500 border-rose-600 text-white shadow-md"
                                            : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                                            }`}
                                    >
                                        All ({(game.achievements || []).length})
                                    </button>

                                    {allTags.map((tag) => {
                                        const count = (game.achievements || []).filter((ach) => ach.tags?.some((t) => t.id === tag.id)).length;
                                        const isActive = activeTagId === tag.id;

                                        return (
                                            <button
                                                key={tag.id}
                                                onClick={() => setActiveTagId(isActive ? null : tag.id)}
                                                className={`px-3 py-1.5 text-[10px] font-black tracking-wider uppercase rounded-md border transition-all ${isActive
                                                    ? "bg-slate-200 border-white text-slate-950 shadow-md"
                                                    : "bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200"
                                                    }`}
                                            >
                                                {tag.name} ({count})
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Achievement Rows */}
                            <div className="bg-slate-900/10 border border-slate-900 rounded-xl divide-y divide-slate-900 overflow-hidden">
                                {filteredAchievements.map((ach) => (
                                    <div
                                        key={ach.id}
                                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900/20 transition-colors"
                                    >
                                        <div className="flex flex-col gap-0.5">
                                            <div className="flex items-center gap-2.5 text-xs font-bold text-slate-200">
                                                <span className="text-amber-500/70 font-normal select-none">🏆</span>
                                                <span>{ach.title}</span>
                                                {ach.isSecret && (
                                                    <span className="text-[9px] px-1.5 py-0.5 bg-slate-900 text-slate-500 rounded border border-slate-800 uppercase font-black tracking-wider">
                                                        Secret
                                                    </span>
                                                )}
                                            </div>
                                            {ach.description && (
                                                <p className="text-[11px] text-slate-500 pl-6 font-medium tracking-normal normal-case">
                                                    {ach.description}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap gap-1.5 sm:justify-end shrink-0">
                                            {ach.tags?.map((tag) => {
                                                const isCurrentlyFiltered = tag.id === activeTagId;
                                                return (
                                                    <span
                                                        key={tag.id}
                                                        className={`px-2 py-0.5 text-[9px] font-black tracking-wider uppercase rounded border select-none transition-all ${isCurrentlyFiltered
                                                            ? "bg-white text-slate-950 border-white ring-1 ring-white/20"
                                                            : tag.tailwindClasses || "bg-slate-950 text-slate-400 border-slate-900"
                                                            }`}
                                                    >
                                                        {tag.name}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* SECTION: ROADMAP */}
                        <section className="space-y-4">
                            <div className="border-b border-slate-900 pb-2">
                                <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">
                                    Completion Roadmap
                                </h3>
                            </div>
                            <div className="bg-slate-900/10 border border-slate-900 p-6 rounded-xl space-y-4 text-xs font-medium text-slate-300 leading-relaxed">
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                </p>
                            </div>
                        </section>

                    </div>

                    {/* RIGHT SIDEBAR COLUMN */}
                    <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
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
                                        {game.completionOverview}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
            </main>

        </div>
    );
}