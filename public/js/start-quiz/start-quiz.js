
// define variables for html elements
const startBtn = document.getElementById('start-quiz-btn');
//const nextBtn = document.getElementById('next-question-btn');

const quizOptions = document.getElementById('quiz-options');
const questionContainer = document.getElementById('question-container');

const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');

//define variables for the quiz options to read the values
const category = document.getElementById('category');
const difficulty = document.getElementById('difficulty');
const type = document.getElementById('type');

const resultsContainer = document.getElementById('results-container');
const resultsText = document.getElementById('results-text');
const playAgainBtn = document.getElementById('play-again-btn');

// define variables for quiz questions 

let questions = [];
/*
let questions = [
	{
		question: 'An exothermic reaction is a chemical reaction that releases energy by radiating electricity.',
		answers: ['False', 'True'],
		correctAnswer: 'False'
	},
	{
		question: 'Celiac Disease is a disease that effects the heart, causing those effected to be unable to eat meat.',
		answers: ['True', 'False'],
		correctAnswer: 'False'
	},
	{
		question: 'An atom contains a nucleus.',
		answers: ['False', 'True'],
		correctAnswer: 'True'
	},
	{
		question: 'Not including false teeth; A human has two sets of teeth in their lifetime.',
		answers: ['False', 'True'],
		correctAnswer: 'True'
	},
	{
		question: 'An Astronomical Unit is the distance between Earth and the Moon.',
		answers: ['True', 'False'],
		correctAnswer: 'False'
	},
	{
		question: 'An average human can go two weeks without water.',
		answers: ['False', 'True'],
		correctAnswer: 'False'
	},
	{
		question: 'Water always boils at 100&deg;C, 212&deg;F, 373.15K, no matter where you are.',
		answers: ['True', 'False'],
		correctAnswer: 'False'
	},
	{
		question: 'Psychology is the science of behavior and mind.',
		answers: ['False', 'True'],
		correctAnswer: 'True'
	},
	{
		question: 'A plant that has a life cycle for more than a year is known as an annual.',
		answers: ['True', 'False'],
		correctAnswer: 'False'
	},
	{
		question: 'Igneous rocks are formed by excessive heat and pressure.',
		answers: ['False', 'True'],
		correctAnswer: 'False'
	}
];
*/

let selectedAnswers = [];

// and answers btns styles
const btnClasses = ['answer-1-btn', 'answer-2-btn', 'answer-3-btn', 'answer-4-btn'];

// define variable for current question index
let currentQuestionIndex = 0;

document.addEventListener('DOMContentLoaded', async () => {
	// when the page loads set the event listeners for btns of the quiz
	startBtn.addEventListener('click', startQuiz);
	playAgainBtn.addEventListener('click', resetQuiz);

	//nextBtn.addEventListener('click', nextQuestion);

	// populate the quiz options
	// get the categories from the API
	const c = await getCategories();
	console.log('c:', c)

	const categories = c.map(category => ({
		name: category.categoryName,
		value: category.categoryValue
	}));
	console.log('categories:', categories);
	//console.log('categories:', c);
	populateSelect('category', categories);

});

// when the start btn is clicked, execute the startQuiz function
async function startQuiz() {
	// hide the start btn
	startBtn.classList.add('hidden');
	// hide the div with the quiz options
	quizOptions.classList.add('hidden');
	// show the question container
	questionContainer.classList.remove('hidden');
	// show the first question

	// read the options from the html

	console.log('User selected category.value:', category.value);
	console.log('User selected difficulty.value:', difficulty.value);
	console.log('User selected type.value:', type.value);

	// call the function to fetch the questions from the API, with the options selected
	// @@@@ DESCOMENTAR ESTO @@@@
	await fetchQuestions(category.value, difficulty.value, type.value);

	showQuestion(currentQuestionIndex);
}


