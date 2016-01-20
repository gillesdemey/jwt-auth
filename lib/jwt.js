var _ = require('lodash')
var jwt = require('jsonwebtoken')

var SECRET = process.env.JWT_SECRET

if (!SECRET) throw new Error('Please specify a JWT secret')

module.exports = {
  Sign: function (user) {
    // don't accidentally include sensitive fields in the JWT payload
    return jwt.sign(_.omit(user, 'password', 'client_secret'), SECRET, {
      algorithm: 'HS256',
      expiresIn: '7d',
      issuer: 'auth.astromo.io',
      subject: user.email,
      permissions: user.permissions,
      tenant: 'astromo'
    })
  }

}
