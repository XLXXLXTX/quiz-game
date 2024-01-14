/* JS file with the routes that can be accessed from the home page */ 

const express = require('express');

const userController = require('../controllers/userController');

const { showHomePage, showStartQuizGamePage, showAboutPage,
	showLoginPage, showSignUpPage, showProfilePage } = require('../controllers/homeController');

const { showQuestionsPage } = require('../controllers/questionController');
const { showScoreboardPage } = require('../controllers/scoreController');
const { isAuthenticated } = require('../middleware/auth')

const router = express.Router();

// routes for home page 
router.get('/', showHomePage);

router.get('/start-quiz', isAuthenticated, showStartQuizGamePage);
router.get('/questions', showQuestionsPage);
router.get('/scoreboard', showScoreboardPage);
router.get('/about', showAboutPage);

// routes for user profile
router.get('/profile', isAuthenticated, showProfilePage);
router.post('/profile-info', isAuthenticated, userController.getUserInfo);

// routes for user login
router.get('/login', showLoginPage);
router.post('/login', userController.logIn);

// routes for signup
router.get('/signup', showSignUpPage);
router.post('/signup', userController.signUp);

// routes for user logout
//...




module.exports = router;
