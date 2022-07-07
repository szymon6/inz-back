const express = require('express')
const { PrismaClient } = require('@prisma/client')
const { validateTable, validateToken } = require('../middleware/validation')

const router = express.Router()
const prisma = new PrismaClient()

//protect all routes with jwt
router.use(validateToken)

//param validation
router.param('table', validateTable)

//get table and columns info
router.get('/:table', async (req, res) => {
  const { table } = req.params
  try {
    const tableInfo = await prisma.table_info.findFirst({
      where: { name: table },
      include: {
        columns: {
          orderBy: { id: 'asc' },
          include: {
            referenceTo: {
              select: { name: true },
            },
          },
        },
      },
    })
    tableInfo.columns.unshift({
      name: 'id',
      displayName: 'ID',
      type: 'number',
      readonly: true,
    })

    res.send(tableInfo)
  } catch (e) {
    res.status(400).send()
  }
})

module.exports = router
