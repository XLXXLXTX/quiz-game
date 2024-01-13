const path = require('path');

const Question = require('../models/question');
const Category = require('../models/category');
const { createUrlApi, resetTokenTriviaApi } = require('../utils/urlApiUtils');
const { stringify } = require('querystring');
const { create } = require('../models/user');


const createQuiz = async (req, res) => {
	console.log('createQuiz()');

	//const { token } = req.body;

	let { category, difficulty, type } = req.body;
	let options = {};

	const conditions = [
		{ condition: category != -1, key: 'category' },
		{ condition: difficulty !== '', key: 'difficulty' },
		{ condition: type !== '', key: 'type' }
	];
	
	conditions.forEach(({ condition, key }) => {
		if (condition) {
			options[key] = req.body[key];
		}
	});

	options.amount = 10;

	//console.log('req.body:', req.body);

	const url = await createUrlApi(options, false);
	console.log('createQuiz ->url:', url);

	let response = await fetch(url);

	if (!response.ok) {
		//throw new Error(`HTTP error! Status: ${response.status}\n${response}`);
		console.log(`HTTP error! Status: ${response.status}\n${response}`);
		return {}
	}

	let data = await response.json();

	if (data.response_code !== 0) {
		//throw new Error(`API error! Response code: ${data.response_code}\n${data}`);
		console.log(`API error! Response code: ${data.response_code}\n${data}`);
	}

	let questionsRaw = data.results;

	const questions = questionsRaw.map(question => {
		return {
			question: question.question,
			answers: [question.correct_answer, ...question.incorrect_answers].sort(() => Math.random() - 0.5),
			correctAnswer: question.correct_answer,
		}
	});

	console.log('createQuiz -> questions:', questions);

	if(questions.length === 0){
		return res.json({error: 'No questions found'});
	}

	return res.json(questions);
}



const getCategories = async (req, res) => {
	try {

		// retrieve categories from DB, only categoryName and categoryValue
		// to fill selects/cards 
		const categories = await Category.find({}, {categoryName: 1, categoryValue: 1, _id: 0});

		res.json(categories);

	} catch (error) {
		console.log('ERROR: Error in getAllQuestions():', error);
		res.status(500).json({ error: 'Error while retrieving questions' });
	}
}


const addQuestion = async (req, res) => {
	console.log('addQuestion()');
	try{

		const { type, difficulty, category, question,
			 correctAnswer, incorrectAnswers, username } = req.body;

		let lccorrectAnswer = correctAnswer.toLowerCase();
		let lcincorrectAnswers = incorrectAnswers.map(incorrectAnswer => incorrectAnswer.toLowerCase());
		
		const newQuestion = new Question({type, difficulty, category, question, 'correctAnswer' : lccorrectAnswer, 'incorrectAnswer': lcincorrectAnswers, 'createdBy': username});

		console.log('newQuestion:', newQuestion);
			
		if (await newQuestion.save()) {
			console.log('Question added successfully');
			res.json({ success: 'Question added successfully' });

		} else {
			console.log('Error while adding question');
			res.json({ error: 'Error while adding question' });

		}

		//const newUser = new User({ "username": username, "password": hashedPassword });
		//await newUser.save();



	} catch (error) {
		console.log('ERROR: Error in addQuestion():', error);
		res.status(500).json({ error: 'Error while adding question' });
	}

};




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
	const url = await createUrlApi({ amount: 10, category: req.params.category }, true); //, type: 'multiple', difficulty: 'easy' });
	console.log('getQuestionsByCategory() ->url:', url);

	let response = await fetch(url);

	if (!response.ok) {
		//throw new Error(`HTTP error! Status: ${response.status}\n${response}`);
		console.log(`HTTP error! Status: ${response.status}\n${response}`);
		return {}
	}

	let data = await response.json();

	// if response_code is not 0, there is an error with the trivia
	// API, so throw an error
	// response_code = 0 OK
	// response_code = 3 TOKEN EXPIRED
	if (data.response_code !== 0) {
		//throw new Error(`API error! Response code: ${data.response_code}\n${data}`);
		console.log(`API error! Response code: ${data.response_code}\n${data}`);
	}

	// if (data.response_code === 3) {
	// 	//console.log(`API error! Response code: ${data.response_code}\n${data}`);
	// 	console.log('Triying to reset token...');
	// 	let tmp = await resetTokenTriviaApi();
	// 	console.log('end call resetTokenTriviaApi()');
	// 	response = await fetch(url);

	// 	if (!response.ok) {
	// 		const responsejson = await response.json();
	// 		console.log('response\n' + responsejson)

	// 		throw new Error(`HTTP error! Status: ${response.status}\n${response}`);
	// 	}
	// 	data = await response.json();
	// }

	let questionsRaw = data.results;
	//console.log('questionsRaw:', questionsRaw);
	const questions = questionsRaw.map(question => {
		return {
			type: question.type,
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
	getQuestionsByCategory,
	addQuestion,
	getCategories,
	createQuiz
};
