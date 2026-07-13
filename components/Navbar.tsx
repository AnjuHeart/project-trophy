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

  //LAYOUT INTERACTIONS
  const pathSegments = pathname.split('/').filter(Boolean);
  const isHomePage = pathname === '/';
  const isGamesLibrary = pathname === '/games';
  const isIndividualGamePage = pathSegments[0] === 'games' && pathSegments.length > 1;
  const isNoSearchPage = isGamesLibrary || pathname === '/faq' || pathname === '/privacy';

  //SCROLL DIRECTION
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show navbar at the absolute top of the page
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down -> hide navbar & close active submenus
        setIsVisible(false);
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      } else {
        // Scrolling up -> reveal navbar
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

  const { isAwardedGame } = useGame();

  const isLibraryActive = isGamesLibrary || isIndividualGamePage;
  const isHoFActive = pathname === '/hall-of-fame' || isAwardedGame;

  return (
    <nav className={`w-full h-20 fixed top-0 left-0 z-50 transition-transform duration-300 backdrop-blur-md border-b
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
        ${isHoFActive 
          ? "bg-taupe-950/80 border-taupe-900/40 from-taupe-950/90 via-taupe-950/40" 
          : "bg-slate-950/80 border-slate-900/40 from-slate-950/90 via-slate-950/40"
        } bg-gradient-to-b to-transparent`}
      >
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-2 md:gap-4">

        {/* LEFT SIDE: URL */}
        <div className={`flex items-center gap-2 text-sm font-bold tracking-wider uppercase ${isHoFActive ? "text-taupe-500" : "text-slate-500"}`}>
          <a href="/" className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors">
            <span className={`p-1.5 rounded bg-gradient-to-br text-xs border shadow-inner 
              ${isHoFActive ? "from-taupe-800 to-taupe-950 border-taupe-800" : "from-slate-800 to-slate-900 border-slate-800"}`}>🏆</span>
            <span className="font-black text-slate-100 text-sm tracking-tight">Trophy<span className={`${isHoFActive ? "text-amber-500" : "text-rose-500"}`}>DB</span></span>
          </a>

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
        </div>

        {/* RIGHT SIDE: SEARCHBAR AND NAVIGATION */}
        <div className="flex items-center gap-2 md:gap-6">
            
            {/* Desktop Search */}
            {!isNoSearchPage && (
              <div className="hidden md:block relative w-48 md:w-64">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs opacity-60">🔍</span>
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                  className={`w-full border ${isHoFActive ? "border-taupe-800/60 bg-taupe-950/40 text-taupe-200" : "border-slate-800/60 bg-slate-950/40 text-slate-200"} rounded-xl pl-8 pr-4 py-2 text-xs font-medium outline-none shadow-inner`}
                />
              </div>
            )}

            {/* Mobile Search Toggle Button */}
            {!isNoSearchPage && (
              <button 
                onClick={() => { setIsSearchOpen(!isSearchOpen); setIsMenuOpen(false); }}
                className="block md:hidden p-2 text-lg opacity-80 hover:opacity-100"
              >
                🔍
              </button>
            )}

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center h-full gap-1">
              <a href="/" className={`px-3 py-2 text-xl ${isHomePage ? 'text-slate-100' : 'text-slate-500'}`}>🏠</a>
              <a href="/games" className={`px-3 py-2 text-xl ${isLibraryActive ? 'text-slate-100' : 'text-slate-500'}`}>📚</a>
              <a href="/hall-of-fame" className={`px-3 py-2 text-xl ${isHoFActive ? 'text-amber-400' : 'text-slate-500'}`}>🏅</a>
            </div>

            {/* Account Profile bubble */}
            <div className={`w-7 h-7 rounded-full border ${isHoFActive ? "border-taupe-800 bg-taupe-900" : "border-slate-800 bg-slate-900"} flex items-center justify-center cursor-pointer`} title="Account">
              <span className="text-xs text-slate-500">👤</span>
            </div>

            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => { setIsMenuOpen(!isMenuOpen); setIsSearchOpen(false); }}
              className="block md:hidden p-2 text-xl focus:outline-none"
            >
              {isMenuOpen ? "✕" : "☰"}
            </button>
          </div>
          
      </div>
    </nav>
  );
}