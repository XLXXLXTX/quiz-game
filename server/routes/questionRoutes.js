const express = require('express');

const questionController = require('../controllers/questionController');

const router = express.Router();

// routes for questions: DB content and trivia API
router.get('/trivia/:category', questionController.getQuestionsByCategory);

// maybe to delete idk yet
//router.get('/questionsdb/:category', questionController.getQuestionsDbByCategory);

// all questions are retrieved from DB, no matter the category
router.get('/questionsdb', questionController.getAllQuestions);

module.exports = router;