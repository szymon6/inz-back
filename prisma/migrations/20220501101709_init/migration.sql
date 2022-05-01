-- CreateTable
CREATE TABLE "TableInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "TableInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ColumnInfo" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "tableId" INTEGER NOT NULL,

    CONSTRAINT "ColumnInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ColumnInfo" ADD CONSTRAINT "ColumnInfo_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "TableInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
