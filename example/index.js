var sedu = require('..')

var query = process.argv[2]

sedu(query).slice(0, 10).forEach(function(tag) {
  console.log(tag)
})
