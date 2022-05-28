/*
  Warnings:

  - You are about to drop the column `age` on the `Owner` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "horsePower" INTEGER;

-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "age",
ADD COLUMN     "bald" BOOLEAN,
ADD COLUMN     "birthDate" TIMESTAMP(3);
