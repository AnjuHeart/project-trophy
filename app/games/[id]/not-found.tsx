'use client';

import { useParams } from "next/navigation";

export default function GameNotFound() {
    const params = useParams();
    const gameId = params?.id || "Requested Game";

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
            <h1 className="text-xl font-black text-rose-500 tracking-tight">🎯 404 - GAME NOT FOUND</h1>
            <p className="text-xs text-slate-400 mt-2">The game "{gameId}" doesn't exist in our list.</p>

            <a
                href="/games"
                className="mt-6 text-xs font-bold text-slate-500 hover:text-white border border-slate-900 bg-slate-950 px-4 py-2 rounded-lg transition-all"
            >
                ← Return to Games
            </a>
        </div>
    );
}
