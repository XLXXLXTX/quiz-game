/* define data models (for user objects) */

const mongoose = require('mongoose');

// create user model
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
