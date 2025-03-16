const mongoose = require('mongoose');

const fieldSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  points: [{
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true }
  }],
  area: { type: Number, required: true },
  perimeter: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Field = mongoose.model('Field', fieldSchema);

module.exports = Field;
