const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/recipes', require('./routes/recipeRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
    res.send('Rahasia Dapur API is running');
});

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
