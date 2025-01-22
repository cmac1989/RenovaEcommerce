const express = require('express');
const { getAllCartItems, addCartItem } = require('../controllers/cartController');
const router = express.Router();
const authenticateJWT = require('../middleware/authMiddleware');

router.post('/', authenticateJWT, addCartItem);
router.get('/', authenticateJWT, getAllCartItems);

module.exports = router;