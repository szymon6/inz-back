-- CreateTable
CREATE TABLE "dropdown" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "dropdown_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dropdown_value" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "dropdownId" INTEGER NOT NULL,

    CONSTRAINT "dropdown_value_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "dropdown_name_key" ON "dropdown"("name");

-- AddForeignKey
ALTER TABLE "dropdown_value" ADD CONSTRAINT "dropdown_value_dropdownId_fkey" FOREIGN KEY ("dropdownId") REFERENCES "dropdown"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
