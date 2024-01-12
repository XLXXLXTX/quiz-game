const mongoose = require('mongoose');

// create question model
const categorySchema = new mongoose.Schema({
    categoryName : String,
    categoryValue : String
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category