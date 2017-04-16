var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MusicSchema = new Schema({
  name: String,
  mp3: String,
  pic: String
});

module.exports = mongoose.model('Music', MusicSchema);