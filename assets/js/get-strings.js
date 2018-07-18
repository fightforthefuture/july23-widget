// apply markdown filter recursively as needed
function formatStrings(data, isMarkdown=false) {
  const showdown = require('showdown')
  const md = new showdown.Converter()
  const cloneDeep = require('lodash/cloneDeep')
  let parsedData = cloneDeep(data)

  if (Array.isArray(data)) {
    parsedData = data.map(formatStrings)
  }
  else if (typeof(data) === 'object') {
    for (let key of Object.keys(data)) {
      if (data[key]) {
        parsedData[key] = formatStrings(data[key], key.match(/_html$/))
      }
    }
  }
  else if (isMarkdown) {
    parsedData = md.makeHtml(data)
  }

  return parsedData
}

// recursively load and parse YAML files
function getStrings(dir) {
  const fs = require('fs')
  const path = require('path')
  const yaml = require('js-yaml')
  const strings = {}

  if (dir === undefined) {
    dir = path.resolve(__dirname, '..', '..', 'locales')
  }

  for (let file of fs.readdirSync(dir)) {
    const absPath = path.resolve(dir, file)

    if (fs.lstatSync(absPath).isDirectory()) {
      strings[file] = getStrings(absPath)
    }
    else if (file.match(/\.yml$/)) {
      const yamlData = fs.readFileSync(absPath, 'utf8')
      const rawStrings = yaml.safeLoad(yamlData)
      strings[file.replace(/\.yml$/, '')] = formatStrings(rawStrings)
    }
  }

  return strings
}

module.exports = getStrings
