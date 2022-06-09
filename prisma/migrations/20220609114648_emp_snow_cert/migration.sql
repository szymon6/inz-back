-- CreateTable
CREATE TABLE "Employee_snow_cert" (
    "id" SERIAL NOT NULL,
    "certId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "courseDate" DATE NOT NULL,
    "certDate" DATE NOT NULL,
    "recentDeltaDate" DATE NOT NULL,

    CONSTRAINT "Employee_snow_cert_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee_snow_cert" ADD CONSTRAINT "Employee_snow_cert_certId_fkey" FOREIGN KEY ("certId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
