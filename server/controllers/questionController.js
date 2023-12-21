const path = require('path');

const Question = require('../models/question');

const getAllQuestions = async (req, res) => {

  try {
    
    const questions = await Question.find()

    res.json(questions);
      
  } catch (error) {
        console.log('ERROR: Error in getAllQuestions():', error);
        res.status(500).json({ error: 'Error while retrieving questions' });
  }
};

// Show questions entry page
const showQuestionsPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../views/questions.html'))
};

module.exports = { getAllQuestions, showQuestionsPage};
