const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

deleteData()
async function deleteData() {
  await deleteCertifications()
  await deleteEmployees()
  await deleteDropdowns()
}

async function deleteCertifications() {
  await prisma.employee_other_cert.deleteMany()
  await prisma.employee_snow_cert.deleteMany()
}

async function deleteEmployees() {
  await prisma.employee.deleteMany()
}

async function deleteDropdowns() {
  const dropdowns = [
    'd_role',
    'd_emp_type',
    'd_country',
    'd_region',
    'd_supervisor',
  ]

  dropdowns.forEach(async (d) => await prisma[d].deleteMany())
}
