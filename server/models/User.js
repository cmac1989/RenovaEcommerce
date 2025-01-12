// models/User.js
const db = require('../config/database');

const User = {
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], callback);
    },
    create: (email, hashedPassword, role, created_at, callback) => {
        const query = 'INSERT INTO users (email, password, role, created_at) VALUES (?, ?)';
        db.query(query, [email, hashedPassword, role, created_at], callback);
    }
};

module.exports = User;
