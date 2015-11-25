var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var bodyParser     = require('body-parser');

var Torrent = require("../../models/torrent");


module.exports = function (app) {
  app.use('/', router);
};

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  // Otherwise the request is always redirected to the home page
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(401).json({message: "Please Login"});
  }
}

router.get('/jacky/create_seed', authenticatedUser, function (req, res, next) {
  var user_id = req.user._id;

  var torrent1 = new Torrent({
    category:   "Video",
    upload_torrent: "hello.torrent",
    name: "Mr. Robot",
    submitter: user_id,
    details: "Elliot Alderson is a young cyber-security engineer living in New York, who assumes the role of a vigilante hacker by night. Elliot meets a mysterious anarchist known as 'Mr. Robot' who recruits Elliot to join his team of hackers, 'fsociety'. Elliot, who has a social anxiety disorder and connects to people by hacking them, is intrigued but uncertain if he wants to be part of the group. The show follows Mr. Robot's attempts to engage Elliot in his mission to destroy the corporation Elliot is paid to protect. Compelled by his personal beliefs, Elliot struggles to resist the chance to take down the multinational CEOs that are running (and ruining) the world.",
    date: new Date()
  });

  torrent1.save(function(err) {
    if (err) console.log(err);
    console.log('Torrent created!');
  });

  var torrent2 = new Torrent({
    category:   "App",
    upload_torrent: "hello.torrent",
    name: "Mr. Robot",
    submitter: user_id,
    details: "Elliot Alderson is a young cyber-security engineer living in New York, who assumes the role of a vigilante hacker by night. Elliot meets a mysterious anarchist known as 'Mr. Robot' who recruits Elliot to join his team of hackers, 'fsociety'. Elliot, who has a social anxiety disorder and connects to people by hacking them, is intrigued but uncertain if he wants to be part of the group. The show follows Mr. Robot's attempts to engage Elliot in his mission to destroy the corporation Elliot is paid to protect. Compelled by his personal beliefs, Elliot struggles to resist the chance to take down the multinational CEOs that are running (and ruining) the world.",
    date: new Date()
  });

  torrent2.save(function(err) {
    if (err) console.log(err);
    console.log('Torrent created!');
  });

  var torrent3 = new Torrent({
    category:   "Music",
    upload_torrent: "hello.torrent",
    name: "Mr. Robot",
    submitter: user_id,
    details: "Elliot Alderson is a young cyber-security engineer living in New York, who assumes the role of a vigilante hacker by night. Elliot meets a mysterious anarchist known as 'Mr. Robot' who recruits Elliot to join his team of hackers, 'fsociety'. Elliot, who has a social anxiety disorder and connects to people by hacking them, is intrigued but uncertain if he wants to be part of the group. The show follows Mr. Robot's attempts to engage Elliot in his mission to destroy the corporation Elliot is paid to protect. Compelled by his personal beliefs, Elliot struggles to resist the chance to take down the multinational CEOs that are running (and ruining) the world.",
    date: new Date()
  });

  torrent3.save(function(err) {
    if (err) console.log(err);
    console.log('Torrent created!');
  });

  var torrent4 = new Torrent({
    category:   "Book",
    upload_torrent: "hello.torrent",
    name: "Mr. Robot",
    submitter: user_id,
    details: "Elliot Alderson is a young cyber-security engineer living in New York, who assumes the role of a vigilante hacker by night. Elliot meets a mysterious anarchist known as 'Mr. Robot' who recruits Elliot to join his team of hackers, 'fsociety'. Elliot, who has a social anxiety disorder and connects to people by hacking them, is intrigued but uncertain if he wants to be part of the group. The show follows Mr. Robot's attempts to engage Elliot in his mission to destroy the corporation Elliot is paid to protect. Compelled by his personal beliefs, Elliot struggles to resist the chance to take down the multinational CEOs that are running (and ruining) the world.",
    date: new Date()
  });

  torrent4.save(function(err) {
    if (err) console.log(err);
    console.log('Torrent created!');
  });

  var torrent5 = new Torrent({
    category:   "Other",
    upload_torrent: "hello.torrent",
    name: "Mr. Robot",
    submitter: user_id,
    details: "Elliot Alderson is a young cyber-security engineer living in New York, who assumes the role of a vigilante hacker by night. Elliot meets a mysterious anarchist known as 'Mr. Robot' who recruits Elliot to join his team of hackers, 'fsociety'. Elliot, who has a social anxiety disorder and connects to people by hacking them, is intrigued but uncertain if he wants to be part of the group. The show follows Mr. Robot's attempts to engage Elliot in his mission to destroy the corporation Elliot is paid to protect. Compelled by his personal beliefs, Elliot struggles to resist the chance to take down the multinational CEOs that are running (and ruining) the world.",
    date: new Date()
  });

  torrent5.save(function(err) {
    if (err) console.log(err);
    console.log('Torrent created!');
  });

  res.redirect('/');
});