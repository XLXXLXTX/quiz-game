const path = require('path');

const Score = require('../models/score');


const updateScore = async (req, res) => {
    try {
        const { username, correctEasy, correctMedium, correctHard, total } = req.body;

        // Utiliza findOne en lugar de find para obtener un solo documento
        const userScore = await Score.findOne({ username });

        let score;

        if (userScore) {
            console.log('username already exists' + userScore);
            userScore.correctEasy += correctEasy;
            userScore.correctMedium += correctMedium;
            userScore.correctHard += correctHard;
            userScore.total += total;

            score = userScore;
        } else {
            console.log('username does not exist');
            score = new Score({ username, correctEasy, correctMedium, correctHard, total });
        }

        // Utiliza save() en el documento específico
        await score.save();

        res.json({ message: 'Score updated successfully' });

    } catch (error) {
        console.log('ERROR: Error in updateScore():', error);
        res.status(500).json({ error: 'Error while saving score' });
    }
};



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

// Show signup entry page
const showScoreboardPage = (req, res) => {
	res.sendFile(path.join(__dirname, '../views/scoreboard.html'))
};

module.exports = { getAllScores, getTop, showScoreboardPage, updateScore };
