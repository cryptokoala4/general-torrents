var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
  name:     { type: String },
  email:    { type: String, required: true,  unique: true },
  password: { type: String, required: true }
});

// Example of virtual attribute in model
//
// UserSchema.virtual('date')
//   .get(function(){
//     return this._id.getTimestamp();
//   });

UserSchema.methods.authenticate = function(password, callback) {
  // Compare is a bcrypt method that will return a boolean,
  // if the first argument once encrypted corresponds to the second argument
  bcrypt.compare(password, this.password, function(err, isMatch) {
    callback(null, isMatch);
  });
};

UserSchema.pre('save', function(next) {
  var user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // Generate a salt, with a salt_work_factor of 5
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err);

    // Hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // Override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
