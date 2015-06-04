'use strict';

process.env.NODE_ENV = 'test';

var app       = require('../server');
var should    = require('should');
var request   = require('supertest');
var httpMocks = require('node-mocks-http');

describe('Application Basics', function() {
  it('should correctly reply to the homepage / path', function() {
    var expected =  'Welcome to the home page';
    request(app)
      .get('/')
      .expect(200)
      .end(function(err,res) {
        should.not.exist(err);
        res.text.should.containEql(expected);
      });
  });

  it('should correctly reply to the api/ path', function() {
    var expected = 'welcome to the api';
    request(app)
      .get('/api')
      .expect(200)
      .end(function(err,res) {
        should.not.exist(err);
        res.body.message.should.containEql(expected);
      });
  });

});
