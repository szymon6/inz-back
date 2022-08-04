const { parse } = require('papaparse')

function uploadFile(file) {
  const { data } = parse(file.data.toString('utf8'))
  console.log(data)
}

module.exports = uploadFile
