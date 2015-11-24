var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TorrentSchema = new Schema({
  image:              { type: String },
  name:               { type: String },
  category:           { type: String },
  description:        { type: String },
  upload_torrent:     { type: String },
  date:               { type: Date, default: Date.now }
});

var Torrent = mongoose.model('Torrent', TorrentSchema);

module.exports = Torrent;

// var torrent1 = new Torrent({
//   image: "http://www.gstatic.com/tv/thumb/tvbanners/11682476/p11682476_b_v7_aa.jpg",
//   name: "Mr. Robot",
//   category:   "Video",
//   description: "Mr. Robot is an awesome show that really inspires you to start hacking your friends! The actual hacking in Mr. Robot makes a lot of sense from a coder's perspective, none of that Hollywood hacking hogwash. Strongly recommended for WDI students.",
//   upload_torrent: "hello.torrent",
//   upload_date: new Date()
// });

// torrent1.save(function(err) {
//   if (err) console.log(err);
//   console.log('Torrent created!');
// });