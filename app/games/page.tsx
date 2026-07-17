import { db } from "@/lib/db";
import LibraryView from "./LibraryView";

/*interface GameDetailsProps {
    params: Promise<{ id: string }>;
}*/

export default async function GameDetailsPage(/*{ params }: GameDetailsProps*/) {
    /*const { id } = await params;*/

    /*const game = await db.game.findUnique({
        where: {
            slug: id
        },
        select: {
            title: true,
            logoUrl: true,
            backgroundUrl: true,
            difficultyRating: true,
            totalAchievements: true,
            blindPlaythroughHours: true,
            minimumPlaythroughs: true,
            timeTo100PercentPerfect: true,
            timeTo100PercentBase: true,
            categoryContextDescription: true,
            genres: true,
            completionOverview: true,
            //Category Inner Join
            mainCategory: {
                select: {
                    emoji: true,
                    label: true,
                    bgGradient: true,
                    hoverGradient: true
                }
            },
            //HallOfFame Outer Join
            hallOfFameInductions: {
                select: {
                    reason: true,
                    category: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    });*/

    return <LibraryView/>;
}