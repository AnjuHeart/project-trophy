"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { checkAwardStatus } from '@/app/actions';

export default function Navbar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  const [isAwardedGame, setIsAwardedGame] = useState(false);

  const pathSegments = pathname.split('/').filter(Boolean);
  const isHomePage = pathname === '/';
  const isGamesLibrary = pathname === '/games';
  const isIndividualGamePage = pathSegments[0] === 'games' && pathSegments.length > 1;
  const gameSlug = isIndividualGamePage ? pathSegments[1] : null;
  const isNoSearchPage = isGamesLibrary || pathname === '/faq' || pathname === '/privacy';

  useEffect(() => {
    if (gameSlug) {
      checkAwardStatus(gameSlug).then((awarded) => setIsAwardedGame(awarded));
    } else {
      setIsAwardedGame(false);
    }
  }, [gameSlug]);

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      window.location.href = `/games?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const isLibraryActive = isGamesLibrary || isIndividualGamePage;
  const isHoFActive = pathname === '/hall-of-fame' || isAwardedGame;

  return (
    <nav className={`w-full h-20 absolute top-0 left-0 z-50 bg-gradient-to-b
    ${isHoFActive ? "from-taupe-950/90 via-taupe-950/40 to-transparent" : "from-slate-950/90 via-slate-950/40 to-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-4">

        {/* LEFT SIDE: URL */}
        <div className={`flex items-center gap-2 text-sm font-bold tracking-wider uppercase ${isHoFActive ? "text-taupe-500" : "text-slate-500"}`}>
          <a href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
            <span className={`p-1.5 rounded bg-gradient-to-br text-xs border shadow-inner 
              ${isHoFActive ? "from-taupe-800 to-taupe-950 border-taupe-800" : "from-slate-800 to-slate-900 border-slate-800"}`}>🏆</span>
            <span className="font-black text-slate-100 text-sm tracking-tight">Trophy<span className={`${isHoFActive ? "text-amber-500" : "text-rose-500"}`}>DB</span></span>
          </a>

          {pathSegments.map((segment, index) => {
            const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            const cleanSegmentName = decodeURIComponent(segment.replace(/-/g, ' '));

            return (
              <div key={url} className="flex items-center gap-2">
                <span className={`${isHoFActive ? "text-taupe-700" : "text-slate-700"} font-medium text-sm`}>/</span>
                <a
                  href={url}
                  className={`transition-colors duration-150 text-sm ${isLast
                      ? (isHoFActive ? "text-amber-400/90 " : "text-rose-400/90 ") + 'font-extrabold cursor-default pointer-events-none'
                      : (isHoFActive ? "hover:text-amber-100" : "hover:text-slate-300")
                    }`}
                >
                  {cleanSegmentName}
                </a>
              </div>
            );
          })}
        </div>

        {/* RIGHT SIDE: SEARCHBAR AND NAVIGATION */}
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
                className={`w-full border 
                  ${isHoFActive
                    ? "border-taupe-800/60 bg-taupe-950/40 text-taupe-200 placeholder-taupe-500 focus:border-taupe-700 focus:bg-taupe-900/80"
                    : "border-slate-800/60 bg-slate-950/40 text-slate-200 placeholder-slate-500 focus:border-slate-700 focus:bg-slate-900/80"
                  } rounded-xl pl-8 pr-4 py-2 text-xs font-medium outline-none transition-all shadow-inner`}
              />
            </div>
          )}

          <div className="flex items-center h-full gap-1">

            {/* Home Icon */}
            <div className="relative flex items-center justify-center px-3 h-20">
              <a
                href="/"
                title="Home"
                className={`transition-all duration-200 text-xl hover:text-slate-200 ${isHomePage ? 'text-slate-100 font-bold scale-105' : 'text-slate-500'
                  }`}
              >
                🏠
              </a>
              {isHomePage && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-rose-500 rounded-t-full shadow-[0_-2px_10px_rgba(244,63,94,0.4)]" />}
            </div>

            {/* Library Icon */}
            <div className="relative flex items-center justify-center px-3 h-20">
              <a
                href="/games"
                title="Games Library"
                className={`transition-all duration-200 text-xl hover:text-slate-200 ${isLibraryActive ? 'text-slate-100 font-bold scale-105' : 'text-slate-500'
                  }`}
              >
                📚
              </a>
              {isLibraryActive && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-rose-500 rounded-t-full shadow-[0_-2px_10px_rgba(244,63,94,0.4)]" />}
            </div>

            {/* Hall of Fame Icon */}
            <div className="relative flex items-center justify-center px-3 h-20">
              <a
                href="/hall-of-fame"
                title="Hall of Fame"
                className={`transition-all duration-200 text-xl hover:text-slate-200 ${isHoFActive ? 'text-amber-400 font-bold scale-105' : 'text-slate-500'
                  }`}
              >
                🏅
              </a>
              {isHoFActive && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-amber-500 rounded-t-full shadow-[0_-2px_10px_rgba(245,158,11,0.4)]" />}
            </div>

          </div>

          <div className={`w-7 h-7 rounded-full border 
            ${isHoFActive ? "border-taupe-800 hover:border-taupe-600 bg-taupe-900" : "border-slate-800 hover:border-slate-600 bg-slate-900"} 
            flex items-center justify-center cursor-pointer transition-colors shadow-inner" title="Account`}>
            <span className="text-xs text-slate-500">👤</span>
          </div>

        </div>
      </div>
    </nav>
  );
}