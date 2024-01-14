/* JS file to do the logic of the routes related to the scores and the scoreboard */

const path = require('path');

const Score = require('../models/score');

/**
 * Function that need to receive a POST REQUEST
 * with the following body:
 * {
 * 	"username": ... ,
 * 	"correctEasy": ...,
 * 	"correctMedium": ...,
 * 	"correctHard": ...,
 * 	"total": ...
 * }
 * with this parameters, the functions will update
 * or create a new score for the user in the database
 */
const updateScore = async (req, res) => {
	try {
		const { username, correctEasy, correctMedium, correctHard, total } = req.body;

		// find one score with that username 
		const userScore = await Score.findOne({ username });

		let score;

		if (userScore) {
			//console.log('username already exists' + userScore);
			userScore.correctEasy += correctEasy;
			userScore.correctMedium += correctMedium;
			userScore.correctHard += correctHard;
			userScore.total += total;

			score = userScore;
		} else {
			//console.log('username does not exist');
			score = new Score({ username, correctEasy, correctMedium, correctHard, total });
		}

		// save that updated/new score
		await score.save();

		res.json({ message: 'Score updated successfully' });

	} catch (error) {
		console.log('ERROR: Error in updateScore():', error);
		res.status(500).json({ error: 'Error while saving score' });
	}
};

/**
 * Function that receive a GET REQUEST and
 * returns all the scores from the DB.
 */
const getAllScores = async (req, res) => {

	try {

		const scores = await Score.find()
			.sort({ total: -1 }) // short in descendant order (max to min)

		res.json(scores);

	} catch (error) {
		console.log('ERROR: Error in getAllScores():', error);
		res.status(500).json({ error: 'Error while retrieving all scores' });
	}
};

/**
 * Function that receive a GET REQUEST and
 * returns all the scores from the DB
 * to fill the table in scoreboard.html
 */
const getTop = async (req, res) => {

	try {

		const topScores = await Score.find()
			.sort({ total: -1 }) // short in descendant order (max to min)
			.limit(10); // only retrieve top 10 scores from players

		res.json(topScores);

	} catch (error) {
		console.log('ERROR: Error in getTop():', error);
		res.status(500).json({ error: 'Error while retrieving top scores' });
	}
};

/**
 * Function that receive a GET REQUEST and
 * returns the scoreboard.html page
 */
const showScoreboardPage = (req, res) => {
	res.sendFile(path.join(__dirname, '../views/scoreboard.html'))
};

module.exports = {
	updateScore, 
	getAllScores,
	getTop,
	showScoreboardPage,
};
