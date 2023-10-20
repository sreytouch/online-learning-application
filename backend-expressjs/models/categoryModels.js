const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryModels = new Schema({
    title: {
        type: String,
        required: true
    },
    pictureUrls: [{
        type: String,
    }]
})

const Category = mongoose.model('Category', categoryModels);
module.exports = Category;