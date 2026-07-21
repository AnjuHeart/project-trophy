import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { MainCategory } from "@prisma/client";

const CACHE_KEY = "categories:main";
const CACHE_TTL_SECONDS = 60 * 60 * 24; // 24 hours

export async function getCachedMainCategories(): Promise<MainCategory[]> {
    try {
        const cachedData = await redis.get(CACHE_KEY);

        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const dbCategories = await db.mainCategory.findMany({
            orderBy: { label: 'asc' }
        });

        await redis.set(CACHE_KEY, JSON.stringify(dbCategories), {
            EX: CACHE_TTL_SECONDS
        });

        return dbCategories;
    } catch (error) {
        console.error("Redis Cache Error (Main Categories):", error);

        return db.mainCategory.findMany({
            orderBy: { label: 'asc' }
        });
    }
}

export async function invalidateMainCategoryCache() {
    await redis.del(CACHE_KEY);
}