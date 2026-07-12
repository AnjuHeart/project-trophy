"use client";

import { useGame } from './ContextManager';

export default function Footer() {
    
    const { isAwardedGame } = useGame();

    return (
        <footer className="border-t border-slate-900 bg-slate-950 pb-8 pt-20 relative z-20 w-full">
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
                    <a href="/about" className="hover:text-rose-400 transition-colors">About</a>
                    <a href="/faq" className="hover:text-rose-400 transition-colors">FAQ</a>
                    <a href="/privacy" className="hover:text-rose-400 transition-colors">Privacy Policy</a>
                    <a href="/terms" className="hover:text-rose-400 transition-colors">Terms of Use</a>
                    <a href="/contact" className="hover:text-rose-400 transition-colors">Contact Us</a>
                </div>

            </div>
        </footer>
    );
}