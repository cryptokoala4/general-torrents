var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TorrentSchema = new Schema({
  category:           { type: String },
  upload_torrent:     { type: String },
  name:               { type: String },
  submitter:          { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  details:            { type: String },
  date:               { type: Date, default: Date.now }
});

var Torrent = mongoose.model('Torrent', TorrentSchema);

module.exports = Torrent;
