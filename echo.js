#!/usr/bin/env node

require('./helper')

const value = process.argv[2] || ''

function echo() {
  process.stdout.write(value)
  process.stdout.write('\n')
}

echo()
