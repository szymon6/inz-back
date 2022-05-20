-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_colorId_fkey";

-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "colorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "d_color"("id") ON DELETE SET NULL ON UPDATE CASCADE;
