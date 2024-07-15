const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  isOccupied: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Slot', slotSchema);
