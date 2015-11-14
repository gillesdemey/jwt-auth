'use strict';

var app = require('../worker');
var request = require('supertest');

describe('Test server', function() {

  it('Should return bad request', function(done) {
    request(app)
      .post('/auth')
      .expect(400)
      .end(done);
  });

});
