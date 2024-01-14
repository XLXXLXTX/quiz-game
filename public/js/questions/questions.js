/* JS file with functions for the questions page */

import { initializeModal } from '../utils/modal.js';


// eligible categories
const categoriesReqAPI = {
	'category-any': -1, // special case: return questions from DB created by any user 
	'category-general': 9,
	'category-art': 25,
	'category-celebrities': 26,
	'category-books': 10,
	'category-film': 11,
	'category-music': 12,
	'category-theatres': 13,
	'category-television': 14,
	'category-comics': 29,
	'category-games': 15,
	'category-board-games': 16,
	'category-anime': 31,
	'category-animations': 32,
	'category-nature': 17,
	'category-computers': 18,
	'category-gadgets': 30,
	'category-mathematics': 19,
	'category-history': 23,
	'category-politics': 24,
	'category-geography': 22,
	'category-mythology': 20,
	'category-sports': 21,
	'category-animals': 27,
	'category-vehicles': 28,
};


async function getCategories(){
	const response = await axios.get('/questions/categories');

	console.log('response:', response);
	
	if (!response.data) {
		alert('Error: /questions/categories');
		throw new Error('Error: /questions/categories');
	}
	
	const categories = response.data

	return categories;
}

async function displayAddQuestionButton(){
	// Get the encoded token from the cookie
	const token = getCookie('token');

	if (token) {
		try {
			// Make a request to the backend to decode the token
			const response = await axios.post('/api/decode-token', { token });

			if (!response.data) {
				alert('Error: Invalid token');
				throw new Error('Invalid token');
			}

			const addQuestionBtn = document.getElementById('add-question-btn');
			addQuestionBtn.classList.remove('add-question-btn-hide');
			addQuestionBtn.classList.add('add-question-btn-show');

		} catch (error) {
			console.error('Error decoding token:', error);
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	
	displayAddQuestionButton();

	
	const categoryCards = document.querySelectorAll('.card');

	categoryCards.forEach(card => {
		card.addEventListener('click', async () => {
			const category = card.classList[1]; 

			//console.log(`You clicked on ${category}`);
			//console.log(` ${category} is ${categoriesReqAPI[category]}`)

			try {

				// needs to be refactored so bad xd 

				let questionsFormatted = '';

				console.log('categoriesReqAPI[category]:', categoriesReqAPI[category]);

				if (categoriesReqAPI[category] === -1) {

					//call the DB to retrieve all questions

					const response = await fetch('questions/questionsdb')

					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}

					const questions = await response.json();

					questionsFormatted += `
                    <table>
                        <tr>
                            <th>Category</th>
                            <th>Difficulty</th>
                            <th>Question</th>
                            <th>Correct Answer</th>
                        </tr>
                    
                    `
					questions.forEach(question => {
						questionsFormatted += `
                        <tr>
                            <td>${question.category}</td>
                            <td>${question.difficulty}</td>
                            <td>${question.question}</td>
                            <td>${question.correctAnswer}</td>
                        </tr>
                        `
					});

					questionsFormatted += `</table>`

					let tmpDiv = document.createElement('div');
					//tmpDiv.classList.add('table-questions-users');
					tmpDiv.innerHTML = questionsFormatted;
					questionsFormatted = tmpDiv.outerHTML;

				} else {

					//call the Trivia API to retrieve questions from the selected category

					const response = await fetch('questions/trivia/' + categoriesReqAPI[category] + '')


					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}

					const questions = await response.json();

					questionsFormatted += `
                    <table>
                        <tr>
                            <th>Category</th>
                            <th>Difficulty</th>
                            <th>Question</th>
                            <th>Correct Answer</th>
                        </tr>
                    
                    `

					questions.forEach(question => {
						questionsFormatted += `
                        <tr>
                            <td>${question.category}</td>
                            <td>${question.difficulty}</td>
                            <td>${question.question}</td>
                            <td>${question.correctAnswer}</td>
                        </tr>
                        `
					});

					questionsFormatted += `</table>`

					let tmpDiv = document.createElement('div');
					//tmpDiv.classList.add('table-questions-users');
					tmpDiv.innerHTML = questionsFormatted;
					questionsFormatted = tmpDiv.outerHTML;
				}

				initializeModal(card.outerText + ' Questions', questionsFormatted);


			} catch (error) {
				console.error(error);
			}

		});
	});

	const addQuestion = document.getElementById('add-question-btn');

	addQuestion.addEventListener('click', async () => {

		let tmp = `

		<div  class="add-question-options-container">

			<div class="add-question-container">
				<label class="add-question-label" for="question-category">Category:</label>
				<select class="add-question-select" id="question-category">
				<option value=''>Choose a category </option>
				</select>
			</div>

		</div>
		
		<div  class="add-question-options-container">
		
			<div class="add-question-container">
				<label class="add-question-label" for="question-difficulty">Difficulty:</label>
				<select class="add-question-select" id="question-difficulty">
				<option value=''>Choose a difficulty</option>
				</select>
			</div>
			
			<div class="add-question-container">
				<label class="add-question-label" for="question-type">Type:</label>
				<select class="add-question-select" id="question-type">
				<option value=''>Choose a Type</option>
				</select>
			</div>

		</div>

		<label class="add-question-label" for="question-text">Question:</label>
		<input class="add-question-input" type="text" id="question-text" required>

		<label class="add-question-label" for="question-correct-answer">Correct answer:</label>
		<input class="add-question-input" type="text" id="question-correct-answer" required> 

		<label class="add-question-label" for="question-incorrect-answer-1">Incorrect answer 1:</label>
		<input class="add-question-input" type="text" id="question-incorrect-answer-1" required>
		<label class="add-question-label" for="question-incorrect-answer-2">Incorrect answer 2:</label>
		<input class="add-question-input" type="text" id="question-incorrect-answer-2">
		<label class="add-question-label" for="question-incorrect-answer-3">Incorrect answer 3:</label>
		<input class="add-question-input" type="text" id="question-incorrect-answer-3">

		<button class="add-question-submit" onclick="submitNewQuestion()">Add Question</button>
		`;

		//open modal
		initializeModal('Add a new question!', tmp, '60%', '92%');

		const c = await getCategories();

		console.log('c:', c)

		const categories = c.map(category => ({
			name: category.categoryName,
			value: category.categoryValue
		}));
		const difficulties = [{ name: 'Easy', value: 'easy'}, {name: 'Medium', value:'medium'}, {name: 'Hard', value: 'hard'}];
		const types = [{name:'Multiple choice', value: 'multiple'}, {name:'True/False', value: 'boolean'}];

		populateSelect('question-category', categories);
		populateSelect('question-difficulty', difficulties);
		populateSelect('question-type', types);
	});
});

