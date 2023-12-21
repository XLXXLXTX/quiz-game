const mongoose = require('mongoose');

// create question model
const questionSchema = new mongoose.Schema({
    type: String,
    difficulty: String,
    question: String,
    category: String,
    correctAnswer: String,
    incorrectAnswer: [String]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question