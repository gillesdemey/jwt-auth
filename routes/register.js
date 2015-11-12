'use strict';

var bcrypt = require('bcrypt');

var config = require('../lib/config');
var auth   = require('../lib/auth');
var schema = require('../lib/schema');

module.exports = function(req, res) {

  if (!schema.user(req.body)) {
    return res.status(400).end();
  }

  bcrypt.hash(req.body.password, config.ROUNDS, function(err, hash) {
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
