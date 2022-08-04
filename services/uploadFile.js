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

async function uploadFile(file) {
  const array = fileToArray(file)

  //clear all the data before upload
  await deleteData()

  const currentRow = array[0] //todo4 - loop
  await createEmployee(currentRow)
  await certifyEmployeeSnow(currentRow)
  await certifyEmployeeOther(currentRow)
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
    nowCreate: false, //TODO1 nowCreate, cma, ctra, oldSysAdmin
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
