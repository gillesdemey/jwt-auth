'use strict'

var ajv = require('ajv')()
var grants = require('../grants')
var schemas = require('../lib/schema')

module.exports = function (req, res) {
  var grantType = req.body.grant_type
  var grant = grants[grantType]

  if (!grant) return res.status(400).send('unknown grant_type')

  var validate
  switch (grantType) {
    case 'password':
      validate = schemas.user
      break
    case 'client_credentials':
      validate = schemas.client
      break
  }

  // validate schema
  var valid = validate(req.body)
  if (!valid) return res.status(400).send(ajv.errorsText(validate.errors))

  // grant token
  grant(req.body, function (err, jwt) {
    if (err) return res.status(err.status || 500).send(err.message)
    return res.json({ token: jwt })
  })
}

