const express = require('express')
const { PrismaClient } = require('@prisma/client')
const { validateTable } = require('../middleware/validation')

const router = express.Router()
const prisma = new PrismaClient()

//param validation
router.param('table', validateTable)

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

module.exports = router
