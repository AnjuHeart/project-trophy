"use client";

import React from 'react';

// Exact data structures and configuration paths from your workspace
import { mockGames } from '../data/mockGame';
import { mockHallOfFame } from '../data/mockFame';
import { MAIN_CATEGORY_REGISTRY, EXPERIENCE_TAG_REGISTRY } from '../types/schema';

export default function HomePage() {

  const trendingGames = [...mockGames].sort((a, b) => b.weeklyViews - a.weeklyViews);
  const recentlyAdded = [...mockGames];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [triggerReset, setTriggerReset] = React.useState(0); // Tracks manual button interactions

  // Auto-advance loop with an expanded 9-second window
  React.useEffect(() => {
    if (isPaused || trendingGames.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trendingGames.length);
    }, 9000); // 9 seconds window as requested

    return () => clearInterval(timer);
  }, [isPaused, trendingGames.length, triggerReset]); // Listens to triggerReset to restart the timer instantly

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % trendingGames.length);
    setTriggerReset((prev) => prev + 1); // Wipes out active interval and restarts clock
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + trendingGames.length) % trendingGames.length);
    setTriggerReset((prev) => prev + 1); // Wipes out active interval and restarts clock
  };

  const hallOfFameCards = mockHallOfFame.map(entry => {
    const gameDetails = mockGames.find(game => game.id === entry.gameId);
    if (!gameDetails) return null;

    return {
      ...gameDetails,
      badge: entry.badge,
      reasoning: entry.reasoning
    };
  }).filter((item): item is NonNullable<typeof item> => item !== null);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-rose-500/30 selection:text-rose-200 flex flex-col">

      {/* GLOBAL APPLICATION HEADER & SEARCH NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-b-slate-900 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

          <a href="/" className="flex items-center gap-2.5 group cursor-pointer select-none">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center font-black text-white text-sm shadow-lg shadow-rose-500/20 group-hover:scale-105 transition-transform">
              🏆
            </div>
            <span className="text-md font-black tracking-tight text-white uppercase">
              Trophy<span className="text-rose-500 group-hover:text-rose-400 transition-colors">DB</span>
            </span>
          </a>

          <div className="w-full sm:w-80 relative group">
            <span className="absolute left-3 top-2.5 text-slate-500 text-xs group-focus-within:text-rose-500 transition-colors">🔍</span>
            <input
              type="text"
              placeholder="Search games (e.g. Dark Souls)..."
              className="w-full bg-slate-900/60 border border-slate-800 rounded-lg pl-8 pr-4 py-2 text-xs font-medium text-slate-200 placeholder-slate-500 outline-none focus:border-rose-500/50 focus:bg-slate-900 transition-all shadow-inner"
            />
          </div>

          <div className="flex items-center gap-6 text-xs font-bold text-slate-400">
            <a href="/" className="hover:text-rose-400 transition-colors">Home</a>
            <a href="/hall-of-fame" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <span>🎖️</span> Hall of Fame
            </a>
            <a href="/games" className="hover:text-rose-400 transition-colors">Games</a>
          </div>

        </div>
      </nav>

      {/* HERO DESCRIPTIVE EXPLANATION BANNER */}
      <header className="relative max-w-7xl mx-auto px-6 pt-12 pb-6 w-full">
        <div className="max-w-3xl space-y-3">
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            TrophyDB: <span className="text-rose-400">An Achievement Database for Hunters</span>
          </h1>
          <div className="space-y-4 text-sm text-slate-400 leading-relaxed max-w-2xl">
            <p>
              This database is designed exclusively for completionists looking to optimize their 100% runs. By tracking raw mechanical variables—such as strict calendar schedules, artificial grinds, skip menus, and permanent missables—we isolate the pure data required to earn your next perfect badge without wading through narrative filler or traditional review fluff.
            </p>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CANVAS AREA */}
      <main className="max-w-7xl mx-auto px-6 py-4 space-y-16 flex-1 w-full">

        {/* ========================================================= */}
        {/* MODULE 1: FEATURED CAROUSEL ZONE                           */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              <span className="text-rose-500">🔥</span> Featured
            </h2>

            {/* Manual Slide Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Previous Featured Game"
              >
                ‹
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors"
                aria-label="Next Featured Game"
              >
                ›
              </button>
            </div>
          </div>


          <div
            className="w-full overflow-hidden relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex w-full transition-transform duration-500 ease-out gap-0"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {trendingGames.map((game) => {
                const categoryConfig = MAIN_CATEGORY_REGISTRY[game.mainCompletionCategory.label];

                return (
                  <div key={game.id} className="w-full shrink-0 px-1 snap-center">
                    <a
                      href={`/games/${game.id}`}
                      className="block w-full bg-gradient-to-br from-slate-900 to-slate-950/40 rounded-2xl border border-slate-900 hover:border-slate-800/80 transition-all duration-300 overflow-visible flex flex-col md:flex-row group relative shadow-2xl cursor-pointer text-left"
                    >

                      <div className="w-full md:w-[40%] h-48 md:h-64 relative shrink-0 bg-slate-950 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={game.assets.thumbnailUrl} alt={game.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 opacity-60" />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-slate-950/20 to-slate-950" />
                      </div>

                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4 overflow-visible relative">
                        <div className="space-y-1">
                          <h3 className="text-xl font-black text-white group-hover:text-rose-400 transition-colors">{game.title}</h3>
                          <p className="text-xs text-slate-400 font-semibold">{game.genres.join(' • ')}</p>
                        </div>

                        {/* FIXED VIBRANT GRADIENT BORDER & BACKGLOW BADGE */}
                        {/* FEATURED: Refined dictionary-driven gradient badge structure */}
                        {categoryConfig && (
                          <div
                            className="relative group/tooltip inline-block self-start overflow-visible z-30"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {/* Clean border layer reading directly from our style variables */}
                            <div className={`p-[1px] rounded-lg bg-gradient-to-br ${categoryConfig.bgGradient} ${categoryConfig.hoverGradient} shadow-lg shadow-black/40 cursor-help transition-all duration-300 hover:scale-[1.01]`}>
                              {/* Setting the resting opacity layer to bg-slate-950/75 allows the gradient to shimmer behind it.
                                On hover, it smoothly transitions to a slightly clearer bg-slate-950/40 for a beautiful, controlled glow.
                              */}
                              <div className="bg-slate-950/75 group-hover/tooltip:bg-slate-950/40 transition-colors duration-300 rounded-[7px] px-3 py-1.5 flex items-center gap-2 text-xs font-black uppercase tracking-wider text-white">
                                <span className="text-sm drop-shadow">{categoryConfig.emoji}</span>
                                <span className="drop-shadow-md">{game.mainCompletionCategory.label}</span>
                              </div>
                            </div>

                            <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 p-4 bg-slate-900 text-slate-300 rounded-xl border border-slate-800 shadow-2xl opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-200 text-xs z-50 leading-relaxed">
                              {game.mainCompletionCategory.description}
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-900/80 text-center md:text-left">
                          <div className="border-r border-slate-900/40"><span className="block text-[9px] font-black text-slate-500 uppercase tracking-wider">Achievements</span><span className="text-xs font-black text-slate-200">{game.totalAchievements} Total</span></div>
                          <div className="sm:border-r border-slate-900/40 pl-2 sm:pl-0"><span className="block text-[9px] font-black text-slate-500 uppercase tracking-wider">Blind Play</span><span className="text-xs font-black text-slate-200">{game.blindPlaythroughHours}h</span></div>
                          <div className="border-r border-slate-900/40 pl-0 sm:pl-2"><span className="block text-[9px] font-black text-slate-500 uppercase tracking-wider">Min Runs</span><span className="text-xs font-black text-slate-200">{game.minimumPlaythroughs}x</span></div>
                          <div className="pl-2"><span className="block text-[9px] font-black text-slate-500 uppercase tracking-wider">100% Route</span><span className="text-xs font-black text-rose-400">{game.timeTo100PercentPerfect}h <span className="text-[10px] font-normal text-slate-500">/ {game.timeTo100PercentBase}h</span></span></div>
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {game.experienceTags.map((tagId) => {
                            const tagConfig = EXPERIENCE_TAG_REGISTRY[tagId];
                            return tagConfig ? (
                              <div key={tagId} className="relative group/tag inline-block">
                                <span className="inline-block px-2.5 py-0.5 text-[10px] font-extrabold rounded bg-slate-950 text-slate-400 border border-slate-900 tracking-wide capitalize cursor-help transition-colors group-hover/tag:text-slate-200 group-hover/tag:border-slate-700">
                                  {tagConfig.name}
                                </span>
                                <div className="absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 scale-95 opacity-0 pointer-events-none transition-all duration-150 ease-out origin-bottom group-hover/tag:scale-100 group-hover/tag:opacity-100">
                                  <div className="px-2.5 py-2 text-[11px] font-medium text-slate-300 bg-slate-900 border border-slate-800 rounded shadow-2xl text-center leading-normal">
                                    {tagConfig.description}
                                  </div>
                                </div>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>

                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* MODULE 2: HIGHLY ACCLAIMED SECTION                         */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              <span className="text-amber-500">🎖️</span> Highly Acclaimed
            </h2>
            <a
              href="/hall-of-fame"
              className="text-xs text-amber-400 hover:text-amber-300 font-extrabold tracking-wider bg-amber-950/20 px-3 py-1.5 rounded border border-amber-900/40 transition-colors z-20"
            >
              View More →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hallOfFameCards.map((game) => {
              const categoryConfig = MAIN_CATEGORY_REGISTRY[game.mainCompletionCategory.label];

              return (
                <a
                  key={`hof-${game.id}`}
                  href={`/games/${game.id}`}
                  className="block bg-gradient-to-b from-slate-900/50 to-slate-950 border border-amber-900/20 hover:border-amber-500/40 transition-all rounded-xl p-4 relative overflow-visible group cursor-pointer text-left"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 blur-2xl pointer-events-none" />
                  <div className="flex items-start justify-between gap-4 relative z-20">
                    <div className="space-y-1">
                      <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest">
                        {game.badge}
                      </span>
                      <h3 className="font-extrabold text-md text-white group-hover:text-amber-400 transition-colors">{game.title}</h3>
                    </div>

                    {/* SQUARES: Refined dictionary-driven emoji boxes */}
                    {categoryConfig && (
                      <div
                        className="relative group/emoji-tooltip overflow-visible"
                        onClick={(e) => e.preventDefault()}
                      >
                        {/* Smoothly maps resting colors and hover profiles without blowing out brightness levels */}
                        <div className={`p-[1px] rounded-lg bg-gradient-to-br ${categoryConfig.bgGradient} ${categoryConfig.hoverGradient} shadow-md transition-all duration-300 hover:scale-105`}>
                          <span className="text-xl px-2.5 py-1.5 rounded-[7px] bg-slate-950/70 group-hover/emoji-tooltip:bg-slate-950/30 block cursor-help text-center transition-colors duration-300">
                            {categoryConfig.emoji}
                          </span>
                        </div>

                        <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-slate-900 text-slate-300 rounded-xl border border-slate-800 shadow-2xl opacity-0 pointer-events-none group-hover/emoji-tooltip:opacity-100 transition-opacity duration-200 text-xs text-right leading-normal z-50">
                          <span className="block font-black text-rose-400 text-[10px] uppercase tracking-wider mb-1">
                            {game.mainCompletionCategory.label}
                          </span>
                          {game.mainCompletionCategory.description}
                        </div>
                      </div>
                    )}

                  </div>
                  <p className="text-[11px] text-slate-400 mt-3 leading-relaxed border-l-2 border-amber-500/30 pl-2.5 relative z-20">
                    {game.reasoning}
                  </p>
                </a>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* MODULE 3: RECENTLY ADDED SECTOR LISTINGS                   */}
        {/* ========================================================= */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
              <span className="text-rose-500">🆕</span> Recently Added
            </h2>
            <a
              href="/games"
              className="text-xs text-rose-400 hover:text-rose-300 font-extrabold tracking-wider bg-rose-950/20 px-3 py-1.5 rounded border border-rose-900/40 transition-colors z-20"
            >
              View More →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlyAdded.map((game) => {
              const categoryConfig = MAIN_CATEGORY_REGISTRY[game.mainCompletionCategory.label];

              return (
                <a
                  key={game.id}
                  href={`/games/${game.id}`}
                  className="block bg-slate-900/40 rounded-xl border border-slate-900 flex flex-col justify-between hover:bg-slate-900/60 transition-colors duration-200 overflow-visible group relative cursor-pointer text-left"
                >

                  <div className="h-24 relative bg-slate-950 overflow-visible shrink-0 rounded-t-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={game.assets.thumbnailUrl} alt={game.title} className="w-full h-full object-cover block align-middle opacity-60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-950/40 to-transparent" />

                    <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between z-20">
                      <div>
                        <h3 className="font-black text-md text-white tracking-tight">{game.title}</h3>
                        <span className="text-[10px] font-bold text-rose-400 tracking-wide uppercase">{game.totalAchievements} Achievements</span>
                      </div>

                      {/* FIXED RECENTLY ADDED BOX: Vibrant semi-translucent background & hyper-bright hover */}
                      {/* SQUARES: Refined dictionary-driven emoji boxes */}
                      {categoryConfig && (
                        <div
                          className="relative group/emoji-tooltip overflow-visible"
                          onClick={(e) => e.preventDefault()}
                        >
                          {/* Smoothly maps resting colors and hover profiles without blowing out brightness levels */}
                          <div className={`p-[1px] rounded-lg bg-gradient-to-br ${categoryConfig.bgGradient} ${categoryConfig.hoverGradient} shadow-md transition-all duration-300 hover:scale-105`}>
                            <span className="text-xl px-2.5 py-1.5 rounded-[7px] bg-slate-950/70 group-hover/emoji-tooltip:bg-slate-950/30 block cursor-help text-center transition-colors duration-300">
                              {categoryConfig.emoji}
                            </span>
                          </div>

                          <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-slate-900 text-slate-300 rounded-xl border border-slate-800 shadow-2xl opacity-0 pointer-events-none group-hover/emoji-tooltip:opacity-100 transition-opacity duration-200 text-xs text-right leading-normal z-50">
                            <span className="block font-black text-rose-400 text-[10px] uppercase tracking-wider mb-1">
                              {game.mainCompletionCategory.label}
                            </span>
                            {game.mainCompletionCategory.description}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  <div className="p-4 space-y-4 flex-1 flex flex-col justify-between relative z-20">
                    <div className="space-y-2">
                      <span className="text-[9px] uppercase font-black tracking-widest text-slate-500 block">Sample Requirements</span>
                      {game.achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className="p-2 bg-slate-950/60 rounded-lg border border-slate-900/60 flex items-center justify-between gap-4 group/item relative z-30"
                          onClick={(e) => e.preventDefault()}
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-300 truncate">{achievement.title}</p>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">{achievement.description}</p>
                          </div>

                          <div className="flex shrink-0 gap-1">
                            {achievement.tags.map((tag) => (
                              <div key={tag.id} className="relative group/ach-tooltip inline-block overflow-visible">
                                <span className={`text-[9px] font-black tracking-wider px-2 py-0.5 rounded border uppercase cursor-help ${tag.tailwindClasses}`}>
                                  {tag.name}
                                </span>
                                <div className="absolute right-0 bottom-full mb-2 w-56 p-2.5 bg-slate-900 text-slate-300 rounded border border-slate-800 shadow-2xl opacity-0 pointer-events-none group-hover/ach-tooltip:opacity-100 transition-opacity duration-150 text-[11px] leading-normal z-50 text-left">
                                  {tag.description}
                                </div>
                              </div>
                            ))}
                          </div>

                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-900/60 grid grid-cols-3 gap-1 text-center text-[10px]">
                      <div className="border-r border-slate-900/40">
                        <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-tight">Blind Play</span>
                        <span className="font-extrabold text-slate-300">{game.blindPlaythroughHours}h</span>
                      </div>
                      <div className="border-r border-slate-900/40">
                        <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-tight">Min Runs</span>
                        <span className="font-extrabold text-slate-300">{game.minimumPlaythroughs}x</span>
                      </div>
                      <div>
                        <span className="block text-[8px] font-bold text-slate-500 uppercase tracking-tight">Completion Estimate</span>
                        <span className="font-extrabold text-rose-400">{game.timeTo100PercentPerfect}h</span>
                      </div>
                    </div>
                  </div>

                </a>
              );
            })}
          </div>
        </section>
      </main>

      {/* FOOTER SECTION */}
      <footer className="border-t border-slate-900 mt-12 bg-slate-950 pb-8 pt-10 relative z-20 w-full">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">

          <div className="space-y-3 max-w-sm text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-5 h-5 rounded bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-[10px] border border-slate-800">
                🏆
              </div>
              <span className="text-sm font-black tracking-tight text-slate-300 uppercase">
                Trophy<span className="text-rose-500">DB</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-600 leading-relaxed font-medium">
              TrophyDB is not affiliated with Sony, Microsoft, Valve or any other enterprise in any way. All game properties, titles, and logos are property of their respective owners.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3 text-[11px] font-bold text-slate-500 uppercase tracking-wide">
            <a href="/about" className="hover:text-rose-400 transition-colors">About Us</a>
            <a href="/faq" className="hover:text-rose-400 transition-colors">FAQ</a>
            <a href="/privacy" className="hover:text-rose-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-rose-400 transition-colors">Terms of Use</a>
            <a href="/contact" className="hover:text-rose-400 transition-colors">Contact Us</a>
          </div>

        </div>
      </footer>
    </div>
  );
}