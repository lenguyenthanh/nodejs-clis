#!/usr/bin/env babel-node

const helper = require('./helper')
const fs = require('fs').promise
const argv = require('yargs').argv
const path = require('path')
const Promise = require('bluebird')
const _ = require('lodash')

const dir = argv._[0] || ''
const isRecursive = Boolean(argv.R) || false

async function ls() {
  const result = await Promise.all(doLs(dir))
  _.flattenDeep(result.filter(file => file !== undefined)).forEach(file => helper.print(file))
}

async function doLs(dir) {
  const files = await fs.readdir(dir)

  return files.map(file => {
    const filePath = path.join(dir, file)

    return fs.stat(filePath).then(fstat => {
      if(fstat.isFile()) {
        return Promise.resolve(file)
      } else if(fstat.isDirectory() && isRecursive) {
        return Promise.all(doLs(filePath))
      } 
    })
  })
}


// arguments length shoule greater than 3
helper.precondition(3, 'Usage: ./ls.js directory -R')

ls().catch(e => helper.print(e.message))
