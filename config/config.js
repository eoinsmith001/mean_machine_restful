var path = require('path');
var rootPath = path.normalize(__dirname + '../');

module.exports = {
  development: {
    port: 8080,
    db_uri: 'mongodb://localhost:27017/mean_machine_restful',
    db_options: {
    }
  },
  test: {
    port: 8081,
    db_uri: 'mongodb://proximus.modulusmongo.net:27017/Towo3wuq',
    db_options: {
      user: 'eoinsmith001@gmail.com',
      pass: 'z8eN#ubyre'
    }
  },
  production: {
    port: 8082
  }
}
