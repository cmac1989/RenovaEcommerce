const Cart = require('../models/cartModel');

exports.getAllCartItems = (req, res) => {
    const userId = req.user ? req.user.id : null;
    console.log(userId);

    if(!userId) {
        console.error("User ID not found in JWT");
        return res.status(400).send({ error: 'userId is required' });
    }
    console.log("Fetching cart items for userId:", userId);
    Cart.getItems(userId,(err, results) => {
        if (err) {
            console.error("Error fetching cart items:", err);
            return res.status(500).json({ error: 'Error fetching cart items' });
        }
        if (results.length === 0) {
            return res.status(200).json([]); // Empty cart response
        }
        res.json(results);
    });
};
exports.getCartItem = (req, res) => {
    const userId = req.user ? req.user.id : null;
    // const productId = req.productId ? req.productId : null;
    const cartItemId = req.params.cart_item_id;
    if(!userId) {
        console.error("User ID not found in JWT");
        return res.status(400).send({ error: 'userId is required' });
    }
    if(!cartItemId) {
        console.error("User ID not found in JWT");
        return res.status(400).send({ error: 'userId is required' });
    }
    console.log("Fetching cart item for deletion for userId:", userId);
    Cart.getItem(userId, cartItemId,(err, results) => {
        if (err) {
            console.error("User ID not found in JWT");
            return res.status(500).send({ error: 'userId is required' });
        }
        if (results.length === 0) {
            return res.status(200).json(results);
        }
        return res.json(results);
    })
}

exports.addCartItem = (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    console.log('Request Data:', req.body);  // Log incoming request

    // Validate input
    if (!user_id || !product_id || !quantity) {
        console.error('Missing required fields in the request body:', req.body);  // More debugging
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the product exists in the cart for this user
    Cart.checkIfProductExists(user_id, product_id, (err, results) => {
        if (err) {
            console.error('Error checking product existence in cart:', err);  // Log error message explicitly
            return res.status(500).json({ error: 'Error checking product existence' });
        }

        if (results.length > 0) {
            // Product already in cart, update quantity
            const existingQuantity = results[0].quantity;
            const newQuantity = existingQuantity + quantity;

            Cart.updateQuantity(user_id, product_id, newQuantity, (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Error updating quantity:', updateErr);
                    return res.status(500).json({ error: 'Error updating cart item' });
                }

                res.status(200).json({ message: 'Item quantity updated', cartItemId: results[0].id });
            });
        } else {
            // Product not in cart, create a new cart item
            const created_at = new Date();
            const updated_at = new Date();

            Cart.create(user_id, product_id, quantity, (createErr, createResult) => {
                if (createErr) {
                    console.error('Error adding item to cart:', createErr);
                    return res.status(500).json({ error: 'Error adding item to cart' });
                }

                res.status(201).json({ message: 'Item added to cart', cartItemId: createResult.insertId });
            });
        }
    });
};


exports.removeCartItem = (req, res) => {
    console.log("Entered removeCartItem route");
    const id = req.params.cart_item_id;
    const user_id = req.user.id;  // Assuming `req.user.id` is available from the JWT
    // const product_id = req
    const { product_id, quantity } = req.body;
    console.log(`ID: ${id}`)
    console.log(`USER ID: ${user_id}`)
    console.log(`PRODUCT ID: ${product_id}`)
    console.log(`QUANTITY: ${quantity}`)

    // Check if `quantity` is a valid number
    const parsedQuantity = parseInt(quantity, 10);
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
        return res.status(400).json({ error: 'Invalid quantity' });
    }
    console.log(`parsedQuantity in controller ${parsedQuantity}`)
    // Check if `product_id` is a valid number
    if (!product_id || isNaN(product_id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
    }

    console.log("Quantity before update:", parsedQuantity); // Debugging

    // Check if the product exists in the cart
    Cart.checkIfProductExists(user_id, product_id, (err, results) => {
        if (err) {
            console.error('Error checking product existence:', err);
            return res.status(500).json({ error: 'Error checking product existence' });
        }

        if (results.length === 0) {
            console.log('Product not found in cart' )
            return res.status(404).json({ error: 'Product not found in cart' });
        }

        const existingQuantity = results[0].quantity;  // Get the quantity from the first result
        let newQuantity = existingQuantity - parsedQuantity;

        console.log('Existing Quantity:', existingQuantity, 'New Quantity:', newQuantity); // Debugging

        if (newQuantity <= 0) {
            // If quantity goes below 1, delete the item
            Cart.deleteItem(user_id, id, (deleteErr, deleteResult) => {
                if (deleteErr) {
                    console.error('Error deleting cart item:', deleteErr);
                    return res.status(500).json({ error: 'Error deleting cart item' });
                }

                res.status(200).json({ message: 'Item removed from cart', cartItemId: results[0].id });
            });
        } else {
            // Update the quantity if it's still greater than 0
            Cart.updateQuantity(user_id, product_id, newQuantity, (updateErr, updateResult) => {
                if (updateErr) {
                    console.error('Error updating quantity:', updateErr);
                    return res.status(500).json({ error: 'Error updating cart item' });
                }
                res.status(200).json({ message: 'Item quantity updated', cartItemId: results[0].id });
            });
        }
    });
};

