const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

const users = [
  {
    username: 'user1',
    password: 'pass1',
  },
]

users.forEach(async (user) => {
  const hashedPass = await bcrypt.hash(user.password, 10)

  await prisma.user.create({
    data: {
      username: user.username,
      password: hashedPass,
    },
  })
})
