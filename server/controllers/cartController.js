const Cart = require('../models/productModel');

exports.getAllCartItems = (req, res) => {
    Cart.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching products' });
        }
        res.json(results);
    });
};

exports.addCartItem = (req, res) => {
    const { id, user_id, product_id, quantity, created_at, updated_at} = req.body;

    Cart.create(id, user_id, product_id, quantity, created_at, updated_at, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error adding item to cart' });
        }
        res.status(201).json({ message: 'Item added to cart successfully', productId: result.insertId });
    });
};