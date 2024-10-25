-- CreateTable
CREATE TABLE "Realisation" (
    "id" SERIAL NOT NULL,
    "photo" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lienDemo" TEXT NOT NULL,

    CONSTRAINT "Realisation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InfoMail" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "numeroWhatsapp" TEXT,
    "profession" TEXT NOT NULL,

    CONSTRAINT "InfoMail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InfoMail_email_key" ON "InfoMail"("email");