async function fetchQuestions(category, difficulty, type) {
	// fetch the questions from the API
	const data = { category, difficulty, type };
	let response = await axios.post('/api/create-quiz', data);

	if (!response.data) {
		alert('Error: Invalid token');
		throw new Error('Invalid token');
	}

	if (response.data.error) {
		alert('Try again with other category');
		resetQuiz();
		return
		//throw new Error(response.data.error);
	}

	//console.log('fetchQuestions -> response.data:', response.data);
	console.log('fetchQuestions -> response.data:', response.data);
	questions = response.data;

	//alert('Ya se obtuvieron las preguntas');

	//const { id } = response.data;
}

// the index is passed as an argument, to show the question with that index
function showQuestion(index) {
	const currentQuestion = questions[index];
	questionText.textContent = currentQuestion.question;

	answersContainer.innerHTML = '';
	let answerDiv;

	for (let i = 0; i < currentQuestion.answers.length; i++) {
		const button = document.createElement('button');
		button.textContent = currentQuestion.answers[i];
		button.classList.add(btnClasses[i]);

		// Verificar si esta respuesta está seleccionada
		if (selectedAnswers[index] === currentQuestion.answers[i]) {
			button.classList.add('selected');
		}

		button.addEventListener('click', () => selectAnswer(button));

		if (i % 2 === 0) {
			answerDiv = document.createElement('div');
			answerDiv.classList.add('question-answers');
		}

		answerDiv.appendChild(button);

		if (i % 2 === 1 || i === currentQuestion.answers.length - 1) {
			answersContainer.appendChild(answerDiv);
		}
	}
}

function selectAnswer(button) {
	// Remover la clase 'selected' de todos los botones
	document.querySelectorAll('.question-answers button').forEach(btn => btn.classList.remove('selected'));

	// Agregar la clase 'selected' al botón seleccionado
	button.classList.add('selected');

	// Guardar la respuesta seleccionada en la matriz
	selectedAnswers[currentQuestionIndex] = button.textContent;

	// Esperar 2 segundos antes de pasar a la siguiente pregunta
	setTimeout(() => {
		// Actualizar el índice de la pregunta actual
		currentQuestionIndex++;

		// Verificar si hay más preguntas
		if (currentQuestionIndex < questions.length) {
			showQuestion(currentQuestionIndex);
		} else {

			//ate the end of the quiz, hide the question container
			questionContainer.classList.add('hidden');


			// at the end of the quiz, show the results

			calculateResults();

			// Mostrar un mensaje con las respuestas al final del cuestionario
			//alert('Quiz complete! Your answers: ' + JSON.stringify(selectedAnswers));
			//resetQuiz();
		}
	}, 1200); // Esperar 2000 milisegundos (2 segundos)
}

/*
function nextQuestion() {
	// Obtener las respuestas seleccionadas de los botones
	const selectedButton = document.querySelector('.question-answers button.selected');
	const selectedAnswer = selectedButton ? selectedButton.textContent : null;

	// Guardar la respuesta seleccionada en la matriz
	selectedAnswers[currentQuestionIndex] = selectedAnswer;

	// Actualizar el índice de la pregunta actual
	currentQuestionIndex++;

	// Verificar si hay más preguntas
	if (currentQuestionIndex < questions.length) {
		showQuestion(currentQuestionIndex);
	} else {
		// Mostrar un mensaje con las respuestas al final del cuestionario
		alert('Quiz complete! Your answers: ' + JSON.stringify(selectedAnswers));
		resetQuiz();
	}
}
*/

async function calculateResults() {
	console.log('calculateResults()');
	console.log('selectedAnswers:', selectedAnswers);
	// check if the answer is correct
	// if it is correct, add 1 to the score
	// if it is not correct, add 0 to the score
	let correctAnswers = 0;
	for (let i = 0; i < questions.length; i++) {
		//console.log(`selectedAnswers[${i}] === questions[${i}].correctAnswer -> ${selectedAnswers[i]} === ${questions[i].correctAnswer}`);
		if (selectedAnswers[i] === questions[i].correctAnswer) {
			correctAnswers++;
			console.log('Correcta pregunta ' + i);
		}
	}

	// if the difficulty is easy, multiply the score by 1
	// if the difficulty is medium, multiply the score by 3
	// if the difficulty is hard, multiply the score by 5
	const difficultyMultiplier = { 'easy': 1, 'medium': 3, 'hard': 5 };

	console.log('correctAnswers despues de calcular resultados:', correctAnswers);
	console.log('difficulty.value:', difficulty.value);

	const score = correctAnswers * difficultyMultiplier[difficulty.value];

	console.log('score final:', score);
	// show the score

	resultsText.innerHTML = `Your score is <p><span class="score">${score}</span></p>`;

	// show the results container
	resultsContainer.classList.remove('hidden');

	// send the score to the server
	await sendScore(score, correctAnswers, difficulty.value);

}

