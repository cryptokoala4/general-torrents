var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var User     = require('../models/user');
var passport = require('passport');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/signup', function (req, res, next) {
  res.render('auth/signup.ejs', { message: req.flash('signupMessage') });
});

// SIGN-UP: Create a new User
router.post('/signup', function (req, res, next) {
  passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true })(req, res, next);
});

router.get('/signin', function (req, res, next) {
  res.render('auth/signin.ejs', { message: req.flash('signinMessage') });
});

// SIGN-IN: Authenticate the user
router.post("/signin", function (req, res, next) {
  passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true })(req, res, next);
});

router.get("/signout", function (req, res, next){
  req.logout();
  res.redirect("/");
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email'} ));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/'
}));
