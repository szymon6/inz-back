/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `ColumnInfo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ColumnInfo_name_key" ON "ColumnInfo"("name");
