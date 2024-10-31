-- CreateTable
CREATE TABLE "profile" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "date_naissance" TEXT NOT NULL,
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

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offre" (
    "id" SERIAL NOT NULL,
    "poste" TEXT NOT NULL,
    "entreprise" TEXT NOT NULL,
    "lieu" TEXT NOT NULL,
    "typecontrat" TEXT NOT NULL,
    "salaire" TEXT NOT NULL,
    "dateDebut" TEXT NOT NULL,

    CONSTRAINT "offre_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_email_key" ON "profile"("email");
