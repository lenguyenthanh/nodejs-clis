#!/usr/bin/env babel-node

const helper = require('./helper')
const fs = require('fs').promise
const _ = require('lodash')

async function touch() {
  const files = _.drop(process.argv, 2)
  files.forEach(doTouch)
}

async function doTouch(file) {
  const fd = await fs.open(file, 'a+')
  const fstats = await fs.stat(file)

  await fs.futimes(fd, fstats.atime, new Date())
  await fs.close(fd)
}

// arguments length shoule greater than 3
helper.precondition(3, 'Usage: ./touch.js files')

touch().catch(e => helper.print(e.message))
