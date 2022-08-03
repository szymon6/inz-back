const express = require('express')
const app = express()
const cors = require('cors')
const fileUpload = require('express-fileupload')

//cross-origin resource sharing
app.use(cors())

app.use(express.json())

app.use(fileUpload())

app.use('/auth', require('./routes/auth'))
app.use('/table', require('./routes/table'))
app.use('/linked', require('./routes/linkedList'))
app.use('/', require('./routes/tableInfo'))
app.use('/options', require('./routes/options'))
app.use('/file', require('./routes/file'))

app.listen(3100, () => {
  console.log(`Server is Listening on 3100`)
})

console.log(process.env.PORT)
