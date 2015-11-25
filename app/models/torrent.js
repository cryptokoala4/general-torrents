var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TorrentSchema = new Schema({
  category:           { type: String },
  name:               { type: String },
  submitter:          { type: String },
  details:            { type: String },
  date:               { type: Date, default: Date.now },
  upload_torrent:     { type: String }
});

var Torrent = mongoose.model('Torrent', TorrentSchema);

module.exports = Torrent;

// var torrent1 = new Torrent({
//   name: "Mr. Robot",
//   submitter: "Anonymouse",
//   category:   "Video",
//   details: "Mr. Robot is an awesome show that really inspires you to start hacking your friends! The actual hacking in Mr. Robot makes a lot of sense from a coder's perspective, none of that Hollywood hacking hogwash. Strongly recommended for WDI students.",
//   upload_torrent: "hello.torrent",
//   upload_date: new Date()
// });

// torrent1.save(function(err) {
//   if (err) console.log(err);
//   console.log('Torrent created!');
// });