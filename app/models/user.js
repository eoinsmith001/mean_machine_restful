var mongoose = require('mongoose');
var Schema   = mongoose.Schema; 
var bcrypt   = require('bcrypt');

var UserSchema = new Schema({
  name: String,
  username: {
    type: String,
    require: true,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    require: true,
    select: false
  },
});

UserSchema.pre('save', function(next) {
  var user = this;
  // hash password only for new user or modified password
  if (!user.isModified('password')) {
    return next();
  }
  // generate hash
  bcrypt.hash(user.password, null, null, function(err,hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});

// method to compare given pwd with db hash
UserSchema.methods.comparePassword = function(password) {
  var user = this;
  return bcrypt.compareSync(password, user.password);
};

var User;
try {
  User = mongoose.model('User',UserSchema);
} catch(e) {
  User = mongoose.model('User');
}
module.exports = User;
