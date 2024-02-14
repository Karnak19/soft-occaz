/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sessionId` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rating" DROP CONSTRAINT "Rating_listingId_fkey";

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "sessionId" TEXT NOT NULL,
ALTER COLUMN "listingId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "RatingCreatorSession" (
    "id" TEXT NOT NULL,
    "ratingId" TEXT,
    "userId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RatingCreatorSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rating_sessionId_key" ON "Rating"("sessionId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "RatingCreatorSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingCreatorSession" ADD CONSTRAINT "RatingCreatorSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingCreatorSession" ADD CONSTRAINT "RatingCreatorSession_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
