function madeArray(string) {
  return string
    .split('\n') // split string to lines
    .map((e) => e.trim()) // remove white spaces for each line
    .map((e) => e.split(',').map((e) => e.trim())) // split each line to array
}

function uploadFile(file) {
  const array = madeArray(file.data.toString('utf8'))
  console.log(array)
}

module.exports = uploadFile
