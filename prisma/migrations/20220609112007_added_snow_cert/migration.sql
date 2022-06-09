-- CreateTable
CREATE TABLE "Snow_cert" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,

    CONSTRAINT "Snow_cert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "d_snow_cert_type" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "d_snow_cert_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Snow_cert_name_key" ON "Snow_cert"("name");

-- AddForeignKey
ALTER TABLE "Snow_cert" ADD CONSTRAINT "Snow_cert_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "d_snow_cert_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
