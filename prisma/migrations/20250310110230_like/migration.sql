/*
  Warnings:

  - Added the required column `activation_link` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "activation_link" TEXT NOT NULL;
