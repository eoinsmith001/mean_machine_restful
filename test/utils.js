'use strict';

process.env.NODE_ENV = 'test';
var env = process.env.NODE_ENV;

var mongoose = require('mongoose');
var config   = require('../config/config')[env];

before(function(done) {
  if (mongoose.connection.db) {
    return done();
  }
  mongoose.connect(config.db_uri, config.db_options, done);
});

beforeEach(function(done) {

  function clearDB() {
    console.log('clearing db');
    var collections = mongoose.connection.collections;
    for (var i in collections) {
      collections[i].remove();
    }
  }

  clearDB();
  done();
});

after(function(done) {
  mongoose.connection.close(function(err) {
    if (err) {
      console.log(err);
    }
    done();
  });
});
