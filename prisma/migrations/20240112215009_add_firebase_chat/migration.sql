-- CreateTable
CREATE TABLE "UsersChat" (
    "id" TEXT NOT NULL,
    "firebaseCollectionId" TEXT NOT NULL,

    CONSTRAINT "UsersChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserToUsersChat" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToUsersChat_AB_unique" ON "_UserToUsersChat"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToUsersChat_B_index" ON "_UserToUsersChat"("B");

-- AddForeignKey
ALTER TABLE "_UserToUsersChat" ADD CONSTRAINT "_UserToUsersChat_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToUsersChat" ADD CONSTRAINT "_UserToUsersChat_B_fkey" FOREIGN KEY ("B") REFERENCES "UsersChat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
