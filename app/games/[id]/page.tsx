"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { mockGames } from '../../../data/mockGame';
import { MAIN_CATEGORY_REGISTRY } from '../../../types/schema';

export default function GameDetailPage() {
  const params = useParams();
  
  // 1. Extract the unique ID from the URL parameter
  const gameId = params.id as string;

  // 2. Find the matching game dataset
  const game = mockGames.find((g) => g.id === gameId);

  // 3. Fallback: If the game isn't found in the mock database
  if (!game) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6">
        <h1 className="text-xl font-black text-rose-500">🎯 GAME NOT FOUND</h1>
        <p className="text-xs text-slate-400 mt-2">The registry target "{gameId}" does not exist.</p>
        <a href="/" className="mt-6 text-xs font-bold text-slate-500 hover:text-white transition-colors">
          ← Return Home
        </a>
      </div>
    );
  }

  // 4. Safely pull its category registry config for our headers
  const categoryConfig = MAIN_CATEGORY_REGISTRY[game.mainCompletionCategory.label];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col">
      {/* Test Canvas Header */}
      <div className="p-8 border-b border-slate-900 bg-slate-900/20">
        <span className="text-[10px] font-black tracking-widest text-rose-500 uppercase">Target Registry / {game.id}</span>
        <h1 className="text-3xl font-black text-white mt-1">{game.title}</h1>
        <p className="text-xs text-slate-400 mt-1">{game.genres.join(' • ')}</p>
      </div>

      {/* Main Workspace Area */}
      <main className="p-8 max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 bg-slate-900/40 border border-slate-900 rounded-xl">
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-2">Completion Data Overview</h2>
            <p className="text-xs text-slate-500">We'll map out the full achievement lists and missable matrix filters here next.</p>
          </div>
        </div>
      </main>
    </div>
  );
}