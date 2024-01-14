/* JS file to model the fields of the category collection in the database */

const mongoose = require('mongoose');

// create category model
const categorySchema = new mongoose.Schema({
	categoryName: String,
	categoryValue: String
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category