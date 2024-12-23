-- CreateTable
CREATE TABLE "_favorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favorites_AB_unique" ON "_favorites"("A", "B");

-- CreateIndex
CREATE INDEX "_favorites_B_index" ON "_favorites"("B");

-- AddForeignKey
ALTER TABLE "_favorites" ADD CONSTRAINT "_favorites_A_fkey" FOREIGN KEY ("A") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favorites" ADD CONSTRAINT "_favorites_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
