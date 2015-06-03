'use strict';

process.env.NODE_ENV = 'test';
var env = process.env.NODE_ENV;

var should   = require('should');
var mongoose = require('mongoose');
var config   = require('../../../config/config')[env];

describe('model User', function() {

  before(function(done) {
    mongoose.createConnection(config.db_uri, config.db_options, function(err) {
      if (err) {
	console.log(err);
      }
      console.log('db connection ok: '+config.db_uri);
      done();
    });
  });

  describe('#create', function() {
    it('should be able to create a user', function(done) {
      var User     = require('../../../app/models/user');
      var user = {
        username: 'test_user',
        password: 'password',
      };
      console.log('about to create user', user);
      User.create(user,function(err,createdUser){
	should.not.exist(err);
	done();
      });
    });
  });

  after(function(done) {
    mongoose.connection.close(function(err) {
      if (err) {
	console.log(err);
      }
      console.log('db connection closed');
      done();
    });
  });

});
