const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
    },
    {
        name: 'Ibu Budi',
        email: 'ibubudi@example.com',
        password: 'password123',
        role: 'user'
    },
    {
        name: 'Ibu Ani',
        email: 'ibuani@example.com',
        password: 'password123',
        role: 'user'
    },
];

module.exports = users;
