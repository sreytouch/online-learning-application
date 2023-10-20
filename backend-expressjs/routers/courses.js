const express = require('express');
const router = express.Router();
const {
    getAllCourse,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
} = require('../controllers/courseController');
const checkToken = require('../middlewares/checkToken');
const authorize = require('../middlewares/authorize');

// api/v1/courses
router.post('/', checkToken, authorize(), createCourse);
router.get('/', checkToken, authorize(), getAllCourse);
router.get('/:id', checkToken, authorize(), getCourseById);
router.put('/:id', checkToken, authorize(), updateCourse);
router.delete('/:id', checkToken, authorize(), deleteCourse);

module.exports = router;