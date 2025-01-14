const db = require('../config/database');

const productModel = {
    getAll: (callback) => {
        const query = 'SELECT * FROM products';
        db.query(query, callback);
    },
    create: (name, description, price, imageUrl, stock, callback) => {
        const query = 'INSERT INTO products (name, description, price, imageUrl, stock) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [name, description, price, imageUrl, stock], callback);
    }
};

module.exports = productModel;
