/* JS file with the routes that can retrieve data from the database or send data to the client */

const express = require('express');

const path = require('path');

const userController = require('../controllers/userController');
const scoreController = require('../controllers/scoreController');
const questionController = require('../controllers/questionController');

const auth = require('../middleware/auth');

const router = express.Router();

// routes for API: check DB content without using web browser interface
router.get('/users', userController.getAllUsers);
router.get('/scores', scoreController.getAllScores)
router.get('/questionsdb', questionController.getAllQuestions)

// route to get questions from Trivia API
router.post('/create-quiz', questionController.createQuiz);

// route to decode a JWT token and get the user info
// usefull for other routes that need to check the user info
router.post('/decode-token', auth.decodeToken);

const showColorPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/color-palette.html'))
};

router.get('/colors', showColorPage);

// --------------------------------------------------

module.exports = router;
