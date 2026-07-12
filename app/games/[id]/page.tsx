import { db } from "@/lib/db";
import GameClientView from "./GameClientView";

interface GameDetailsProps {
    params: Promise<{ id: string }>;
}

export default async function GameDetailsPage({ params }: GameDetailsProps) {
    const { id } = await params;

    

    const game = await db.game.findUnique({
        where: {
            slug: id
        },
        select: {
            title: true,
            logoUrl: true,
            difficultyRating: true,
            totalAchievements: true,
            blindPlaythroughHours: true,
            minimumPlaythroughs: true,
            timeTo100PercentBase: true,
            categoryContextDescription: true,

            mainCategory: {
                select: {
                    emoji: true,
                    label: true,
                    bgGradient: true,
                    hoverGradient: true
                }
            }
        }
    });

    return <GameClientView game={game} />;
}