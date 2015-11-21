'use strict';

var fs  = require('fs');
var path = require('path');
var jwt = require('jsonwebtoken');

var config = require('./config');

var key = fs.readFileSync(process.env.KEY || path.resolve(__dirname, '../keys/key'));

module.exports = {

  Sign: function(user) {
    delete user.password; // Just to be sure

    return jwt.sign({
      email: user.email
    }, {
      key: key,
      passphrase: config.PASSPHRASE
    }, {
      algorithm: 'RS512',
      expiresIn: '1d',
      issuer: 'auth.astromo.io',
      audience: 'astromo',
      subject: user.email
    });
  }

};
