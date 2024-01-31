/* JS file to do the logic of the routes related to the users and the authentication */

// lib to hash user's passwords to store them encrypted, increasing security
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Score = require('../models/score');
const Questions = require('../models/question');


/**
 * Function that receive a GET REQUEST and
 * returns all the users from the DB.
 */
const getAllUsers = async (req, res) => {

	try {

		// only retrieve username from DB, not password or id fields
		const users = await User.find({}, { "username": 1, "_id": 0 });
		res.json(users);

	} catch (error) {
		console.log('ERROR: Error in getAllUsers():', error);
		res.status(500).json({ error: 'Error while retrieving users' });
	}
};

/**
 * Function that receive a GET REQUEST and
 * returns one user from the DB given its id.
 */
const findById = async (req, res) => {

	try {

		const user = await User.findOne({ "_id": req.params.id })
		res.json(user);

	} catch (error) {
		console.log('ERROR: Error in findById():', error);
		res.status(500).json({ error: 'Error while retrieving user' });
	}
};

/**
 * Function that receive a POST REQUEST and
 * returns the user info from the DB given its id.
 * (used in the profile page)
 */
const getUserInfo = async (req, res) => {

	try {

		// retrieve user id from the token
		const { id } = req.body;

		// search in the DB for the user with that id
		const user = await User.findOne({ "_id": id })

		if (!user) {
			return res.status(401).json({ message: 'User not found: please try again.' })
		}

		const { username } = user;

		// search in the db the stadistics of the user performance answering questions
		// and the questions created by the user

		const score = await Score.findOne({ "username": username });
		const questions = await Questions.find({ "createdBy": username }).sort({ "category": 1 });

		// send user data to the client
		res.json({ username, score, questions });

	} catch (error) {
		console.log('ERROR: Error in getUserInfo():', error);
		res.status(500).json({ error: 'Error while retrieving user' });
	}

};

/**
 * Function that receive a POST REQUEST and
 * register a new user in the DB.
 * (used in the signup page)
 */
const signUp = async (req, res) => {

	// console.log("req.body")
	// console.log(req.body)
	// destructuring from the req.body into vars
	const { username, password } = req.body;

	try {

		// search username in DB to check if exists or not 
		const user = await User.findOne({ username });

		// if username exist, we can't permit that, username must be unique for each user
		if (user) {
			return res.status(401).json({ message: 'Username is in use: please try again.' });
		}

		// hash password before storing it
		const hashedPassword = await bcrypt.hash(password, 10);

		// if it's a new username, we are going to register it 
		const newUser = new User({ "username": username, "password": hashedPassword });
		await newUser.save();

		// Generate JWT token
		const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRATION,
		});

		console.log(`\t\tRegistered successfully: ${newUser.username} - ${password} - ${token}`)

		// create a cookie with token
		// and redirect to home page

		// if we delete { httpOnly: true } we can access to the cookie from the client side
		// as we save a cookie with an id, its not a problem to access to it from the client side
		// and we set another cookie to avoid making a request to the server to get the username
		// each time we want to show it in the navbar
		return res.cookie("token", token).redirect("/")

	} catch (error) {
		console.log('ERROR: Error in signUp():', error);
		res.json(500).json({ error: 'Internal error server' })
	}
};

/**
 * Function that receive a POST REQUEST and
 * log in an existing user in the DB.
 * (used in the login page)
 */
const logIn = async (req, res) => {

	// retrieve username and password from request's body
	const { username, password } = req.body;

	try {

		// try to find one exact registry to make sure log in it's correct
		const existingUser = await User.findOne({ "username": username })

		// if there isnt any coincidence, maybe typped wrong username or not registered
		if (!existingUser) {
			return res.status(401).json({ message: 'Username not found: please try again.' })
		}

		// verify passwords are the same
		const passwordMatch = await bcrypt.compare(password, existingUser.password);

		if (!passwordMatch) {
			return res.status(401).json({ message: 'Incorrect username or password: please try again.' })
		}

		// create jsw token 
		const token = await jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRATION,
		});

		// create a cookie with token
		// and redirect to home page

		// if we delete { httpOnly: true } we can access to the cookie from the client side
		// as we save a cookie with an id, its not a problem to access to it from the client side
		// and we set another cookie to avoid making a request to the server to get the username
		// each time we want to show it in the navbar
		return res.cookie("token", token).redirect("/")

	} catch (error) {
		console.log('ERROR: Error in logIn()', error);
		res.json(500).json({ error: 'Internal error server' })
	}

};

// export this functions to call them from other files  
module.exports = {
	getAllUsers,
	findById,
	getUserInfo,
	signUp,
	logIn
};


