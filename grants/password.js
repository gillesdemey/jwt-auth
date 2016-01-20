'use strict'

var jwt = require('../lib/jwt')

var exampleUser = {
  email: 'test@user.com',
  password: 'bar',
  permissions: [ 'recipes:create', 'recipes:read' ]
}

module.exports = function (body, callback) {
  var usernameMatches = body.username === exampleUser.email
  var passwordMatches = body.password === exampleUser.password

  // check client_id / client_secret combination
  if (!usernameMatches || !passwordMatches) {
    var err = new Error('Unauthorized')
    err.status = 401
    return callback(err)
  }

  return callback(null, jwt.Sign(exampleUser))
}
