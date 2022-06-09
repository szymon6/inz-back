-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "empTypeId" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,
    "regionId" INTEGER NOT NULL,
    "supervisorId" INTEGER NOT NULL,
    "nowCreate" BOOLEAN NOT NULL,
    "cma" DATE NOT NULL,
    "cta" DATE NOT NULL,
    "oldSysAdmin" DATE NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
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
    "required" BOOLEAN NOT NULL DEFAULT true,
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
CREATE TABLE "d_role" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "d_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "d_emp_type" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "d_emp_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "d_country" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "d_country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "d_region" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "d_region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "d_supervisor" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "d_supervisor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "column_info_name_key" ON "column_info"("name");

-- CreateIndex
CREATE UNIQUE INDEX "dropdown_info_name_key" ON "dropdown_info"("name");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "d_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_empTypeId_fkey" FOREIGN KEY ("empTypeId") REFERENCES "d_emp_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "d_country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "d_region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "d_supervisor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "column_info" ADD CONSTRAINT "column_info_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "table_info"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "column_info" ADD CONSTRAINT "column_info_referenceToId_fkey" FOREIGN KEY ("referenceToId") REFERENCES "table_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "column_info" ADD CONSTRAINT "column_info_referenceToDropdownId_fkey" FOREIGN KEY ("referenceToDropdownId") REFERENCES "dropdown_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;
