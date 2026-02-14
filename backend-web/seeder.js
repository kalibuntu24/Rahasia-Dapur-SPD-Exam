const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const recipes = require('./data/recipes');
const User = require('./models/User');
const Recipe = require('./models/Recipe');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Recipe.deleteMany();
        await User.deleteMany();

        const createdUsers = [];
        for (const user of users) {
            const newUser = await User.create(user);
            createdUsers.push(newUser);
        }

        const adminUser = createdUsers[0]._id;

        const sampleRecipes = recipes.map((recipe) => {
            return { ...recipe, user: adminUser };
        });

        await Recipe.insertMany(sampleRecipes);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Recipe.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
