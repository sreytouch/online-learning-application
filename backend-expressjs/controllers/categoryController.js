const Category = require('../models/categoryModels');
const Role = require('../_helpers/roles');
const categoryService = require('../services/categoryService');
async function getAllCategory(req, res, next) {
    try {
        const categories = await Category.find();
        res.status(200).json({
            message: 'All categories retrieved successfully',
            data: categories
        });
    } catch (err) {
        next(err);
    }
}

async function getCategoryById(req, res, next) {
    try {
        const categoryID = req.params.id;
        const category = await Category.findById(categoryID);
        res.status(200).json({
            message: `Category retrieved successfully`,
            data: category
        });
    } catch (err) {
        next(err);
    }
}


// Todo: parse the req.body only allow roles to be added by admin
async function createCategory(req, res, next) {
    try {
        const { title, typeCategory, price, dateTime, author, contants, rate, pictureUrls } = req.body;
        const categoryData = {
            title: title,
            typeCategory: typeCategory,
            price: price,
            dateTime: dateTime,
            author: author,
            contants: contants,
            rate: rate,
            pictureUrls: pictureUrls
        }
        await categoryService.addNewCategory(categoryData).then(category => {
            res.status(201).json({
                message: `Category created successfully`,
                data: category
            });
        }).catch(err => {
            throw err;
        });
    } catch (err) {
        next(err);
    }
}

async function updateCategory(req, res, next) {
    try {
        const categoryID = req.params.id;
        const category = await Category.findByIdAndUpdate(categoryID, req.body, { new: true });
        res.status(200).json({
            message: `Category updated successfully`,
            data: category
        });
    } catch (err) {
        next(err);
    }
}

async function deleteCategory(req, res, next) {
    try {
        const categoryID = req.params.id;
        const category = await Category.findByIdAndDelete(categoryID);
        res.status(200).json({
            message: `Category deleted successfully`,
            data: category
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
}