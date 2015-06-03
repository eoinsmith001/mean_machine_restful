'use strict';

process.env.NODE_ENV = 'test';
var env = process.env.NODE_ENV;

var mongoose = require('mongoose');
var config   = require('../config/config')[env];

beforeEach(function(done) {
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
    clearDB();
    done();
    });
});

afterEach(function(done) {
  mongoose.connection.close(function(err) {
    if (err) {
      console.log(err);
    }
    done();
  });
});
