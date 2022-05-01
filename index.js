const express = require('express')
const app = express()
const cors = require('cors')

//cross-origin resource sharing
app.use(cors())

app.use(express.json())

app.use('/table', require('./routes/table'))
app.use('/info', require('./routes/info'))

app.listen(3100, () => {
  console.log(`Server is Listening on 3100`)
})
