"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { checkAwardStatus } from '@/app/actions';

const GameContext = createContext({ isAwardedGame: false });

export function GameProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAwardedGame, setIsAwardedGame] = useState(false);

  const pathSegments = pathname.split('/').filter(Boolean);
  const isIndividualGamePage = pathSegments[0] === 'games' && pathSegments.length > 1;
  const gameSlug = isIndividualGamePage ? pathSegments[1] : null;

  useEffect(() => {
    if (gameSlug) {
      checkAwardStatus(gameSlug).then((awarded) => setIsAwardedGame(awarded));
    } else {
      setIsAwardedGame(false);
    }
  }, [gameSlug]);

  return (
    <GameContext.Provider value={{ isAwardedGame }}>
      {children}
    </GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);