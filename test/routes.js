'use strict';

process.env.NODE_ENV = 'test';

var app     = require('../server');
var should  = require('should');
var request = require('supertest');
var User    = require('../app/models/user');

describe('API Routes', function() {
  var user_form = {
    name :  'post_test_name',
    username :  'post_test_username',
    password :  'post_test_password'
  };
  var second_user = {
    name :  'post_test_name2',
    username :  'post_test_username2',
    password :  'post_test_password2'
  };
  describe('post', function() {
    it('should create a user with a valid post request', function(done) {
      var expected =  'User created!';
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
  describe('get',function() {
    before(function(done) {
      console.log('add first user');
      request(app)
	.post('/api/users')
	.send(second_user)
	.expect(200);
      console.log('add second user');
      request(app)
	.post('/api/users')
	.send(user_form)
	.expect(200);
      done();
    });
    it('should fetch all users', function(done) {
      request(app)
	.get('/api/users')
	.expect(200)
	.end(function(err,res) {
	  should.not.exist(err);
	  res.body.length.should.eql(2);
	  done();
	});
    });
  });
});
