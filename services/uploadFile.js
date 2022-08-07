const { PrismaClient } = require('@prisma/client')
const e = require('cors')
const prisma = new PrismaClient()

const { parse } = require('papaparse')
const deleteData = require('./deleteData')
const dropdown = require('./dropdown')

const config = {
  startPoz: 5,
  affirmative: ['yea', 'yes'],
}

const fileToArray = (file) => {
  const { data } = parse(file.data.toString('utf8'))
  data.splice(0, config.startPoz)
  return data
}

const trim = (array) => {
  for (let i = 0; i < array.length; i++) array[i] = array[i].trim()
}

const toDate = (date) => {
  if (!date || date == '') return null
  else if (config.affirmative.includes(date)) return new Date(0)

  return new Date(date)
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
    nowCreate: ['yea', 'yes'].includes(row[7]),
    cma: toDate(row[8]),
    cta: toDate(row[9]),
    oldSysAdmin: toDate(row[10]),
  }

  const employee = await prisma.employee.create({ data })
  return employee.id
}

const certifyEmployeeSnow = async (row, currentEmployeeId) => {
  //todo3
}

const certifyEmployeeOther = async (row, currentEmployeeId) => {
  const certs = [
    { name: 'Scrum Master', row: 60 },
    { name: 'ITIL', row: 61 },
    { name: 'TOGAF', row: 62 },
    { name: 'Prince2', row: 63 },
    { name: 'other', row: 64 },
  ]
  for (const cert of certs) {
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
  const array = fileToArray(file)

  //clear all the data before upload
  await deleteData() //todo at the same end - comment this out

  const currentRow = array[0] //todo4 - loop

  trim(currentRow)

  //todo try catch and info on frontend with row number
  const currentEmployeeId = await createEmployee(currentRow)
  await certifyEmployeeSnow(currentRow, currentEmployeeId)
  await certifyEmployeeOther(currentRow, currentEmployeeId)
}

module.exports = uploadFile
