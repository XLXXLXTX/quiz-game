/* JS file to model the fields of the question collection in the database */

const mongoose = require('mongoose');

// create question model
const questionSchema = new mongoose.Schema({
	type: String,
	difficulty: String,
	category: String,
	question: String,
	correctAnswer: String,
	incorrectAnswer: [String],
	createdBy: String
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question