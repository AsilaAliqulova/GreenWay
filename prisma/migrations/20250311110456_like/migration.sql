/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "like_userId_key" ON "like"("userId");
