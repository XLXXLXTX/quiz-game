const path = require('path');

const Question = require('../models/question');
const { createUrlApi } = require('../utils/urlApiUtils');

// Get all questions from DB
// to use in question modal for 'any-category' (question code = -1)
const getAllQuestions = async (req, res) => {

	try {

		// by default, retrieve 10 questions
		const numQuestions = req.query.numQuestions || 10;

		// in the meantime, retrieve questions from DB but limit it to 10
		// because problems with modal/table in questions.html
		const questions = await Question.find().limit(parseInt(numQuestions));

		res.json(questions);

	} catch (error) {
		console.log('ERROR: Error in getAllQuestions():', error);
		res.status(500).json({ error: 'Error while retrieving questions' });
	}
};

// Get questions from DB by category
// maybe to delete idk yet
const getQuestionsDbByCategory = async (req, res) => {

	try {

		// by default, retrieve 10 questions
		const numQuestions = req.query.numQuestions || 10;

		// retrieve questions from DB
		const questions = await Question.find({ "category": req.params.category })
			.limit(parseInt(numQuestions));

		res.json(questions);

	} catch (error) {
		console.log('ERROR: Error in getQuestionsByCategory():', error);
		res.status(500).json({ error: 'Error while retrieving questions' });
	}
}

// Get questions from Trivia API by category
const getQuestionsByCategory = async (req, res) => {
	// deal with REQUESTS to the trivia API

	// category is the only thing that is recived from questions.html
	// when clicking a card, the others are set by default HERE
	const url = await createUrlApi({ amount: 10, category: req.params.category }); //, type: 'multiple', difficulty: 'easy' });
	console.log('url:', url);

	let response = await fetch(url);

	if (!response.ok) {
		throw new Error(`HTTP error! Status: ${response.status}\n${response}`);
	}

	let questions = await response.json();

	questions = questions.results.map(question => {
		return {
			category: question.category,
			difficulty: question.difficulty,
			question: question.question,
			correctAnswer: question.correct_answer,
			incorrectAnswers: question.incorrect_answers
		}
	});

	return res.json(questions);

}

// Show questions entry page
const showQuestionsPage = (req, res) => {
	res.sendFile(path.join(__dirname, '../views/questions.html'))
};

module.exports = {
	getAllQuestions,
	showQuestionsPage,
	getQuestionsDbByCategory,
	getQuestionsByCategory
};
