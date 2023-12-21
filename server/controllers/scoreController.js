const path = require('path');

const Score = require('../models/score');

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

module.exports = { getTop, showScoreboardPage};
