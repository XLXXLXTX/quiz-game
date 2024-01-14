/* JS file with functions for the profile page */

async function getProfileInfo() {

	const token = getCookie('token');

	if (!token) {
		alert('Error: Invalid token');
		throw new Error('Invalid token');
	}

	try {

		let response = await axios.post('/api/decode-token', { token });

		if (!response.data) {
			alert('Error: Invalid token');
			throw new Error('Invalid token');
		}

		const { id } = response.data;

		response = await axios.post('/profile-info', { id })

		//console.log('response2: ', response);

		if (!response.data) {
			alert('Error: /profile-info');
			throw new Error('Error: /profile-info');
		}

		const { username, score, questions } = response.data;

		const userUsername = document.getElementById('user-username');
		userUsername.innerHTML = username;

		//const { correctEasy = 0, correctMedium = 0, correctHard = 0, total = 0 } = score;

		let correctEasy = 0;
		let correctMedium = 0;
		let correctHard = 0;
		let total = 0;

		// in case that the user has not played yet the game
		// so the score is null, we need to set the values to 0 for now
		if (score !== null && typeof score === 'object') {
			correctEasy = score.correctEasy;
			correctMedium = score.correctMedium;
			correctHard = score.correctHard;
			total = score.total;
		}

		const statsCorrectAnswers = document.getElementById('stats-correct-answers');
		statsCorrectAnswers.innerHTML = correctEasy + correctMedium + correctHard;

		const statsCorrectEasy = document.getElementById('stats-correct-easy');
		statsCorrectEasy.innerHTML = correctEasy;

		const statsCorrectMedium = document.getElementById('stats-correct-medium');
		statsCorrectMedium.innerHTML = correctMedium;

		const statsCorrectHard = document.getElementById('stats-correct-hard');
		statsCorrectHard.innerHTML = correctHard;

		const statsTotalPoints = document.getElementById('stats-total-points');
		statsTotalPoints.innerHTML = total;

		const tableQuestions = document.getElementById('table-questions');

		questions.forEach(question => {
			const { category, difficulty, question: questionText, correctAnswer } = question;

			const tr = document.createElement('tr');

			const tdCategory = document.createElement('td');
			tdCategory.innerHTML = category;

			const tdDifficulty = document.createElement('td');
			tdDifficulty.innerHTML = difficulty;

			const tdQuestion = document.createElement('td');
			tdQuestion.innerHTML = questionText;

			const tdAnswer = document.createElement('td');
			tdAnswer.innerHTML = correctAnswer;

			tr.appendChild(tdCategory);
			tr.appendChild(tdDifficulty);
			tr.appendChild(tdQuestion);
			tr.appendChild(tdAnswer);

			tableQuestions.appendChild(tr);
		});

	} catch (error) {
		console.error('Error', error);
	}

}

document.addEventListener('DOMContentLoaded', () => {

	//laod user info 
	getProfileInfo();

});