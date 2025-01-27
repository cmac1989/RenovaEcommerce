const orderModel = require('../models/orderModel');

exports.placeOrder = (req, res) => {
    const { userId, products } = req.body;
    const totalAmount = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);

    orderModel.create(userId, totalAmount, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error placing order' });
        }

        const orderId = result.insertId;
        // Insert order items (use a separate table for this)
        res.status(201).json({ message: 'Order placed successfully', orderId });
    });
};

exports.getUserOrders = (req, res) => {
    const { userId } = req.params;

    orderModel.getByUserId(userId, (err, orders) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching orders' });
        }
        res.json(orders);
    });
};