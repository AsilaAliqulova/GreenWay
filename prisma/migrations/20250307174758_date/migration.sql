/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Coins` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Delivery` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `OrderItems` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `challenges` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `participations` table. All the data in the column will be lost.
  - Added the required column `updated` to the `Coins` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `Delivery` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `challenges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `participations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coins" DROP COLUMN "updatedAt",
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Delivery" DROP COLUMN "updatedAt",
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "OrderItems" DROP COLUMN "updatedAt",
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "challenges" DROP COLUMN "updatedAt",
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "event" DROP COLUMN "updatedAt",
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "participations" DROP COLUMN "updatedAt",
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "votes" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
