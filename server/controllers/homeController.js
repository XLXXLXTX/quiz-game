const path = require('path');

// Show home page
const showHomePage = (req, res) => {
	res.sendFile(path.join(__dirname, '../views/index.html'));
};

// Show start quiz game page (user must be logged in to access this page)
const showStartQuizGamePage = (req, res) => {
	res.sendFile(path.join(__dirname, '../views/start-quiz.html'))
};

// Show about entry page
const showAboutPage = (req, res) => {
	res.sendFile(path.join(__dirname, '../views/about.html'))
};

// Show login entry page
const showLoginPage = (req, res) => {
	res.sendFile(path.join(__dirname, '../views/login.html'));
};

// Show signup entry page
const showSignUpPage = (req, res) => {
	res.sendFile(path.join(__dirname, '../views/signup.html'))
};

// Show profile entry page
const showProfilePage = (req, res) => {
	res.sendFile(path.join(__dirname, '../views/profile.html'))
};

// export this functions to call them from other files  
module.exports = {
	showHomePage, showStartQuizGamePage, showAboutPage,
	showLoginPage, showSignUpPage, showProfilePage
};