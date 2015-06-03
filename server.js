var express = require('express');
var app     = express();


// dev test prod
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];
var port = process.env.PORT || config.port || 8080;

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req,res,next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  next();
});

app.use(morgan('dev'));

app.get('/',function(req,res) {
  res.send('Welcome to the home page');
});

var apiRouter = express.Router();
apiRouter.get('/',function(req,res) {
  res.json({message: 'welcome to the api'});
});

app.use('/api',apiRouter);

app.listen(port);
console.log('running on '+port)

module.exports = app;
// --------------------------
