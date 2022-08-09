const express = require('express')
const { validateId, validateToken } = require('../middleware/validation')
const uploadFile = require('../services/uploadFile')
const router = express.Router()

//protect all routes with jwt
router.use(validateToken)

router.post('/upload', async (req, res) => {
  try {
    await uploadFile(req.files.spreadsheet)
    res.send()
  } catch (e) {
    res.status(400).send()
  }
})

module.exports = router
