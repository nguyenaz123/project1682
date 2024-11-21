const express = require('express');
const {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryDetails
} = require('../controllers/categoryController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.route("/categories").get(getAllCategories);

router
    .route("/admin/category/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), createCategory);

router
    .route("/admin/category/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getCategoryDetails)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

module.exports = router;
