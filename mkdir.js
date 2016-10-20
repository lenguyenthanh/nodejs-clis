#!/usr/bin/env babel-node 
const helper = require('./helper')
const fs = require('fs').promise
const path = require('path')

const filePath = process.argv[2] || ''

async function mdkir() {
  const list = filePath.split('/')
  
  list.reduce(recusiveMkdir, __dirname) 
}

function recusiveMkdir(currentPath, newPath) {
  const filePath = path.join(currentPath, newPath)
  doMkdir(filePath)
  return filePath
}

async function doMkdir(dir) {
  await fs.mkdir(dir)
}

// arguments length shoule greater than 3
helper.precondition(3, 'Usage: ./touch.js files')

mdkir().catch(e => helper.print(e.message))
