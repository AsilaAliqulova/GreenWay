/*
  Warnings:

  - You are about to alter the column `balance` on the `user` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "balance" SET DATA TYPE INTEGER;
