'use strict';

var PBKDF2 = require('painless-pbkdf2');
var auth   = require('../lib/auth');
var config = require('../lib/config')
var schema = require('../lib/schema');

module.exports = function(req, res) {

  if (!schema.user(req.body)) {
    return res.status(400).end();
  }

  var password = new PBKDF2(({ iterations: config.ROUNDS }));
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
