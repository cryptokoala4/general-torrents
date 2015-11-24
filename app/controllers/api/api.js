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
    return res.json({message: "Please Login"});
  }
}

router.get('/secret', authenticatedUser, function (req, res, next) {
  res.json({message: "secret"});
});

// INDEX
router.get('/api/torrents', function (req, res) {
  Torrent.find({}, function (err, torrents) {
    if (err) {
      res.send("There was an error with your GET request " + err)
    } else {
      res.send(torrents);
    }
  })
})

// CREATE
router.post('/api/torrents', function (req,res) {
  var torrent = new Torrent(req.body);
  torrent.save(function(error){
    if (error) {
      res.json({message: "Torrent create failed"});
    } else {
      res.json({torrent: torrent});
    }
  });
})

