-- CreateTable
CREATE TABLE "Car" (
    "id" SERIAL NOT NULL,
    "brandId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Owner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "Owner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "table_info" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,

    CONSTRAINT "table_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "column_info" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "type" TEXT,
    "tableId" INTEGER NOT NULL,
    "displayValue" BOOLEAN NOT NULL DEFAULT false,
    "referenceToId" INTEGER,
    "referenceToDropdownId" INTEGER,

    CONSTRAINT "column_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dropdown_info" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "dropdown_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "d_brand" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "d_brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "d_color" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "d_color_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "column_info_name_key" ON "column_info"("name");

-- CreateIndex
CREATE UNIQUE INDEX "dropdown_info_name_key" ON "dropdown_info"("name");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "d_brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "d_color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "column_info" ADD CONSTRAINT "column_info_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "table_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "column_info" ADD CONSTRAINT "column_info_referenceToId_fkey" FOREIGN KEY ("referenceToId") REFERENCES "table_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "column_info" ADD CONSTRAINT "column_info_referenceToDropdownId_fkey" FOREIGN KEY ("referenceToDropdownId") REFERENCES "dropdown_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;
