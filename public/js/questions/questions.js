// clientside javascript for questions page (questions.html)

import { initializeModal } from '../questions/modal.js';


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


document.addEventListener('DOMContentLoaded', () => {
    const categoryCards = document.querySelectorAll('.card');

    categoryCards.forEach(card => {
        card.addEventListener('click', async () => {
            const category = card.classList[1]; // asumiendo que la clase category-X contiene la categoría

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
});
