/* global describe it */

// Set some environment variables
process.env.KEY = require('path').resolve(__dirname, './fixtures/keys/key')
process.env.KEY_PASSPHRASE = 'test123'

var app = require('../worker')
var request = require('supertest')

describe('Test server', function () {
  var token

  it('Should return a JWT token when registering', function (done) {
    request(app)
      .post('/register')
      .send({
        email: 'test@astromo.io',
        password: 'test123'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) throw err

        token = res.body.token
        console.log('token', token)
        done()
      })
  })
})
