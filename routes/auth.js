const express = require('express')
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
var jwt = require('jsonwebtoken')

const router = express.Router()
const prisma = new PrismaClient()

//send jwt
router.post('/login', async (req, res) => {
  console.log('hehe')
  const { username, password } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    })
    console.log(user)
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).send() //bad login or password

    const token = jwt.sign({ userId: user.id }, process.env.KEY)
    delete user.password;
    
    res.send({ user, token })
  } catch (e) {
    res.status(400).send(e) //bad request
  }
})

//get user info based on jtw
router.get('/user', async (req, res) => {
  try {
    const token = req.headers.token
    await jwt.verify(token, process.env.KEY, async (err, decoded) => {
      if (err) return res.status(403).send() //not authorised (bad jwt)
      const user = await prisma.user.findUnique({
        select: { id: true, username: true },
        where: { id: decoded.userId },
      })
      res.send(user)
    })
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router
