/*
  Warnings:

  - You are about to drop the column `image_url` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `Region` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashedPassword` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashedPassword` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "district" DROP CONSTRAINT "district_regionId_fkey";

-- AlterTable
ALTER TABLE "admin" DROP COLUMN "image_url",
DROP COLUMN "password",
DROP COLUMN "token",
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "hashedToken" TEXT;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "password",
DROP COLUMN "token",
ADD COLUMN     "hashedPassword" TEXT NOT NULL,
ADD COLUMN     "hashedToken" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Region";

-- CreateTable
CREATE TABLE "region" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "region_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "district" ADD CONSTRAINT "district_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
