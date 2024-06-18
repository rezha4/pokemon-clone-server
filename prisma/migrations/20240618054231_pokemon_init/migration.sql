-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "base_experience" INTEGER NOT NULL,
    "sprites" JSONB NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);
