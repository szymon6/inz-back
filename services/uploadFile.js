const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const { parse } = require('papaparse')
const dropdown = require('./dropdown')

//todo1: clear all data on migration
async function uploadFile(file) {
  const { data: array } = parse(file.data.toString('utf8'))
  array.splice(0, 5)

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
    nowCreate: false, //TODO nowCreate, cma, ctra, oldSysAdmin
  }

  await prisma.employee.create({ data })
  console.log(data)
}

const certifyEmployeeSnow = async (row) => {
  //todo3
}

const certifyEmployeeOther = async (row) => {
  //todo2
}

module.exports = uploadFile
