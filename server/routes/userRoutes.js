/* define routes to call controllers */

const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

router.get('/user/:id', userController.findById);


module.exports = router;
