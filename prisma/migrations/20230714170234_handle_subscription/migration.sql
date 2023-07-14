/*
  Warnings:

  - A unique constraint covering the columns `[stripeId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SubScription" AS ENUM ('FREE', 'HOBBY', 'GEARDO', 'PREMIUM');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripeId" TEXT,
ADD COLUMN     "sub" "SubScription" DEFAULT 'FREE';

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeId_key" ON "User"("stripeId");
