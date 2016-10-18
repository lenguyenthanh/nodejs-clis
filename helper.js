require('trycatch').configure({ 'long-stack-traces': true })
require('songbird')

function logError(err) {
  console.log(err.stack)
}

exports.print = function (data) {
  process.stdout.write(data)
  process.stdout.write('\n')
}

process.on('uncaughtException', logError)
process.on('uncaughtApplicationException', logError)
process.on('unhandledRejection', logError)


