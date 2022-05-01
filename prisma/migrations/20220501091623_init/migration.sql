/*
  Warnings:

  - You are about to drop the column `onnwerId` on the `Car` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_onnwerId_fkey";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "onnwerId",
ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
