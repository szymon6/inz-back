const express = require('express')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

//validate :table param
router.param('table', (req, res, next) => {
  const { table } = req.params
  console.log(table)
  if (!prisma[table]) return res.status(404).send()
  next()
})

//get table info
router.get('/:table', async (req, res) => {
  const { table } = req.params
  const record = await prisma.tableInfo.findFirst({
    where: { name: table },
    include: {
      columns: true,
    },
  })

  res.send(record)
})

module.exports = router
