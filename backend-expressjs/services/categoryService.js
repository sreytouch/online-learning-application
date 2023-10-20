const Category = require('../models/categoryModels');

async function addNewCategory(categoryData) {
    return new Promise(async (resolve, reject) => {
        try {
            const category = await Category.create(categoryData);
            resolve(category);
        } catch (err) {
            reject(err);
        }
    })
}

module.exports = {
    addNewCategory
}