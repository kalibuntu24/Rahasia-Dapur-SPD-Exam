const asyncHandler = require('express-async-handler');
const Recipe = require('../models/Recipe');

// @desc    Get recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = asyncHandler(async (req, res) => {
    const category = req.query.category;
    let query = {};
    if (category) {
        query.category = category;
    }
    const recipes = await Recipe.find(query);
    res.status(200).json(recipes);
});

// @desc    Get recipe by ID
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
        res.status(404);
        throw new Error('Recipe not found');
    }
    res.status(200).json(recipe);
});

// @desc    Create recipe
// @route   POST /api/recipes
// @access  Private/Admin
const createRecipe = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.description) {
        res.status(400);
        throw new Error('Please add all required fields');
    }

    const recipe = await Recipe.create({
        ...req.body,
        user: req.user.id
    });

    res.status(201).json(recipe);
});

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Private/Admin
const updateRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
        res.status(404);
        throw new Error('Recipe not found');
    }

    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(204).send();
});

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private/Admin
const deleteRecipe = asyncHandler(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
        res.status(404);
        throw new Error('Recipe not found');
    }

    await recipe.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe
};
