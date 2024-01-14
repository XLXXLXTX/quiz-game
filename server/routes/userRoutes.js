/* JS file with the routes related to the user info */

const express = require('express');

const userController = require('../controllers/userController');

const router = express.Router();

// routes to retrieve user info given an user id
router.get('/user/:id', userController.findById);


module.exports = router;
