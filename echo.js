#!/usr/bin/env node

const helper = require('./helper')

const value = process.argv[2] || ''

function echo() {
  helper.print(value)
}

echo()
