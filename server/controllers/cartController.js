// const Cart = require('../models/cartModel');
//
// exports.getAllCartItems = (req, res) => {
//     Cart.getAll((err, results) => {
//         if (err) {
//             return res.status(500).json({ error: 'Error fetching cart items' });
//         }
//         res.json(results);
//     });
// };
//
// exports.addCartItem = (req, res) => {
//     const { user_id, product_id, quantity } = req.body;  // Exclude `id` since it's auto-incremented
//
//     console.log('Request Data:', req.body);
//     // Validate input (optional but recommended)
//     if (!user_id || !product_id || !quantity) {
//         return res.status(400).json({ error: 'Missing required fields' });
//     }
//     // Check if the product already exists in the cart for this user
//     Cart.checkIfProductExists(user_id, product_id, (err, results) => {
//         if (err) {
//             console.error('Error checking product existence:', err);
//             return res.status(500).json({ error: 'Error checking product existence' });
//         }
//
//         if (results.length > 0) {
//             // Product already in cart, update the quantity
//             const existingQuantity = results[0].quantity;
//             const newQuantity = existingQuantity + quantity;
//
//             // Update the quantity of the existing cart item
//             Cart.updateQuantity(user_id, product_id, newQuantity, (updateErr, updateResult) => {
//                 if (updateErr) {
//                     console.error('Error updating quantity:', updateErr);
//                     return res.status(500).json({ error: 'Error updating cart item' });
//                 }
//
//                 res.status(200).json({ message: 'Item quantity updated', cartItemId: results[0].id });
//             });
//         } else {
//             // Product not in cart, create a new cart item
//             const created_at = new Date();
//             const updated_at = new Date();
//
//             Cart.create(user_id, product_id, quantity, (createErr, createResult) => {
//                 if (createErr) {
//                     console.error('Error adding item to cart:', createErr);
//                     return res.status(500).json({ error: 'Error adding item to cart' });
//                 }
//
//                 res.status(201).json({ message: 'Item added to cart', cartItemId: createResult.insertId });
//             });
//         }
//     });
//
//     // // Call the model to add the item to the cart
//     // Cart.create(user_id, product_id, quantity, (err, result) => {
//     //     console.log('Incoming data:', req.body);
//     //
//     //     if (err) {
//     //         return res.status(500).json({ error: 'Error adding item to cart' });
//     //     }
//     //     res.status(201).json({ message: 'Item added to cart successfully', cartItemId: result.insertId });
//     // });
// };

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

exports.addCartItem = (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    console.log('Request Data:', req.body); // Debugging

    // Validate input
    if (!user_id || !product_id || !quantity) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if the product exists in the cart for this user
    Cart.checkIfProductExists(user_id, product_id, (err, results) => {
        if (err) {
            console.error('Error checking product existence:', err);
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
