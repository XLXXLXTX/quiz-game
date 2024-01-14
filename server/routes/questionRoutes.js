/* JS file with the routes that can be accessed from the questions page */

const express = require('express');

const questionController = require('../controllers/questionController');

const router = express.Router();

// routes for categories: DB content and trivia API
// used to populate the dropdown menus 
router.get('/categories', questionController.getCategories);

// routes for questions, to get the questions from the Trivia API
router.get('/trivia/:category', questionController.getQuestionsByCategory);

// maybe to delete idk yet
//router.get('/questionsdb/:category', questionController.getQuestionsDbByCategory);

// all questions are retrieved from DB, no matter the category
router.get('/questionsdb', questionController.getAllQuestions);

// route to addd a question to the DB as an user
router.post('/addquestion', questionController.addQuestion);

module.exports = router;