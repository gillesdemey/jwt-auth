var fs   = require('fs');
var path = require('path');
var ajv  = require('ajv')();

/*
  Read all of our schemas
 */
var userSchema = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../schemas/user.json'))
);

/*
  Precompile all of our schemas
 */
module.exports = {
  user: ajv.compile(userSchema)
};
