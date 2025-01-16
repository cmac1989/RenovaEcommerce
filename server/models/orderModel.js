const db = require('../config/database');

const orderModel = {
    create: (id, userId, total_price, status, created_at, updated_at, callback) => {
        const query = 'INSERT INTO orders (id, userId, total_price, status) VALUES (?, ?, ?, ?)';
        db.query(query, [id, userId, total_price, status], callback);
    },
    getByUserId: (id, callback) => {
        const query = 'SELECT * FROM orders WHERE userId = ?';
        db.query(query, [id], callback);
    }
};

module.exports = orderModel;
