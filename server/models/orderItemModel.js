const db = require('../config/database');

const orderItemModel = {
    create: (id, orderId, quantity, price_at_purchase, created_at, callback) => {
        const query = 'INSERT INTO orders (id, orderId, quantity, price_at_purchase, created_at) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [id, orderId, quantity, price_at_purchase, created_at], callback);
    },
    getAll: (callback) => {
        const query = 'SELECT * FROM orders_items';
        db.query(query, callback);
    },
    getByUserId: (id, callback) => {
        const query = 'SELECT * FROM orders WHERE userId = ?';
        db.query(query, [id], callback);
    }
};

module.exports = orderItemModel;