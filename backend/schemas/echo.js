const mongoose = require('mongoose');

const { Schema } = mongoose;
const echoSchema = new Schema({
  msg: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Echo', echoSchema);
