const express = require('express')
const app = express()

app.use(express.json())

app.use('/table', require('./routes/table'))

app.listen(3100, () => {
  console.log(`Server is Listening on 3100`)
})
