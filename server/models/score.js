const mongoose = require('mongoose');
const { Int32 } = require('mongodb');


// create score model
const scoreSchema = new mongoose.Schema({
  username: String,
  correctEasy: Number,
  correctMedium: Number,
  correctHard: Number,
  total: Number
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score