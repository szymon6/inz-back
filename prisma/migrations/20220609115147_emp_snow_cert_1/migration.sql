-- DropForeignKey
ALTER TABLE "Employee_snow_cert" DROP CONSTRAINT "Employee_snow_cert_certId_fkey";

-- AddForeignKey
ALTER TABLE "Employee_snow_cert" ADD CONSTRAINT "Employee_snow_cert_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee_snow_cert" ADD CONSTRAINT "Employee_snow_cert_certId_fkey" FOREIGN KEY ("certId") REFERENCES "Snow_cert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
