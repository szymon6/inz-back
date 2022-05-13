const express = require('express')
const { PrismaClient } = require('@prisma/client')
const { validateId } = require('../middleware/validation')

const router = express.Router()
const prisma = new PrismaClient()

//param validation
router.param('id', validateId)

//get options for reference column
router.get('/dropdown/:id', async (req, res) => {
  try {
    const dropdownId = req.params.id

    let options = await prisma.dropdown_value.findMany({
      where: { dropdownId: dropdownId },
    })

    //rename
    options = options.map((o) => ({
      value: o.id,
      label: o.value,
    }))

    res.send(options)
  } catch (e) {
    res.status(400).send()
  }
})

//get options for reference column
router.get('/table/:id', async (req, res) => {
  try {
    const tableId = req.params.id
    const columnInfo = await prisma.column_info.findFirst({
      where: { tableId, displayValue: true },
      include: { table: true },
    })
    const table = columnInfo.table.name

    let options = await prisma[table].findMany({
      select: { id: true, [columnInfo.name]: true },
      orderBy: { id: 'asc' },
    })

    //rename
    options = options.map((o) => ({
      value: o.id,
      label: o[columnInfo.name],
    }))

    res.send(options)
  } catch (e) {
    res.status(400).send()
  }
})

module.exports = router
