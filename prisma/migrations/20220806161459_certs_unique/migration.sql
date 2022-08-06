/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Other_cert` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Snow_cert` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Other_cert_name_key" ON "Other_cert"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Snow_cert_name_key" ON "Snow_cert"("name");
