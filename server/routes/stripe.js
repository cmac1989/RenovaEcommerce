const express = require('express');
const router = express.Router();
const {createProductWithPrice, updateProductAndPrice} = require("../controllers/stripeController")

router.post("/create-product-with-price", createProductWithPrice);  
router.post("/update-product-and-price", updateProductAndPrice);  

module.exports = router;