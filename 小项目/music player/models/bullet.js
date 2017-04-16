var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var BulletSchema = new Schema({
  referrer: {
    type: ObjectId,
    ref: 'Music'
  },
  content: String,
  timestamp: String,
  meta: {
    createTime: {
      type: Date,
      default: Date.now()
    }
  }
});

module.exports = mongoose.model('Bullet', BulletSchema);