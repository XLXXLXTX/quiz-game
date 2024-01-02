const express = require('express');

const scoreController = require('../controllers/scoreController');

const router = express.Router();

router.get('/scoresdb', scoreController.getTop);

module.exports = router;