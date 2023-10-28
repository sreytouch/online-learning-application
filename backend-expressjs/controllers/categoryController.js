const Category = require('../models/categoryModels');
const Role = require('../_helpers/roles');
const categoryService = require('../services/categoryService');
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

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
        const { title, pictureUrls } = req.body;
        // const categoryData = {
        //     title: title,
        //     pictureUrls: pictureUrls
        // }
        // await categoryService.addNewCategory(categoryData).then(category => {
        //     res.status(201).json({
        //         message: `Category created successfully`,
        //         data: category
        //     });
        // }).catch(err => {
        //     throw err;
        // });

        await uploadFile(req.file).then(async (result) => {
            const category = await Category.create({
                title: title,
                pictureUrls: [result.Location]
            });
            // Deleting from local if uploaded in S3 bucket
            await unlinkFile(req.file.path);
            res.status(201).json({
                message: `Category created successfully`,
                data: category
            });
        }).catch(err => {
            console.log(err);
            res.status(201).json({
                message: `Problem uploading file`,
                error: true
            });
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