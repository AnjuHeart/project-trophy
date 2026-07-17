import { db } from "@/lib/db";
import LibraryView from "./LibraryView"

export interface LibraryStats {
    gamesCount: number;
    awardedCount: number;
    guidesCount: number;
    achievementsCount: number;
}

interface PageProps {
    searchParams: Promise<{
        search?: string;
        categories?: string;
        maxTime?: string;
        awardType?: string;
        minAchievements?: string;
        genre?: string;
        page?: string;
    }>;
}

const ITEMS_PER_PAGE = 12;

export default async function LibraryPage({searchParams}: PageProps) {
    const params = await searchParams;

    const currentPage = Number(params.page) || 1;
    const searchString = params.search || "";
    const maxTime = Number(params.maxTime) || null;
    const minAchievements = Number(params.minAchievements) || null;
    const awardType = params.awardType || "";
    const genre = params.genre || "";
    

    const [gamesCount, awardedCount, guidesCount, achievementsCount] = await Promise.all([
        db.game.count(),
        db.hallOfFameGame.count(),
        db.guide.count(),
        db.achievement.count(),
    ]);

    let dbDataSet: LibraryStats = {
        gamesCount: gamesCount,
        awardedCount: awardedCount,
        guidesCount: guidesCount,
        achievementsCount: achievementsCount
    };
    return <LibraryView stats={dbDataSet} />;
}