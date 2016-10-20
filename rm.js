#!/usr/bin/env babel-node

const helper = require('./helper')
const fs = require('fs').promise
const arg = process.argv[2] || ''
const path = require('path')

async function rm(root) {
  const fstat = await fs.stat(root)

  if(fstat.isFile()) {
    await fs.unlink(root)
  } else if(fstat.isDirectory) {
    const files = await fs.readdir(root)
    for (const i in files) {
      const file = files[i]
      const filePath = path.join(root, file)
      await rm(filePath)
    }
    await fs.rmdir(root)
  }
}

// arguments length shoule greater than 3
helper.precondition(3, 'Usage: ./touch.js files')

rm(arg).catch(e => helper.print(e.message))
