var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
  local: {
    name:     { type: String },
    email:    { type: String },
    password: { type: String }
  },
  fb: {
    id: String,
    access_token: String,
    firstName: String,
    lastName: String,
    email: String
  }
});

// Example of virtual attribute in model
//
// UserSchema.virtual('date')
//   .get(function(){
//     return this._id.getTimestamp();
//   });

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  // Compare is a bcrypt method that will return a boolean,
  // if the first argument once encrypted corresponds to the second argument
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
