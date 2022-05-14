/*
  Warnings:

  - You are about to drop the column `brand` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the `dropdown` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brandId` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorId` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "column_info" DROP CONSTRAINT "column_info_referenceToDropdownId_fkey";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "brand",
DROP COLUMN "color",
ADD COLUMN     "brandId" INTEGER NOT NULL,
ADD COLUMN     "colorId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "dropdown";

-- CreateTable
CREATE TABLE "dropdown_info" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "dropdown_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dropdown_info_name_key" ON "dropdown_info"("name");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "d_brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "d_color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "column_info" ADD CONSTRAINT "column_info_referenceToDropdownId_fkey" FOREIGN KEY ("referenceToDropdownId") REFERENCES "dropdown_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;
