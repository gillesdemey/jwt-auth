'use strict';

var _      = require('lodash');
var auth   = require('../lib/auth');
var PBKDF2 = require('../lib/pbkdf2');

// Example user (should be a DB)
var exampleUser = {
  email: 'michiel@demey.io',
  password: 'sha256:10000:dGBNPXXL750EPMNrDrh3NgbsldTWF06uFLGWHdJhVYM=:54a1594853d61d6c5bd6dc6e46070d5d7e9cf50d39137edfc0c8c3e9a0314f7a'
};

module.exports = function(req, res) {

  if (_.isEmpty(req.body)) {
    return res.status(400).end();
  }

  // Load hash from your DB.
  var password = new PBKDF2(exampleUser.password)

  password.validate(req.body.password, function(err, valid) {
    if (err) return res.status(500).end();

    if (!valid || req.body.email !== exampleUser.email) {
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
