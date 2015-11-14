'use strict';

var PBKDF2 = require('../lib/pbkdf2');
var auth   = require('../lib/auth');
var schema = require('../lib/schema');

module.exports = function(req, res) {

  if (!schema.user(req.body)) {
    return res.status(400).end();
  }

  var password = new PBKDF2();
  password.create(req.body.password, function(err, hash) {
    if (err) throw err;

    var user = {
      email: req.body.email,
      password: req.body.password
    };

    res.json({
      token: auth.Sign(user)
    });
  });

};
