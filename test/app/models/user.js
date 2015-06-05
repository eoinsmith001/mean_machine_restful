'use strict';

process.env.NODE_ENV = 'test';
var env = process.env.NODE_ENV;

var utils  = require('../../utils');
var should = require('should');
var User   = require('../../../app/models/user');

describe('model User', function() {

  describe('#create', function() {
    it('should be able to create a user', function(done) {
      var name = 'test_user';
      var pass = 'password';
      var user = {
        username: name,
        password: pass,
      };
      User.create(user,function(err,createdUser){
	should.not.exist(err);
	createdUser.username.should.equal(name);
	done();
      });
    });

    it('cannot create duplicate users', function(done) {
      var user1 = {
        name: 'user1',
        username: 'username1',
        password: 'password1'
      }
      User.create(user1,function(err,createdUser) {
        should.not.exist(err);
        User.create(user1,function(err, duplicatedUser) {
          err.code.should.eql(11000);
          should.not.exist(duplicatedUser);
          done();
        });
      });
    });

    it('should hash the password', function(done) {
      var name = 'test_user';
      var pass = 'password';
      var user = {
        username: name,
        password: pass,
      };
      User.create(user,function(err,createdUser){
	should.not.exist(err);
	createdUser.password.should.not.equal(pass);
        createdUser.comparePassword(pass).should.be.true;
	done();
      });
    });
  });

});
