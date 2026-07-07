-- CreateTable
CREATE TABLE "MainCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "bgGradient" TEXT NOT NULL,
    "hoverGradient" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MainCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecondaryCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SecondaryCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AchievementCategory" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "weight" INTEGER NOT NULL DEFAULT 0,
    "tailwindClasses" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AchievementCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileBadge" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "requirementText" TEXT NOT NULL,
    "flavorText" TEXT NOT NULL,
    "iconUrl" TEXT NOT NULL,
    "tailwindClasses" TEXT NOT NULL DEFAULT 'border-slate-800 bg-slate-900/50 text-slate-300',
    "isSecret" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfileBadge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "notes" TEXT,
    "imageUrl" TEXT,
    "isSecret" BOOLEAN NOT NULL DEFAULT false,
    "gameId" TEXT NOT NULL,
    "achievementCategoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "backgroundUrl" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "genres" TEXT[],
    "isHomogeneous" BOOLEAN NOT NULL DEFAULT false,
    "totalAchievements" INTEGER NOT NULL,
    "blindPlaythroughHours" INTEGER NOT NULL,
    "minimumPlaythroughs" INTEGER NOT NULL DEFAULT 1,
    "timeTo100PercentPerfect" INTEGER NOT NULL,
    "timeTo100PercentBase" INTEGER NOT NULL,
    "categoryContextDescription" TEXT NOT NULL,
    "difficultyRating" INTEGER NOT NULL DEFAULT 1,
    "completionOverview" TEXT NOT NULL,
    "mainCategoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GameToSecondaryCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GameToSecondaryCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "MainCategory_slug_key" ON "MainCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "MainCategory_label_key" ON "MainCategory"("label");

-- CreateIndex
CREATE UNIQUE INDEX "SecondaryCategory_slug_key" ON "SecondaryCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SecondaryCategory_label_key" ON "SecondaryCategory"("label");

-- CreateIndex
CREATE UNIQUE INDEX "AchievementCategory_slug_key" ON "AchievementCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "AchievementCategory_label_key" ON "AchievementCategory"("label");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileBadge_slug_key" ON "ProfileBadge"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileBadge_name_key" ON "ProfileBadge"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Game_slug_key" ON "Game"("slug");

-- CreateIndex
CREATE INDEX "_GameToSecondaryCategory_B_index" ON "_GameToSecondaryCategory"("B");

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Achievement" ADD CONSTRAINT "Achievement_achievementCategoryId_fkey" FOREIGN KEY ("achievementCategoryId") REFERENCES "AchievementCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_mainCategoryId_fkey" FOREIGN KEY ("mainCategoryId") REFERENCES "MainCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToSecondaryCategory" ADD CONSTRAINT "_GameToSecondaryCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToSecondaryCategory" ADD CONSTRAINT "_GameToSecondaryCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "SecondaryCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
