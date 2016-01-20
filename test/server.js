/* global describe it */

process.env.JWT_SECRET = 'foo'

var app = require('../server')
var request = require('supertest')

describe('Authenticate route', function () {
  it('Should return a 400 when no data is sent', function (done) {
    request(app)
      .post('/')
      .expect(400, done)
  })

  it('Should return a 400 when grant_type is not recognized', function (done) {
    request(app)
      .post('/')
      .send({ 'grant_type': 'none' })
      .expect(400, 'unknown grant_type', done)
  })
})
