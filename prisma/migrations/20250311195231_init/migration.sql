-- AlterTable
ALTER TABLE "user" ALTER COLUMN "activation_link" DROP NOT NULL,
ALTER COLUMN "activation_link" DROP DEFAULT;
