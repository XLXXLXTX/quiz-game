/* JS file to model the fields of the score collection in the database */

const mongoose = require('mongoose');

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