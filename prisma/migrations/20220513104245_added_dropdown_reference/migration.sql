-- AlterTable
ALTER TABLE "column_info" ADD COLUMN     "referenceToDropdownId" INTEGER;

-- AddForeignKey
ALTER TABLE "column_info" ADD CONSTRAINT "column_info_referenceToDropdownId_fkey" FOREIGN KEY ("referenceToDropdownId") REFERENCES "dropdown"("id") ON DELETE SET NULL ON UPDATE CASCADE;
