// models/User.js
const db = require('../config/database');

const User = {
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], callback);
    },
    create: (email, hashedPassword, callback) => {
        const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(query, [email, hashedPassword], callback);
    }
};

module.exports = User;
