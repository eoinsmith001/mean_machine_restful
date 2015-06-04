var express = require('express');
var app     = express();


// dev test prod ?
var env    = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];
var port   = process.env.PORT || config.port || 8080;

var bodyParser = require('body-parser');
var middleware = require('./app/middleware/middleware');

// connect to database
var mongoose = require('mongoose');
console.log('environment: '+env);

mongoose.connect(config.db_uri, config.db_options, function(err) {
  if (err) {
    console.log('did not connect to db...');
    throw err;
  }
});

var morgan = require('morgan');
var User   = require('./app/models/user');

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

apiRouter.use(function(req,res,next) {
  middleware.first(req,res,next);
});

apiRouter.get('/',function(req,res) {
  res.json({message: 'welcome to the api'});
});

apiRouter.route('/users')
  .post(function(req,res) {
    var user = new User();

    user.name     = req.body.name;
    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err){
      if (err) {
	if (err.code == 11000) {
	  return res.json({success: false, message: 'User already exists'});
	} else {
	  return res.send(err);
	}
      }
      res.json({message: 'User created!'});
    });

  });

app.use('/api',apiRouter);

app.listen(port);
console.log('running on '+port)

module.exports = app;
// --------------------------
