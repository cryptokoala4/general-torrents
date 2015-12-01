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
  }).populate('submitter');
})

// CREATE
router.post('/api/torrents', authenticatedUser, function (req, res) {
  var params = req.body.torrent;
  // req.user // --> current user | refer to passport.js
  params.submitter = req.user

  Torrent.create(params, function (error, torrent){
    if (error) {
      res.json({message: "Torrent create failed" + error});
    } else {
      res.json({torrent: torrent});
    }
  })
})

// SHOW
router.get('/api/torrents/:id', function (req, res) {
  Torrent.findById({_id: req.params.id}, function (err, torrent) {
    if(err) {
      res.json({message: "Could not find Torrent" + err});
    } else {
      res.json({torrent: torrent});
    }
  });
})

// UPDATE
router.put('/api/torrents/:id', function (req, res) {
  Torrent.findByIdAndUpdate(req.params.id, req.body, function (err, torrent) {
    if(err) {
      res.json({message: "Could not find Torrent" + err});
      } else {
      res.json({message: 'Torrent successfully updated'});
    }
  });
})

// DELETE
router.delete('/api/torrents/:id', function (req, res) {
  Torrent.remove({_id: req.params.id}, function (err, torrent){
    if(err) {
      res.json({message: 'Could not delete Torrent '+ err});
    } else {
      res.json({message: 'Torrent successfully deleted'});
    }
  });
})
