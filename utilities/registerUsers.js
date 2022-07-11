const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

const args = process.argv.slice(2)

const user = {
  username: args[0],
  password: args[1],
}

bcrypt.hash(user.password, 10).then((hashedPass) =>
  prisma.user.create({
    data: {
      username: user.username,
      password: hashedPass,
    },
  })
)
