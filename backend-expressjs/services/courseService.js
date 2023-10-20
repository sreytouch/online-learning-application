const Course = require('../models/courseModels');

async function addNewCourse(courseData) {
    return new Promise(async (resolve, reject) => {
        try {
            const course = await Course.create(courseData);
            resolve(course);
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    addNewCourse
}