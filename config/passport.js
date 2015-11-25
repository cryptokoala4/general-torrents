var config           = require('./config');
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GitHubStrategy   = require('passport-github').Strategy;
var User             = require(config.root + '/app/models/user');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
      callback(err, user); // ---> req.user
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
    process.nextTick(function() {
      // Find a user with this e-mail
      User.findOne({ 'local.email' :  email }, function(err, user) {
        if (err) return callback(err);

        // If there already is a user with this email
        if (user) {
          return callback(null, false, req.flash('signupMessage', 'This email is already used.'));
        } else {
        // There is no email registered with this email

          // Create a new user
          var newUser            = new User();
          newUser.local.email    = email;
          newUser.local.password = newUser.encrypt(password);

          newUser.save(function(err) {
            if (err) throw err;
            return callback(null, newUser);
          });
        }
      });
    });
  }));

  passport.use('local-signin', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, callback) {
    // Search for a user with this email
    User.findOne({ 'local.email' :  email }, function(err, user) {
      if (err) return callback(err);

       // If no user is found
      if (!user) return callback(null, false, req.flash('signinMessage', 'No user found.'));

      // Wrong password
      if (!user.validPassword(password)) {
        return callback(null, false, req.flash('signinMessage', 'Oops! Wrong password.'));
      }

      return callback(null, user);
    });
  }));

  passport.use('facebook', new FacebookStrategy({
    clientID        : process.env.FACEBOOK_API_KEY,
    clientSecret    : process.env.FACEBOOK_API_SECRET,
    callbackURL     : process.env.FACEBOOK_CALLBACK || 'http://localhost:3000/auth/facebook/callback',
    enableProof     : true,
    profileFields   : ['name', 'emails']
  }, function(access_token, refresh_token, profile, done) {
    process.nextTick(function() {

    // // Use this to see the information returned from Facebook
    // console.log(profile)
      User.findOne({ 'fb.id' : profile.id }, function(err, user) {
        if (err) return done(err);
        if (user) {
          return done(null, user);
        } else {

          var newUser = new User();
          newUser.fb.id           = profile.id;
          newUser.fb.access_token = access_token;
          newUser.fb.firstName    = profile.name.givenName;
          newUser.fb.lastName     = profile.name.familyName;
          newUser.fb.email        = profile.emails[0].value;

          newUser.save(function(err) {
            if (err)
              throw err;

            return done(null, newUser);
          });
        }
      });
    });
  }));


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_API_KEY,
    clientSecret: process.env.GITHUB_API_SECRET,
    callbackURL:  process.env.GITHUB_CALLBACK || 'http://localhost:3000/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    User.findOne({ 'gh.id': profile.id }, function (err, user) {
        if (err) return done(err);
        if (user) {
          return done(null, user);
        } else {

          var newUser = new User();
          console.log(newUser)
          newUser.gh.id           = profile.id;
          newUser.gh.access_token = accessToken;
          newUser.gh.username    = profile.username;
          newUser.gh.displayName     = profile.displayName;
          // newUser.gh.email        = profile.emails[0].value;
          newUser.save(function(err) {
            if (err)
              throw err;

            return done(null, newUser);
          });
        }
    });
  }
));
}
