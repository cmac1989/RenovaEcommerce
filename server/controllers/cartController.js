const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const { Op } = require('sequelize');

exports.getAllCartItems = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        console.log("User ID from JWT:", userId);
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        console.log(`Fetching cart items for user ID: ${userId}`);

        const cartItems = await Cart.findAll({
            where: { user_id: userId },
            include: [
                {
                    model: Product,
                    as: 'product',
                    attributes: ['id', 'name', 'description', 'price', 'image', 'stock_quantity'],
                }
            ],
            attributes: ['id', 'quantity', 'createdAt', 'updatedAt']
        });

        console.log("Cart Items from DB:", JSON.stringify(cartItems, null, 2)); // Debug log

        if (!cartItems.length) {
            return res.status(200).json([]);
        }
        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ error: 'Error fetching cart items' });
    }
};


// Get a single cart item by ID
exports.getCartItem = async (req, res) => {
    try {
        const userId = req.user ? req.user.id : null;
        const cartItemId = req.params.cart_item_id;
        if (!userId || !cartItemId) {
            return res.status(400).json({ error: 'User ID and Cart Item ID are required' });
        }

        const cartItem = await Cart.findOne({ where: { id: cartItemId, user_id: userId } });
        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        res.status(200).json(cartItem);
    } catch (error) {
        console.error('Error fetching cart item:', error);
        res.status(500).json({ error: 'Error fetching cart item' });
    }
};

// Add or update a cart item
exports.addCartItem = async (req, res) => {
    try {
        const user_id = req.user ? req.user.id : null;
        const { product_id, quantity } = req.body;
        if (!user_id || !product_id || !quantity) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const existingItem = await Cart.findOne({ where: { user_id, product_id } });

        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
            return res.status(200).json({ message: 'Item quantity updated', cartItemId: existingItem.id });
        }

        const newItem = await Cart.create({ user_id, product_id, quantity });
        res.status(201).json({ message: 'Item added to cart', cartItemId: newItem.id });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Error adding item to cart' });
    }
};

// Remove cart item or decrease quantity
exports.removeCartItem = async (req, res) => {
    try {
        const user_id = req.user.id;
        const cart_item_id  = req.params.cart_item_id;  // Get from URL

        const { product_id, quantity } = req.body;
        console.log(product_id);
        console.log(quantity);
        console.log(cart_item_id);
        if (!user_id || !product_id || !quantity) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const cartItem = await Cart.findOne({ where: { user_id, id: cart_item_id} });
        if (!cartItem) {
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        if (cartItem.quantity > quantity) {
            cartItem.quantity -= quantity;
            await cartItem.save();
            return res.status(200).json({ message: 'Item quantity updated', cartItemId: cartItem.id });
        }

        await cartItem.destroy();
        res.status(200).json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error removing cart item:', error);
        res.status(500).json({ error: 'Error removing cart item' });
    }
};
