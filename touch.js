#!/usr/bin/env babel-node

const helper = require('./helper')
const fs = require('fs').promise

async function touch() {
  const filePath = process.argv[2] || ''
  const fd = await fs.open(filePath, 'a+')
  const fstats = await fs.stat(filePath)

  await fs.futimes(fd, fstats.atime, new Date())
  await fs.close(fd)
}

// arguments length shoule greater than 3
helper.precondition(3, 'Usage: ./touch.js files')

touch().catch(e => helper.print(e.message))
