const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  radius: {
    type: Number,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true
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
});

module.exports = Project = mongoose.model('projects', ProjectSchema);