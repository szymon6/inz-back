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

//validate :id param
router.param('id', (req, res, next) => {
  const { id } = req.params
  const num = Number(id)
  if (!Number.isInteger(num)) return res.status(400).send()
  req.params.id = num
  next()
})

//get all
router.get('/:table', async (req, res) => {
  const { table } = req.params
  const allRecords = await prisma[table].findMany()
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
