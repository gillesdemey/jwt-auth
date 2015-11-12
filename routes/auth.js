'use strict';

var _      = require('lodash');
var auth   = require('../lib/auth');
var bcrypt = require('bcrypt');

// Example user (should be a DB)
var exampleUser = {
  email: 'michiel@demey.io',
  // test123 (BCRYPT,14)
  password: '$2a$14$V0NBiSXTRmme97yRI6.P0uHf8TQtCs2acvuEyk9jPe18ujQ1Ulgca'
};

module.exports = function(req, res) {

  if (_.isEmpty(req.body)) {
    return res.status(400).end();
  }

  // Load hash from your DB.
  bcrypt.compare(req.body.password, exampleUser.password, function(err, isMatch) {
    if (!isMatch || req.body.email !== exampleUser.email) {
      return res.status(401).end();
    }

    // Don't cache this API call
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1
    res.setHeader('Pragma', 'no-cache'); // HTTP 1.0
    res.setHeader('Expires', '0'); // Proxies

    res.json({
      token: auth.Sign(req.body)
    });

  });
};
