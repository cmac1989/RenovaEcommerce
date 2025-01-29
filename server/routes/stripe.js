const express = require('express');
const router = express.Router();
const {createProductWithPrice, updateProductAndPrice, archiveProductAndPrice} = require("../controllers/stripeController")

router.post("/create-product-with-price", createProductWithPrice);  
router.post("/update-product-and-price", updateProductAndPrice);  
router.post("/archive-product-and-price", archiveProductAndPrice);  

module.exports = router;