const express = require('express');

const scoreController = require('../controllers/scoreController');

const router = express.Router();

router.get('/scoresdb', scoreController.getTop);

router.post('/updatescore', scoreController.updateScore);

module.exports = router;