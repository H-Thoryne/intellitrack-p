const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  asset: {
    type: Schema.Types.ObjectId,
    ref: 'assets'
  },
  coords: {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  readAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Location = mongoose.model('locations', LocationSchema);
