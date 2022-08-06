const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const { parse } = require('papaparse')
const deleteData = require('./deleteData')
const dropdown = require('./dropdown')

const fileToArray = (file) => {
  const { data } = parse(file.data.toString('utf8'))
  data.splice(0, 5)
  return data
}

const trim = (array) => {
  for (let i = 0; i < array.length; i++) array[i] = array[i].trim()
}

async function uploadFile(file) {
  const array = fileToArray(file)

  //clear all the data before upload
  await deleteData()

  const currentRow = array[0] //todo4 - loop

  trim(currentRow)

  //todo try catch and info on frontend with row number
  await createEmployee(currentRow)
  await certifyEmployeeSnow(currentRow)
  await certifyEmployeeOther(currentRow)
}
const date = (date) => {
  if (!date || date == '') return null
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
    cma: date(row[8]),
    cta: date(row[9]),
    oldSysAdmin: date(row[10]),
  }

  await prisma.employee.create({ data })
}

const certifyEmployeeSnow = async (row) => {
  //todo3
}

const certifyEmployeeOther = async (row) => {
  //todo2
}

module.exports = uploadFile
