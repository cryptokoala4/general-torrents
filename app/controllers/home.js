var express   = require('express');
var mongoose  = require('mongoose');
var Torrent   = require('../models/torrent');
var multipart = require('connect-multiparty');
// https://www.npmjs.com/package/connect-multiparty
var S3FSclass = require('s3fs');
// https://www.npmjs.com/package/s3fs
var fs        = require('fs');
// https://github.com/klughammer/node-randomstring
var randomstring = require("randomstring");


var router    = express.Router();
var multipartMiddleware = multipart();
var S3FS = new S3FSclass('general-torrents', {
  accesKeyId:      process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

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

router.get('/', function (req, res, next) {
  res.render('index', {
  });
});

router.get('/torrents/upload', function (req, res, next) {
  res.render('upload', {
  });
});

router.get('/torrents/:id', function (req, res) {
  Torrent.findById(req.params.id, function (err, torrent){
    if (err){
      res.send(err)
    } else {
      res.render('show', { torrent: torrent })
   };
  });
})

router.post ('/torrents', authenticatedUser, multipartMiddleware, function (req, res) {
// router.post ('/torrents', multipartMiddleware, function (req, res) {

  var file = req.files.file;
  // { fieldName: 'file ',
  //   originalFilename: 'torrent-dl.png'
  //   path: '/tmp/w4sSL5WJskEPWoQwdxwA3vyn.png',
  //   headers: [Object],
  //   size: 23801,
  //   name: 'torrent-dl.png',
  //   type: 'image/png' }

  var stream = fs.createReadStream(file.path);

  var fileName = randomstring.generate({readable: true});
  fileName += '.torrent';

  S3FS.writeFile(fileName, stream).then(function(){
    // delete the file
    fs.unlink(file.path, function(err){
      if (err) console.log(err);

      var torrent = req.body.torrent;
      torrent.submitter = req.user._id;
      torrent.upload_torrent = fileName;

      Torrent.create(torrent, function (err, torrent) {
        if (err) {
          console.log("something wrong happened" + err);
        } else {
          res.redirect('/');
        }

      });
    });
  })
})


// app.post('/upload', , function(req, resp) {
//   console.log(req.body, req.files);
//   // don't forget to delete all req.files when done
// });
