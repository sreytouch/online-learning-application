const express = require('express');
const router = express.Router();
const {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require('../controllers/categoryController');
const checkToken = require('../middlewares/checkToken');
const authorize = require('../middlewares/authorize');

// api/v1/courses
router.post('/', checkToken, authorize(), createCategory);
router.get('/', checkToken, authorize(), getAllCategory);
router.get('/:id', checkToken, authorize(), getCategoryById);
router.put('/:id', checkToken, authorize(), updateCategory);
router.delete('/:id', checkToken, authorize(), deleteCategory);

module.exports = router;