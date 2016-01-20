/* global describe it */

process.env.JWT_SECRET = 'foo'

var app = require('../server')
var request = require('supertest')

describe('Authenticate route', function () {
  // wrong parameter names
  it('Should return a 400 when request schema is wrong', function (done) {
    request(app)
      .post('/')
      .send({
        not_username: 'test@user.com',
        password: 'bar',
        grant_type: 'password'
      })
      .expect(400, done)
  })

  // Wrong client_secret
  it('Should not authenticate when credentials are wrong', function (done) {
    request(app)
      .post('/')
      .send({
        username: 'test@user.com',
        password: 'foo',
        grant_type: 'password'
      })
      .expect(401, done)
  })

  it('Should authenticate user', function (done) {
    request(app)
      .post('/')
      .send({
        username: 'test@user.com',
        password: 'bar',
        grant_type: 'password'
      })
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})
