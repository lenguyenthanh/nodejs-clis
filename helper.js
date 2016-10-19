require('trycatch').configure({ 'long-stack-traces': true })
require('songbird')

function logError(err) {
  console.log(err.stack)
}


process.on('uncaughtException', logError)
process.on('uncaughtApplicationException', logError)
process.on('unhandledRejection', logError)


exports.print = function (data) {
  process.stdout.write(data)
  process.stdout.write('\n')
}

exports.precondition = function (minLength, message) {
  const argsLength = process.argv.length
  if(argsLength < minLength) {
    console.log(message)
    process.exit(1)
  }
}
