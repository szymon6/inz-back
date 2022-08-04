const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function addToDropdown(dropdownName, value) {
  const result = await prisma.dropdown_info.findUnique({
    where: { name: dropdownName },
  })
  if (!result) throw `${dropdownName} doesn't exist`

  let record = await prisma[dropdownName].findUnique({ where: { value } })

  if (record) return record.id
  else record = await prisma[dropdownName].create({ data: { value } })

  return record.id
}

//addToDropdown('d_role', 'aa2').then(console.log)
