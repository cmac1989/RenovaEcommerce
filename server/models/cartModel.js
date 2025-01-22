// const db = require('../config/database');
//
// const cartModel = {
//     getAll: (callback) => {
//         const query = 'SELECT * FROM cart_items';
//         db.query(query, callback);
//     },
//     create: (user_id, product_id, quantity, callback) => {
//         const query = 'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?, ?, ?)';
//         db.query(query, [user_id, product_id, quantity], callback);
//     },
//     // Check if the product already exists in the user's cart
//     checkIfProductExists: (user_id, product_id, callback) => {
//         const query = 'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?';
//         db.query(query, [user_id, product_id], callback);
//     },
//
//     // Update the quantity of an existing cart item
//     updateQuantity: (user_id, product_id, quantity, callback) => {
//         const query = 'UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?';
//         db.query(query, [quantity, user_id, product_id], callback);
//     }
// };
//
// module.exports = cartModel;

// Assuming you are using MySQL or another database

const db = require('../config/database');

const getItems = (userId, callback) => {
    console.log(userId)
    const query = `
    SELECT 
      ci.id AS cart_item_id,
      ci.quantity,
      p.id AS product_id,
      p.name AS product_name,
      p.description AS product_description,
      p.price AS product_price,
      p.image AS product_image,
      p.stock_quantity AS product_stock_quantity
    FROM 
      cart_items ci
    JOIN 
      products p ON ci.product_id = p.id
    WHERE 
      ci.user_id = ?;
  `;

    console.log('Executing query with userId:', userId);
    db.query(query, [userId], (err, result) => {
        if (err) {
            console.error("Error executing query:", err);
            return callback(err, null);
        }
        callback(null, result);
    });
};

// Check if product already exists in the cart for the user
const checkIfProductExists = (user_id, product_id, callback) => {
    const query = 'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?';
    db.query(query, [user_id, product_id], callback);
};

// Update the quantity of an existing cart item
const updateQuantity = (user_id, product_id, newQuantity, callback) => {
    const query = 'UPDATE cart_items SET quantity = ?, updated_at = ? WHERE user_id = ? AND product_id = ?';
    const updated_at = new Date();
    db.query(query, [newQuantity, updated_at, user_id, product_id], callback);
};

// Add a new cart item
const create = (user_id, product_id, quantity, callback) => {
    const query = 'INSERT INTO cart_items (user_id, product_id, quantity, created_at, updated_at) VALUES (?, ?, ?, ?, ?)';
    const created_at = new Date();
    const updated_at = new Date();
    db.query(query, [user_id, product_id, quantity, created_at, updated_at], callback);
};

// Export the model methods
module.exports = {
    getItems,
    checkIfProductExists,
    updateQuantity,
    create
};

