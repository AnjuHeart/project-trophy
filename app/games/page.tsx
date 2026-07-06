'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
// 1. Importing your complete global game array renamed cleanly
import { mockGames as allGames } from '@/data/mockGame'; 
// 2. Pointing directly to your schema file constants inside the types folder
import { MAIN_CATEGORY_REGISTRY } from '@/types/schema';

function GamesDirectoryContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read URL parameters on initialization
  const urlPage = Number(searchParams.get('page')) || 1;
  const urlSearch = searchParams.get('search') || '';
  const GAMES_PER_PAGE = 12;

  // -----------------------------------------------------------------
  // STATE MATRIX
  // -----------------------------------------------------------------
  // Local instant state for input typing reactivity
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  
  const [selectedTab, setSelectedTab] = useState<'all' | 'mastered' | 'backlog'>('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxHours, setMaxHours] = useState<number>(150);
  const [sortBy, setSortBy] = useState<'title' | 'difficulty' | 'time'>('title');
  const [isListView, setIsListView] = useState(false);

  // Sync state if the URL search parameter changes externally (e.g., top-bar search redirect)
  useEffect(() => {
    setSearchQuery(urlSearch);
  }, [urlSearch]);

  // -----------------------------------------------------------------
  // URL PARAMS SYNCHRONIZER & DEBOUNCER
  // -----------------------------------------------------------------
  // Updates the global URL structure when user pauses typing or adjusts settings
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      // Update or prune search query parameter
      if (searchQuery.trim()) {
        params.set('search', searchQuery.trim());
      } else {
        params.delete('search');
      }
      
      // Always auto-reset back to page 1 whenever search bounds change
      params.set('page', '1');
      
      router.push(`${pathname}?${params.toString()}`);
    }, 350); // 350ms debounce window delay

    return () => clearTimeout(timer);
  }, [searchQuery, selectedTab, selectedCategories, maxHours, sortBy]);

  // Handle manual page jumps cleanly
  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  // -----------------------------------------------------------------
  // COMPUTED FILTERING & SORTING LOGIC
  // -----------------------------------------------------------------
  const filteredAndSortedGames = useMemo(() => {
    // Note: We filter using the state search string to keep the UI immediate
    return allGames
      .filter((game) => {
        const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              game.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesTab = selectedTab === 'all' 
          ? true 
          : selectedTab === 'mastered' 
            ? game.timeTo100PercentPerfect <= 40 
            : game.timeTo100PercentPerfect > 40;

        const matchesCategory = selectedCategories.length === 0 
          ? true 
          : selectedCategories.includes(game.mainCompletionCategory.label);

        const matchesTime = game.timeTo100PercentPerfect <= maxHours;

        return matchesSearch && matchesTab && matchesCategory && matchesTime;
      })
      .sort((a, b) => {
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'difficulty') return (b.mainCompletionCategory.numericDifficultyCode ?? 0) - (a.mainCompletionCategory.numericDifficultyCode ?? 0);
        if (sortBy === 'time') return b.timeTo100PercentPerfect - a.timeTo100PercentPerfect;
        return 0;
      });
  }, [searchQuery, selectedTab, selectedCategories, maxHours, sortBy]);

  // -----------------------------------------------------------------
  // PAGINATION CHUNK CALCULATIONS
  // -----------------------------------------------------------------
  const totalPages = Math.max(Math.ceil(filteredAndSortedGames.length / GAMES_PER_PAGE), 1);

  const paginatedGames = useMemo(() => {
    const startIndex = (urlPage - 1) * GAMES_PER_PAGE;
    const endIndex = startIndex + GAMES_PER_PAGE;
    return filteredAndSortedGames.slice(startIndex, endIndex);
  }, [filteredAndSortedGames, urlPage]);

  const handleCategoryToggle = (categoryLabel: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryLabel)
        ? prev.filter((c) => c !== categoryLabel)
        : [...prev, categoryLabel]
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500/30">
      
      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto pt-22 px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        
        {/* STATS RIBBON */}
        <div className="space-y-4">
          <h1 className="text-3xl font-black tracking-tight text-white uppercase">
            Games Library
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 bg-slate-900/40 border border-slate-900 rounded-2xl p-4 text-xs font-bold text-slate-400">
            <div>Total Indexed: <span className="text-white text-sm font-black">{allGames.length}</span></div>
            <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
            <div>Matches View: <span className="text-rose-400 text-sm font-black">{filteredAndSortedGames.length}</span></div>
            <div className="h-4 w-[1px] bg-slate-800 hidden sm:block" />
            <div>Max Ceiling Filter: <span className="text-amber-400 text-sm font-black">{maxHours} Hours</span></div>
          </div>
        </div>

        {/* CORE GRID ARCHITECTURE */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* SIDEBAR FILTERS CONTROL BOARD */}
          <aside className="space-y-6 bg-gradient-to-br from-slate-900 to-slate-950/40 border border-slate-900/80 p-5 rounded-2xl sticky top-24 shadow-xl">
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">Completion Group</h3>
              <div className="flex flex-col gap-1.5">
                {(['all', 'mastered', 'backlog'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                      selectedTab === tab
                        ? 'bg-rose-500/10 border border-rose-500/30 text-rose-400 shadow-sm'
                        : 'bg-slate-950/40 border border-transparent text-slate-400 hover:text-white hover:bg-slate-950/80'
                    }`}
                  >
                    {tab === 'all' ? '📁 All Archive' : tab === 'mastered' ? '🏆 100% Perfected' : '⏳ Tracking Backlog'}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-[1px] bg-slate-900/80 w-full" />

            {/* DYNAMIC CATEGORY GLOW FILTERS */}
            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2.5">Filter By Category</h3>
              <div className="flex flex-col gap-1.5">
                {(Object.keys(MAIN_CATEGORY_REGISTRY) as Array<keyof typeof MAIN_CATEGORY_REGISTRY>).map((key) => {
                  const isSelected = selectedCategories.includes(key);
                  const catConfig = MAIN_CATEGORY_REGISTRY[key];

                  return (
                    <label 
                      key={key} 
                      className={`relative w-full overflow-hidden p-[1px] rounded-lg cursor-pointer select-none transition-all duration-300 active:scale-[0.99] block group ${
                        isSelected ? 'shadow-md shadow-black/30' : ''
                      }`}
                    >
                      <div className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
                        isSelected 
                          ? `bg-gradient-to-br ${catConfig.bgGradient} opacity-100` 
                          : 'bg-slate-900/60 group-hover:bg-slate-800 opacity-100'
                      }`} />

                      <div className={`relative px-2.5 py-1.5 rounded-[7px] flex items-center gap-2 text-[11px] font-black uppercase tracking-wide transition-all duration-300 ${
                        isSelected 
                          ? 'bg-slate-950/30 text-white brightness-110' 
                          : 'bg-slate-950/70 text-slate-400 group-hover:text-slate-200 group-hover:bg-slate-950/40'
                      }`}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleCategoryToggle(key)}
                          className="sr-only" 
                        />
                        <span className="text-xs shrink-0 drop-shadow">
                          {catConfig.emoji}
                        </span>
                        <span className="drop-shadow-md truncate leading-none">
                          {key}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="h-[1px] bg-slate-900/80 w-full" />

            {/* RANGE TIMELINE SLIDER */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-400">Max 100% Run-Time</h3>
                <span className="text-xs font-black text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">{maxHours}h</span>
              </div>
              <input
                type="range"
                min="5"
                max="150"
                step="5"
                value={maxHours}
                onChange={(e) => setMaxHours(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-1.5">
                <span>5 Hours</span>
                <span>150+ Hours</span>
              </div>
            </div>
          </aside>

          {/* RIGHT VIEWPORT DIRECTORY DISPLAY */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* CONTROL BAR STRIP */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-900/20 border border-slate-900/60 p-3 rounded-xl shadow-inner">
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  placeholder="Search title, genre or keys..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-900 focus:border-slate-800 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-slate-500 font-medium focus:outline-none focus:ring-0 transition-all"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-950 border border-slate-900 focus:border-slate-800 text-xs text-slate-300 rounded-xl px-3 py-1.5 font-bold focus:outline-none cursor-pointer transition-all"
                >
                  <option value="title">Sort: Alphabetical</option>
                  <option value="difficulty">Sort: Max Difficulty</option>
                  <option value="time">Sort: Completion Length</option>
                </select>

                <div className="h-5 w-[1px] bg-slate-900 hidden sm:block" />

                <div className="flex bg-slate-950 border border-slate-900 p-0.5 rounded-lg">
                  <button
                    onClick={() => setIsListView(false)}
                    className={`px-2 py-1 rounded text-xs transition-colors ${!isListView ? 'bg-slate-900 text-white font-black' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setIsListView(true)}
                    className={`px-2 py-1 rounded text-xs transition-colors ${isListView ? 'bg-slate-900 text-white font-black' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>

            {/* DYNAMIC CARDS RENDER PIPELINE */}
            {filteredAndSortedGames.length === 0 ? (
              <div className="text-center py-24 bg-slate-900/10 border border-dashed border-slate-900 rounded-2xl">
                <span className="text-2xl">🔍</span>
                <h3 className="text-sm font-black text-white mt-2 uppercase tracking-wide">No Matches Tracked</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 font-medium">Try loosening up your criteria filters or searching another keyword set.</p>
              </div>
            ) : (
              <>
                <div className={isListView ? "flex flex-col gap-3" : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"}>
                  {paginatedGames.map((game) => {
                    const catConfig = MAIN_CATEGORY_REGISTRY[game.mainCompletionCategory.label];
                    
                    if (!isListView) {
                      return (
                        <a
                          key={game.id}
                          href={`/games/${game.id}`}
                          className="group flex flex-col bg-gradient-to-br from-slate-900 to-slate-950/40 border border-slate-900 hover:border-slate-800/80 rounded-2xl transition-all duration-300 overflow-hidden shadow-lg hover:-translate-y-0.5"
                        >
                          <div className="h-40 w-full bg-slate-950 relative overflow-hidden">
                            <img src={game.assets.thumbnailUrl} alt={game.title} className="w-full h-full object-cover opacity-55 group-hover:scale-102 transition-all duration-500 block align-middle" />
                            <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-black tracking-wider border border-slate-800 uppercase text-slate-400">
                              {game.genres[0]}
                            </div>
                          </div>
                          <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                            <div>
                              <h4 className="font-black text-white group-hover:text-rose-400 transition-colors text-sm truncate">{game.title}</h4>
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wide">Difficulty: {game.mainCompletionCategory.numericDifficultyCode ?? '0'}/10</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] font-extrabold bg-slate-950/50 px-3 py-1.5 border border-slate-900/60 rounded-xl">
                              <span className="text-slate-500">Route Time:</span>
                              <span className="text-rose-400">{game.timeTo100PercentPerfect}h</span>
                            </div>
                          </div>
                        </a>
                      );
                    }

                    return (
                      <a
                        key={game.id}
                        href={`/games/${game.id}`}
                        className="group flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-950/20 border border-slate-900/80 hover:border-slate-800 rounded-xl px-4 py-3 transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-16 h-10 rounded-lg bg-slate-950 overflow-hidden shrink-0 border border-slate-900">
                            <img src={game.assets.thumbnailUrl} alt="" className="w-full h-full object-cover opacity-55 block align-middle" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-black text-sm text-white group-hover:text-rose-400 transition-colors truncate">{game.title}</h4>
                            <p className="text-[10px] font-bold text-slate-500 truncate">{game.genres.join(' • ')}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6 shrink-0 ml-4">
                          {catConfig && <span className="text-xs hidden sm:block bg-slate-950 px-2 py-0.5 border border-slate-900 rounded text-[10px] font-black text-slate-400 uppercase tracking-wide">{catConfig.emoji} {game.mainCompletionCategory.label}</span>}
                          <div className="text-right">
                            <span className="block text-[11px] font-black text-white">{game.timeTo100PercentPerfect}h</span>
                            <span className="block text-[8px] font-black uppercase text-slate-500 tracking-wider">Perfect Route</span>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* PAGINATION PANEL CONTROLLER */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/10 border border-slate-900/60 p-4 rounded-xl mt-6 text-xs font-bold text-slate-400">
                  <div>
                    Showing <span className="text-white">{Math.min((urlPage - 1) * GAMES_PER_PAGE + 1, filteredAndSortedGames.length)}</span>–
                    <span className="text-white">{Math.min(urlPage * GAMES_PER_PAGE, filteredAndSortedGames.length)}</span> of{' '}
                    <span className="text-rose-400">{filteredAndSortedGames.length}</span> games
                  </div>

                  <div className="flex items-center gap-1.5 select-none">
                    <button
                      onClick={() => handlePageChange(Math.max(urlPage - 1, 1))}
                      disabled={urlPage === 1}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-900 text-slate-400 hover:text-white hover:border-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => {
                      const pageNumber = index + 1;
                      const isActive = urlPage === pageNumber;

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-black transition-all ${
                            isActive
                              ? 'bg-gradient-to-br from-rose-500/20 to-rose-600/10 border border-rose-500/40 text-rose-400 shadow-md shadow-rose-950/20'
                              : 'bg-slate-950/50 border border-slate-900 text-slate-500 hover:text-slate-300 hover:border-slate-800'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => handlePageChange(Math.min(urlPage + 1, totalPages))}
                      disabled={urlPage === totalPages}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-900 text-slate-400 hover:text-white hover:border-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-all"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

export default function GamesDirectoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center font-bold text-xs uppercase tracking-widest">Loading Library Data...</div>}>
      <GamesDirectoryContent />
    </Suspense>
  );
}