'use strict'

var ajv = require('ajv')()
var glob = require('glob')
var path = require('path')

/*
  Precompile all of our schemas
 */
var files = glob.sync('schemas/*.json', { matchBase: true })

var schemas = {}
files.forEach(function (file) {
  var bn = path.basename(file, '.json')
  var schema = require(path.resolve(__dirname, '../', file))
  schemas[bn] = ajv.compile(schema)
})
module.exports = schemas
