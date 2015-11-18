var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var User     = require('../models/user');

module.exports = function (app) {
  app.use('/', router);
};

// SIGN-UP: Create a new User
router.post('/signup', function (req, res, next) {
  var userObject = new User(req.body.user);

  userObject.save(function(err, user) {
    if (err) { return res.status(401).send({message: err.errmsg});     }
    else     { return res.status(200).send({message: "user created"}); }
  });
});

// SIGN-IN: Authenticate the user
router.post("/signin", function(req, res) {
  var userParams = req.body.user;

  User.findOne({ email: userParams.email }, function(err, user) {

    user.authenticate(userParams.password, function(err, isMatch) {
      if (err) throw err;

      if (isMatch) {
        return res.status(200).send({message: "Valid Credentials !"});
      } else {
        return res.status(401).send({message: "The credentials provided do not correspond to a registered user"});
      };
    });
  });
});
