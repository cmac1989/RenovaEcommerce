// models/Product.js
const db = require('../config/database');

const Product = {
    getAll: (callback) => {
        const query = 'SELECT * FROM products';
        db.query(query, callback);
    },
    create: (name, description, price, stock, imageUrl, category, callback) => {
        const query = 'INSERT INTO products (name, description, price, stock, imageUrl, category) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(query, [name, description, price, stock, imageUrl, category], callback);
    }
};

module.exports = Product;
