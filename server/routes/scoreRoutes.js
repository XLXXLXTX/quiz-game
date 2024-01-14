/* JS file with the routes that can be accessed from the scoreboards page */

const express = require('express');

const scoreController = require('../controllers/scoreController');

const router = express.Router();

// routes for scores
router.get('/scoresdb', scoreController.getTop);

// route to add or update a score to the DB as an user
router.post('/updatescore', scoreController.updateScore);

module.exports = router;