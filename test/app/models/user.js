'use strict';

process.env.NODE_ENV = 'test';
var env = process.env.NODE_ENV;

var should   = require('should');
var mongoose = require('mongoose');
var config   = require('../../../config/config')[env];
var User     = require('../../../app/models/user');

describe('model User', function() {

  before(function(done) {
    function clearDB() {
      var collections = mongoose.connection.collections;
      for (var i in collections) {
	collections[i].remove();
      }
    }
    mongoose.connect(config.db_uri, config.db_options, function(err) {
      if (err) {
	console.log(err);
      }
      console.log('db connection ok: '+config.db_uri);
      clearDB();
      done();
    });
  });

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
