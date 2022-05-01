-- AlterTable
ALTER TABLE "ColumnInfo" ADD COLUMN     "displayValue" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "refereneToId" INTEGER;

-- AddForeignKey
ALTER TABLE "ColumnInfo" ADD CONSTRAINT "ColumnInfo_refereneToId_fkey" FOREIGN KEY ("refereneToId") REFERENCES "TableInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
