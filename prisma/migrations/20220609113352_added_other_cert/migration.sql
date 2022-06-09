-- CreateTable
CREATE TABLE "Other_cert" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Other_cert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Other_cert_name_key" ON "Other_cert"("name");
