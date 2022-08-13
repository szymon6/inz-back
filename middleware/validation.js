const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
var jwt = require('jsonwebtoken')

//validate :table param (check if table exist)
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

const validateToken = async (req, res, next) => {
  const token = req.headers.token

  await jwt.verify(token, process.env.KEY, async (err, decoded) => {
    if (err) return res.status(403).send() //not authorized (bad jwt)

    const user = await prisma.user.findUnique({
      select: { id: true, username: true },
      where: { id: decoded.userId },
    })
    req.headers.userId = user.id
    next()
  })
}

module.exports = { validateTable, validateId, validateToken }
