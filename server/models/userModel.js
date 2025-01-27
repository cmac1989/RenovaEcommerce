const db = require('../config/database');

const userModel = {
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], callback);
    },
    create: (id, username, email, password, callback) => {
        const query = 'INSERT INTO users (id, username, email, password) VALUES (?, ?)';
        db.query(query, [id, username, email, password], callback);
    }
};

module.exports = userModel;
