/* define routes to call controllers */

const express = require('express');
const isAuthenticated = require('../middleware/auth')
const userController = require('../controllers/userController');

const { showLoginPage, showSignUpPage } = require('../controllers/userController');

const router = express.Router();

// route to retrieve all user from DB 
router.get('/users', isAuthenticated, userController.getAllUsers);

// routes for user login
router.get('/login', showLoginPage);
router.post('/login', userController.logIn);

// routes for signup
router.get('/signup', showSignUpPage);
router.post('/signup', userController.signUp);




module.exports = router;
