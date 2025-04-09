const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
  longitude: Number,
  latitude: Number,
});

const MapSchema = new mongoose.Schema({
  points: [PointSchema],
});

module.exports = mongoose.model('Map', MapSchema);
