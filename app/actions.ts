'use server';

import { db } from "@/lib/db";

export async function checkAwardStatus(slug: string | null) {
    if (!slug) return false;

    try {
        const game = await db.game.findUnique({
            where: { slug },
            select: {
                hallOfFameInductions: {
                    select: { gameId: true }
                }
            }
        });

        return (game?.hallOfFameInductions?.length ?? 0) > 0;
    } catch (error) {
        console.error("Failed to check award status:", error);
        return false;
    }
}