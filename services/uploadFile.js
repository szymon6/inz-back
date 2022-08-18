const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const { parse } = require('papaparse')
const deleteData = require('./deleteData')
const dropdown = require('./dropdown')

const config = require('../config/uploadConfig')

const fileToArray = (file) => {
  const { data } = parse(file.data.toString('utf8'))
  data.splice(0, config.startPoz)
  return data
}

const toDate = (strDate) => {
  if (!strDate || strDate == '') return null

  let date

  if (/\d\d-\d\d-\d*/.test(strDate)) {
    //flip days and months due improper date format in the file
    const dmy = strDate.split('-')
    date = new Date(`${dmy[1]}-${dmy[0]}-${dmy[2]}`)
  } else if (isNaN(strDate)) date = new Date(strDate)

  if (!isNaN(date)) date.setDate(date.getDate() + 1)
  else date = new Date(0)

  return date
}

const createEmployee = async (row) => {
  const data = {
    name: row[0],
    email: row[1],
    roleId: await dropdown('d_role', row[2]),
    empTypeId: await dropdown('d_emp_type', row[3]),
    countryId: await dropdown('d_country', row[4]),
    regionId: await dropdown('d_region', row[5]),
    supervisorId: await dropdown('d_supervisor', row[6]),
    nowCreate: toDate(row[7]),
    cma: toDate(row[8]),
    cta: toDate(row[9]),
    oldSysAdmin: toDate(row[10]),
  }

  const employee = await prisma.employee.create({ data })
  return employee.id
}

const certifyEmployeeSnow = async (row, currentEmployeeId) => {
  const certs = config.snowCerts

  for (const cert of certs) {
    const certDate = toDate(row[cert.certDateRow])
    if (!certDate) continue

    const data = {
      employeeId: currentEmployeeId,
      certId: (
        await prisma.snow_cert.findUnique({ where: { name: cert.name } })
      ).id,
      courseDate: cert.courseDateRow && toDate(row[cert.courseDateRow]),
      certDate: toDate(row[cert.certDateRow]),
      recentDeltaDate:
        cert.recentDeltaDateRow && toDate(row[cert.recentDeltaDateRow]),
    }
    await prisma.employee_snow_cert.create({ data })
  }
}

const certifyEmployeeOther = async (row, currentEmployeeId) => {
  const certs = config.otherCerts
  for (const cert of certs) {
    //check if there is a cert date - it's mandatory
    const certDate = toDate(row[cert.row])
    if (!certDate) continue

    const data = {
      employeeId: currentEmployeeId,
      certId: (
        await prisma.other_cert.findUnique({ where: { name: cert.name } })
      ).id,
      certDate,
    }
    await prisma.employee_other_cert.create({ data })
  }
}

async function uploadFile(file) {
  const rows = fileToArray(file)

  //clear all the data before upload
  if (process.env.DELETE_DATA_ON_UPLOAD === 'true') await deleteData()

  for (const currentRow of rows) {
    //skip empty rows
    if (currentRow.every((cell) => cell.trim() == '')) continue

    const currentEmployeeId = await createEmployee(currentRow)
    await certifyEmployeeSnow(currentRow, currentEmployeeId)
    await certifyEmployeeOther(currentRow, currentEmployeeId)
  }
}

module.exports = uploadFile
