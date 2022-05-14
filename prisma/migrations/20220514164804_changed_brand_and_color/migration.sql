/*
  Warnings:

  - Changed the type of `brand` on the `Car` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `color` on the `Car` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Car" DROP COLUMN "brand",
ADD COLUMN     "brand" INTEGER NOT NULL,
DROP COLUMN "color",
ADD COLUMN     "color" INTEGER NOT NULL;
