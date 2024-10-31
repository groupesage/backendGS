/*
  Warnings:

  - You are about to drop the `InfoMail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Realisation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `commandes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "InfoMail";

-- DropTable
DROP TABLE "Realisation";

-- DropTable
DROP TABLE "commandes";

-- CreateTable
CREATE TABLE "candidature" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "date_naissance" TIMESTAMP(3) NOT NULL,
    "lieu_naissance" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "studylevel" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "cv" TEXT NOT NULL,
    "onem" TEXT NOT NULL,
    "inspection_du_travail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "candidature_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "candidature_email_key" ON "candidature"("email");
