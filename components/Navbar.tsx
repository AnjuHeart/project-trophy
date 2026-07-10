"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
// Import your mock data to check if a specific game is in the Hall of Fame
import { mockGames } from '@/data/mockGame'; 

export default function Navbar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const pathSegments = pathname.split('/').filter(Boolean);
  const isHomePage = pathname === '/';
  const isGamesLibrary = pathname === '/games';
  
  const isIndividualGamePage = pathSegments[0] === 'games' && pathSegments.length > 1;
  const gameSlug = isIndividualGamePage ? pathSegments[1] : null;

  const currentGame = mockGames.find(game => game.id === gameSlug);
  const isAwardedGame = isIndividualGamePage && currentGame?.isHallOfFame;

  const isNoSearchPage = isGamesLibrary || pathname === '/faq' || pathname === '/privacy';

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      window.location.href = `/games?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    /* 1. HEIGHT BUMP: Changed to h-20 (80px) for a much more premium look.
      2. ABSOLUTE POSITIONING & GRADIENT: Swapped 'sticky' to 'absolute' so it drops cleanly over 
         hero banners, and used a subtle gradient from slate-950 down to transparent.
    */
    <nav className="w-full h-20 absolute top-0 left-0 z-50 bg-gradient-to-b from-slate-950/90 via-slate-950/40 to-transparent">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-4">
        
        {/* LEFT SIDE: The Dynamic Breadcrumb Trail */}
        <div className="flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-slate-500">
          <a href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
            <span className="p-1.5 rounded bg-gradient-to-br from-slate-800 to-slate-900 text-xs border border-slate-800 shadow-inner">🏆</span>
            <span className="font-black text-slate-200 text-sm tracking-tight">Trophy<span className="text-rose-500">DB</span></span>
          </a>

          {pathSegments.map((segment, index) => {
            const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            const cleanSegmentName = decodeURIComponent(segment.replace(/-/g, ' '));

            return (
              <div key={url} className="flex items-center gap-2">
                <span className="text-slate-700 font-medium text-sm">/</span>
                <a 
                  href={url} 
                  className={`transition-colors duration-150 text-sm ${
                    isLast 
                      ? 'text-rose-400/90 font-extrabold cursor-default pointer-events-none' 
                      : 'hover:text-slate-300'
                  }`}
                >
                  {cleanSegmentName}
                </a>
              </div>
            );
          })}
        </div>

        {/* RIGHT SIDE: Utilities & Contrast Navigation */}
        <div className="flex items-center gap-6">
          
          {!isNoSearchPage && (
            <div className="relative w-48 md:w-64 transition-all duration-200">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs opacity-60">🔍</span>
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                className="w-full bg-slate-950/40 border border-slate-800/60 rounded-xl pl-8 pr-4 py-2 text-xs font-medium text-slate-200 placeholder-slate-500 outline-none focus:border-slate-700 focus:bg-slate-900/80 transition-all shadow-inner"
              />
            </div>
          )}

          {/* LINKEDIN-STYLE CONTRAST NAVIGATION:
            Icons default to slate-500 (dimmed). When active, they switch to high-contrast white (slate-100)
            or brand rose-500. A crisp border-b bottom-bar marks the active location.
          */}
          <div className="flex items-center h-full gap-1">
            
            {/* Home Icon Container */}
            <div className="relative flex items-center justify-center px-3 h-20">
              <a 
                href="/" 
                title="Home"
                className={`transition-all duration-200 text-xl hover:text-slate-200 ${
                  isHomePage ? 'text-slate-100 font-bold scale-105' : 'text-slate-500'
                }`}
              >
                🏠
              </a>
              {isHomePage && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-rose-500 rounded-t-full shadow-[0_-2px_10px_rgba(244,63,94,0.4)]" />}
            </div>

            {/* Library Icon Container */}
            <div className="relative flex items-center justify-center px-3 h-20">
              <a 
                href="/games" 
                title="Games Library"
                className={`transition-all duration-200 text-xl hover:text-slate-200 ${
                  isGamesLibrary || isIndividualGamePage ? 'text-slate-100 font-bold scale-105' : 'text-slate-500'
                }`}
              >
                📚
              </a>
              {(isGamesLibrary || isIndividualGamePage) && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-rose-500 rounded-t-full shadow-[0_-2px_10px_rgba(244,63,94,0.4)]" />}
            </div>

            {/* Hall of Fame Icon Container */}
            <div className="relative flex items-center justify-center px-3 h-20">
              <a 
                href="/hall-of-fame" 
                title="Hall of Fame"
                className={`transition-all duration-200 text-xl hover:text-slate-200 ${
                  pathname === '/hall-of-fame' || isAwardedGame ? 'text-amber-400 font-bold scale-105' : 'text-slate-500'
                }`}
              >
                🏅
              </a>
              {(pathname === '/hall-of-fame' || isAwardedGame) && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-amber-500 rounded-t-full shadow-[0_-2px_10px_rgba(245,158,11,0.4)]" />}
            </div>

          </div>

          {/* User Account Placeholder */}
          <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center cursor-pointer hover:border-slate-600 transition-colors shadow-inner" title="Account">
            <span className="text-xs text-slate-500">👤</span>
          </div>

        </div>

      </div>
    </nav>
  );
}