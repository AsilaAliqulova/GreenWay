-- DropForeignKey
ALTER TABLE "participations" DROP CONSTRAINT "participations_challengesId_fkey";

-- DropForeignKey
ALTER TABLE "participations" DROP CONSTRAINT "participations_eventId_fkey";

-- AlterTable
ALTER TABLE "participations" ALTER COLUMN "eventId" DROP NOT NULL,
ALTER COLUMN "challengesId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "participations" ADD CONSTRAINT "participations_challengesId_fkey" FOREIGN KEY ("challengesId") REFERENCES "challenges"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "participations" ADD CONSTRAINT "participations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
