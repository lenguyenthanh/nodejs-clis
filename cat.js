#!/usr/bin/env babel-node

const helper = require('./helper')
const fs = require('fs').promise
const filePath = process.argv[2] || ''

async function cat() {
  const value = await fs.readFile(filePath, 'utf8')
  helper.print(value)
}

cat().catch(e => helper.print(e.message))


