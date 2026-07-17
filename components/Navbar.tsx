"use client";

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useGame } from './ContextManager';

export default function Navbar() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  
  // MOBILE INTERACTIONS
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const { isAwardedGame } = useGame();
  const isHoFActive = pathname === '/hall-of-fame' || isAwardedGame;; 

  const isLibraryActive = pathname.startsWith('/games'); 
  const isHomePage = pathname === '/';
  const isNoSearchPage = pathname === '/faq' || pathname === '/privacy';
  const pathSegments = pathname.split('/').filter(Boolean);

  //SCROLL DIRECTION 
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      window.location.href = `/games?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      {/*  MAIN HEADER */}
      <nav className={`w-full h-16 top-0 left-0 z-50 transition-transform duration-300
        /* MOBILE BASE: Fixed, Sticky, Scroll-Reveal, Solid Background, Blurred */
        fixed ${isVisible ? "translate-y-0" : "-translate-y-full"} backdrop-blur-md
        ${isHoFActive 
          ? "bg-taupe-950/95 border-taupe-800" 
          : "bg-slate-950/95 border-slate-800"
        }
        
        /* DESKTOP OVERRIDE */
        md:absolute md:translate-y-0 md:bg-transparent md:backdrop-blur-none md:border-transparent md:bg-gradient-to-b 
        ${isHoFActive 
          ? "md:from-taupe-950/90 md:via-taupe-950/40 md:to-transparent" 
          : "md:from-slate-950/90 md:via-slate-950/40 md:to-transparent"
        }
      `}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">
          
          {/* LEFT SIDE*/}
          <div className={`flex items-center gap-2 text-sm font-bold tracking-wider uppercase ${isHoFActive ? "text-taupe-500" : "text-slate-500"}`}>
            <a href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
              <span className={`p-1.5 rounded bg-gradient-to-br text-xs border shadow-inner 
                ${isHoFActive ? "from-taupe-800 to-taupe-950 border-taupe-800" : "from-slate-800 to-slate-900 border-slate-800"}`}>🏆</span>
              <span className="font-black text-slate-100 text-sm tracking-tight">Trophy<span className={isHoFActive ? "text-amber-500" : "text-rose-500"}>DB</span></span>
            </a>

            {/* DESKTOP URL - SEGMENTS */}
            <div className="hidden md:flex items-center gap-2">
              {pathSegments.map((segment, index) => {
                const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
                const isLast = index === pathSegments.length - 1;
                const cleanSegmentName = decodeURIComponent(segment.replace(/-/g, ' '));
                return (
                  <div key={url} className="flex items-center gap-2">
                    <span className={`${isHoFActive ? "text-taupe-700" : "text-slate-700"} font-medium text-sm`}>/</span>
                    <a
                    href={url}
                    className={`transition-colors duration-150 text-sm ${
                      isLast 
                        ? (isHoFActive ? "text-amber-400/90 font-extrabold pointer-events-none" : "text-rose-400/90 font-extrabold pointer-events-none") 
                        : (isHoFActive ? "hover:text-amber-100" : "hover:text-slate-300")
                    }`}
                    >
                      {cleanSegmentName}
                      </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SIDE: SEARCHBAR AND NAVIGATION */}
          <div className="flex items-center gap-3 md:gap-6">
            
            {/* Desktop Search */}
            {!isNoSearchPage && (
              <div className="hidden md:block relative w-48 md:w-64 transition-all duration-200">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs opacity-60">🔍</span>
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                  className={`w-full border rounded-xl pl-8 pr-4 py-2 text-xs font-medium outline-none transition-all shadow-inner
                    ${isHoFActive
                      ? "border-taupe-800/60 bg-taupe-950/40 text-taupe-200 placeholder-taupe-500 focus:border-taupe-700 focus:bg-taupe-900/80"
                      : "border-slate-800/60 bg-slate-950/40 text-slate-200 placeholder-slate-500 focus:border-slate-700 focus:bg-slate-900/80"
                    }
                  `}
                />
              </div>
            )}

            {/* Mobile Search Toggle Button */}
            {!isNoSearchPage && (
              <button 
                onClick={() => { setIsSearchOpen(!isSearchOpen); setIsMenuOpen(false); }}
                className={`block md:hidden p-2 text-lg rounded-full transition-colors
                  ${isHoFActive ? "text-taupe-200 hover:bg-taupe-900" : "text-slate-200 hover:bg-slate-900"}
                `}
              >
                🔍
              </button>
            )}

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center h-full gap-1">
              {/* Home */}
              <div className="relative flex items-center justify-center px-3 h-20">
                <a href="/" title="Home" className={`transition-all duration-200 text-xl hover:text-slate-200 ${isHomePage ? 'text-slate-100 font-bold scale-105' : 'text-slate-500'}`}>🏠</a>
                {isHomePage && <div className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full ${isHoFActive ? "bg-amber-500 shadow-[0_-2px_10px_rgba(245,158,11,0.4)]" : "bg-rose-500 shadow-[0_-2px_10px_rgba(244,63,94,0.4)]"}`} />}
              </div>
              
              {/* Library */}
              <div className="relative flex items-center justify-center px-3 h-20">
                <a href="/games" title="Library" className={`transition-all duration-200 text-xl hover:text-slate-200 ${isLibraryActive ? 'text-slate-100 font-bold scale-105' : 'text-slate-500'}`}>📚</a>
                {isLibraryActive && <div className={`absolute bottom-0 left-0 right-0 h-[3px] rounded-t-full ${isHoFActive ? "bg-amber-500 shadow-[0_-2px_10px_rgba(245,158,11,0.4)]" : "bg-rose-500 shadow-[0_-2px_10px_rgba(244,63,94,0.4)]"}`} />}
              </div>
              
              {/* Hall of Fame */}
              <div className="relative flex items-center justify-center px-3 h-20">
                <a href="/hall-of-fame" title="Hall of Fame" className={`transition-all duration-200 text-xl hover:text-slate-200 ${isHoFActive ? 'text-amber-400 font-bold scale-105' : 'text-slate-500'}`}>🏅</a>
                {isHoFActive && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-amber-500 rounded-t-full shadow-[0_-2px_10px_rgba(245,158,11,0.4)]" />}
              </div>
            </div>

            {/* Account Profile bubble */}
            <div className={`w-7 h-7 rounded-full border flex items-center justify-center cursor-pointer transition-colors shadow-inner
              ${isHoFActive ? "border-taupe-800 hover:border-taupe-600 bg-taupe-900" : "border-slate-800 hover:border-slate-600 bg-slate-900"} 
            `} title="Account">
              <span className="text-xs text-slate-500">👤</span>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => { setIsMenuOpen(!isMenuOpen); setIsSearchOpen(false); }}
              className={`block md:hidden p-2 text-xl focus:outline-none rounded-full transition-colors
                ${isHoFActive ? "text-taupe-200 hover:bg-taupe-900" : "text-slate-200 hover:bg-slate-900"}
              `}
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE SEARCH BAR --- */}
      {!isNoSearchPage && (
        <div className={`fixed left-0 w-full z-40 border-b px-4 py-3 transition-all duration-300 md:hidden
          ${isSearchOpen && isVisible ? "top-20 opacity-100" : "top-10 opacity-0 pointer-events-none"}
          ${isHoFActive ? "bg-taupe-950 border-taupe-900" : "bg-slate-950 border-slate-900"}
        `}>
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs opacity-60">🔍</span>
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              className={`w-full border rounded-xl pl-9 pr-4 py-2.5 text-xs outline-none
                ${isHoFActive 
                  ? "bg-taupe-900 border-taupe-800 text-taupe-200 placeholder-taupe-500" 
                  : "bg-slate-900 border-slate-800 text-slate-200 placeholder-slate-500"}
              `}
            />
          </div>
        </div>
      )}

      {/* --- MOBILE HAMBURGER (VERTICAL) --- */}
      <div className={`fixed left-0 w-full z-40 px-6 py-6 flex flex-col gap-3 transition-all duration-300 md:hidden border-b shadow-2xl
        ${isMenuOpen && isVisible ? "top-20 opacity-100" : "top-10 opacity-0 pointer-events-none"}
        ${isHoFActive ? "bg-taupe-950/95 backdrop-blur-xl border-taupe-800" : "bg-slate-950/95 backdrop-blur-xl border-slate-800"}
      `}>
        <a href="/" className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
          isHomePage 
            ? (isHoFActive ? "bg-amber-950/30 border border-amber-900/50 text-amber-400" : "bg-slate-900 border border-slate-700 text-slate-100")
            : (isHoFActive ? "text-taupe-400 hover:bg-taupe-900/50" : "text-slate-400 hover:bg-slate-900/50")
        }`}>
          <span className="text-2xl">🏠</span>
          <span className="text-sm font-bold uppercase tracking-wider">Home</span>
        </a>

        <a href="/games" className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
          isLibraryActive 
            ? (isHoFActive ? "bg-amber-950/30 border border-amber-900/50 text-amber-400" : "bg-slate-900 border border-slate-700 text-slate-100")
            : (isHoFActive ? "text-taupe-400 hover:bg-taupe-900/50" : "text-slate-400 hover:bg-slate-900/50")
        }`}>
          <span className="text-2xl">📚</span>
          <span className="text-sm font-bold uppercase tracking-wider">Library</span>
        </a>

        <a href="/hall-of-fame" className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
          isHoFActive 
            ? "bg-amber-950/30 border border-amber-900/50 text-amber-400" 
            : "text-slate-400 hover:bg-slate-900/50"
        }`}>
          <span className="text-2xl">🏅</span>
          <span className="text-sm font-bold uppercase tracking-wider">Awards</span>
        </a>
      </div>
    </>
  );
}