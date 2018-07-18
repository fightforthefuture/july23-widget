const path = require('path')
const fs = require('fs')

const getStrings = require('../assets/js/get-strings')
const strings = getStrings()

const outputFile = path.resolve(__dirname, '..', 'assets', 'data', 'strings.json')
fs.writeFileSync(outputFile, JSON.stringify(strings, null, 2))
