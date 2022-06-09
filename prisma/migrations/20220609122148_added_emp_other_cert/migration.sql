-- CreateTable
CREATE TABLE "Employee_other_cert" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "certId" INTEGER NOT NULL,
    "certDate" DATE NOT NULL,

    CONSTRAINT "Employee_other_cert_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee_other_cert" ADD CONSTRAINT "Employee_other_cert_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_other_cert" ADD CONSTRAINT "Employee_other_cert_certId_fkey" FOREIGN KEY ("certId") REFERENCES "Other_cert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
