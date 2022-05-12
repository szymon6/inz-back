const express = require('express')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

//validate :table param
router.param('table', (req, res, next) => {
  const { table } = req.params
  if (!prisma[table]) return res.status(404).send()
  next()
})

//get table and columns info
router.get('/:table', async (req, res) => {
  const { table } = req.params
  try {
    const record = await prisma.table_info.findFirst({
      where: { name: table },
      include: {
        columns: {
          orderBy: { id: 'asc' },
        },
      },
    })
    res.send(record)
  } catch (e) {
    res.status(400).send()
  }
})

//get options for reference column
router.get('/options/:tableId', async (req, res) => {
  try {
    const tableId = Number(req.params.tableId)
    const columnInfo = await prisma.column_info.findFirst({
      where: { tableId, displayValue: true },
      include: { table: true },
    })
    const table = columnInfo.table.name

    let options = await prisma[table].findMany({
      select: { id: true, [columnInfo.name]: true },
      orderBy: { id: 'asc' },
    })
    options = options.map((o) => {
      return {
        value: o.id,
        label: o[columnInfo.name],
      }
    })

    res.send(options)
  } catch (e) {
    res.status(400).send()
  }
})

module.exports = router
