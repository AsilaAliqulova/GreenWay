/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `media` table. All the data in the column will be lost.
  - Added the required column `updated` to the `media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "media" DROP COLUMN "updatedAt",
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
