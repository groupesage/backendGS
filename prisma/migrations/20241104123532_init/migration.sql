/*
  Warnings:

  - You are about to drop the column `inspection_du_travail` on the `candidature` table. All the data in the column will be lost.
  - You are about to drop the column `inspection_du_travail` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "candidature" DROP COLUMN "inspection_du_travail";

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "inspection_du_travail";
