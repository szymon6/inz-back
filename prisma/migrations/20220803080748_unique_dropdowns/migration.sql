/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `d_country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `d_emp_type` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `d_region` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `d_role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `d_snow_cert_type` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[value]` on the table `d_supervisor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "d_country_value_key" ON "d_country"("value");

-- CreateIndex
CREATE UNIQUE INDEX "d_emp_type_value_key" ON "d_emp_type"("value");

-- CreateIndex
CREATE UNIQUE INDEX "d_region_value_key" ON "d_region"("value");

-- CreateIndex
CREATE UNIQUE INDEX "d_role_value_key" ON "d_role"("value");

-- CreateIndex
CREATE UNIQUE INDEX "d_snow_cert_type_value_key" ON "d_snow_cert_type"("value");

-- CreateIndex
CREATE UNIQUE INDEX "d_supervisor_value_key" ON "d_supervisor"("value");
