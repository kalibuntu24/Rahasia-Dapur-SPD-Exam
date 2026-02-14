const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: [{
        type: String,
        required: true
    }],
    steps: [{
        type: String,
        required: true
    }],
    category: {
        type: String,
        required: true,
        enum: ['Masakan Rumah', 'Ide Jualan', 'Kue', 'Minuman', 'Lainnya']
    },
    videoUrl: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    },
    priceEstimate: {
        type: String,
        required: false
    },
    difficulty: {
        type: String,
        default: 'Mudah'
    },
    cookingTime: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
