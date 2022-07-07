const express = require('express')
const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
var jwt = require('jsonwebtoken')
const { validateToken } = require('../middleware/validation')

const router = express.Router()
const prisma = new PrismaClient()

//send jwt
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).send() //bad login or password

    const token = jwt.sign({ userId: user.id }, process.env.KEY)
    delete user.password

    res.send({ user, token })
  } catch (e) {
    res.status(400).send(e) //bad request
  }
})

//get user info based on jtw
router.get('/user', validateToken, async (req, res) => {
  try {
    res.send(req.body.user)
  } catch (e) {
    res.status(400).send(e)
  }
})

//change pass
router.post('/changePass', validateToken, async (req, res) => {
  try {
    const {oldPass, newPass } = req.body
    const username =  req.body.user.username;
    console.log(req.body.user.username);

    const user = await prisma.user.findUnique({
      where: { username },
    })


    if (!user || !(await bcrypt.compare(oldPass, user.password)))
      return res.status(401).send('bad password') //password

    const hashedNewPass = await bcrypt.hash(newPass, 10)

    await prisma.user.update({
      where: {
        username,
      },
      data: {
        password: hashedNewPass,
      },
    })
    res.send()
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router
