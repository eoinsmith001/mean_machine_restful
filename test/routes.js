'use strict';

process.env.NODE_ENV = 'test';

var app     = require('../server');
var should  = require('should');
var request = require('supertest');
var User    = require('../app/models/user');

describe('API Routes', function() {
  describe('post', function() {
    it('should create a user with a valid post request', function(done) {
      var expected =  'User created!';
      var name =  'post_test_name';
      var username =  'post_test_username';
      var password =  'post_test_password';
      request(app)
	.post('/api/users')
	.field('name', name)
	.field('username', username)
	.field('password', password)
	.expect(200)
	.end(function(err,res) {
	  should.not.exist(err);
	  res.text.should.containEql(expected);
          User.find({username: username}, function(err,found_users) {
	    should.not.exist(err);
            found_users.length.should.equal(1);
	    console.log(found_users[0]);
	    found_users[0].name.should.equal(name);
	    done();
          }); 
	});
    });
  });
});
