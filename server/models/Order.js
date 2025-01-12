// models/Order.js
const db = require('../config/database');

const Order = {
    create: (userId, totalAmount, orderDate, orderStatus, callback) => {
        const query = 'INSERT INTO orders (userId, totalAmount, orderDate, orderStatus) VALUES (?, ?, ?, ?)';
        db.query(query, [userId, totalAmount, orderDate, orderStatus], callback);
    },
    getByUserId: (userId, callback) => {
        const query = 'SELECT * FROM orders WHERE userId = ?';
        db.query(query, [userId], callback);
    }
};

module.exports = Order;
