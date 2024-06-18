/*
  Warnings:

  - Added the required column `abilities` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forms` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `game_indices` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `held_items` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_default` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location_area_encounters` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moves` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `species` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stats` to the `Pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `types` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "abilities" JSONB NOT NULL,
ADD COLUMN     "forms" JSONB NOT NULL,
ADD COLUMN     "game_indices" JSONB NOT NULL,
ADD COLUMN     "held_items" JSONB NOT NULL,
ADD COLUMN     "is_default" BOOLEAN NOT NULL,
ADD COLUMN     "location_area_encounters" TEXT NOT NULL,
ADD COLUMN     "moves" JSONB NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "species" JSONB NOT NULL,
ADD COLUMN     "stats" JSONB NOT NULL,
ADD COLUMN     "types" JSONB NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Pokemon_id_seq";
