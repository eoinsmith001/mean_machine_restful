var path = require('path');
var rootPath = path.normalize(__dirname + '../');

module.exports = {
  development: {
    port: 8080,
    db: 'mongodb://localhost:27017/mean_machine_restful'
  },
  test: {
    port: 8081,
    db: 'mongodb://eoinsmith001@gmail.com:z8eN#ubyre@proximus.modulusmongo.net:27017/Towo3wuq'
  },
  production: {
    port: 8082
  }
}
