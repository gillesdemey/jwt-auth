'use strict'

var jwt = require('../lib/jwt')

// Example user (should be a DB)
var exampleClient = {
  client_id: 'foo',
  client_secret: 'bar'
}

var exampleUser = {
  email: 'test@user.com',
  permissions: [ 'recipes:create', 'recipes:read' ]
}

module.exports = function (body, callback) {
  var idMatches = body.client_id === exampleClient.client_id
  var secretMatches = body.client_secret === exampleClient.client_secret

  // check client_id / client_secret combination
  if (!idMatches || !secretMatches) {
    var err = new Error('unauthorized')
    err.status = 401
    return callback(err)
  }

  return callback(null, jwt.Sign(exampleUser))
}
