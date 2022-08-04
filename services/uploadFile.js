const { parse } = require('papaparse')
const dropdown = require('./dropdown')

async function uploadFile(file) {
  const { data: array } = parse(file.data.toString('utf8'))
  array.splice(0, 5)
  const current = array[0]
  const data = {
    name: current[0],
    email: current[1],
    roleId: await dropdown('d_role', current[2]),
  }

  console.log(data)
  //dropdown('d_role', 'aa2').then(console.log)
}

module.exports = uploadFile
