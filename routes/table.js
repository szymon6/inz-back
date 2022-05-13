const express = require('express')
const { PrismaClient } = require('@prisma/client')
const { validateTable, validateId } = require('../middleware/validation')

const router = express.Router()
const prisma = new PrismaClient()

//param validation
router.param('table', validateTable)
router.param('id', validateId)

//get all
router.get('/:table', async (req, res) => {
  const { table } = req.params
  const allRecords = await prisma[table].findMany({
    orderBy: { id: 'asc' },
  })
  res.send(allRecords)
})

//get one
router.get('/:table/:id', async (req, res) => {
  const { table, id } = req.params
  const record = await prisma[table].findUnique({ where: { id } })
  res.send(record)
})

//create new
router.post('/:table', async (req, res) => {
  const { table } = req.params

  try {
    const record = await prisma[table].create({ data: req.body })
    res.send(record)
  } catch (e) {
    return res.status(400).send(e)
  }
})

//delete
router.delete(`/:table/:id`, async (req, res) => {
  const { id, table } = req.params

  try {
    const record = await prisma[table].delete({ where: { id } })
    res.json(record)
  } catch (e) {
    return res.status(400).send(e)
  }
})

//edit
router.put('/:table/:id', async (req, res) => {
  const { id, table } = req.params

  try {
    const record = await prisma[table].update({
      where: { id },
      data: req.body,
    })
    res.send(record)
  } catch (e) {
    return res.status(400).send(e)
  }
})

module.exports = router
