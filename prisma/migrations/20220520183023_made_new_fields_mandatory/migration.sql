/*
  Warnings:

  - Made the column `horsePower` on table `Car` required. This step will fail if there are existing NULL values in that column.
  - Made the column `bald` on table `Owner` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthDate` on table `Owner` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "horsePower" SET NOT NULL;

-- AlterTable
ALTER TABLE "Owner" ALTER COLUMN "bald" SET NOT NULL,
ALTER COLUMN "birthDate" SET NOT NULL;
