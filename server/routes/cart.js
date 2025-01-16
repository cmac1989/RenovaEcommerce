const express = require('express');
const { getAllCartItems, addCartItem } = require('../controllers/cartController');
const router = express.Router();

router.post('/', addCartItem);
router.get('/', getAllCartItems);

module.exports = router;