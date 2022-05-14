const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//validate :table param
const validateTable = (req, res, next) => {
  const { table } = req.params
  if (!prisma[table]) return res.status(404).send()
  next()
}

//validate :id param
const validateId = (req, res, next) => {
  const { id } = req.params
  const num = Number(id)
  if (!Number.isInteger(num)) return res.status(400).send()
  req.params.id = num
  next()
}

module.exports = { validateTable, validateId }
