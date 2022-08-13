const express = require('express')
const { PrismaClient } = require('@prisma/client')
const { validateId, validateToken } = require('../middleware/validation')

const router = express.Router()
const prisma = new PrismaClient()

//protect all routes with jwt
router.use(validateToken)

//param validation
router.param('id', validateId)

//get employees having a cert
router.get('/other_cert/:id/employees', async (req, res) => {
  const allRecords = await prisma.employee_other_cert.findMany({
    where: { certId: req.params.id },
    orderBy: { id: 'asc' },
  })
  const employeesIds = allRecords.map((obj) => obj.employeeId)

  const employees = await prisma.employee.findMany({
    where: { id: { in: employeesIds } },
  })

  res.send(employees)
})

//get employees having a snow cert
router.get('/snow_cert/:id/employees/', async (req, res) => {
  const allRecords = await prisma.employee_snow_cert.findMany({
    where: { certId: req.params.id },
    orderBy: { id: 'asc' },
  })
  const employeesIds = allRecords.map((obj) => obj.employeeId)

  const employees = await prisma.employee.findMany({
    where: { id: { in: employeesIds } },
  })

  res.send(employees)
})

//get employee's other certs
router.get('/employee/:id/other_certs/', async (req, res) => {
  const allRecords = await prisma.employee_other_cert.findMany({
    where: { employeeId: req.params.id },
    orderBy: { id: 'asc' },
  })

  const certsIds = allRecords.map((obj) => obj.certId)

  const certs = await prisma.other_cert.findMany({
    where: { id: { in: certsIds } },
  })

  res.send(certs)
})

//get employee's snow certs
router.get('/employee/:id/snow_certs/', async (req, res) => {
  const allRecords = await prisma.employee_snow_cert.findMany({
    where: { employeeId: req.params.id },
    orderBy: { id: 'asc' },
  })

  const certsIds = allRecords.map((obj) => obj.certId)

  const certs = await prisma.snow_cert.findMany({
    where: { id: { in: certsIds } },
  })

  res.send(certs)
})

module.exports = router
