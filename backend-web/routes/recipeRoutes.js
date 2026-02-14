const express = require('express');
const router = express.Router();
const { getRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getRecipes)
    .post(protect, admin, createRecipe);

router.route('/:id')
    .get(protect, getRecipeById)
    .put(protect, admin, updateRecipe)
    .delete(protect, admin, deleteRecipe);

module.exports = router;
