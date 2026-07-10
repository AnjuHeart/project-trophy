-- CreateTable
CREATE TABLE "HallOfFameCategory" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "communityIcons" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HallOfFameCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HallOfFameGame" (
    "id" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HallOfFameGame_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HallOfFameCategory_number_key" ON "HallOfFameCategory"("number");

-- CreateIndex
CREATE UNIQUE INDEX "HallOfFameCategory_name_key" ON "HallOfFameCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "HallOfFameGame_gameId_categoryId_key" ON "HallOfFameGame"("gameId", "categoryId");

-- AddForeignKey
ALTER TABLE "HallOfFameGame" ADD CONSTRAINT "HallOfFameGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HallOfFameGame" ADD CONSTRAINT "HallOfFameGame_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "HallOfFameCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