async function sendScore(totalscore, correctAnswers, difficulty){

	// firts, get the token from the cookie
	const token = getCookie('token');

	let response = await axios.post('/api/decode-token', { token });

	if (!response.data) {
		alert('Error: Invalid token');
		throw new Error('Invalid token');
	}

	const { id, username } = response.data;

	let data = { username};

	// if the difficulty is easy, add the score to correctEasy
	// if the difficulty is medium, add the score to correctMedium
	// if the difficulty is hard, add the score to correctHard
	switch(difficulty){
		case 'easy':
			data.correctEasy = correctAnswers;
			data.correctMedium = 0;
			data.correctHard = 0;
			break;
		case 'medium':
			data.correctEasy = 0;
			data.correctMedium = correctAnswers;
			data.correctHard = 0;
			break;
		case 'hard':
			data.correctEasy = 0;
			data.correctMedium = 0;
			data.correctHard = correctAnswers;
			break;
	}
	
	data.total = totalscore;

	//send the score to the server
	response = await axios.post('/scoreboard/updatescore', data);

	if (!response.data) {
		alert('Error: Invalid token');
		//throw new Error('Invalid token');
	}

	if (response.data.error) {
		alert('Error: /api/updatescore');
		//throw new Error(response.data.error);
	}

}


function resetQuiz() {

	// hide the results container
	resultsContainer.classList.add('hidden');

	// reset the selected answers
	selectedAnswers = [];


	// when the quiz is complete, reset the quiz
	currentQuestionIndex = 0;
	// show the options div and the start btn
	startBtn.classList.remove('hidden');
	quizOptions.classList.remove('hidden');
	// hide the question container
	questionContainer.classList.add('hidden');
}

/*
const questions = [
	{
		question: 'What is the capital of France?',
		answers: ['Berlin', 'Madrid', 'Paris', 'Rome'],
		correctAnswer: 'Paris'
	},
	{
		question: 'Which planet is known as the Red Planet?',
		answers: ['Mars', 'Venus', 'Jupiter', 'Saturn'],
		correctAnswer: 'Mars'
	},
	{
		question: 'Es hoy el cumpleaños de mi hermana?',
		answers: ['Si', 'No'],
		correctAnswer: 'No'
	}
	// Add more questions as needed
];
*/


/*-----------------------------------------------------*/
/*-----------------  FUNCTIONS  -----------------------*/
/*-----------------  REPETIDAS  -----------------------*/
/*-----------------------------------------------------*/

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}

async function getCategories() {
	const response = await axios.get('/questions/categories');

	//console.log('response:', response);

	if (!response.data) {
		alert('Error: /questions/categories');
		throw new Error('Error: /questions/categories');
	}

	const categories = response.data
	console.log('getCategories -> categories:', categories);
	return categories;
}


function populateSelect(elementId, data) {
	const selectElement = document.getElementById(elementId);

	// Limpiar el select antes de agregar nuevas opciones
	selectElement.innerHTML = '';

	// Agregar una opción predeterminada
	//const defaultOption = document.createElement('option');
	//defaultOption.value = '';
	//defaultOption.text = 'Choose a Category';
	//selectElement.appendChild(defaultOption);

	// Agregar las opciones de la API
	for (const category of data) {
		const option = document.createElement('option');
		option.value = category.value;
		option.text = category.name;
		selectElement.appendChild(option);
	}
}


