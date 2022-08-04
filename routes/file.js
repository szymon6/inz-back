const express = require('express')
const { validateId, validateToken } = require('../middleware/validation')
const uploadFile = require('../services/uploadFile')
const router = express.Router()

//todo ucomment
//protect all routes with jwt
//router.use(validateToken)

router.get('/form', async (req, res) => {
  try {
    res.sendFile(__dirname + '/index.html')
  } catch (e) {
    res.status(400).send()
  }
})

router.post('/upload', async (req, res) => {
  try {
    //console.log(req.files.spreadsheet)
    await uploadFile(req.files.spreadsheet)
    res.send()
  } catch (e) {
    res.status(400).send()
  }
})

module.exports = router
