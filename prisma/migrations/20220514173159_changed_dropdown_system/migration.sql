/*
  Warnings:

  - You are about to drop the `dropdown_value` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "dropdown_value" DROP CONSTRAINT "dropdown_value_dropdownId_fkey";

-- DropTable
DROP TABLE "dropdown_value";

-- CreateTable
CREATE TABLE "d_brand" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "d_brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "d_color" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "d_color_pkey" PRIMARY KEY ("id")
);
