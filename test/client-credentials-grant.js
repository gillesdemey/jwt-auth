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
        not_client_id: 'foo',
        client_secret: 'bar',
        grant_type: 'client_credentials'
      })
      .expect(400, done)
  })

  // Wrong client_secret
  it('Should not authenticate when credentials are wrong', function (done) {
    request(app)
      .post('/')
      .send({
        client_id: 'some-id',
        client_secret: 'i_have_no_idea',
        grant_type: 'client_credentials'
      })
      .expect(401, done)
  })

  it('Should authenticate my client', function (done) {
    request(app)
      .post('/')
      .send({
        client_id: 'foo',
        client_secret: 'bar',
        grant_type: 'client_credentials'
      })
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})
