var path = require('path');
var rootPath = path.normalize(__dirname + '../');

module.exports = {
  development: {
    port: 8080
  },
  test: {
    port: 8081
  },
  production: {
    port: 8082
  }
}
