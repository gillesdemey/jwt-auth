var _ = require('lodash')
var auth = require('../lib/auth')
var PBKDF2 = require('painless-pbkdf2')
var schema = require('../lib/schema')

// Example user (should be a DB)
var exampleUser = {
  email: 'michiel@demey.io',
  password: 'sha256:100000:o/WYWXz+prVEEK6QyJHy7ZN7pNlngyl4G8MBJM977YE=:17633005a246861907dd71d1de9a4882eb47f67ff752a41110c6e4d71ba34db2',
  permissions: {
    ping: true
  }
}

module.exports = function (req, res) {
  if (_.isEmpty(req.body)) {
    return res.status(400).end()
  }

  if (!schema.user(req.body)) {
    return res.status(400).end()
  }

  // Load hash from your DB.
  var password
  try {
    password = new PBKDF2(exampleUser.password)
  } catch (ex) {
    return res.status(500).send({ 'error': 'Error parsing password' })
  }

  password.validate(req.body.password, function (err, valid) {
    if (err) return res.status(500).end()

    if (!valid || req.body.email !== exampleUser.email) {
      return res.sendStatus(401)
    }

    // Add user's permissions
    req.body.permissions = exampleUser.permissions

    res.json({
      token: auth.Sign(req.body)
    })
  })
}
