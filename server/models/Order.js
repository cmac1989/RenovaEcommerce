// models/Order.js
const db = require('../config/database');

const Order = {
    create: (userId, totalAmount, callback) => {
        const query = 'INSERT INTO orders (userId, totalAmount) VALUES (?, ?)';
        db.query(query, [userId, totalAmount], callback);
    },
    getByUserId: (userId, callback) => {
        const query = 'SELECT * FROM orders WHERE userId = ?';
        db.query(query, [userId], callback);
    }
};

module.exports = Order;
