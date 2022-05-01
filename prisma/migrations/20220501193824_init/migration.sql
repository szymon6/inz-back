/*
  Warnings:

  - You are about to drop the column `refereneToId` on the `ColumnInfo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ColumnInfo" DROP CONSTRAINT "ColumnInfo_refereneToId_fkey";

-- AlterTable
ALTER TABLE "ColumnInfo" DROP COLUMN "refereneToId",
ADD COLUMN     "referenceToId" INTEGER;

-- AddForeignKey
ALTER TABLE "ColumnInfo" ADD CONSTRAINT "ColumnInfo_referenceToId_fkey" FOREIGN KEY ("referenceToId") REFERENCES "TableInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
