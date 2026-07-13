"use client";

import { useGame } from './ContextManager';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const { isAwardedGame } = useGame();
    const isHoFActive = pathname === '/hall-of-fame' || isAwardedGame;

    return (
        <footer className={`border-t ${isHoFActive ? "border-taupe-900 bg-taupe-950" : "border-slate-900 bg-slate-950"} pb-8 pt-12 md:pt-20 relative z-20 w-full`}>
            <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row-reverse items-center md:items-start justify-between gap-8 md:gap-6">

                <div className={`flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-3.5 text-[11px] font-bold ${isHoFActive ? "text-stone-500" : "text-slate-500"} uppercase tracking-wide w-full md:w-auto`}>
                    <a href="/about" className={`${isHoFActive ? "hover:text-amber-400" : "hover:text-rose-400"} transition-colors`}>About</a>
                    <a href="/faq" className={`${isHoFActive ? "hover:text-amber-400" : "hover:text-rose-400"} transition-colors`}>FAQ</a>
                    <a href="/privacy" className={`${isHoFActive ? "hover:text-amber-400" : "hover:text-rose-400"} transition-colors`}>Privacy Policy</a>
                    <a href="/terms" className={`${isHoFActive ? "hover:text-amber-400" : "hover:text-rose-400"} transition-colors`}>Terms of Use</a>
                    <a href="/contact" className={`${isHoFActive ? "hover:text-amber-400" : "hover:text-rose-400"} transition-colors`}>Contact Us</a>
                </div>

                <div className="space-y-3 max-w-sm text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                        <div className={`w-5 h-5 rounded bg-gradient-to-br flex items-center justify-center text-[10px] border 
                            ${isHoFActive ? "from-taupe-800 to-taupe-950 border-taupe-800" : "from-slate-800 to-slate-900 border-slate-800"}`}>
                            🏆
                        </div>
                        <span className="text-sm font-black tracking-tight text-slate-200 uppercase">
                            Trophy<span className={`${isHoFActive ? "text-amber-500" : "text-rose-500"}`}>DB</span>
                        </span>
                    </div>

                    <p className={`text-[10px] ${isHoFActive ? "text-stone-600 border-taupe-900/60" : "text-slate-600 border-slate-900"} leading-relaxed font-medium pt-4 md:pt-0 border-t md:border-t-0`}>
                        TrophyDB is not affiliated with Sony, Microsoft, Valve or any other enterprise in any way. All game properties, titles, and logos are property of their respective owners.
                    </p>
                </div>

            </div>
        </footer>
    );
}