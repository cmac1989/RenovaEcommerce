// const db = require('../config/database');
//
// const getItems = (userId, callback) => {
//     const query = `
//     SELECT
//       ci.id AS cart_item_id,
//       ci.quantity,
//       p.id AS product_id,
//       p.name AS product_name,
//       p.description AS product_description,
//       p.price AS product_price,
//       p.image AS product_image,
//       p.stock_quantity AS product_stock_quantity
//     FROM
//       cart_items ci
//     JOIN
//       products p ON ci.product_id = p.id
//     WHERE
//       ci.user_id = ?;
//   `;
//
//     console.log('Executing query with userId:', userId);
//     db.query(query, [userId], (err, result) => {
//         if (err) {
//             console.error("Error executing query:", err);
//             return callback(err, null);
//         }
//         callback(null, result);
//     });
// };
//
// const getItem = (user_id, cart_item_id, callback) => {
//     const query = `
//     SELECT
//       ci.id AS cart_item_id,
//       ci.quantity,
//       p.id AS product_id,
//       p.name AS product_name,
//       p.description AS product_description,
//       p.price AS product_price,
//       p.image AS product_image,
//       p.stock_quantity AS product_stock_quantity
//     FROM
//       cart_items ci
//     JOIN
//       products p ON ci.product_id = p.id
//     WHERE
//       ci.user_id = ? AND ci.id = ?;
//     `;
//     db.query(query, [user_id, cart_item_id], (err, result) => {  // Use the correct user_id and product_id
//         if (err) {
//             console.error("Error executing query:", err);
//             return callback(err, null);  // Return the error to the callback
//         }
//         callback(null, result);  // If no error, return the result
//     });
// };
//
//
// const checkIfProductExists = (user_id, product_id, callback) => {
//     const query = 'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?';
//     db.query(query, [user_id, product_id], (err, result) => {
//
//         if (err) {
//             console.error('Error checking if product exists in cart:', err);
//             return callback(err, null); // Properly return the error to the callback
//         }
//         callback(null, result); // Return the result without error
//     });
// };
//
// // Update the quantity of an existing cart item
// const updateQuantity = (user_id, product_id, newQuantity, callback) => {
//     const query = 'UPDATE cart_items SET quantity = ?, updated_at = ? WHERE user_id = ? AND product_id = ?';
//     const updated_at = new Date();
//     db.query(query, [newQuantity, updated_at, user_id, product_id], callback);
// };
//
// const deleteItem = (user_id, id, callback) => {
//     const query = 'DELETE FROM cart_items WHERE user_id = ? AND id = ?';
//     db.query(query, [user_id, id], callback);
// }
//
// // Add a new cart item
// const create = (user_id, product_id, quantity, callback) => {
//     const query = 'INSERT INTO cart_items (user_id, product_id, quantity, created_at, updated_at) VALUES (?, ?, ?, ?, ?)';
//     const created_at = new Date();
//     const updated_at = new Date();
//     db.query(query, [user_id, product_id, quantity, created_at, updated_at], callback);
// };
//
// // Export the model methods
// module.exports = {
//     getItems,
//     getItem,
//     checkIfProductExists,
//     updateQuantity,
//     create,
//     deleteItem
// };

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cart = sequelize.define('cart',
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        foreignKey: 'user_id',
    },
    product_id: {
        type: DataTypes.INTEGER,
        foreignKey: 'product_id',
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    },
    {
        tableName: 'cart_items',
        timestamps: true,
        underscored: true,
    }
    )

