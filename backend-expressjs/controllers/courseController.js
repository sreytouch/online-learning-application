const Course = require('../models/courseModels');
const Role = require('../_helpers/roles');
const courseService = require('../services/courseService');
async function getAllCourse(req, res, next) {
    try {
        let query = {};
        const courseID = req._parsedUrl.query;
        query = { courseID };
        const courses = await Course.find(query).sort({ title: 1 }).limit(10);
        res.status(200).json({
            message: 'All courses retrieved successfully',
            data: courses
        });
    } catch (err) {
        next(err);
    }
}

async function getCourseById(req, res, next) {
    try {
        const courseID = req.params.id;
        const course = await Course.findById(courseID);
        res.status(200).json({
            message: `Course retrieved successfully`,
            data: course
        });
    } catch (err) {
        next(err);
    }
}


// Todo: parse the req.body only allow roles to be added by admin
async function createCourse(req, res, next) {
    try {
        const { title, typeCategory, price, dateTime, author, contants, rate, pictureUrls, chapers, files, discussions } = req.body;
        const courseData = {
            title: title,
            typeCategory: typeCategory,
            price: price,
            dateTime: dateTime,
            author: author,
            contants: contants,
            rate: rate,
            pictureUrls: pictureUrls,
            chapers: chapers,
            files: files,
            discussions: discussions
        }
        await courseService.addNewCourse(courseData).then(course => {
            res.status(201).json({
                message: `Course created successfully`,
                data: course
            });
        }).catch(err => {
            throw err;
        });
    } catch (err) {
        next(err);
    }
}

async function updateCourse(req, res, next) {
    try {
        const courseID = req.params.id;
        const course = await Course.findByIdAndUpdate(courseID, req.body, { new: true });
        res.status(200).json({
            message: `Course updated successfully`,
            data: course
        });
    } catch (err) {
        next(err);
    }
}

async function deleteCourse(req, res, next) {
    try {
        const courseID = req.params.id;
        const course = await Course.findByIdAndDelete(courseID);
        res.status(200).json({
            message: `Course deleted successfully`,
            data: course
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllCourse,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
}