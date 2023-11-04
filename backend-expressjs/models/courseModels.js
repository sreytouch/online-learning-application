const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseModel = new Schema({
    title: {
        type: String,
        required: true
    },
    typeCategory: {
        // category_id: mongoose.Types.ObjectId,
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true,
    },
    dateTime: {
        type: Date,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    contants: {
        type: String,
        required: true,
    },
    rate: Number,
    pictureUrls: [{
        type: String,
    }],
    chapers: [{
        type: String,
    }],
    files: [{
        type: String,
    }],
    discussions: [{
        type: String,
    }]
})

const Course = mongoose.model('Course', courseModel);
module.exports = Course;