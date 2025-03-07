-- CreateTable
CREATE TABLE "search_history" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "search_query" TEXT NOT NULL,

    CONSTRAINT "search_history_pkey" PRIMARY KEY ("id")
);
