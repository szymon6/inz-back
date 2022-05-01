const express = require('express')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

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
