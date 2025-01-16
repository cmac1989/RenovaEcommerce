const db = require('../config/database');

const cartModel = {
    getAll: (callback) => {
        const query = 'SELECT * FROM cart_items';
        db.query(query,callback);
    },
    create: (id, user_id, product_id, quantity, callback) => {
        const query = 'INSERT INTO cart_items (id, user_id, product_id, quantity) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [id, user_id, product_id, quantity], callback)
    }
}

module.exports = cartModel;