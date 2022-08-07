const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//if already exist just return id, if not create one and return id
async function dropdown(dropdownName, value) {
  const result = await prisma.dropdown_info.findUnique({
    where: { name: dropdownName },
  })
  if (!result) throw `${dropdownName} doesn't exist`

  let record = await prisma[dropdownName].findUnique({ where: { value } })

  if (record) return record.id
  else record = await prisma[dropdownName].create({ data: { value } })

  return record.id
}

module.exports = dropdown
