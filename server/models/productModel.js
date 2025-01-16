const db = require('../config/database');

const productModel = {
    getAll: (callback) => {
        const query = 'SELECT * FROM products';
        db.query(query, callback);
    },
    create: (name, description, price, image, stock_quantity, created_at, updated_at, callback) => {
        const query = 'INSERT INTO products (name, description, price, imageUrl, stock, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [name, description, price, image, stock_quantity, created_at, updated_at], callback);
    }
};

module.exports = productModel;
