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
      var user_form = {
        name :  'post_test_name',
        username :  'post_test_username',
        password :  'post_test_password'
      };
      request(app)
	.post('/api/users')
	.send(user_form)
	.expect(200)
	.end(function(err,res) {
	  should.not.exist(err);
	  res.text.should.containEql(expected);
          User.find({username: user_form.username}, function(err,found_users) {
	    should.not.exist(err);
            found_users.length.should.equal(1);
	    found_users[0].name.should.equal(user_form.name);
	    done();
          }); 
	});
    });
  });
});
