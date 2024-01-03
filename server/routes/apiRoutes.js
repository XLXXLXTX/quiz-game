const express = require('express');

const userController = require('../controllers/userController');
const scoreController = require('../controllers/scoreController');
const questionController = require('../controllers/questionController');

const auth = require('../middleware/auth');

const router = express.Router();

// routes for API: check DB content without using web browser interface
router.get('/users', userController.getAllUsers);
router.get('/scores', scoreController.getAllScores)
router.get('/questionsdb', questionController.getAllQuestions)

router.post('/decode-token', auth.decodeToken);

const path = require('path');

const showColorPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/color-palette.html'))
};

router.get('/colors', showColorPage);

// --------------------------------------------------

module.exports = router;
