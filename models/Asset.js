const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AssetSchema = new Schema({
  manufacturer: {
    type: String,
    default: "Ismeretlen"
  },
  model: {
    type: String,
    default: "Ismeretlen"
  },
  category: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
    default: "https://via.placeholder.com/150x150?text=N/A"
  },
  dateBuy: {
    type: Date,
    required: true
  },
  companyId: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    required: true
  }
});

module.exports = Asset = mongoose.model('assets', AssetSchema);
