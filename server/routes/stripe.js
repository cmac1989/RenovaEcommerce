const express = require('express');
const router = express.Router();
const {createProductAndPrice, updateProductAndPrice, archiveProductAndPrice, getProductAndPrice} = require("../controllers/stripeController")

router.post("/create-product-and-price", createProductAndPrice);  
router.post("/update-product-and-price", updateProductAndPrice);  
router.post("/archive-product-and-price", archiveProductAndPrice);  
router.post("/get-product-and-price", getProductAndPrice);  

module.exports = router;