/*
  Warnings:

  - You are about to drop the `Otp` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "air_pollution" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Otp";

-- CreateTable
CREATE TABLE "otp" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expiration_time" TIMESTAMP(3) NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);
