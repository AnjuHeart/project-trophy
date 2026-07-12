"use client";

import React, { useState, useEffect, useRef } from 'react';
import { notFound } from "next/navigation";
import StickyHelpbar from '@/components/ui/StickyHelperBar';
import GameDetailsBackgroundHero from '@/components/ui/GameDetailsBackgroundHero';
import GameDetailsCompletionParameters from '@/components/ui/GameDetailsCompletionParameters';
import GameDetailsCompletionOverview from '@/components/ui/GameDetailsCompletionOverview';


// Note: You might want to define a TypeScript interface for this game prop
export default function GameClientView({ game }: { game: any }) {

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

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!game) {
        notFound();
    }

    return (
        //DIV TO FIX HEADER OVERLAP
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col select-none relative">

            {/* SUPPORT HELPBAR */}
            <StickyHelpbar
                gameAndCategoryData={game}
                isVisible={showStickyHeader}
                scrollToTop={scrollToTop}
            />

            {/* HERO BACKGROUND BANNER */}
            <GameDetailsBackgroundHero gameAndCategoryData={game} />

            {/* MAIN */}
            <main className="max-w-7xl w-full mx-auto px-6 py-10 flex-1 space-y-12">
                {/* GAME PARAMETERS */}
                <GameDetailsCompletionParameters gameAndCategoryData={game} />

                {/* SENTINEL FOR STICKY HELPBAR */}
                <div ref={headerSentinelRef} className="w-full h-[1px] -mt-6 invisible" />
                
                {/* CONTENT SPLIT IN 2 COLUMNS */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* LEFT SIDE */}
                    <div className="lg:col-span-8 space-y-10">
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
                    </div>

                    {/* RIGHT SIDE */}
                    <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
                        <GameDetailsCompletionOverview gameAndCategoryData={game} />
                    </aside>

                </div>

            </main>
        </div>
    );
}