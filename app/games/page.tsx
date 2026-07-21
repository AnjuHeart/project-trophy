import { db } from "@/lib/db";
import LibraryView from "./LibraryView";

import { getCachedMainCategories } from "@/lib/services/categoryCache";

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
        genres?: string;
        awardType?: string;
        maxTime?: string;
        sort?: string;
        page?: string;
    }>;
}

const ITEMS_PER_PAGE = 12;

export default async function GameDetailsPage({ searchParams }: PageProps) {
    const params = await searchParams;

    //REDIS CACHE SEARCH
    const categories = await getCachedMainCategories();

    // PARSE URL
    const currentPage = Number(params.page) || 1;
    const searchString = params.search || "";
    const maxTime = Number(params.maxTime) || null;

    // SPLIT FILTERS
    const categoriesArray = params.categories ? params.categories.split(",") : [];
    const genresArray = params.genres ? params.genres.split(",") : [];
    const awardsArray = params.awardType ? params.awardType.split(",") : [];

    //WHERE QUERY CONSTRUCTION
    const whereClause: any = {};

    if (searchString) {
        whereClause.title = { contains: searchString, mode: "insensitive" };
    }

    if (categoriesArray.length > 0) {
        whereClause.mainCategoryId = { in: categoriesArray };
    }

    if (genresArray.length > 0) {
        whereClause.genres = { hasSome: genresArray };
    }

    if (maxTime) {
        whereClause.timeTo100PercentBase = { lte: maxTime };
    }

    if (awardsArray.length > 0) {
        whereClause.hallOfFameInductions = {
            some: {
                categoryId: { in: awardsArray }
            }
        };
    }

    // SORTING SET UP
    let orderByClause: any = { title: "asc" }; // DEFAULT TO ALPHABETICAL

    switch (params.sort) {
        case "recent":
            orderByClause = { createdAt: "desc" };
            break;
        case "difficulty":
            orderByClause = { difficultyRating: "desc" };
            break;
        case "time":
            orderByClause = { timeTo100PercentBase: "desc" };
            break;
        case "achievements":
            orderByClause = { totalAchievements: "desc" };
            break;
        case "alphabetical":
        default:
            orderByClause = { title: "asc" };
            break;
    }

    // DATA OBTENTION
    try {
        const [
            gamesCount,
            awardedCount,
            guidesCount,
            achievementsCount,
            filteredGames,
            totalMatchedGames
        ] = await Promise.all([
            db.game.count(),
            db.hallOfFameGame.count(),
            db.guide.count(),
            db.achievement.count(),

            //OBTAIN GAMES FROM FILTER, SORTING AND PAGING
            db.game.findMany({
                where: whereClause,
                orderBy: orderByClause,
                take: ITEMS_PER_PAGE,
                skip: (currentPage - 1) * ITEMS_PER_PAGE,
            }),

            db.game.count({ where: whereClause })
        ]);

        const dbDataSet: LibraryStats = {
            gamesCount,
            awardedCount,
            guidesCount,
            achievementsCount,
        };

        const paginationData = {
            currentPage,
            totalPages: Math.ceil(totalMatchedGames / ITEMS_PER_PAGE),
            totalMatches: totalMatchedGames
        };

        //TESTING PURPOSES LOG
        console.log(`--- Page ${currentPage} Games (Total Matches: ${totalMatchedGames}) ---`);
        console.log(filteredGames.map(g => g.title));
        console.log("------------------------------------------------");

        return (
            <LibraryView
                stats={dbDataSet}
                games={filteredGames}
                pagination={paginationData}
            />
        );
    } catch (error) {
        console.error("Failed to compile library dataset:", error);
        throw error;
    }
}