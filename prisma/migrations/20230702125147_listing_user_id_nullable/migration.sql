-- DropForeignKey
ALTER TABLE "Listing" DROP CONSTRAINT "Listing_userId_fkey";

-- AlterTable
ALTER TABLE "Listing" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
