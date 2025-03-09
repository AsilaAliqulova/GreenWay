/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Like` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `content` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `eco_report` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `user_votes` table. All the data in the column will be lost.
  - Added the required column `updated` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `Like` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `content` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `eco_report` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated` to the `user_votes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "updatedAt",
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Like" DROP COLUMN "updatedAt",
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "updatedAt",
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "updatedAt",
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "content" DROP COLUMN "updatedAt",
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "eco_report" DROP COLUMN "updatedAt",
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user_votes" DROP COLUMN "updatedAt",
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
